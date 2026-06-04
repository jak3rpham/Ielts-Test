// src/components/GrammarList.tsx
"use client";
import { useState } from "react";
import { GRAMMAR, GRAMMAR_CATEGORIES } from "@/data/grammar";
import { GrammarLesson } from "@/data/types";
import Quiz from "./Quiz";

const BAND_LABEL: Record<string, string> = { b6: "Nền tảng", b7: "Band 7", b8: "Band 8" };
const byId = Object.fromEntries(GRAMMAR.map((g) => [g.id, g])) as Record<string, GrammarLesson>;

function Lesson({ g }: { g: GrammarLesson }) {
  return (
    <details className="acc">
      <summary>
        <span>{g.title} <span className={"pill " + g.band}>{BAND_LABEL[g.band]}</span></span>
        <span className="chev">›</span>
      </summary>
      <div className="acc-body">
        <p className="lesson-intro">{g.intro}</p>
        {g.points.map((p, i) => (
          <div className="rule" key={i}>
            <div className="rule-t">{p.rule}</div>
            {p.examples.map((e, j) => (
              <div className="ex" key={j}>
                {e.kind === "good" && <span className="good">✓ </span>}
                {e.kind === "bad" && <span className="bad">✗ </span>}
                <span dangerouslySetInnerHTML={{ __html: e.html }} />
              </div>
            ))}
          </div>
        ))}
        <div className="vmis"><b>⚠ Lỗi người Việt hay mắc:</b> <span dangerouslySetInnerHTML={{ __html: g.vietMistake }} /></div>
        <Quiz items={g.quiz} ns={`grammar:${g.id}`} />
      </div>
    </details>
  );
}

export default function GrammarList() {
  const [band, setBand] = useState<string | null>(null);
  const filters = [
    { key: null, label: "Tất cả" },
    { key: "b6", label: "Nền tảng" },
    { key: "b7", label: "Band 7" },
    { key: "b8", label: "Band 8" },
  ];

  return (
    <div>
      <div className="chips">
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, alignSelf: "center", color: "var(--ink-soft)", marginRight: 4 }}>LỌC:</span>
        {filters.map((f) => (
          <button key={f.label} className={"chip" + (band === f.key ? " active" : "")} onClick={() => setBand(f.key)}>{f.label}</button>
        ))}
      </div>

      {GRAMMAR_CATEGORIES.map((cat) => {
        const lessons = cat.ids.map((id) => byId[id]).filter((g) => g && (band === null || g.band === band));
        if (lessons.length === 0) return null;
        return (
          <div key={cat.name} style={{ marginBottom: 26 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "0 0 12px", paddingBottom: 6, borderBottom: "2px solid var(--line)" }}>
              <h3 style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: 22, letterSpacing: "-.01em" }}>{cat.name}</h3>
              {cat.note && <span style={{ fontSize: 12.5, color: "var(--ink-soft)", fontStyle: "italic", fontFamily: "var(--display)" }}>{cat.note}</span>}
            </div>
            {lessons.map((g) => <Lesson key={g.id} g={g} />)}
          </div>
        );
      })}
    </div>
  );
}
