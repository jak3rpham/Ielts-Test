// src/components/MockTest.tsx
"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { MOCK_TESTS, type MockTest as MT, type MockWritingTask, type MockListeningSection, type MockReadingPassage } from "@/data/mocktests";
import { useLang, pick } from "@/lib/i18n";
import { saveMockAttempt, loadMockAttempts, getLastTestId, type MockAttempt } from "@/lib/mockHistory";
import { ensureProfile } from "@/lib/profile";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import Timer from "@/components/Timer";

type Phase = "intro" | "reading" | "listening" | "writing1" | "writing2" | "grading" | "results";
const TFNG = ["True", "False", "Not Given"];
const YNG = ["Yes", "No", "Not Given"];
const selStyle: React.CSSProperties = { padding: "9px 12px", borderRadius: 9, border: "1.5px solid var(--line)", fontSize: 14, fontFamily: "var(--body)", background: "#fbf6ee", minWidth: 220 };
const round2 = (n: number) => Math.round(n * 2) / 2;

// % đúng -> band ước tính (xấp xỉ thang IELTS Academic, 40 câu)
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

function pickTest(): MT {
  const last = getLastTestId();
  const pool = MOCK_TESTS.length > 1 ? MOCK_TESTS.filter((t) => t.id !== last) : MOCK_TESTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

type WResult = { band: number | null; weak: string; note?: string };

export default function MockTest() {
  const { lang } = useLang();
  const T = (vi: string, en: string) => pick(lang, { vi, en });

  const [phase, setPhase] = useState<Phase>("intro");
  // chọn 1 đề khác lần trước, cố định trong suốt phiên thi
  const [test, setTest] = useState<MT>(() => MOCK_TESTS[0]);
  // Chọn 1 đề khác lần trước, rồi GỘP nội dung do AI sinh (nếu có trong Supabase):
  // - mocklistening_test: 1 video = full 4 section/40 câu -> dùng nguyên (random video khác nhau)
  // - mockreading_part: passage gắn part 1/2/3 -> bốc 1 passage mỗi part (nguồn khác nhau), thiếu bù đề file
  useEffect(() => {
    let active = true;
    (async () => {
      const base = pickTest();
      const sb = getSupabaseBrowser();
      if (!sb) { if (active) setTest(base); return; }
      try {
        const { data } = await sb
          .from("content")
          .select("type, payload")
          .in("type", ["mocklistening_test", "mockreading_part"])
          .eq("published", true)
          .order("created_at", { ascending: false });
        const rows = data || [];
        // LISTENING: mỗi row là 1 bài đầy đủ {sections:[4]}; bốc ngẫu nhiên 1 bài.
        const lTests = rows.filter((r: { type: string }) => r.type === "mocklistening_test")
          .map((r: { payload: { sections: MockListeningSection[] } }) => r.payload?.sections).filter((s): s is MockListeningSection[] => Array.isArray(s) && s.length > 0);
        const listening = lTests.length ? lTests[Math.floor(Math.random() * lTests.length)] : base.listening;

        // READING: gom theo part, bốc 1 passage mỗi part; thiếu thì lấy đề file.
        const rParts = rows.filter((r: { type: string }) => r.type === "mockreading_part").map((r: { payload: MockReadingPassage }) => r.payload);
        const byPart = (p: number) => rParts.filter((x) => x?.part === p);
        const pickOne = (arr: MockReadingPassage[], fallback?: MockReadingPassage) =>
          arr.length ? arr[Math.floor(Math.random() * arr.length)] : fallback;
        const reading = [
          pickOne(byPart(1), base.reading[0]),
          pickOne(byPart(2), base.reading[1]),
          pickOne(byPart(3), base.reading[2]),
        ].filter(Boolean) as MockReadingPassage[];

        const merged: MT = {
          ...base,
          listening: listening.length ? listening : base.listening,
          reading: reading.length ? reading : base.reading,
        };
        if (active) setTest(merged);
      } catch {
        if (active) setTest(base);
      }
    })();
    return () => { active = false; };
  }, []);

  const [rAns, setRAns] = useState<Record<number, string | number>>({});
  const [lAns, setLAns] = useState<Record<number, string | number>>({});
  const [essay1, setEssay1] = useState("");
  const [essay2, setEssay2] = useState("");
  const [result, setResult] = useState<null | {
    reading: { band: number; correct: number; total: number; weak: string };
    listening: { band: number; correct: number; total: number; weak: string };
    writing: { band: number | null; weak: string; note?: string; t1: WResult; t2: WResult };
    overall: number | null;
    testId: string;
  }>(null);
  const [saveMsg, setSaveMsg] = useState("");

  // đánh số câu liên tục 1..40 cho từng kỹ năng
  const readingBlocks = useMemo(() => {
    let gi = 0;
    return test.reading.map((p) => ({ passage: p, items: p.questions.map((q) => ({ q, gi: gi++ })) }));
  }, [test]);
  const listeningBlocks = useMemo(() => {
    let gi = 0;
    return test.listening.map((s) => ({ section: s, items: s.questions.map((q) => ({ q, gi: gi++ })) }));
  }, [test]);
  const readingTotal = useMemo(() => test.reading.reduce((a, p) => a + p.questions.length, 0), [test]);
  const listeningTotal = useMemo(() => test.listening.reduce((a, s) => a + s.questions.length, 0), [test]);

  // ---- Listening: trình duyệt đọc transcript theo section ----
  const [playingSec, setPlayingSec] = useState<number | null>(null);
  const synthRef = useRef<typeof window.speechSynthesis | null>(null);
  useEffect(() => { synthRef.current = typeof window !== "undefined" ? window.speechSynthesis : null; return () => { synthRef.current?.cancel(); }; }, []);
  function play(idx: number, text: string) {
    const s = synthRef.current; if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB"; u.rate = 0.95;
    u.onend = () => setPlayingSec(null);
    setPlayingSec(idx); s.speak(u);
  }
  function stop() { synthRef.current?.cancel(); setPlayingSec(null); }

  function gradeReadingListening() {
    let rc = 0; const rWrong: Record<string, number> = {};
    readingBlocks.forEach((b) => b.items.forEach(({ q, gi }) => {
      const ok = rAns[gi] === q.answer;
      if (ok) rc++; else rWrong[q.type] = (rWrong[q.type] || 0) + 1;
    }));
    let lc = 0; const lWrong: Record<string, number> = {};
    listeningBlocks.forEach((b) => b.items.forEach(({ q, gi }) => {
      let ok = false;
      if (q.type === "GAP") ok = String(lAns[gi] ?? "").trim().toLowerCase() === String(q.answer).trim().toLowerCase();
      else ok = lAns[gi] === q.answer;
      if (ok) lc++; else lWrong[q.type] = (lWrong[q.type] || 0) + 1;
    }));
    const rWeakType = Object.entries(rWrong).sort((a, b) => b[1] - a[1])[0]?.[0];
    const lWeakType = Object.entries(lWrong).sort((a, b) => b[1] - a[1])[0]?.[0];
    const rWeak = !rWeakType ? T("Không có điểm yếu rõ rệt — rất tốt!", "No clear weakness — great!")
      : rWeakType === "TFNG" ? T("Phân biệt True / False / Not Given", "Telling True / False / Not Given apart")
      : T("Câu hỏi chi tiết & suy luận (trắc nghiệm)", "Detail & inference questions (multiple choice)");
    const lWeak = !lWeakType ? T("Không có điểm yếu rõ rệt — rất tốt!", "No clear weakness — great!")
      : lWeakType === "GAP" ? T("Nghe bắt từ/số & chính tả", "Catching words/numbers & spelling")
      : T("Bắt ý chính & bẫy sửa thông tin", "Main ideas & correction traps");
    return {
      reading: { band: pctToBand(rc / readingTotal), correct: rc, total: readingTotal, weak: rWeak },
      listening: { band: pctToBand(lc / listeningTotal), correct: lc, total: listeningTotal, weak: lWeak },
    };
  }

  async function gradeOne(taskDef: MockWritingTask, essay: string): Promise<WResult> {
    if (essay.trim().split(/\s+/).filter(Boolean).length < (taskDef.task === 1 ? 30 : 40)) {
      return { band: null, weak: "", note: T(`Bài quá ngắn để chấm (Task ${taskDef.task}).`, `Too short to grade (Task ${taskDef.task}).`) };
    }
    try {
      const resp = await fetch("/api/grade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: taskDef.prompt, essay, task: taskDef.task }),
      });
      if (!resp.ok) {
        const e = await resp.json().catch(() => ({}));
        return { band: null, weak: "", note: e.error || T("Không chấm được.", "Could not grade.") };
      }
      const d = await resp.json();
      const taLabel = taskDef.task === 1 ? T("Task Achievement", "Task Achievement") : T("Task Response", "Task Response");
      const crit: [string, string][] = [["task_response", taLabel], ["coherence", T("Mạch lạc", "Coherence")], ["lexical", T("Từ vựng", "Lexical")], ["grammar", T("Ngữ pháp", "Grammar")]];
      let lowK = "", lowV = 99;
      crit.forEach(([k]) => { const b = d[k]?.band; if (typeof b === "number" && b < lowV) { lowV = b; lowK = k; } });
      const lowLabel = crit.find((c) => c[0] === lowK)?.[1] || "";
      return { band: typeof d.overall === "number" ? d.overall : null, weak: lowLabel ? T(`Yếu nhất: ${lowLabel} (band ${lowV})`, `Weakest: ${lowLabel} (band ${lowV})`) : "" };
    } catch {
      return { band: null, weak: "", note: T("Lỗi kết nối khi chấm.", "Connection error while grading.") };
    }
  }

  async function finish() {
    stop();
    setPhase("grading");
    const rl = gradeReadingListening();
    const [t1, t2] = await Promise.all([gradeOne(test.writing.task1, essay1), gradeOne(test.writing.task2, essay2)]);
    // Writing band: Task 1 trọng số 1, Task 2 trọng số 2 (theo IELTS).
    let wBand: number | null = null;
    if (t1.band != null && t2.band != null) wBand = round2((t1.band + 2 * t2.band) / 3);
    else if (t2.band != null) wBand = t2.band;
    else if (t1.band != null) wBand = t1.band;
    const wWeak = (t2.weak || t1.weak || "");
    const wNote = wBand == null ? T("Chưa chấm được Writing (kiểm tra ANTHROPIC_API_KEY).", "Writing not graded (check ANTHROPIC_API_KEY).") : undefined;
    const writing = { band: wBand, weak: wWeak, note: wNote, t1, t2 };

    const bands = [rl.reading.band, rl.listening.band, wBand].filter((b): b is number => typeof b === "number");
    const overall = bands.length ? round2(bands.reduce((a, b) => a + b, 0) / bands.length) : null;

    setResult({ ...rl, writing, overall, testId: test.id });
    setPhase("results");

    // Lưu lịch sử
    try {
      const { where } = await saveMockAttempt({
        test_id: test.id,
        reading_band: rl.reading.band,
        listening_band: rl.listening.band,
        writing_band: wBand,
        overall_band: overall,
        reading_correct: rl.reading.correct,
        reading_total: rl.reading.total,
        listening_correct: rl.listening.correct,
        listening_total: rl.listening.total,
      });
      ensureProfile().catch(() => {});
      setSaveMsg(where === "supabase"
        ? T("Đã lưu vào hồ sơ của bạn.", "Saved to your profile.")
        : T("Đã lưu trên thiết bị này (đăng nhập để lưu vào hồ sơ).", "Saved on this device (sign in to save to your profile)."));
    } catch {
      setSaveMsg(T("Không lưu được lịch sử.", "Could not save history."));
    }
  }

  /* ---------------- RENDER ---------------- */

  if (phase === "intro") {
    return <Intro test={test} T={T} onStart={() => setPhase("reading")} />;
  }

  if (phase === "reading") {
    let counter = 0;
    return (
      <div>
        <Timer minutes={60} label="Reading · 60'" />
        <div className="card">
          <span className="eyebrow">{T("Phần 1 / 4 · Reading", "Part 1 / 4 · Reading")}</span>
          <h3>{T("Đọc 3 đoạn, trả lời", `Reading — 3 passages`)} · {readingTotal} {T("câu", "questions")}</h3>
          <div className="note">{T("Làm hết 3 passage rồi bấm sang Listening. Cuộn xuống để đọc từng đoạn.", "Answer all 3 passages, then move on to Listening. Scroll for each passage.")}</div>
        </div>
        {readingBlocks.map((b, bi) => {
          const hasMH = b.passage.questions.some((q) => q.type === "MH");
          return (
          <div key={bi}>
            <div className="card">
              <span className="eyebrow">{b.passage.title}</span>
              <div className="reading-passage" style={{ marginTop: 8 }}>{b.passage.passage.map((p, i) => <p key={i} style={{ marginBottom: 10 }}>{hasMH && <b style={{ color: "var(--amber-deep)" }}>{i + 1}. </b>}{p}</p>)}</div>
            </div>
            <div className="card">
              {b.items.map(({ q, gi }) => {
                counter = gi + 1;
                return (
                  <div key={gi} style={{ marginBottom: 14 }}>
                    <div className="quiz-q" style={{ fontSize: 14 }}><span className="qix">{counter}.</span> {q.q}</div>
                    {q.type === "TFNG" || q.type === "YNG" ? (
                      <div className="opts">
                        {(q.type === "TFNG" ? TFNG : YNG).map((opt) => {
                          const sel = rAns[gi] === opt;
                          return <button key={opt} className={"opt" + (sel ? " correct" : "")} onClick={() => setRAns((p) => ({ ...p, [gi]: opt }))}>{opt}</button>;
                        })}
                      </div>
                    ) : q.type === "MH" ? (
                      <select value={rAns[gi] === undefined ? "" : String(rAns[gi])} onChange={(e) => setRAns((p) => ({ ...p, [gi]: e.target.value === "" ? "" : Number(e.target.value) }))} style={selStyle}>
                        <option value="">{T("— chọn heading —", "— choose heading —")}</option>
                        {(q.options || []).map((opt, oi) => <option key={oi} value={oi}>{opt}</option>)}
                      </select>
                    ) : (
                      <div className="opts">
                        {(q.options || []).map((opt, oi) => {
                          const sel = rAns[gi] === oi;
                          return <button key={oi} className={"opt" + (sel ? " correct" : "")} onClick={() => setRAns((p) => ({ ...p, [gi]: oi }))}>{opt}</button>;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          );
        })}
        <button className="btn" style={{ width: "100%" }} onClick={() => { window.scrollTo(0, 0); setPhase("listening"); }}>{T("Tiếp — Listening ›", "Next — Listening ›")}</button>
      </div>
    );
  }

  if (phase === "listening") {
    return (
      <div>
        <Timer minutes={30} label="Listening · ~30'" />
        <div className="card">
          <span className="eyebrow">{T("Phần 2 / 4 · Listening", "Part 2 / 4 · Listening")}</span>
          <h3>{T("Nghe 4 section", "Listening — 4 sections")} · {listeningTotal} {T("câu", "questions")}</h3>
          <div className="note">{T("Mỗi section có nút nghe riêng (giọng trình duyệt). Cố nghe 1 lần rồi trả lời để sát thực tế.", "Each section has its own play button (browser voice). Try to listen once for realism.")}</div>
        </div>
        {listeningBlocks.map((b, bi) => (
          <div key={bi} className="card">
            <span className="eyebrow">{b.section.title}</span>
            {b.section.youtubeId ? (
              <div style={{ margin: "10px 0 14px" }}>
                <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden", border: "1.5px solid var(--line)" }}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${b.section.youtubeId}`}
                    title={b.section.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                  />
                </div>
                {b.section.source && <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 6 }}>{T("Nguồn", "Source")}: {b.section.source}</div>}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10, margin: "10px 0 14px" }}>
                <button className="btn sm" onClick={() => play(bi, b.section.transcript)} disabled={playingSec === bi}>{playingSec === bi ? T("Đang đọc…", "Playing…") : "▶ " + T("Nghe", "Play")}</button>
                <button className="btn sm ghost" onClick={stop}>■ {T("Dừng", "Stop")}</button>
              </div>
            )}
            {b.items.map(({ q, gi }) => (
              <div key={gi} style={{ marginBottom: 14 }}>
                <div className="quiz-q" style={{ fontSize: 14 }}><span className="qix">{gi + 1}.</span> {q.q}</div>
                {q.type === "GAP" ? (
                  <input value={String(lAns[gi] ?? "")} onChange={(e) => setLAns((p) => ({ ...p, [gi]: e.target.value }))}
                    placeholder={T("điền từ/số", "word/number")}
                    style={{ padding: "8px 12px", borderRadius: 8, border: "1.5px solid var(--line)", fontSize: 14, fontFamily: "var(--body)" }} />
                ) : q.type === "MATCH" ? (
                  <select value={lAns[gi] === undefined ? "" : String(lAns[gi])} onChange={(e) => setLAns((p) => ({ ...p, [gi]: e.target.value === "" ? "" : Number(e.target.value) }))} style={selStyle}>
                    <option value="">{T("— chọn —", "— choose —")}</option>
                    {(q.options || []).map((opt, oi) => <option key={oi} value={oi}>{opt}</option>)}
                  </select>
                ) : (
                  <div className="opts">
                    {(q.options || []).map((opt, oi) => {
                      const sel = lAns[gi] === oi;
                      return <button key={oi} className={"opt" + (sel ? " correct" : "")} onClick={() => setLAns((p) => ({ ...p, [gi]: oi }))}>{opt}</button>;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <button className="btn" style={{ width: "100%" }} onClick={() => { stop(); window.scrollTo(0, 0); setPhase("writing1"); }}>{T("Tiếp — Writing Task 1 ›", "Next — Writing Task 1 ›")}</button>
      </div>
    );
  }

  if (phase === "writing1") {
    return <WritingPhase
      T={T} taskDef={test.writing.task1} value={essay1} onChange={setEssay1}
      part={T("Phần 3 / 4 · Writing Task 1", "Part 3 / 4 · Writing Task 1")} minutes={20}
      onNext={() => { window.scrollTo(0, 0); setPhase("writing2"); }}
      nextLabel={T("Tiếp — Writing Task 2 ›", "Next — Writing Task 2 ›")} />;
  }

  if (phase === "writing2") {
    return <WritingPhase
      T={T} taskDef={test.writing.task2} value={essay2} onChange={setEssay2}
      part={T("Phần 4 / 4 · Writing Task 2", "Part 4 / 4 · Writing Task 2")} minutes={40}
      onNext={finish}
      nextLabel={T("Nộp bài & xem band", "Submit & see band")} />;
  }

  if (phase === "grading") {
    return (
      <div className="card">
        <h3>{T("Đang chấm bài…", "Grading…")}</h3>
        <div className="note">{T("Reading & Listening chấm tức thì; Writing Task 1 + Task 2 do AI chấm — chờ chút.", "Reading & Listening are instant; Writing Task 1 + Task 2 are graded by AI — please wait.")}</div>
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
      {weak && <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.82)", marginTop: 6 }}><b>{T("Điểm yếu", "Weakness")}:</b> {weak}</div>}
    </div>
  );

  return (
    <div>
      <div className="card">
        <span className="eyebrow">{T("Kết quả ước tính", "Estimated result")} · {test.label[lang]}</span>
        <h3>{T("Band tổng (trung bình)", "Overall band (average)")}: <span style={{ color: "var(--amber-deep)" }}>{r.overall == null ? "—" : r.overall.toFixed(1)}</span></h3>
        <div className="grid g3" style={{ marginTop: 14 }}>
          <Skill name="Reading" band={r.reading.band} sub={`${r.reading.correct}/${r.reading.total} ${T("câu đúng", "correct")}`} weak={r.reading.weak} />
          <Skill name="Listening" band={r.listening.band} sub={`${r.listening.correct}/${r.listening.total} ${T("câu đúng", "correct")}`} weak={r.listening.weak} />
          <Skill name="Writing" band={r.writing.band} sub={r.writing.note || (r.writing.t1.band != null && r.writing.t2.band != null ? `T1 ${r.writing.t1.band} · T2 ${r.writing.t2.band}` : undefined)} weak={r.writing.weak} />
        </div>
        {saveMsg && <div className="note" style={{ marginTop: 14 }}>{saveMsg}</div>}
        <div className="note" style={{ marginTop: 10 }}>{T("Đây là ước tính. Reading/Listening chấm theo số câu đúng (40 câu mỗi kỹ năng); Writing = trung bình có trọng số Task 1 (×1) và Task 2 (×2) do AI chấm.",
          "This is an estimate. Reading/Listening are scored by correct answers (40 each); Writing = weighted average of Task 1 (×1) and Task 2 (×2), graded by AI.")}</div>
        <button className="btn ghost sm" style={{ marginTop: 14 }} onClick={() => window.location.reload()}>{T("Làm đề khác", "Take another test")}</button>
      </div>
    </div>
  );
}

/* ---------- Intro + lịch sử ---------- */
function Intro({ test, T, onStart }: { test: MT; T: (vi: string, en: string) => string; onStart: () => void }) {
  const { lang } = useLang();
  const [attempts, setAttempts] = useState<MockAttempt[]>([]);
  const [signedIn, setSignedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { (async () => { const { attempts, signedIn } = await loadMockAttempts(); setAttempts(attempts); setSignedIn(signedIn); setLoaded(true); })(); }, []);

  return (
    <div>
      <div className="card">
        <h3>{T("Bài thi thử đầy đủ", "Full mock test")} · {test.label[lang]}</h3>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 12 }}>
          {T("Mô phỏng một bài thi thật: Reading 40 câu (3 passage) · Listening 40 câu (4 section) · Writing Task 1 + Task 2. Hệ thống chọn một đề khác lần trước. Cuối bài có band từng kỹ năng + band tổng, và được lưu vào hồ sơ.",
             "A full exam simulation: Reading 40 questions (3 passages) · Listening 40 questions (4 sections) · Writing Task 1 + Task 2. The system picks a different test from last time. At the end you get a band per skill + overall, saved to your profile.")}
        </p>
        <div className="note">{T("Listening dùng giọng đọc của trình duyệt để ước lượng — không thay thế kỳ thi chính thức. Cấu hình ANTHROPIC_API_KEY để chấm Writing.",
          "Listening uses the browser voice for estimation — not a substitute for the official exam. Configure ANTHROPIC_API_KEY to grade Writing.")}</div>
        <button className="btn" style={{ marginTop: 14 }} onClick={onStart}>{T("Bắt đầu — Reading", "Start — Reading")}</button>
      </div>

      {loaded && attempts.length > 0 && (
        <div className="card">
          <span className="eyebrow">{T("Lịch sử thi thử", "Your attempts")}{signedIn ? "" : T(" (trên thiết bị này)", " (this device)")}</span>
          <table className="tbl" style={{ width: "100%", marginTop: 8 }}>
            <tbody>
              <tr style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--amber-deep)" }}>
                <td>{T("Ngày", "Date")}</td><td>{T("Đề", "Test")}</td><td>R</td><td>L</td><td>W</td><td>{T("Tổng", "Overall")}</td>
              </tr>
              {attempts.slice(0, 10).map((a, i) => (
                <tr key={a.id || i}>
                  <td style={{ whiteSpace: "nowrap" }}>{new Date(a.created_at).toLocaleDateString()}</td>
                  <td>{a.test_id}</td>
                  <td>{a.reading_band ?? "—"}</td>
                  <td>{a.listening_band ?? "—"}</td>
                  <td>{a.writing_band ?? "—"}</td>
                  <td><b>{a.overall_band ?? "—"}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------- Một phần Writing (Task 1 hoặc Task 2) ---------- */
function WritingPhase({ T, taskDef, value, onChange, part, minutes, onNext, nextLabel }: {
  T: (vi: string, en: string) => string;
  taskDef: MockWritingTask; value: string; onChange: (s: string) => void;
  part: string; minutes: number; onNext: () => void; nextLabel: string;
}) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const short = words < taskDef.minWords;
  return (
    <div>
      <Timer minutes={minutes} label={`Writing Task ${taskDef.task} · ${minutes}'`} />
      <div className="card">
        <span className="eyebrow">{part}</span>
        <h3 style={{ fontSize: 17 }}>{taskDef.type}</h3>
        <p style={{ fontStyle: "italic", marginBottom: 12 }}>{taskDef.prompt}</p>
        {taskDef.table && (
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <div className="anno" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber-deep)", marginBottom: 4 }}>{taskDef.table.caption}</div>
            <table className="tbl" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{taskDef.table.head.map((h, i) => <td key={i} style={{ fontWeight: 700 }}>{h}</td>)}</tr>
              </thead>
              <tbody>
                {taskDef.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((c, ci) => <td key={ci}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={taskDef.task === 1 ? 11 : 16}
          placeholder={T(`Viết bài (≥ ${taskDef.minWords} từ)…`, `Write your answer (≥ ${taskDef.minWords} words)…`)}
          style={{ width: "100%", padding: 16, borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 15, fontFamily: "var(--body)", lineHeight: 1.7, resize: "vertical", minHeight: taskDef.task === 1 ? 240 : 360 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, flexWrap: "wrap", gap: 10 }}>
          <span className="fc-count" style={{ color: short ? "var(--maroon)" : "var(--ink-soft)" }}>{words} {T("từ", "words")} {short ? T(`(tối thiểu ${taskDef.minWords})`, `(min ${taskDef.minWords})`) : "✓"}</span>
          <button className="btn" onClick={onNext}>{nextLabel}</button>
        </div>
      </div>
    </div>
  );
}
