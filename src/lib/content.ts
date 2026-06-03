// src/lib/content.ts
"use client";
import { useState, useEffect } from "react";
import { getSupabaseBrowser } from "./supabase/client";

// Trả về fallback (đề trong file) ngay lập tức, rồi nối thêm đề lưu trên Supabase (nếu có).
export function useContent<T>(type: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const sb = getSupabaseBrowser();
    if (!sb) {
      setLoading(false);
      return;
    }
    sb.from("content")
      .select("payload")
      .eq("type", type)
      .eq("published", true)
      .order("created_at", { ascending: true })
      .then(({ data }: { data: { payload: T }[] | null }) => {
        if (!active) return;
        const extra = (data || []).map((r) => r.payload);
        setItems([...fallback, ...extra]);
        setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return { items, loading };
}
