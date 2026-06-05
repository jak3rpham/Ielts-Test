// src/components/Nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";
import { useLang, pick } from "@/lib/i18n";
import type { LS } from "@/data/types";

const GROUPS: { label: LS; items: { href: string; label: string }[] }[] = [
  {
    label: { vi: "Kiến thức", en: "Knowledge" },
    items: [
      { href: "/qtypes", label: "Dạng đề / Question types" },
      { href: "/grammar", label: "Ngữ pháp / Grammar" },
      { href: "/vocab", label: "Từ vựng / Vocabulary" },
      { href: "/frameworks", label: "Cấu trúc / Frameworks" },
      { href: "/tips", label: "Mẹo / Tips" },
    ],
  },
  {
    label: { vi: "Luyện đề", en: "Practice" },
    items: [
      { href: "/listening", label: "Listening" },
      { href: "/reading", label: "Reading" },
      { href: "/writing", label: "Writing" },
      { href: "/speaking", label: "Speaking" },
    ],
  },
];

export default function Nav() {
  const path = usePathname();
  const { lang, setLang } = useLang();
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  useEffect(() => { setOpen(null); }, [path]);
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const inGroup = (items: { href: string }[]) => items.some((i) => path.startsWith(i.href));

  const LangToggle = () => (
    <div style={{ display: "inline-flex", border: "1.5px solid var(--line)", borderRadius: 999, overflow: "hidden", marginRight: 10 }}>
      {(["vi", "en"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)}
          style={{
            padding: "4px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none",
            fontFamily: "var(--mono)", letterSpacing: ".04em",
            background: lang === l ? "var(--amber-deep)" : "transparent",
            color: lang === l ? "#fff" : "var(--ink-soft)",
          }}>
          {l === "vi" ? "VN" : "EN"}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header className="masthead">
        <div className="mast-row">
          <div className="brand"><h1>IELTS <em>Studio</em></h1></div>
          <div className="authbar">
            <LangToggle />
            {!supabaseEnabled ? (
              <><span className="dot off" /> {pick(lang, { vi: "Chế độ localStorage", en: "localStorage mode" })}</>
            ) : email ? (
              <><span className="dot on" /> {email}<Link href="/admin" className="btn sm ghost" style={{ marginLeft: 4 }}>Admin</Link></>
            ) : (
              <Link href="/login" className="btn sm">{pick(lang, { vi: "Đăng nhập", en: "Sign in" })}</Link>
            )}
          </div>
        </div>
      </header>

      <nav className="tabs" ref={navRef}>
        <div className="tabs-inner" style={{ alignItems: "stretch" }}>
          <Link href="/" className={"tab" + (path === "/" ? " active" : "")}>
            <span className="num">00</span>{pick(lang, { vi: "Tổng quan", en: "Overview" })}
          </Link>

          {GROUPS.map((g) => {
            const isOpen = open === pick(lang, g.label);
            const active = inGroup(g.items);
            const key = typeof g.label === "string" ? g.label : g.label.vi;
            return (
              <div key={key} style={{ position: "relative", display: "flex" }}>
                <button
                  className={"tab" + (active ? " active" : "")}
                  onClick={() => setOpen(isOpen ? null : pick(lang, g.label))}
                  style={{ cursor: "pointer", background: "none", border: "none", font: "inherit" }}
                  aria-expanded={isOpen}
                >
                  {pick(lang, g.label)}
                  <span style={{ marginLeft: 6, fontSize: 10, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }}>▾</span>
                </button>

                {isOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, zIndex: 50, minWidth: 210,
                    background: "var(--paper, #fffdf8)", border: "1.5px solid var(--line)", borderRadius: 12,
                    boxShadow: "0 14px 34px rgba(60,40,10,.16)", padding: 6, marginTop: 4,
                  }}>
                    {g.items.map((it) => {
                      const a = path.startsWith(it.href);
                      const [vi, en] = it.label.split(" / ");
                      const lbl = en ? pick(lang, { vi, en }) : it.label;
                      return (
                        <Link key={it.href} href={it.href} onClick={() => setOpen(null)}
                          style={{
                            display: "block", padding: "9px 12px", borderRadius: 8, fontSize: 14,
                            textDecoration: "none", color: a ? "var(--amber-deep)" : "var(--ink)",
                            fontWeight: a ? 700 : 500, background: a ? "var(--amber-soft)" : "transparent",
                          }}>
                          {lbl}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {supabaseEnabled && !email && path !== "/login" && (
        <div style={{ background: "var(--amber-soft)", borderBottom: "1.5px solid var(--line)", padding: "9px 24px", fontSize: 13, color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <span>💡 {pick(lang, { vi: "Đăng nhập để lưu tiến độ và đồng bộ trên mọi thiết bị (không bắt buộc).", en: "Sign in to save your progress across devices (optional)." })}</span>
          <Link href="/login" className="btn sm">{pick(lang, { vi: "Đăng nhập", en: "Sign in" })}</Link>
        </div>
      )}
    </>
  );
}
