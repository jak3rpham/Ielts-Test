// src/app/api/yt-transcript/route.ts
// Lấy transcript của video YouTube qua Supadata. Server-side: SUPADATA_API_KEY giữ kín.
// Nếu không cấu hình key, trả lỗi rõ để admin dán transcript tay.
// LƯU Ý BẢN QUYỀN: transcript chỉ dùng làm INPUT để sinh câu hỏi gốc, KHÔNG hiển thị lại
// nguyên văn trong app; video được EMBED (không tải/host lại audio).

import { NextResponse } from "next/server";

export const runtime = "nodejs";

function extractVideoId(input: string): string | null {
  const s = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

export async function POST(req: Request) {
  const apiKey = process.env.SUPADATA_API_KEY;
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ." }, { status: 400 });
  }
  const videoId = extractVideoId(body.url || "");
  if (!videoId) {
    return NextResponse.json({ error: "Không nhận ra video ID từ link YouTube." }, { status: 400 });
  }
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chưa cấu hình SUPADATA_API_KEY — dán transcript thủ công vào ô bên dưới.", videoId },
      { status: 503 }
    );
  }

  try {
    const url = `https://api.supadata.ai/v1/youtube/transcript?videoId=${encodeURIComponent(videoId)}&text=true`;
    const resp = await fetch(url, { headers: { "x-api-key": apiKey } });
    if (!resp.ok) {
      const detail = await resp.text();
      return NextResponse.json({ error: `Supadata lỗi (${resp.status}): ${detail.slice(0, 200)}`, videoId }, { status: 502 });
    }
    const data = await resp.json();
    // Supadata trả { content: "..."} khi text=true; phòng trường hợp trả mảng segment.
    let transcript = "";
    if (typeof data.content === "string") transcript = data.content;
    else if (Array.isArray(data.content)) transcript = data.content.map((c: { text?: string }) => c.text || "").join(" ");
    else if (typeof data.transcript === "string") transcript = data.transcript;
    if (!transcript.trim()) {
      return NextResponse.json({ error: "Không lấy được transcript (video có thể không có phụ đề).", videoId }, { status: 422 });
    }
    return NextResponse.json({ transcript: transcript.trim(), videoId });
  } catch (e) {
    return NextResponse.json({ error: "Lỗi mạng khi gọi Supadata: " + String(e), videoId }, { status: 502 });
  }
}
