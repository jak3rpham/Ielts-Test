// src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";
  if (code) {
    const sb = await getSupabaseServer();
    if (sb) await sb.auth.exchangeCodeForSession(code);
  }
  const safeNext = next.startsWith("/") ? next : "/";
  return NextResponse.redirect(origin + safeNext);
}
