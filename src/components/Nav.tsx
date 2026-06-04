// src/components/Nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";

const TABS = [
  { href: "/", num: "00", label: "Tổng quan" },
  { href: "/grammar", num: "01", label: "Ngữ pháp" },
  { href: "/vocab", num: "02", label: "Từ vựng" },
  { href: "/frameworks", num: "03", label: "Cấu trúc" },
  { href: "/tips", num: "04", label: "Mẹo" },
  { href: "/listening", num: "05", label: "Listening" },
  { href: "/reading", num: "06", label: "Reading" },
  { href: "/writing", num: "07", label: "Writing" },
  { href: "/speaking", num: "08", label: "Speaking" },
];

export default function Nav() {
  const path = usePathname();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    sb.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  return (
    <>
      <header className="masthead">
        <div className="mast-row">
          <div className="brand">
            <h1>
              IELTS <em>Studio</em>
            </h1>
          </div>
          <div className="authbar">
            {!supabaseEnabled ? (
              <>
                <span className="dot off" /> Chế độ localStorage
              </>
            ) : email ? (
              <>
                <span className="dot on" /> {email}
                <Link href="/admin" className="btn sm ghost" style={{ marginLeft: 4 }}>Admin</Link>
              </>
            ) : (
              <Link href="/login" className="btn sm">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>
      <nav className="tabs">
        <div className="tabs-inner">
          {TABS.map((t) => {
            const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
            return (
              <Link key={t.href} href={t.href} className={"tab" + (active ? " active" : "")}>
                <span className="num">{t.num}</span>
                {t.label}
              </Link>
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
