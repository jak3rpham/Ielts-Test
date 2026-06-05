// src/lib/i18n.tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { LS } from "@/data/types";

export type Lang = "vi" | "en";

export function pick(lang: Lang, v: LS): string {
  if (typeof v === "string") return v;
  return lang === "en" ? (v.en ?? v.vi) : v.vi;
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "vi", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    try {
      const s = localStorage.getItem("ielts-lang");
      if (s === "vi" || s === "en") setLangState(s);
    } catch {}
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try { localStorage.setItem("ielts-lang", l); } catch {}
    try { document.documentElement.lang = l; } catch {}
  }

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
