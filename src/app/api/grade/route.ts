// src/app/api/grade/route.ts
import { NextResponse } from "next/server";

// Chấm Writing Task 2 theo 4 tiêu chí IELTS. API key giữ KÍN ở server (không phải NEXT_PUBLIC).
// Cấu hình: ANTHROPIC_API_KEY (bắt buộc), ANTHROPIC_MODEL (tùy chọn, mặc định Sonnet 4.6).

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

const JSON_SHAPE = `Return ONLY valid JSON, no markdown, no backticks, in exactly this shape:
{
  "task_response": {"band": number, "comment": "string (1-2 sentences, in Vietnamese)"},
  "coherence": {"band": number, "comment": "string (in Vietnamese)"},
  "lexical": {"band": number, "comment": "string (in Vietnamese)"},
  "grammar": {"band": number, "comment": "string (in Vietnamese)"},
  "overall": number,
  "summary": "string — 2-3 sentences in Vietnamese, the single most useful thing to fix next",
  "corrections": [
    {"original": "exact phrase from essay", "better": "improved version", "why": "short reason in Vietnamese"}
  ]
}
Bands use 0.5 increments (e.g. 6.5). overall = rounded average of the four criteria to nearest 0.5. Give 3-5 corrections targeting the highest-impact errors.`;

const SYSTEM_T2 = `You are a certified IELTS examiner. Grade the candidate's Academic Writing Task 2 essay strictly against the official public band descriptors for the four criteria. The "task_response" field here represents Task Response (TR); also assess Coherence & Cohesion (CC), Lexical Resource (LR), and Grammatical Range & Accuracy (GRA).

A Task 2 answer must take a clear position, develop ideas with reasons/examples, and be at least ~250 words; penalise under-length and undeveloped arguments. Be honest and calibrated — do not inflate. A typical pre-7 essay has noticeable grammar errors and underdeveloped ideas. Reward only what is actually present.

${JSON_SHAPE}`;

const SYSTEM_T1 = `You are a certified IELTS examiner. Grade the candidate's Academic Writing Task 1 report strictly against the official public band descriptors. The "task_response" field here represents TASK ACHIEVEMENT (TA): did the candidate give an overview of the main trends, select and report key features accurately, and make relevant comparisons using the data provided — without inventing data or giving opinions? Also assess Coherence & Cohesion (CC), Lexical Resource (LR), and Grammatical Range & Accuracy (GRA).

A Task 1 answer must be a factual report of at least ~150 words with a clear overview; penalise missing overview, inaccurate figures, copied prompt wording, or personal opinion. Be honest and calibrated — do not inflate.

${JSON_SHAPE}`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chưa cấu hình ANTHROPIC_API_KEY. Thêm vào .env.local rồi khởi động lại (xem README)." },
      { status: 503 }
    );
  }

  let body: { prompt?: string; essay?: string; task?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ." }, { status: 400 });
  }
  const { prompt, essay } = body;
  const task = body.task === 1 ? 1 : 2;
  const minWords = task === 1 ? 30 : 40;
  if (!essay || essay.trim().split(/\s+/).length < minWords) {
    return NextResponse.json({ error: `Bài viết quá ngắn để chấm (cần ít nhất ~${minWords} từ).` }, { status: 400 });
  }

  const SYSTEM = task === 1 ? SYSTEM_T1 : SYSTEM_T2;
  const userMsg = `TASK ${task} PROMPT:\n${prompt || "(không cung cấp đề)"}\n\nCANDIDATE RESPONSE:\n${essay}`;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1500,
        system: SYSTEM,
        messages: [{ role: "user", content: userMsg }],
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      return NextResponse.json({ error: `Claude API lỗi (${resp.status}): ${detail.slice(0, 300)}` }, { status: 502 });
    }

    const data = await resp.json();
    const text: string = (data.content || [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();

    const clean = text.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      return NextResponse.json({ error: "Không phân tích được kết quả chấm. Thử lại.", raw: text.slice(0, 500) }, { status: 502 });
    }
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json({ error: "Lỗi mạng khi gọi Claude API: " + String(e) }, { status: 502 });
  }
}
