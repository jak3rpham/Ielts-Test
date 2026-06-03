// src/lib/supabase/client.ts
"use client";
import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Nếu chưa cấu hình env -> trả về null. App sẽ tự fallback sang localStorage.
export const supabaseEnabled = Boolean(url && key);

export function getSupabaseBrowser() {
  if (!supabaseEnabled) return null;
  return createBrowserClient(url!, key!);
}
