// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
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

  async function submit() {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    setBusy(true);
    setMsg(null);

    if (mode === "signup") {
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) { setMsg({ type: "err", text: friendly(error.message) }); setBusy(false); return; }
      if (data.session) { window.location.assign("/"); return; } // đăng nhập luôn (đã tắt confirm email)
      setMsg({ type: "ok", text: "Đã tạo tài khoản. Nếu Supabase bật xác nhận email, hãy kiểm tra hộp thư; nếu đã tắt thì bấm Đăng nhập." });
      setBusy(false);
      return;
    }

    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) { setMsg({ type: "err", text: friendly(error.message) }); setBusy(false); return; }
    window.location.assign("/");
  }

  return (
    <section style={{ maxWidth: 460 }}>
      <div className="sec-head">
        <span className="eyebrow">Tài khoản</span>
        <h2>{mode === "signin" ? "Đăng nhập" : "Đăng ký"}</h2>
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
          <div className="chips" style={{ marginBottom: 14 }}>
            <button className={"chip" + (mode === "signin" ? " active" : "")} onClick={() => { setMode("signin"); setMsg(null); }}>Đăng nhập</button>
            <button className={"chip" + (mode === "signup" ? " active" : "")} onClick={() => { setMode("signup"); setMsg(null); }}>Đăng ký</button>
          </div>

          <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@email.com"
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, margin: "4px 0 12px", fontFamily: "var(--body)" }} />

          <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>Mật khẩu</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ít nhất 6 ký tự"
            onKeyDown={(e) => { if (e.key === "Enter" && email && password) submit(); }}
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, margin: "4px 0 14px", fontFamily: "var(--body)" }} />

          <button className="btn" style={{ width: "100%" }} onClick={submit} disabled={busy || !email || !password}>
            {busy ? "Đang xử lý…" : mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}
          </button>

          {msg && (msg.type === "err"
            ? <div className="vmis" style={{ marginTop: 12 }}>{msg.text}</div>
            : <div className="note" style={{ marginTop: 12 }}>{msg.text}</div>)}

          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 14 }}>
            {mode === "signin"
              ? <>Chưa có tài khoản? <button onClick={() => { setMode("signup"); setMsg(null); }} style={{ background: "none", border: "none", color: "var(--amber-deep)", cursor: "pointer", padding: 0, font: "inherit", textDecoration: "underline" }}>Đăng ký</button></>
              : <>Đã có tài khoản? <button onClick={() => { setMode("signin"); setMsg(null); }} style={{ background: "none", border: "none", color: "var(--amber-deep)", cursor: "pointer", padding: 0, font: "inherit", textDecoration: "underline" }}>Đăng nhập</button></>}
          </p>
        </div>
      )}
    </section>
  );
}

