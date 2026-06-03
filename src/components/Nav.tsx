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
  { href: "/listening", num: "03", label: "Listening" },
  { href: "/reading", num: "04", label: "Reading" },
  { href: "/writing", num: "05", label: "Writing T2" },
  { href: "/speaking", num: "06", label: "Speaking" },
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
    </>
  );
}
