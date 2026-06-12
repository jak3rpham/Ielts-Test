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
    // Endpoint universal mới (cũ /youtube/transcript đã deprecated).
    // mode=auto: có phụ đề thì lấy, không thì Supadata tự tạo bằng AI.
    const u = new URL("https://api.supadata.ai/v1/transcript");
    u.searchParams.set("url", body.url || "");
    u.searchParams.set("text", "true");
    u.searchParams.set("mode", "auto");
    u.searchParams.set("lang", "en");
    const resp = await fetch(u.toString(), { headers: { "x-api-key": apiKey } });
    if (resp.status === 202) {
      return NextResponse.json(
        { error: "Video dài — Supadata xử lý bất đồng bộ. Thử video ngắn hơn hoặc dán transcript tay.", videoId },
        { status: 202 }
      );
    }
    if (!resp.ok) {
      const detail = await resp.text();
      return NextResponse.json({ error: `Supadata lỗi (${resp.status}): ${detail.slice(0, 200)}`, videoId }, { status: 502 });
    }
    const data = await resp.json();
    // text=true -> { content: "..." }; phòng khi trả mảng segment.
    let transcript = "";
    if (typeof data.content === "string") transcript = data.content;
    else if (Array.isArray(data.content)) transcript = data.content.map((c: { text?: string }) => c.text || "").join(" ");
    else if (typeof data.transcript === "string") transcript = data.transcript;
    if (!transcript.trim()) {
      return NextResponse.json({ error: "Không lấy được transcript (video có thể không truy cập được).", videoId }, { status: 422 });
    }
    return NextResponse.json({ transcript: transcript.trim(), videoId });
  } catch (e) {
    return NextResponse.json({ error: "Lỗi mạng khi gọi Supadata: " + String(e), videoId }, { status: 502 });
  }
}
