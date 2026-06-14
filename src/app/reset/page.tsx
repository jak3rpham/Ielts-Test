// src/app/reset/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";

export default function ResetPage() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState<{ type: "err" | "ok"; text: string } | null>(null);

  useEffect(() => {
    const sb = getSupabaseBrowser();
    if (!sb) { setReady(true); return; }
    sb.auth.getUser().then(({ data }) => {
      if (!data.user) setMsg({ type: "err", text: "Link không hợp lệ hoặc đã hết hạn. Mở lại email và bấm link mới nhất, hoặc gửi lại từ trang Đăng nhập → Quên mật khẩu." });
      setReady(true);
    });
  }, []);

  async function save() {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    if (pw.length < 6) { setMsg({ type: "err", text: "Mật khẩu cần ít nhất 6 ký tự." }); return; }
    if (pw !== pw2) { setMsg({ type: "err", text: "Hai ô mật khẩu chưa khớp." }); return; }
    setBusy(true); setMsg(null);
    const { error } = await sb.auth.updateUser({ password: pw });
    if (error) { setMsg({ type: "err", text: error.message }); setBusy(false); return; }
    setMsg({ type: "ok", text: "Đã đổi mật khẩu. Đang chuyển về trang chủ…" });
    setTimeout(() => window.location.assign("/"), 1200);
  }

  return (
    <section style={{ maxWidth: 460 }}>
      <div className="sec-head"><span className="eyebrow">Tài khoản</span><h2>Đặt mật khẩu mới</h2></div>
      {!supabaseEnabled ? (
        <div className="card"><p style={{ fontSize: 14, color: "var(--ink-soft)" }}>Cần bật Supabase.</p></div>
      ) : !ready ? (
        <div className="card"><p>Đang kiểm tra link…</p></div>
      ) : (
        <div className="card">
          <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>Mật khẩu mới</label>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="ít nhất 6 ký tự"
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, margin: "4px 0 12px", fontFamily: "var(--body)" }} />
          <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>Nhập lại mật khẩu</label>
          <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="nhập lại"
            onKeyDown={(e) => { if (e.key === "Enter") save(); }}
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, margin: "4px 0 14px", fontFamily: "var(--body)" }} />
          <button className="btn" style={{ width: "100%" }} onClick={save} disabled={busy || !pw || !pw2}>{busy ? "Đang lưu…" : "Đổi mật khẩu"}</button>
          {msg && (msg.type === "err"
            ? <div className="vmis" style={{ marginTop: 12 }}>{msg.text}</div>
            : <div className="note" style={{ marginTop: 12 }}>{msg.text}</div>)}
        </div>
      )}
    </section>
  );
}
