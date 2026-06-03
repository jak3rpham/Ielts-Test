// src/components/Quiz.tsx
"use client";
import { useState } from "react";
import { QuizItem } from "@/data/types";
import { useProgress } from "@/lib/progress";

export default function Quiz({ items, ns }: { items: QuizItem[]; ns: string }) {
  const { update } = useProgress();
  const [picked, setPicked] = useState<Record<number, number>>({});

  function answer(qi: number, oi: number) {
    if (picked[qi] !== undefined) return;
    setPicked((p) => ({ ...p, [qi]: oi }));
    if (oi === items[qi].answer) {
      update(`${ns}:q${qi}`, { correct: true, at: Date.now() });
    }
  }

  return (
    <div className="quiz">
      {items.map((q, qi) => {
        const chosen = picked[qi];
        const done = chosen !== undefined;
        return (
          <div key={qi} style={{ marginBottom: 14 }}>
            <div className="quiz-q">
              <span className="qix">Q{qi + 1}.</span> {q.q}
            </div>
            <div className="opts">
              {q.options.map((opt, oi) => {
                let cls = "opt";
                if (done) {
                  cls += " disabled";
                  if (oi === q.answer) cls += " correct";
                  else if (oi === chosen) cls += " wrong";
                }
                return (
                  <button key={oi} className={cls} onClick={() => answer(qi, oi)}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {done && (
              <div className="explain">
                <b>Giải thích:</b> {q.explain}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
