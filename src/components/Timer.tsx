// src/components/Timer.tsx
"use client";
import { useState, useEffect, useRef } from "react";

export default function Timer({ minutes, label }: { minutes: number; label?: string }) {
  const [remaining, setRemaining] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [running]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const done = remaining === 0;
  const low = remaining > 0 && remaining <= 60;

  function reset() {
    setRunning(false);
    setRemaining(minutes * 60);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: done ? "var(--maroon)" : low ? "var(--amber-deep)" : "var(--ink)",
        color: "var(--paper)",
        borderRadius: 12,
        padding: "12px 16px",
        marginBottom: 16,
        flexWrap: "wrap",
        transition: "background .3s",
      }}
    >
      <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.75 }}>
        {label || "Đồng hồ"}
      </span>
      <span style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: 30, lineHeight: 1, letterSpacing: ".02em", minWidth: 92 }}>
        {mm}:{ss}
      </span>
      {done && <span style={{ fontSize: 13, fontWeight: 600 }}>Hết giờ!</span>}
      <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
        <button
          className="btn sm ghost"
          style={{ borderColor: "var(--paper)", color: "var(--paper)" }}
          onClick={() => setRunning((r) => !r)}
          disabled={done}
        >
          {running ? "Tạm dừng" : "Bắt đầu"}
        </button>
        <button className="btn sm ghost" style={{ borderColor: "var(--paper)", color: "var(--paper)" }} onClick={reset}>
          Đặt lại
        </button>
      </div>
    </div>
  );
}
