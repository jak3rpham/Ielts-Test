// src/lib/mockHistory.ts
"use client";
import { getSupabaseBrowser } from "./supabase/client";

export interface MockAttempt {
  id?: string;
  test_id: string;
  reading_band: number | null;
  listening_band: number | null;
  writing_band: number | null;
  overall_band: number | null;
  reading_correct: number;
  reading_total: number;
  listening_correct: number;
  listening_total: number;
  created_at: string;
}

const LS_KEY = "ielts_mock_attempts_v1";
const LAST_KEY = "ielts_mock_last_test"; // để "mỗi lần một đề khác"

export function getLastTestId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}
export function setLastTestId(id: string) {
  try {
    localStorage.setItem(LAST_KEY, id);
  } catch {
    /* ignore */
  }
}

function readLocal(): MockAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLocal(list: MockAttempt[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, 50)));
  } catch {
    /* quota */
  }
}

/** Lưu một lần thi. Trả về { saved, where }. */
export async function saveMockAttempt(
  a: Omit<MockAttempt, "created_at" | "id">
): Promise<{ saved: boolean; where: "supabase" | "local" }> {
  const attempt: MockAttempt = { ...a, created_at: new Date().toISOString() };
  setLastTestId(a.test_id);

  const sb = getSupabaseBrowser();
  if (sb) {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (user) {
      const { error } = await sb.from("mock_attempts").insert({
        user_id: user.id,
        test_id: attempt.test_id,
        reading_band: attempt.reading_band,
        listening_band: attempt.listening_band,
        writing_band: attempt.writing_band,
        overall_band: attempt.overall_band,
        reading_correct: attempt.reading_correct,
        reading_total: attempt.reading_total,
        listening_correct: attempt.listening_correct,
        listening_total: attempt.listening_total,
      });
      if (!error) return { saved: true, where: "supabase" };
      // nếu lỗi (vd chưa tạo bảng) -> rơi xuống local cho chắc
    }
  }
  const list = readLocal();
  list.unshift(attempt);
  writeLocal(list);
  return { saved: true, where: "local" };
}

/** Đọc lịch sử (Supabase nếu đăng nhập, ngược lại localStorage). */
export async function loadMockAttempts(): Promise<{ attempts: MockAttempt[]; signedIn: boolean }> {
  const sb = getSupabaseBrowser();
  if (sb) {
    const {
      data: { user },
    } = await sb.auth.getUser();
    if (user) {
      const { data } = await sb
        .from("mock_attempts")
        .select("id, test_id, reading_band, listening_band, writing_band, overall_band, reading_correct, reading_total, listening_correct, listening_total, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      return { attempts: (data || []) as MockAttempt[], signedIn: true };
    }
  }
  return { attempts: readLocal(), signedIn: false };
}
