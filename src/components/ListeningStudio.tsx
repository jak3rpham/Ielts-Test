// src/components/ListeningStudio.tsx
"use client";
import { useState } from "react";
import { LISTENING, OFFICIAL_SOURCES } from "@/data/listening";
import { ListeningItem } from "@/data/listening";
import { useContent } from "@/lib/content";
import { useProgress } from "@/lib/progress";
import Timer from "./Timer";

export default function ListeningStudio() {
  const { update } = useProgress();
  const { items: list } = useContent<ListeningItem>("listening", LISTENING);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [graded, setGraded] = useState(false);

  const item = list[Math.min(idx, list.length - 1)];

  function norm(s: string) {
    return s.trim().toLowerCase();
  }
  let score = 0;
  if (graded) {
    item.questions.forEach((q, i) => {
      if (answers[i] !== undefined && norm(answers[i]) === norm(q.answer)) score++;
    });
  }

  function selectItem(i: number) {
    setIdx(i);
    setAnswers({});
    setGraded(false);
  }
  function grade() {
    setGraded(true);
    let s = 0;
    item.questions.forEach((q, i) => {
      if (answers[i] !== undefined && norm(answers[i]) === norm(q.answer)) s++;
    });
    update(`listening:${item.id}`, { score: s, total: item.questions.length, at: Date.now() });
  }

  return (
    <div>
      <div className="chips">
        {list.map((l, i) => (
          <button key={l.id} className={"chip" + (i === Math.min(idx, list.length - 1) ? " active" : "")} onClick={() => selectItem(i)}>
            {l.title}
          </button>
        ))}
      </div>

      <Timer minutes={item.durationMin} label="Listening" />

      <div className="grid g2">
        <div>
          {item.youtubeId ? (
            <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden", border: "1.5px solid var(--line)" }}>
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          ) : item.externalLink ? (
            <div className="card" style={{ margin: 0 }}>
              <h3 style={{ fontSize: 17 }}>Mở bài nghe</h3>
              <a className="btn" href={item.externalLink} target="_blank" rel="noopener noreferrer">
                Mở liên kết bài nghe ↗
              </a>
            </div>
          ) : (
            <div className="card" style={{ margin: 0 }}>
              <h3 style={{ fontSize: 17 }}>Chưa có video</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                Mở <code>src/data/listening.ts</code>, dán <code>youtubeId</code> của video bạn chọn vào mục này.
              </p>
            </div>
          )}
          <div className="note">Nguồn: {item.source}</div>

          <div className="card" style={{ marginTop: 16 }}>
            <h3 style={{ fontSize: 16 }}>Nguồn đề chính thống (miễn phí)</h3>
            {OFFICIAL_SOURCES.map((s) => (
              <div key={s.url} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px dashed var(--line)" }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: 14 }}>
                  {s.name} ↗
                </a>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{ margin: 0 }}>
            <h3 style={{ fontSize: 17 }}>Câu hỏi</h3>
            {item.questions.map((q, i) => {
              const correct = graded && answers[i] !== undefined && norm(answers[i]) === norm(q.answer);
              return (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div className="quiz-q" style={{ fontSize: 14 }}>{q.q}</div>
                  {q.type === "fill" ? (
                    <input
                      value={answers[i] ?? ""}
                      onChange={(e) => !graded && setAnswers((p) => ({ ...p, [i]: e.target.value }))}
                      placeholder="Nhập đáp án…"
                      disabled={graded}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 9,
                        border: "1.5px solid " + (graded ? (correct ? "var(--green)" : "var(--maroon)") : "var(--line)"),
                        background: graded ? (correct ? "var(--green-soft)" : "var(--maroon-soft)") : "#fbf6ee",
                        fontSize: 14,
                        fontFamily: "var(--body)",
                        marginTop: 6,
                      }}
                    />
                  ) : (
                    <div className="opts">
                      {q.options?.map((opt) => {
                        let cls = "opt";
                        if (graded) {
                          cls += " disabled";
                          if (norm(opt) === norm(q.answer)) cls += " correct";
                          else if (answers[i] === opt) cls += " wrong";
                        } else if (answers[i] === opt) cls += " correct";
                        return (
                          <button key={opt} className={cls} onClick={() => !graded && setAnswers((p) => ({ ...p, [i]: opt }))}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {graded && (
                    <div className="explain">
                      <b>Đáp án:</b> {q.answer}
                      {q.explain ? ` — ${q.explain}` : ""}
                    </div>
                  )}
                </div>
              );
            })}

            {!graded ? (
              <button className="btn" style={{ width: "100%" }} onClick={grade}>
                Chấm điểm Listening
              </button>
            ) : (
              <div className="score-banner">
                <div className="scr">{score}/{item.questions.length}</div>
                <div>Nghe lại đoạn ứng với câu sai để bắt từ khóa.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
