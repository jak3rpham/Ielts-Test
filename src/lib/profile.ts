// src/lib/profile.ts
"use client";
import { getSupabaseBrowser } from "./supabase/client";

export async function getMyProfile(): Promise<{ userId: string; displayName: string | null; email: string | null } | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb.from("profiles").select("display_name").eq("id", user.id).maybeSingle();
  return { userId: user.id, displayName: data?.display_name ?? null, email: user.email ?? null };
}

// Đảm bảo có 1 dòng profile (để hiện trên leaderboard); mặc định lấy phần trước @ của email.
export async function ensureProfile(): Promise<string | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb.from("profiles").select("display_name").eq("id", user.id).maybeSingle();
  if (data?.display_name) return data.display_name;
  const fallback = (user.email || "user").split("@")[0].slice(0, 40);
  await sb.from("profiles").upsert({ id: user.id, display_name: fallback });
  return fallback;
}

export async function setDisplayName(name: string): Promise<boolean> {
  const sb = getSupabaseBrowser();
  if (!sb) return false;
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return false;
  const clean = name.trim().slice(0, 40);
  if (!clean) return false;
  const { error } = await sb.from("profiles").upsert({ id: user.id, display_name: clean });
  return !error;
}
