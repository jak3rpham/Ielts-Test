// src/components/MockTest.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { READING_MOCKS, LISTENING_MOCKS, WRITING_MOCKS } from "@/data/mocktests";
import { useLang, pick } from "@/lib/i18n";

type Phase = "intro" | "reading" | "listening" | "writing" | "results";
const TFNG = ["True", "False", "Not Given"];
const rand = (n: number) => Math.floor(Math.random() * n);

// % đúng -> band ước tính (xấp xỉ thang IELTS Academic)
function pctToBand(p: number): number {
  if (p >= 0.9) return 8.5;
  if (p >= 0.83) return 8;
  if (p >= 0.75) return 7.5;
  if (p >= 0.68) return 7;
  if (p >= 0.6) return 6.5;
  if (p >= 0.5) return 6;
  if (p >= 0.42) return 5.5;
  if (p >= 0.34) return 5;
  if (p >= 0.26) return 4.5;
  return 4;
}

export default function MockTest() {
  const { lang } = useLang();
  const T = (vi: string, en: string) => pick(lang, { vi, en });

  const [phase, setPhase] = useState<Phase>("intro");
  const [ri] = useState(() => rand(READING_MOCKS.length));
  const [li] = useState(() => rand(LISTENING_MOCKS.length));
  const [wi] = useState(() => rand(WRITING_MOCKS.length));
  const R = READING_MOCKS[ri], L = LISTENING_MOCKS[li], W = WRITING_MOCKS[wi];

  const [rAns, setRAns] = useState<Record<number, string | number>>({});
  const [lAns, setLAns] = useState<Record<number, string | number>>({});
  const [essay, setEssay] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<null | {
    reading: { band: number; correct: number; total: number; weak: string };
    listening: { band: number; correct: number; total: number; weak: string };
    writing: { band: number | null; weak: string; note?: string };
  }>(null);

  // ---- Listening: trình duyệt đọc transcript ----
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef<typeof window.speechSynthesis | null>(null);
  useEffect(() => { synthRef.current = typeof window !== "undefined" ? window.speechSynthesis : null; return () => { synthRef.current?.cancel(); }; }, []);
  function play() {
    const s = synthRef.current; if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(L.transcript);
    u.lang = "en-GB"; u.rate = 0.95;
    u.onend = () => setSpeaking(false);
    setSpeaking(true); s.speak(u);
  }
  function stop() { synthRef.current?.cancel(); setSpeaking(false); }

  function gradeReadingListening() {
    let rc = 0; const rWrong: Record<string, number> = {};
    R.questions.forEach((q, i) => {
      const ok = q.type === "TFNG" ? rAns[i] === q.answer : rAns[i] === q.answer;
      if (ok) rc++; else rWrong[q.type] = (rWrong[q.type] || 0) + 1;
    });
    let lc = 0; const lWrong: Record<string, number> = {};
    L.questions.forEach((q, i) => {
      let ok = false;
      if (q.type === "GAP") ok = String(lAns[i] ?? "").trim().toLowerCase() === String(q.answer).trim().toLowerCase();
      else ok = lAns[i] === q.answer;
      if (ok) lc++; else lWrong[q.type] = (lWrong[q.type] || 0) + 1;
    });
    const rWeakType = Object.entries(rWrong).sort((a, b) => b[1] - a[1])[0]?.[0];
    const lWeakType = Object.entries(lWrong).sort((a, b) => b[1] - a[1])[0]?.[0];
    const rWeak = !rWeakType ? T("Không có điểm yếu rõ rệt — rất tốt!", "No clear weakness — great!")
      : rWeakType === "TFNG" ? T("Phân biệt True / False / Not Given", "Telling True / False / Not Given apart")
      : T("Câu hỏi chi tiết & suy luận (trắc nghiệm)", "Detail & inference questions (multiple choice)");
    const lWeak = !lWeakType ? T("Không có điểm yếu rõ rệt — rất tốt!", "No clear weakness — great!")
      : lWeakType === "GAP" ? T("Nghe bắt từ/số & chính tả", "Catching words/numbers & spelling")
      : T("Bắt ý chính & bẫy sửa thông tin", "Main ideas & correction traps");
    return {
      reading: { band: pctToBand(rc / R.questions.length), correct: rc, total: R.questions.length, weak: rWeak },
      listening: { band: pctToBand(lc / L.questions.length), correct: lc, total: L.questions.length, weak: lWeak },
    };
  }

  async function finish() {
    setGrading(true);
    const rl = gradeReadingListening();
    let writing: { band: number | null; weak: string; note?: string } = { band: null, weak: "", note: T("Chưa cấu hình AI để chấm Writing.", "AI grading for Writing is not configured.") };
    if (essay.trim().split(/\s+/).length >= 40) {
      try {
        const resp = await fetch("/api/grade", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt: W.prompt, essay }) });
        if (resp.ok) {
          const d = await resp.json();
          const crit: [string, string][] = [["task_response", T("Task Response", "Task Response")], ["coherence", T("Mạch lạc", "Coherence")], ["lexical", T("Từ vựng", "Lexical")], ["grammar", T("Ngữ pháp", "Grammar")]];
          let lowK = "", lowV = 99;
          crit.forEach(([k]) => { const b = d[k]?.band; if (typeof b === "number" && b < lowV) { lowV = b; lowK = k; } });
          const lowLabel = crit.find((c) => c[0] === lowK)?.[1] || "";
          writing = { band: typeof d.overall === "number" ? d.overall : null, weak: lowLabel ? T(`Yếu nhất: ${lowLabel} (band ${lowV})`, `Weakest: ${lowLabel} (band ${lowV})`) : "" };
        } else {
          const e = await resp.json().catch(() => ({}));
          writing = { band: null, weak: "", note: e.error || T("Không chấm được Writing.", "Could not grade Writing.") };
        }
      } catch {
        writing = { band: null, weak: "", note: T("Lỗi kết nối khi chấm Writing.", "Connection error while grading Writing.") };
      }
    } else {
      writing = { band: null, weak: "", note: T("Bài viết quá ngắn để chấm (cần ≥ 40 từ).", "Essay too short to grade (need ≥ 40 words).") };
    }
    setResult({ ...rl, writing });
    setGrading(false);
    stop();
    setPhase("results");
  }

  // ---------- RENDER ----------
  if (phase === "intro") {
    return (
      <div className="card">
        <h3>{T("Bài thi thử xếp band", "Placement mock test")}</h3>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 12 }}>
          {T("Hệ thống rút ngẫu nhiên một đề cho mỗi kỹ năng (Reading · Listening · Writing) từ ngân hàng đề gốc, tách riêng khỏi phần luyện tập. Cuối bài bạn nhận band ước tính từng kỹ năng và điểm yếu chính.",
             "The system randomly draws one test per skill (Reading · Listening · Writing) from an original bank, separate from the practice sets. At the end you get an estimated band per skill plus the main weakness.")}
        </p>
        <div className="note">{T("Lưu ý: đây là ước tính nhanh để định vị trình độ, không thay thế kỳ thi chính thức. Listening dùng giọng đọc của trình duyệt — giáo viên có thể tự đọc transcript để sát thực tế hơn.",
          "Note: this is a quick estimate to gauge level, not a substitute for the official exam. Listening uses the browser voice — a teacher can read the transcript aloud for greater realism.")}</div>
        <button className="btn" style={{ marginTop: 14 }} onClick={() => setPhase("reading")}>{T("Bắt đầu — Reading", "Start — Reading")}</button>
      </div>
    );
  }

  if (phase === "reading") {
    return (
      <div>
        <div className="card">
          <span className="eyebrow">{T("Phần 1 / 3 · Reading", "Part 1 / 3 · Reading")}</span>
          <h3>{R.title}</h3>
          <div className="reading-passage">{R.passage.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
        <div className="card">
          {R.questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div className="quiz-q" style={{ fontSize: 14 }}><span className="qix">{i + 1}.</span> {q.q}</div>
              <div className="opts">
                {(q.type === "TFNG" ? TFNG : q.options || []).map((opt, oi) => {
                  const val: string | number = q.type === "TFNG" ? opt : oi;
                  const sel = rAns[i] === val;
                  return <button key={oi} className={"opt" + (sel ? " correct" : "")} onClick={() => setRAns((p) => ({ ...p, [i]: val }))}>{opt}</button>;
                })}
              </div>
            </div>
          ))}
          <button className="btn" style={{ width: "100%", marginTop: 8 }} onClick={() => setPhase("listening")}>{T("Tiếp — Listening ›", "Next — Listening ›")}</button>
        </div>
      </div>
    );
  }

  if (phase === "listening") {
    return (
      <div>
        <div className="card">
          <span className="eyebrow">{T("Phần 2 / 3 · Listening", "Part 2 / 3 · Listening")}</span>
          <h3>{L.title}</h3>
          <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 10 }}>{T("Bấm nghe (giọng trình duyệt). Cố gắng nghe rồi trả lời — hạn chế nghe lại nhiều lần để sát thực tế.", "Press play (browser voice). Try to listen once and answer — limit replays for realism.")}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn sm" onClick={play} disabled={speaking}>{speaking ? T("Đang đọc…", "Playing…") : "▶ " + T("Nghe", "Play")}</button>
            <button className="btn sm ghost" onClick={stop}>■ {T("Dừng", "Stop")}</button>
          </div>
        </div>
        <div className="card">
          {L.questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div className="quiz-q" style={{ fontSize: 14 }}><span className="qix">{i + 1}.</span> {q.q}</div>
              {q.type === "GAP" ? (
                <input value={String(lAns[i] ?? "")} onChange={(e) => setLAns((p) => ({ ...p, [i]: e.target.value }))}
                  placeholder={T("điền 1 từ", "one word")}
                  style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--line)", fontSize: 14, fontFamily: "var(--body)" }} />
              ) : (
                <div className="opts">
                  {(q.options || []).map((opt, oi) => {
                    const sel = lAns[i] === oi;
                    return <button key={oi} className={"opt" + (sel ? " correct" : "")} onClick={() => setLAns((p) => ({ ...p, [i]: oi }))}>{opt}</button>;
                  })}
                </div>
              )}
            </div>
          ))}
          <button className="btn" style={{ width: "100%", marginTop: 8 }} onClick={() => { stop(); setPhase("writing"); }}>{T("Tiếp — Writing ›", "Next — Writing ›")}</button>
        </div>
      </div>
    );
  }

  if (phase === "writing") {
    const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
    return (
      <div className="card">
        <span className="eyebrow">{T("Phần 3 / 3 · Writing Task 2", "Part 3 / 3 · Writing Task 2")}</span>
        <h3 style={{ fontSize: 17 }}>{W.type}</h3>
        <p style={{ fontStyle: "italic", marginBottom: 12 }}>{W.prompt}</p>
        <textarea value={essay} onChange={(e) => setEssay(e.target.value)} rows={16}
          placeholder={T("Viết bài (~250 từ)…", "Write your essay (~250 words)…")}
          style={{ width: "100%", padding: 16, borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, fontFamily: "var(--body)", lineHeight: 1.7, resize: "vertical", minHeight: 360 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, flexWrap: "wrap", gap: 10 }}>
          <span className="fc-count">{words} {T("từ", "words")}</span>
          <button className="btn" onClick={finish} disabled={grading}>{grading ? T("Đang chấm…", "Grading…") : T("Nộp bài & xem band", "Submit & see band")}</button>
        </div>
      </div>
    );
  }

  // results
  const r = result!;
  const Skill = ({ name, band, sub, weak }: { name: string; band: number | null; sub?: string; weak: string }) => (
    <div className="stat" style={{ textAlign: "left" }}>
      <div className="lbl">{name}</div>
      <div className="big">{band == null ? "—" : band.toFixed(1)}</div>
      {sub && <div className="sub">{sub}</div>}
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.82)", marginTop: 6 }}><b>{T("Điểm yếu", "Weakness")}:</b> {weak}</div>
    </div>
  );
  const bands = [r.reading.band, r.listening.band, r.writing.band].filter((b): b is number => typeof b === "number");
  const overall = bands.length ? Math.round((bands.reduce((a, b) => a + b, 0) / bands.length) * 2) / 2 : null;

  return (
    <div>
      <div className="card">
        <span className="eyebrow">{T("Kết quả ước tính", "Estimated result")}</span>
        <h3>{T("Band tổng (trung bình)", "Overall band (average)")}: <span style={{ color: "var(--amber-deep)" }}>{overall == null ? "—" : overall.toFixed(1)}</span></h3>
        <div className="grid g3" style={{ marginTop: 14 }}>
          <Skill name="Reading" band={r.reading.band} sub={`${r.reading.correct}/${r.reading.total} ${T("câu đúng", "correct")}`} weak={r.reading.weak} />
          <Skill name="Listening" band={r.listening.band} sub={`${r.listening.correct}/${r.listening.total} ${T("câu đúng", "correct")}`} weak={r.listening.weak} />
          <Skill name="Writing" band={r.writing.band} sub={r.writing.note} weak={r.writing.weak || (r.writing.note ? "" : "—")} />
        </div>
        <div className="note" style={{ marginTop: 14 }}>{T("Đây là ước tính nhanh. Reading/Listening chấm theo số câu đúng; Writing do AI chấm theo 4 tiêu chí. Dùng để định vị trình độ ban đầu trước khi lên lộ trình học.",
          "This is a quick estimate. Reading/Listening are scored by correct answers; Writing is graded by AI on the four criteria. Use it to gauge a starting level before planning study.")}</div>
        <button className="btn ghost sm" style={{ marginTop: 14 }} onClick={() => window.location.reload()}>{T("Làm đề khác", "Take another test")}</button>
      </div>
    </div>
  );
}
