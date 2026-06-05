// src/components/ReadingTest.tsx
"use client";
import { useState } from "react";
import { ReadingTest } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { useLang, pick } from "@/lib/i18n";

const TFNG_OPTS = ["True", "False", "Not Given"] as const;

export default function ReadingTestView({ test }: { test: ReadingTest }) {
  const { update } = useProgress();
  const { lang } = useLang();
  const [tf, setTf] = useState<Record<number, string>>({});
  const [mc, setMc] = useState<Record<number, number>>({});
  const [graded, setGraded] = useState(false);

  const total = test.tfng.length + test.mcq.length;
  let score = 0;
  if (graded) {
    test.tfng.forEach((q, i) => { if (tf[i] === q.answer) score++; });
    test.mcq.forEach((q, i) => { if (mc[i] === q.answer) score++; });
  }

  function grade() {
    setGraded(true);
    let s = 0;
    test.tfng.forEach((q, i) => { if (tf[i] === q.answer) s++; });
    test.mcq.forEach((q, i) => { if (mc[i] === q.answer) s++; });
    update(`reading:${test.id}`, { score: s, total, at: Date.now() });
  }

  return (
    <div className="grid g2">
      <div>
        <div className="reading-passage">
          <h4>{test.title}</h4>
          {test.paragraphs.map((p) => (
            <p key={p.label}>
              <span className="pn">{p.label} </span>
              {p.text}
            </p>
          ))}
        </div>
        <div className="note">{pick(lang, { vi: "Cuộn để đọc hết đoạn. Trong phòng thi, đọc câu hỏi trước rồi quét đoạn — đừng đọc kỹ từng chữ ngay.", en: "Scroll to read the whole passage. In the exam, read the questions first then scan, rather than reading every word." })}</div>
      </div>

      <div>
        <div className="card" style={{ marginBottom: 14 }}>
          <h3 style={{ fontSize: 18 }}>{pick(lang, { vi: "Phần 1 — True / False / Not Given", en: "Part 1 — True / False / Not Given" })}</h3>
          {test.tfng.map((q, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div className="quiz-q" style={{ fontSize: 14 }}>
                <span className="qix">{i + 1}.</span> {q.q}
              </div>
              <div className="opts">
                {TFNG_OPTS.map((v) => {
                  let cls = "opt";
                  if (graded) {
                    cls += " disabled";
                    if (v === q.answer) cls += " correct";
                    else if (tf[i] === v) cls += " wrong";
                  } else if (tf[i] === v) {
                    cls += " correct";
                  }
                  return (
                    <button key={v} className={cls} onClick={() => !graded && setTf((p) => ({ ...p, [i]: v }))}>
                      {v}
                    </button>
                  );
                })}
              </div>
              {graded && <div className="explain"><b>{pick(lang, { vi: "Vì sao:", en: "Why:" })}</b> {pick(lang, q.explain)}</div>}
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18 }}>{pick(lang, { vi: "Phần 2 — Trắc nghiệm", en: "Part 2 — Multiple choice" })}</h3>
          {test.mcq.map((q, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div className="quiz-q" style={{ fontSize: 14 }}>
                <span className="qix">{i + test.tfng.length + 1}.</span> {pick(lang, q.q)}
              </div>
              <div className="opts">
                {q.options.map((opt, oi) => {
                  let cls = "opt";
                  if (graded) {
                    cls += " disabled";
                    if (oi === q.answer) cls += " correct";
                    else if (mc[i] === oi) cls += " wrong";
                  } else if (mc[i] === oi) {
                    cls += " correct";
                  }
                  return (
                    <button key={oi} className={cls} onClick={() => !graded && setMc((p) => ({ ...p, [i]: oi }))}>
                      {pick(lang, opt)}
                    </button>
                  );
                })}
              </div>
              {graded && <div className="explain"><b>{pick(lang, { vi: "Vì sao:", en: "Why:" })}</b> {pick(lang, q.explain)}</div>}
            </div>
          ))}
        </div>

        {!graded ? (
          <button className="btn" style={{ width: "100%", marginTop: 14 }} onClick={grade}>
            {pick(lang, { vi: "Chấm điểm Reading", en: "Grade Reading" })}
          </button>
        ) : (
          <div className="score-banner">
            <div className="scr">{score}/{total}</div>
            <div>
              {score === total
                ? pick(lang, { vi: "Hoàn hảo! Tốc độ quét đoạn của bạn rất tốt.", en: "Perfect! Your scanning speed is excellent." })
                : score >= total * 0.7
                ? pick(lang, { vi: "Khá tốt — đọc lại phần giải thích các câu sai.", en: "Good. Review the explanations for the ones you missed." })
                : pick(lang, { vi: "Luyện thêm: đọc câu hỏi trước, rồi định vị từ khóa trong đoạn.", en: "Practise more: read questions first, then locate keywords in the passage." })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
