"use client";
import { FRAMEWORKS } from "@/data/frameworks";
import { Framework } from "@/data/frameworks";
import { useContent } from "@/lib/content";
import { useLang, pick } from "@/lib/i18n";

function Block({ f }: { f: Framework }) {
  const { lang } = useLang();
  return (
    <details className="acc">
      <summary><span>{pick(lang, f.name)} <span className="pill b7">{f.skill}</span></span><span className="chev">›</span></summary>
      <div className="acc-body">
        <p className="lesson-intro"><b>{pick(lang, { vi: "Dùng khi:", en: "Use when:" })}</b> {pick(lang, f.when)}</p>
        {f.steps.map((s, i) => (
          <div className="rule" key={i}>
            <div className="rule-t">{s.letter ? `${s.letter} — ` : ""}{pick(lang, s.name)}</div>
            <div className="ex" style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--ink-soft)" }}>{pick(lang, s.desc)}</div>
          </div>
        ))}
        {f.example && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--amber-deep)", marginBottom: 4 }}>{pick(lang, { vi: "Ví dụ áp dụng", en: "Worked example" })}</div>
            <div className="model"><p dangerouslySetInnerHTML={{ __html: pick(lang, f.example) }} /></div>
          </div>
        )}
        {f.caveat && <div className="vmis" style={{ marginTop: 12 }}><b>⚠ {pick(lang, { vi: "Lưu ý:", en: "Note:" })}</b> {pick(lang, f.caveat)}</div>}
      </div>
    </details>
  );
}

export default function FrameworksList() {
  const { lang } = useLang();
  const { items } = useContent<Framework>("frameworks", FRAMEWORKS);
  const writing = items.filter((f) => f.skill === "Writing");
  const speaking = items.filter((f) => f.skill === "Speaking");
  return (
    <>
      <h3 style={{ fontFamily: "var(--display)", fontSize: 22, margin: "8px 0 12px" }}>✍️ Writing Task 2</h3>
      {writing.map((f) => <Block key={f.id} f={f} />)}
      <h3 style={{ fontFamily: "var(--display)", fontSize: 22, margin: "26px 0 12px" }}>🗣️ Speaking</h3>
      {speaking.map((f) => <Block key={f.id} f={f} />)}
    </>
  );
}
