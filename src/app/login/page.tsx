// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send() {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    setStatus("sending");
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
      },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <section style={{ maxWidth: 460 }}>
      <div className="sec-head">
        <span className="eyebrow">Tài khoản</span>
        <h2>Đăng nhập</h2>
      </div>

      {!supabaseEnabled ? (
        <div className="card">
          <h3>Chưa bật chế độ nhiều người dùng</h3>
          <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>
            App đang chạy ở chế độ localStorage — tiến độ lưu trên máy này, không cần đăng nhập. Để bật đăng nhập đa thiết bị,
            điền <code>NEXT_PUBLIC_SUPABASE_URL</code> và <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> trong <code>.env.local</code> (xem README).
          </p>
        </div>
      ) : (
        <div className="card">
          <h3>Nhận link đăng nhập qua email</h3>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 14 }}>
            Nhập email, hệ thống gửi một liên kết đăng nhập. Không cần mật khẩu.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@email.com"
            style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, marginBottom: 12, fontFamily: "var(--body)" }}
          />
          <button className="btn" style={{ width: "100%" }} onClick={send} disabled={status === "sending" || !email}>
            {status === "sending" ? "Đang gửi…" : "Gửi link đăng nhập"}
          </button>
          {status === "sent" && <div className="note" style={{ marginTop: 12 }}>Đã gửi! Kiểm tra hộp thư và bấm vào link.</div>}
          {status === "error" && <div className="vmis" style={{ marginTop: 12 }}>Có lỗi khi gửi. Kiểm tra lại cấu hình Supabase.</div>}
        </div>
      )}
    </section>
  );
}
