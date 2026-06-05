// src/components/SpeakingStudio.tsx
"use client";
import { useState } from "react";
import { SPEAKING, SPEAKING_PHRASES } from "@/data/speaking";
import { useLang, pick } from "@/lib/i18n";

export default function SpeakingStudio() {
  const { lang } = useLang();
  const [idx, setIdx] = useState(0);
  const part = SPEAKING[idx];
  const T = (vi: string, en: string) => pick(lang, { vi, en });

  return (
    <div>
      <div className="chips">
        {SPEAKING.map((p, i) => (
          <button key={p.id} className={"chip" + (i === idx ? " active" : "")} onClick={() => setIdx(i)}>
            {pick(lang, p.name)}
          </button>
        ))}
      </div>

      {part.type === "qa" &&
        part.items?.map((it, i) => (
          <div className="sp-card" key={i}>
            <div className="q">{it.q}</div>
            <div className="tip">💡 {pick(lang, it.tip)}</div>
          </div>
        ))}

      {part.type === "cue" && part.cue && (
        <div className="cuecard">
          <div style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 600, marginBottom: 6 }}>
            {part.cue.title}
          </div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>You should say:</div>
          <ul>
            {part.cue.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div style={{ marginTop: 14, fontSize: 13.5, background: "rgba(255,255,255,.12)", padding: "11px 14px", borderRadius: 9 }}>
            💡 {pick(lang, part.cue.tip)}
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 17 }}>{T("Cụm câu \u201ckéo dài thời gian\u201d tự nhiên", "Natural \u201cbuying-time\u201d phrases")}</h3>
        <div className="bank" style={{ columns: 2 }}>
          <ul style={{ listStyle: "none" }}>
            {SPEAKING_PHRASES.map((p, i) => (
              <li className="ex" key={i}>&quot;{p}&quot;</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
