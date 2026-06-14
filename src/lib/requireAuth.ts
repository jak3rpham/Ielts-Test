// src/lib/requireAuth.ts
// Guard server-side cho các API tốn tiền (generate, transcript).
// Chỉ request có session đăng nhập hợp lệ mới qua. Trả null nếu OK, hoặc Response 401.
import { NextResponse } from "next/server";
import { getSupabaseServer } from "./supabase/server";

export async function requireUser(): Promise<{ userId: string } | NextResponse> {
  const sb = await getSupabaseServer();
  if (!sb) {
    // Supabase chưa cấu hình -> không thể xác thực -> chặn cho an toàn.
    return NextResponse.json({ error: "Cần đăng nhập (Supabase chưa cấu hình)." }, { status: 401 });
  }
  const { data: { user } } = await sb.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Cần đăng nhập để dùng chức năng này." }, { status: 401 });
  }
  return { userId: user.id };
}
