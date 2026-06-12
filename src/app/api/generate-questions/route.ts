// src/app/api/generate-questions/route.ts
// Sinh câu hỏi IELTS GỐC từ transcript (listening) hoặc passage (reading).
// KHÔNG sao chép câu hỏi có sẵn — chỉ dùng transcript làm input để tạo câu hỏi mới,
// thiết kế distractor/bẫy theo phong cách IELTS để luyện phản xạ.
// Server-side: ANTHROPIC_API_KEY giữ kín.

import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Generate có thể dùng model mạnh hơn (vd Opus) để bẫy tinh vi hơn — đặt GENERATE_MODEL.
// Mặc định theo ANTHROPIC_MODEL, cuối cùng fallback Sonnet.
const MODEL = process.env.GENERATE_MODEL || process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

// ---- Lõi: nguyên tắc thiết kế bẫy kiểu IELTS ----
const TRAP_RULES = `You are a senior IELTS item-writer. From the SOURCE provided, write ORIGINAL exam questions. You must NOT copy any questions that may exist in the source; invent new ones that test comprehension of the same material.

The questions MUST mimic genuine IELTS difficulty and train the candidate's reflexes against classic traps. Apply ALL of these:

1. PARAPHRASE THE ANSWER. The correct option must NOT reuse the exact keywords from the source. Express the right answer using synonyms/restructured grammar, so keyword-spotting alone fails. The WRONG options may contain words lifted directly from the source — that is the bait.
2. DISTRACTORS = PLAUSIBLE MISREADINGS. Every wrong option must be something a careless candidate would pick: a detail that IS mentioned in the source but answers a different question, a half-true statement, an overgeneralisation, or a number/name that appears nearby but is not the one asked for.
3. CORRECTION / DISTRACTION TRAPS (listening especially). Where the speaker states something then revises it ("...on Tuesday — sorry, Wednesday"), or mentions several figures, build a question whose obvious-sounding answer is the discarded/earlier one.
4. NOT GIVEN vs FALSE (reading TFNG). Include at least one statement that is NOT GIVEN (the source neither confirms nor contradicts it) and at least one that is FALSE (the source contradicts it). Make NG genuinely require distinguishing "no information" from "contradicted" — do not make NG obviously off-topic.
5. NO OUTSIDE-KNOWLEDGE answers. Every question must be answerable ONLY from the source, and NOT from general world knowledge.
6. ORDER. Questions should roughly follow the order information appears in the source.
7. GAP-FILL (listening): answer is 1–3 words taken verbatim from the audio; choose spots where a similar-sounding word, a different number, or a plural/singular is a realistic mistake.

Calibrate to the requested difficulty. Higher target band = subtler paraphrase, tighter distractors, more NG/correction traps.`;

const LISTENING_SHAPE = `Return ONLY valid JSON (no markdown, no backticks) in EXACTLY this shape:
{
  "title": "string — a neutral section title you write yourself (do NOT copy a copyrighted title)",
  "questions": [
    { "type": "GAP", "q": "Sentence with ___ for the blank.", "answer": "one to three words" },
    { "type": "MCQ", "q": "Question text?", "options": ["A","B","C"], "answer": 0 }
  ]
}
"answer" for MCQ is the 0-based index of the correct option. Mix GAP and MCQ. Produce exactly the requested number of questions.`;

const READING_SHAPE = `Return ONLY valid JSON (no markdown, no backticks) in EXACTLY this shape:
{
  "title": "string — a neutral passage title you write yourself",
  "questions": [
    { "type": "TFNG", "q": "A statement to judge.", "answer": "True" },
    { "type": "MCQ", "q": "Question text?", "options": ["A","B","C"], "answer": 1 }
  ]
}
TFNG "answer" is exactly "True" | "False" | "Not Given". MCQ "answer" is the 0-based index. Mix TFNG and MCQ. Produce exactly the requested number of questions.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Chưa cấu hình ANTHROPIC_API_KEY." }, { status: 503 });
  }

  let body: { source?: string; kind?: string; count?: number; band?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ." }, { status: 400 });
  }
  const source = (body.source || "").trim();
  const kind = body.kind === "reading" ? "reading" : "listening";
  const count = Math.min(Math.max(Number(body.count) || 10, 4), 14);
  const band = body.band || "6.5–7.5";

  if (source.split(/\s+/).filter(Boolean).length < 60) {
    return NextResponse.json({ error: "Transcript/passage quá ngắn để sinh đề (cần ~60+ từ)." }, { status: 400 });
  }

  const shape = kind === "reading" ? READING_SHAPE : LISTENING_SHAPE;
  const system = `${TRAP_RULES}\n\nTarget difficulty: band ${band}. Generate ${count} questions for a ${kind} task.\n\n${shape}`;
  const userMsg = `SOURCE (${kind === "reading" ? "passage" : "audio transcript"}):\n"""\n${source.slice(0, 12000)}\n"""`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 3000, system, messages: [{ role: "user", content: userMsg }] }),
    });
    if (!resp.ok) {
      const detail = await resp.text();
      return NextResponse.json({ error: `Claude API lỗi (${resp.status}): ${detail.slice(0, 300)}` }, { status: 502 });
    }
    const data = await resp.json();
    const text: string = (data.content || []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n").trim();
    const clean = text.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      return NextResponse.json({ error: "Không phân tích được JSON kết quả. Thử lại.", raw: text.slice(0, 500) }, { status: 502 });
    }
    // chuẩn hóa nhẹ
    if (!parsed || !Array.isArray(parsed.questions)) {
      return NextResponse.json({ error: "Kết quả thiếu trường 'questions'." }, { status: 502 });
    }
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: "Lỗi mạng khi gọi Claude API: " + String(e) }, { status: 502 });
  }
}
