// src/components/GrammarList.tsx
"use client";
import { GRAMMAR } from "@/data/grammar";
import Quiz from "./Quiz";

const BAND_LABEL: Record<string, string> = { b6: "Nền tảng", b7: "Band 7", b8: "Band 8" };

export default function GrammarList() {
  return (
    <div>
      {GRAMMAR.map((g) => (
        <details className="acc" key={g.id}>
          <summary>
            <span>
              {g.title} <span className={"pill " + g.band}>{BAND_LABEL[g.band]}</span>
            </span>
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
            <div className="vmis">
              <b>⚠ Lỗi người Việt hay mắc:</b>{" "}
              <span dangerouslySetInnerHTML={{ __html: g.vietMistake }} />
            </div>
            <Quiz items={g.quiz} ns={`grammar:${g.id}`} />
          </div>
        </details>
      ))}
    </div>
  );
}
