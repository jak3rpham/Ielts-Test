// src/components/Nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";

const GROUPS: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: "Kiến thức",
    items: [
      { href: "/qtypes", label: "Dạng đề" },
      { href: "/grammar", label: "Ngữ pháp" },
      { href: "/vocab", label: "Từ vựng" },
      { href: "/frameworks", label: "Cấu trúc" },
      { href: "/tips", label: "Mẹo" },
    ],
  },
  {
    label: "Luyện đề",
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
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  // đóng menu khi chuyển trang
  useEffect(() => { setOpen(null); }, [path]);

  // đóng menu khi bấm ra ngoài
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const inGroup = (items: { href: string }[]) => items.some((i) => path.startsWith(i.href));

  return (
    <>
      <header className="masthead">
        <div className="mast-row">
          <div className="brand"><h1>IELTS <em>Studio</em></h1></div>
          <div className="authbar">
            {!supabaseEnabled ? (
              <><span className="dot off" /> Chế độ localStorage</>
            ) : email ? (
              <><span className="dot on" /> {email}<Link href="/admin" className="btn sm ghost" style={{ marginLeft: 4 }}>Admin</Link></>
            ) : (
              <Link href="/login" className="btn sm">Đăng nhập</Link>
            )}
          </div>
        </div>
      </header>

      <nav className="tabs" ref={navRef}>
        <div className="tabs-inner" style={{ alignItems: "stretch" }}>
          <Link href="/" className={"tab" + (path === "/" ? " active" : "")}>
            <span className="num">00</span>Tổng quan
          </Link>

          {GROUPS.map((g) => {
            const isOpen = open === g.label;
            const active = inGroup(g.items);
            return (
              <div key={g.label} style={{ position: "relative", display: "flex" }}>
                <button
                  className={"tab" + (active ? " active" : "")}
                  onClick={() => setOpen(isOpen ? null : g.label)}
                  style={{ cursor: "pointer", background: "none", border: "none", font: "inherit" }}
                  aria-expanded={isOpen}
                >
                  {g.label}
                  <span style={{ marginLeft: 6, fontSize: 10, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }}>▾</span>
                </button>

                {isOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, zIndex: 50, minWidth: 190,
                    background: "var(--paper, #fffdf8)", border: "1.5px solid var(--line)", borderRadius: 12,
                    boxShadow: "0 14px 34px rgba(60,40,10,.16)", padding: 6, marginTop: 4,
                  }}>
                    {g.items.map((it) => {
                      const a = path.startsWith(it.href);
                      return (
                        <Link key={it.href} href={it.href} onClick={() => setOpen(null)}
                          style={{
                            display: "block", padding: "9px 12px", borderRadius: 8, fontSize: 14,
                            textDecoration: "none", color: a ? "var(--amber-deep)" : "var(--ink)",
                            fontWeight: a ? 700 : 500, background: a ? "var(--amber-soft)" : "transparent",
                          }}>
                          {it.label}
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
          <span>💡 Đăng nhập để lưu tiến độ và đồng bộ trên mọi thiết bị (không bắt buộc).</span>
          <Link href="/login" className="btn sm">Đăng nhập</Link>
        </div>
      )}
    </>
  );
}
