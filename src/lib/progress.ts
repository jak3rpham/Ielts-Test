// src/lib/progress.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "./supabase/client";

// Tiến độ là map { itemId: số lần đúng / trạng thái }.
// Bảng Supabase: user_progress(user_id, item_id, state jsonb, updated_at)

export type ProgressMap = Record<string, unknown>;
const LS_KEY = "ielts_progress_v1";

function readLocal(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeLocal(map: ProgressMap) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(map));
  } catch {
    /* quota / private mode */
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Tải lần đầu
  useEffect(() => {
    let active = true;
    (async () => {
      const sb = getSupabaseBrowser();
      if (sb) {
        const { data: { user } } = await sb.auth.getUser();
        if (user && active) {
          setUserId(user.id);
          const { data } = await sb
            .from("user_progress")
            .select("item_id, state")
            .eq("user_id", user.id);
          const map: ProgressMap = {};
          (data || []).forEach((r: { item_id: string; state: unknown }) => {
            map[r.item_id] = r.state;
          });
          if (active) {
            setProgress(map);
            setLoading(false);
          }
          return;
        }
      }
      // fallback localStorage
      if (active) {
        setProgress(readLocal());
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const update = useCallback(
    async (itemId: string, state: unknown) => {
      setProgress((prev) => {
        const next = { ...prev, [itemId]: state };
        if (!userId) writeLocal(next);
        return next;
      });
      if (userId) {
        const sb = getSupabaseBrowser();
        if (sb) {
          await sb
            .from("user_progress")
            .upsert(
              { user_id: userId, item_id: itemId, state, updated_at: new Date().toISOString() },
              { onConflict: "user_id,item_id" }
            );
        }
      }
    },
    [userId]
  );

  return { progress, update, loading, signedIn: Boolean(userId), supabaseEnabled };
}
