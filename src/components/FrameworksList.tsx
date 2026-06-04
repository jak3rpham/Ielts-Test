"use client";
import { FRAMEWORKS } from "@/data/frameworks";
import { Framework } from "@/data/frameworks";
import { useContent } from "@/lib/content";

function Block({ f }: { f: Framework }) {
  return (
    <details className="acc">
      <summary><span>{f.name} <span className="pill b7">{f.skill}</span></span><span className="chev">›</span></summary>
      <div className="acc-body">
        <p className="lesson-intro"><b>Dùng khi:</b> {f.when}</p>
        {f.steps.map((s, i) => (
          <div className="rule" key={i}>
            <div className="rule-t">{s.letter ? `${s.letter} — ` : ""}{s.name}</div>
            <div className="ex" style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--ink-soft)" }}>{s.desc}</div>
          </div>
        ))}
        {f.example && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--amber-deep)", marginBottom: 4 }}>Ví dụ áp dụng</div>
            <div className="model"><p dangerouslySetInnerHTML={{ __html: f.example }} /></div>
          </div>
        )}
        {f.caveat && <div className="vmis" style={{ marginTop: 12 }}><b>⚠ Lưu ý:</b> {f.caveat}</div>}
      </div>
    </details>
  );
}

export default function FrameworksList() {
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
