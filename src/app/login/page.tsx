// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "err" | "ok"; text: string } | null>(null);

  function friendly(raw: string): string {
    const m = raw.toLowerCase();
    if (m.includes("invalid login")) return "Email hoặc mật khẩu không đúng.";
    if (m.includes("already registered") || m.includes("already been registered")) return "Email này đã có tài khoản — chuyển sang Đăng nhập.";
    if (m.includes("at least 6")) return "Mật khẩu cần ít nhất 6 ký tự.";
    if (m.includes("email not confirmed")) return "Email chưa được xác nhận. Kiểm tra hộp thư, hoặc tắt 'Confirm email' trong Supabase.";
    return raw;
  }

  async function google() {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    setBusy(true); setMsg(null);
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setMsg({ type: "err", text: friendly(error.message) }); setBusy(false); }
  }

  async function submit() {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    setBusy(true); setMsg(null);

    if (mode === "forgot") {
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset`,
      });
      if (error) { setMsg({ type: "err", text: friendly(error.message) }); setBusy(false); return; }
      setMsg({ type: "ok", text: "Đã gửi link đặt lại mật khẩu (nếu email tồn tại). Mở mail, bấm link, rồi đặt mật khẩu mới." });
      setBusy(false);
      return;
    }

    if (mode === "signup") {
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) { setMsg({ type: "err", text: friendly(error.message) }); setBusy(false); return; }
      if (data.session) { window.location.assign("/"); return; }
      setMsg({ type: "ok", text: "Đã tạo tài khoản. Nếu Supabase bật xác nhận email, hãy kiểm tra hộp thư; nếu đã tắt thì bấm Đăng nhập." });
      setBusy(false);
      return;
    }

    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) { setMsg({ type: "err", text: friendly(error.message) }); setBusy(false); return; }
    window.location.assign("/");
  }

  const title = mode === "signin" ? "Đăng nhập" : mode === "signup" ? "Đăng ký" : "Quên mật khẩu";

  return (
    <section style={{ maxWidth: 460 }}>
      <div className="sec-head">
        <span className="eyebrow">Tài khoản</span>
        <h2>{title}</h2>
      </div>

      {!supabaseEnabled ? (
        <div className="card">
          <h3>Chưa bật chế độ nhiều người dùng</h3>
          <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>
            App đang chạy ở chế độ localStorage — tiến độ lưu trên máy này, không cần đăng nhập. Để bật, điền <code>NEXT_PUBLIC_SUPABASE_URL</code> và <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> trong <code>.env.local</code>.
          </p>
        </div>
      ) : (
        <div className="card">
          <button className="btn ghost" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }} onClick={google} disabled={busy}>
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.6 6.1 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.6 6.1 29 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C40.9 36.4 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
            Đăng nhập với Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0", color: "var(--ink-soft)", fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} /> hoặc dùng email <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>

          {mode !== "forgot" && (
            <div className="chips" style={{ marginBottom: 14 }}>
              <button className={"chip" + (mode === "signin" ? " active" : "")} onClick={() => { setMode("signin"); setMsg(null); }}>Đăng nhập</button>
              <button className={"chip" + (mode === "signup" ? " active" : "")} onClick={() => { setMode("signup"); setMsg(null); }}>Đăng ký</button>
            </div>
          )}

          <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@email.com"
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, margin: "4px 0 12px", fontFamily: "var(--body)" }} />

          {mode !== "forgot" && (
            <>
              <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>Mật khẩu</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ít nhất 6 ký tự"
                onKeyDown={(e) => { if (e.key === "Enter" && email && password) submit(); }}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, margin: "4px 0 6px", fontFamily: "var(--body)" }} />
              {mode === "signin" && (
                <div style={{ textAlign: "right", marginBottom: 12 }}>
                  <button onClick={() => { setMode("forgot"); setMsg(null); }} style={{ background: "none", border: "none", color: "var(--amber-deep)", cursor: "pointer", padding: 0, font: "inherit", fontSize: 12.5, textDecoration: "underline" }}>Quên mật khẩu?</button>
                </div>
              )}
            </>
          )}

          <button className="btn" style={{ width: "100%", marginTop: mode === "forgot" ? 4 : 0 }} onClick={submit} disabled={busy || !email || (mode !== "forgot" && !password)}>
            {busy ? "Đang xử lý…" : mode === "signin" ? "Đăng nhập" : mode === "signup" ? "Tạo tài khoản" : "Gửi link đặt lại"}
          </button>

          {msg && (msg.type === "err"
            ? <div className="vmis" style={{ marginTop: 12 }}>{msg.text}</div>
            : <div className="note" style={{ marginTop: 12 }}>{msg.text}</div>)}

          {mode === "forgot" && (
            <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 14 }}>
              <button onClick={() => { setMode("signin"); setMsg(null); }} style={{ background: "none", border: "none", color: "var(--amber-deep)", cursor: "pointer", padding: 0, font: "inherit", textDecoration: "underline" }}>← Quay lại đăng nhập</button>
            </p>
          )}
        </div>
      )}
    </section>
  );
}
