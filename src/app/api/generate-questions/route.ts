// src/app/api/generate-questions/route.ts
// Sinh câu hỏi IELTS GỐC từ transcript (listening) hoặc passage (reading).
// - Reading: theo PART (1/2/3), khóa số câu + dạng đề chuẩn, P3 khó nhất.
// - Listening: từ transcript đầy đủ 1 video -> tách 4 SECTION theo mốc trong script -> 40 câu.
// KHÔNG sao chép câu hỏi có sẵn; chỉ dùng nguồn làm input. Server-side: key giữ kín.

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/requireAuth";

export const runtime = "nodejs";
// Generate có thể dùng model mạnh hơn (vd Opus) để bẫy tinh vi hơn — đặt GENERATE_MODEL.
const MODEL = process.env.GENERATE_MODEL || process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

const TRAP_RULES = `You are a senior IELTS item-writer. From the SOURCE provided, write ORIGINAL exam questions. NEVER copy questions that may already exist in the source; invent new ones testing the same material.

Questions MUST mimic genuine IELTS difficulty and train reflexes against classic traps. Apply ALL of these:
1. PARAPHRASE THE ANSWER. The correct option/answer must NOT reuse the exact keywords from the source — use synonyms/restructured grammar so keyword-spotting fails. WRONG options MAY contain words lifted from the source — that is the bait.
2. DISTRACTORS = PLAUSIBLE MISREADINGS: a detail that IS in the source but answers a different question; a half-true statement; an overgeneralisation; a number/name that appears nearby but is not the one asked.
3. CORRECTION/DISTRACTION TRAPS (listening): where a speaker states then revises ("Tuesday — sorry, Wednesday") or gives several figures, make the obvious-sounding answer the discarded one.
4. NOT GIVEN vs FALSE/NO: include statements that are NOT GIVEN (source neither confirms nor contradicts) AND statements that are FALSE/NO (source contradicts). Make NOT GIVEN genuinely require distinguishing "no information" from "contradicted" — not obviously off-topic.
5. NO OUTSIDE-KNOWLEDGE answers: every item answerable ONLY from the source.
6. ORDER: items roughly follow the order info appears in the source.
7. GAP-FILL (listening): answer is 1–3 words verbatim from audio; pick spots where a similar-sounding word, a different number, or plural/singular is a realistic mistake.`;

// ---- Dạng đề cho READING ----
function readingShape(part: number, count: number): string {
  const typeGuide =
    part === 1
      ? `Use a MIX of: TFNG (True/False/Not Given) and MCQ. Aim ~7 TFNG + ~6 MCQ. Difficulty: easier (Part 1).`
      : part === 2
      ? `Use a MIX of: TFNG, YNG (Yes/No/Not Given — for opinion/claim statements), MCQ, and ONE Matching Headings block (3–5 MH items). Difficulty: medium.`
      : `Use a MIX of: YNG, MCQ (subtle), and ONE Matching Headings block (4–6 MH items). Few or no plain TFNG. Difficulty: hardest (Part 3) — most paraphrase, tightest distractors.`;
  return `This is READING Part ${part}. Generate EXACTLY ${count} questions. ${typeGuide}

For MATCHING HEADINGS (type "MH"): pick a set of headings (one per relevant paragraph plus 1–2 extra distractor headings). For EACH MH item: "q" = "Paragraph N" (N = 1-based index of the paragraph in the passage), "options" = the FULL shared heading list (identical array on every MH item in the block), "answer" = 0-based index of the correct heading.

Return ONLY valid JSON (no markdown/backticks):
{
  "title": "neutral passage title you write yourself",
  "questions": [
    { "type": "TFNG", "q": "statement", "answer": "True" },
    { "type": "YNG", "q": "statement reflecting a claim", "answer": "Yes" },
    { "type": "MCQ", "q": "question?", "options": ["A","B","C","D"], "answer": 1 },
    { "type": "MH", "q": "Paragraph 2", "options": ["Heading i","Heading ii","Heading iii","Heading iv"], "answer": 2 }
  ]
}
TFNG answer ∈ "True"|"False"|"Not Given". YNG answer ∈ "Yes"|"No"|"Not Given". MCQ/MH answer = 0-based index. Produce EXACTLY ${count} items total.`;
}

// ---- Dạng đề cho LISTENING (full test) ----
const LISTENING_SHAPE = `This is a FULL LISTENING TEST from one video transcript. The transcript covers 4 SECTIONS in order (Section 1: everyday transactional conversation; 2: everyday monologue; 3: academic discussion; 4: academic lecture). Split the transcript into these 4 sections following any part/section markers in the script; if unmarked, split by topic shifts into 4 roughly equal parts.

Generate EXACTLY 10 questions per section = 40 total. Per section use a MIX of GAP (note/form/sentence completion, 1–3 words verbatim), MCQ, and (sections 2–3) one MATCH block. For MATCH (type "MATCH"): "options" = full shared list, "answer" = 0-based index.

Return ONLY valid JSON (no markdown/backticks):
{
  "sections": [
    { "title": "Section 1 — neutral title you write", "questions": [
      { "type": "GAP", "q": "The deposit is ___ pounds.", "answer": "fifty" },
      { "type": "MCQ", "q": "question?", "options": ["A","B","C"], "answer": 0 }
    ] }
  ]
}
EXACTLY 4 sections, EXACTLY 10 questions each (40 total).`;

export async function POST(req: Request) {
  const auth = await requireUser();
  if (auth instanceof NextResponse) return auth;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Chưa cấu hình ANTHROPIC_API_KEY." }, { status: 503 });

  let body: { source?: string; kind?: string; part?: number; band?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Body không hợp lệ." }, { status: 400 }); }

  const source = (body.source || "").trim();
  const kind = body.kind === "reading" ? "reading" : "listening";
  const band = body.band || "6.5–7.5";
  if (source.split(/\s+/).filter(Boolean).length < 60) {
    return NextResponse.json({ error: "Transcript/passage quá ngắn (cần ~60+ từ)." }, { status: 400 });
  }

  let shape: string;
  let maxTokens: number;
  if (kind === "reading") {
    const part = body.part === 2 ? 2 : body.part === 3 ? 3 : 1;
    const count = part === 3 ? 14 : 13;
    shape = readingShape(part, count);
    maxTokens = 4000;
  } else {
    shape = LISTENING_SHAPE;
    maxTokens = 8000; // 40 câu + options -> cần nhiều token
  }

  const system = `${TRAP_RULES}\n\nTarget difficulty: band ${band}. Higher band = subtler paraphrase, tighter distractors, more NG/correction traps.\n\n${shape}`;
  const userMsg = `SOURCE (${kind === "reading" ? "passage" : "full audio transcript"}):\n"""\n${source.slice(0, 16000)}\n"""`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content: userMsg }] }),
    });
    if (!resp.ok) {
      const detail = await resp.text();
      return NextResponse.json({ error: `Claude API lỗi (${resp.status}): ${detail.slice(0, 300)}` }, { status: 502 });
    }
    const data = await resp.json();
    const text: string = (data.content || []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n").trim();
    const clean = text.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
    let parsed;
    try { parsed = JSON.parse(clean); }
    catch { return NextResponse.json({ error: "Không phân tích được JSON. Thử lại.", raw: text.slice(0, 500) }, { status: 502 }); }

    if (kind === "reading" && !Array.isArray(parsed?.questions)) {
      return NextResponse.json({ error: "Kết quả thiếu 'questions'." }, { status: 502 });
    }
    if (kind === "listening" && !Array.isArray(parsed?.sections)) {
      return NextResponse.json({ error: "Kết quả thiếu 'sections'." }, { status: 502 });
    }
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: "Lỗi mạng khi gọi Claude API: " + String(e) }, { status: 502 });
  }
}
