// src/app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";

function slugId(prefix: string, title: string) {
  const base = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) || "item";
  return `${prefix}:${base}-${Math.random().toString(36).slice(2, 6)}`;
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid var(--line)", fontSize: 14, fontFamily: "var(--body)", marginTop: 4 };
const labelStyle: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--amber-deep)" };

type Row = { id: string; type: string; payload: { title?: string } };

export default function AdminPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<"ai" | "reading" | "listening" | "vocab" | "tips" | "frameworks">("ai");
  const [rows, setRows] = useState<Row[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const sb = getSupabaseBrowser();
    if (!sb) { setChecked(true); return; }
    sb.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setChecked(true);
      loadRows();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadRows() {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    const { data } = await sb.from("content").select("id, type, payload").order("created_at", { ascending: false });
    setRows((data as Row[]) || []);
  }
  async function save(id: string, type: string, payload: unknown) {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    const { error } = await sb.from("content").insert({ id, type, payload });
    setMsg(error ? "Lỗi lưu: " + error.message : "Đã lưu đề: " + id);
    if (!error) loadRows();
  }
  async function del(id: string) {
    const sb = getSupabaseBrowser();
    if (!sb) return;
    await sb.from("content").delete().eq("id", id);
    loadRows();
  }

  if (!supabaseEnabled)
    return (
      <section style={{ maxWidth: 560 }}>
        <div className="sec-head"><span className="eyebrow">Admin</span><h2>Nhập đề</h2></div>
        <div className="card"><h3>Cần bật Supabase</h3><p style={{ fontSize: 14, color: "var(--ink-soft)" }}>Trang admin lưu đề vào Supabase. Cấu hình env trước (xem README mục 2), hoặc dùng cách dán tay vào <code>src/data</code> (xem <code>TEMPLATES.md</code>).</p></div>
      </section>
    );

  if (checked && !email)
    return (
      <section style={{ maxWidth: 560 }}>
        <div className="sec-head"><span className="eyebrow">Admin</span><h2>Nhập đề</h2></div>
        <div className="card"><h3>Cần đăng nhập</h3><p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 12 }}>Chỉ tài khoản đã đăng nhập mới thêm đề được.</p><Link className="btn" href="/login">Đăng nhập</Link></div>
      </section>
    );

  return (
    <section>
      <div className="sec-head"><span className="eyebrow">Admin · {email}</span><h2>Nhập đề</h2><p>Điền form → lưu vào Supabase → đề hiện ngay cho học viên (gộp với đề trong file).</p></div>

      <div className="chips">
        <button className={"chip" + (tab === "ai" ? " active" : "")} onClick={() => setTab("ai")}>✨ Tạo đề bằng AI</button>
        <button className={"chip" + (tab === "reading" ? " active" : "")} onClick={() => setTab("reading")}>Reading</button>
        <button className={"chip" + (tab === "listening" ? " active" : "")} onClick={() => setTab("listening")}>Listening</button>
        <button className={"chip" + (tab === "vocab" ? " active" : "")} onClick={() => setTab("vocab")}>Từ vựng</button>
        <button className={"chip" + (tab === "tips" ? " active" : "")} onClick={() => setTab("tips")}>Mẹo</button>
        <button className={"chip" + (tab === "frameworks" ? " active" : "")} onClick={() => setTab("frameworks")}>Cấu trúc</button>
      </div>

      {msg && <div className="note" style={{ marginBottom: 14 }}>{msg}</div>}

      {tab === "ai" && <AiGenerator onSave={save} />}
      {tab === "reading" && <ReadingForm onSave={save} />}
      {tab === "listening" && <ListeningForm onSave={save} />}
      {tab === "vocab" && <JsonImporter type="vocab" label="chủ đề từ vựng" template={TPL_VOCAB} onSave={save} />}
      {tab === "tips" && <JsonImporter type="tips" label="nhóm mẹo" template={TPL_TIPS} onSave={save} />}
      {tab === "frameworks" && <JsonImporter type="frameworks" label="mô hình" template={TPL_FRAMEWORK} onSave={save} />}

      <div className="card" style={{ marginTop: 22 }}>
        <h3 style={{ fontSize: 17 }}>Đề đã lưu trên Supabase</h3>
        {rows.length === 0 && <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>Chưa có đề nào.</p>}
        {rows.map((r) => (
          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px dashed var(--line)", gap: 10 }}>
            <span style={{ fontSize: 13.5 }}><span className={"pill " + (r.type === "reading" ? "b7" : "b6")}>{r.type}</span> {r.payload?.title || r.id}</span>
            <button className="btn ghost sm" onClick={() => del(r.id)}>Xóa</button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Reading form ---------- */
function ReadingForm({ onSave }: { onSave: (id: string, type: string, payload: unknown) => void }) {
  const [title, setTitle] = useState("");
  const [paras, setParas] = useState([{ label: "A", text: "" }]);
  const [tfng, setTfng] = useState([{ q: "", answer: "True", explain: "" }]);
  const [mcq, setMcq] = useState([{ q: "", options: ["", "", ""], answer: 0, explain: "" }]);

  function build() {
    const id = slugId("reading", title);
    onSave(id, "reading", {
      id,
      title,
      paragraphs: paras.filter((p) => p.text.trim()),
      tfng: tfng.filter((t) => t.q.trim()),
      mcq: mcq.filter((m) => m.q.trim()).map((m) => ({ ...m, options: m.options.filter((o) => o.trim()) })),
    });
  }

  return (
    <div className="card">
      <h3>Đề Reading mới</h3>
      <label style={labelStyle}>Tiêu đề</label>
      <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="vd: The history of tea" />

      <h4 style={{ ...labelStyle, marginTop: 18, display: "block" }}>Đoạn văn</h4>
      {paras.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input style={{ ...inputStyle, width: 60, marginTop: 0 }} value={p.label} onChange={(e) => setParas((a) => a.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
          <textarea style={{ ...inputStyle, marginTop: 0 }} rows={3} value={p.text} placeholder="Dán nội dung đoạn vào đây…" onChange={(e) => setParas((a) => a.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))} />
        </div>
      ))}
      <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={() => setParas((a) => [...a, { label: String.fromCharCode(65 + a.length), text: "" }])}>+ Đoạn</button>

      <h4 style={{ ...labelStyle, marginTop: 18, display: "block" }}>Câu hỏi True / False / Not Given</h4>
      {tfng.map((t, i) => (
        <div key={i} style={{ marginTop: 8 }}>
          <input style={inputStyle} value={t.q} placeholder="Câu khẳng định…" onChange={(e) => setTfng((a) => a.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <select style={{ ...inputStyle, width: 140, marginTop: 0 }} value={t.answer} onChange={(e) => setTfng((a) => a.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))}>
              <option>True</option><option>False</option><option>Not Given</option>
            </select>
            <input style={{ ...inputStyle, marginTop: 0 }} value={t.explain} placeholder="Giải thích (tùy chọn)" onChange={(e) => setTfng((a) => a.map((x, j) => (j === i ? { ...x, explain: e.target.value } : x)))} />
          </div>
        </div>
      ))}
      <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={() => setTfng((a) => [...a, { q: "", answer: "True", explain: "" }])}>+ Câu TFNG</button>

      <h4 style={{ ...labelStyle, marginTop: 18, display: "block" }}>Câu hỏi trắc nghiệm</h4>
      {mcq.map((m, i) => (
        <div key={i} style={{ marginTop: 8, paddingBottom: 8, borderBottom: "1px dashed var(--line)" }}>
          <input style={inputStyle} value={m.q} placeholder="Câu hỏi…" onChange={(e) => setMcq((a) => a.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
          {m.options.map((o, oi) => (
            <div key={oi} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
              <input type="radio" name={`mcq-${i}`} checked={m.answer === oi} onChange={() => setMcq((a) => a.map((x, j) => (j === i ? { ...x, answer: oi } : x)))} />
              <input style={{ ...inputStyle, marginTop: 0 }} value={o} placeholder={`Lựa chọn ${oi + 1}` + (m.answer === oi ? " (đáp án)" : "")} onChange={(e) => setMcq((a) => a.map((x, j) => (j === i ? { ...x, options: x.options.map((y, k) => (k === oi ? e.target.value : y)) } : x)))} />
            </div>
          ))}
          <input style={inputStyle} value={m.explain} placeholder="Giải thích (tùy chọn)" onChange={(e) => setMcq((a) => a.map((x, j) => (j === i ? { ...x, explain: e.target.value } : x)))} />
        </div>
      ))}
      <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={() => setMcq((a) => [...a, { q: "", options: ["", "", ""], answer: 0, explain: "" }])}>+ Câu trắc nghiệm</button>

      <div style={{ marginTop: 18 }}>
        <button className="btn" onClick={build} disabled={!title.trim()}>Lưu đề Reading</button>
      </div>
    </div>
  );
}

/* ---------- Listening form ---------- */
function ListeningForm({ onSave }: { onSave: (id: string, type: string, payload: unknown) => void }) {
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [source, setSource] = useState("");
  const [durationMin, setDurationMin] = useState(10);
  const [qs, setQs] = useState([{ type: "fill", q: "", answer: "", options: ["", "", ""], explain: "" }]);

  function build() {
    const id = slugId("listening", title);
    onSave(id, "listening", {
      id, title, youtubeId: youtubeId.trim(), source, durationMin: Number(durationMin),
      questions: qs.filter((q) => q.q.trim()).map((q) => q.type === "choice"
        ? { type: "choice", q: q.q, answer: q.answer, options: q.options.filter((o) => o.trim()), explain: q.explain }
        : { type: "fill", q: q.q, answer: q.answer, explain: q.explain }),
    });
  }

  return (
    <div className="card">
      <h3>Đề Listening mới</h3>
      <label style={labelStyle}>Tiêu đề</label>
      <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="vd: Section 1 — Booking a room" />
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160 }}><label style={labelStyle}>YouTube ID</label><input style={inputStyle} value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} placeholder="vd: dQw4w9WgXcQ" /></div>
        <div style={{ width: 120 }}><label style={labelStyle}>Phút</label><input type="number" style={inputStyle} value={durationMin} onChange={(e) => setDurationMin(Number(e.target.value))} /></div>
      </div>
      <label style={{ ...labelStyle, display: "block", marginTop: 12 }}>Nguồn (ghi công)</label>
      <input style={inputStyle} value={source} onChange={(e) => setSource(e.target.value)} placeholder="vd: Kênh XYZ trên YouTube" />

      <h4 style={{ ...labelStyle, marginTop: 18, display: "block" }}>Câu hỏi</h4>
      {qs.map((q, i) => (
        <div key={i} style={{ marginTop: 8, paddingBottom: 8, borderBottom: "1px dashed var(--line)" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <select style={{ ...inputStyle, width: 130, marginTop: 0 }} value={q.type} onChange={(e) => setQs((a) => a.map((x, j) => (j === i ? { ...x, type: e.target.value } : x)))}>
              <option value="fill">Điền từ</option><option value="choice">Trắc nghiệm</option>
            </select>
            <input style={{ ...inputStyle, marginTop: 0 }} value={q.q} placeholder="Câu hỏi…" onChange={(e) => setQs((a) => a.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
          </div>
          {q.type === "choice" ? (
            <>
              {q.options.map((o, oi) => (
                <input key={oi} style={inputStyle} value={o} placeholder={`Lựa chọn ${oi + 1}`} onChange={(e) => setQs((a) => a.map((x, j) => (j === i ? { ...x, options: x.options.map((y, k) => (k === oi ? e.target.value : y)) } : x)))} />
              ))}
              <input style={inputStyle} value={q.answer} placeholder="Đáp án đúng (gõ đúng nội dung lựa chọn)" onChange={(e) => setQs((a) => a.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))} />
            </>
          ) : (
            <input style={inputStyle} value={q.answer} placeholder="Đáp án (từ cần điền)" onChange={(e) => setQs((a) => a.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))} />
          )}
          <input style={inputStyle} value={q.explain} placeholder="Giải thích (tùy chọn)" onChange={(e) => setQs((a) => a.map((x, j) => (j === i ? { ...x, explain: e.target.value } : x)))} />
        </div>
      ))}
      <button className="btn ghost sm" style={{ marginTop: 8 }} onClick={() => setQs((a) => [...a, { type: "fill", q: "", answer: "", options: ["", "", ""], explain: "" }])}>+ Câu hỏi</button>

      <div style={{ marginTop: 18 }}>
        <button className="btn" onClick={build} disabled={!title.trim()}>Lưu đề Listening</button>
      </div>
    </div>
  );
}

/* ---------- JSON importer (vocab / tips / frameworks) ---------- */
const TPL_VOCAB = `{
  "id": "topic-moi",
  "name": "Tên chủ đề",
  "cards": [
    {
      "id": "tu1", "word": "word", "pos": "verb", "level": "C1",
      "register": "formal", "skills": ["W","S"],
      "def": "nghĩa tiếng Việt",
      "example": "Câu ví dụ có <span class='hi'>word</span>.",
      "synonyms": ["syn1","syn2"], "antonyms": ["ant1"],
      "phrases": ["collocation 1","collocation 2"],
      "useCase": "Dùng khi nào"
    }
  ],
  "quiz": [
    { "q": "Câu hỏi?", "options": ["A","B","C"], "answer": 1, "explain": "Giải thích." }
  ]
}`;

const TPL_TIPS = `{
  "id": "nhom-moi",
  "name": "Tên nhóm mẹo",
  "band": "b7",
  "intro": "Giới thiệu ngắn.",
  "tips": [
    { "tip": "Tiêu đề mẹo", "detail": "Diễn giải chi tiết." }
  ]
}`;

const TPL_FRAMEWORK = `{
  "id": "mo-hinh-moi",
  "name": "Tên mô hình",
  "skill": "Writing",
  "when": "Dùng khi nào.",
  "steps": [
    { "letter": "P", "name": "Bước 1", "desc": "Mô tả bước." }
  ],
  "example": "Ví dụ áp dụng (có thể dùng <span class='hi'>...</span>).",
  "caveat": "Lưu ý khi dùng sai."
}`;

function JsonImporter({ type, label, template, onSave }: { type: string; label: string; template: string; onSave: (id: string, type: string, payload: unknown) => void }) {
  const [text, setText] = useState(template);
  const [err, setErr] = useState<string | null>(null);

  function save() {
    setErr(null);
    let obj;
    try {
      obj = JSON.parse(text);
    } catch (e) {
      setErr("JSON sai cú pháp: " + String(e));
      return;
    }
    if (!obj.id || typeof obj.id !== "string") {
      setErr("Thiếu trường 'id' (chuỗi, duy nhất).");
      return;
    }
    onSave(obj.id, type, obj);
  }

  return (
    <div className="card">
      <h3>Thêm {label} (dán JSON)</h3>
      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 10 }}>
        Sửa mẫu bên dưới, hoặc dán JSON bạn đã chuẩn bị (có thể nhờ Claude format từ nội dung thô). Đặt <code>id</code> mới, không trùng.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        rows={16}
        style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontFamily: "var(--mono)", fontSize: 12.5, lineHeight: 1.55, background: "#fbf6ee" }}
      />
      {err && <div className="vmis" style={{ marginTop: 10 }}>{err}</div>}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button className="btn" onClick={save}>Lưu</button>
        <button className="btn ghost sm" onClick={() => { setText(template); setErr(null); }}>Khôi phục mẫu</button>
      </div>
    </div>
  );
}

/* ---------- AI generator: YouTube/transcript -> câu hỏi gốc -> mock ---------- */
function AiGenerator({ onSave }: { onSave: (id: string, type: string, payload: unknown) => void }) {
  const [skill, setSkill] = useState<"listening" | "reading">("listening");
  // chung
  const [band, setBand] = useState("6.5–7.5");
  const [busy, setBusy] = useState<"" | "fetch" | "gen">("");
  const [err, setErr] = useState<string | null>(null);
  // listening (1 video = full 40 câu / 4 section)
  const [ytUrl, setYtUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [source, setSource] = useState("");
  const [transcript, setTranscript] = useState("");
  const [lTitle, setLTitle] = useState("");
  const [secJson, setSecJson] = useState(""); // sections JSON để QA
  // reading (1 passage = 1 part)
  const [part, setPart] = useState<1 | 2 | 3>(1);
  const [passage, setPassage] = useState("");
  const [rTitle, setRTitle] = useState("");
  const [qJson, setQJson] = useState(""); // questions JSON để QA

  async function fetchTranscript() {
    setErr(null); setBusy("fetch");
    try {
      const r = await fetch("/api/yt-transcript", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url: ytUrl }) });
      const d = await r.json();
      if (d.videoId) setYoutubeId(d.videoId);
      if (r.ok && d.transcript) setTranscript(d.transcript);
      else setErr(d.error || "Không lấy được transcript — dán tay vào ô bên dưới.");
    } catch (e) { setErr(String(e)); }
    setBusy("");
  }

  async function generate() {
    setErr(null); setBusy("gen"); setSecJson(""); setQJson("");
    const src = skill === "listening" ? transcript : passage;
    try {
      const r = await fetch("/api/generate-questions", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify(skill === "listening" ? { source: src, kind: "listening", band } : { source: src, kind: "reading", part, band }),
      });
      const d = await r.json();
      if (!r.ok) { setErr(d.error || "Không sinh được đề."); setBusy(""); return; }
      if (skill === "listening") {
        setSecJson(JSON.stringify(d.sections ?? d, null, 2));
        if (d.sections?.[0]?.title && !lTitle) setLTitle("Listening — " + (source || "video"));
      } else {
        setQJson(JSON.stringify(d.questions ?? d, null, 2));
        if (d.title && !rTitle) setRTitle(d.title);
      }
    } catch (e) { setErr(String(e)); }
    setBusy("");
  }

  function saveListening() {
    setErr(null);
    let sections;
    try { sections = JSON.parse(secJson); } catch (e) { setErr("JSON sections sai cú pháp: " + String(e)); return; }
    if (!Array.isArray(sections) || sections.length === 0) { setErr("Chưa có sections để lưu."); return; }
    if (!youtubeId.trim()) { setErr("Thiếu YouTube ID (embed video)."); return; }
    const total = sections.reduce((a: number, s: { questions?: unknown[] }) => a + (s.questions?.length || 0), 0);
    if (total !== 40) { if (!confirm(`Đang có ${total} câu (chuẩn là 40). Vẫn lưu?`)) return; }
    // gắn youtubeId vào section đầu để mock embed; các section dùng chung video
    const withVid = sections.map((s: object, i: number) => ({ ...s, youtubeId: i === 0 ? youtubeId.trim() : undefined, source: source.trim() }));
    const id = slugId("mocklistening", lTitle || youtubeId);
    onSave(id, "mocklistening_test", { youtubeId: youtubeId.trim(), source: source.trim(), title: lTitle.trim() || "Listening test", sections: withVid });
  }

  function saveReading() {
    setErr(null);
    let questions;
    try { questions = JSON.parse(qJson); } catch (e) { setErr("JSON câu hỏi sai cú pháp: " + String(e)); return; }
    if (!Array.isArray(questions) || questions.length === 0) { setErr("Chưa có câu hỏi để lưu."); return; }
    if (!rTitle.trim()) { setErr("Đặt tiêu đề passage."); return; }
    const paras = passage.split(/\n\s*\n+/).map((p) => p.trim()).filter(Boolean);
    if (paras.length === 0) { setErr("Passage trống."); return; }
    const id = slugId("mockreading", rTitle);
    onSave(id, "mockreading_part", { title: rTitle.trim(), passage: paras, questions, part });
  }

  return (
    <div className="card">
      <h3>✨ Tạo đề cho Mock bằng AI</h3>
      <div className="note" style={{ marginBottom: 14 }}>
        ⚠️ Câu hỏi AI sinh PHẢI kiểm tra tay trước khi lưu (đáp án/distractor có thể sai). Bản quyền: KHÔNG chép bộ câu hỏi có sẵn — chỉ dùng nguồn làm input. Reading: passage sẽ hiển thị nguyên văn, chỉ dán nội dung của bạn hoặc public-domain.
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button className={"chip" + (skill === "listening" ? " active" : "")} onClick={() => setSkill("listening")}>Listening — 1 video = 40 câu</button>
        <button className={"chip" + (skill === "reading" ? " active" : "")} onClick={() => setSkill("reading")}>Reading — 1 passage = 1 part</button>
      </div>

      {skill === "listening" ? (
        <>
          <label style={labelStyle}>Link YouTube (video listening đầy đủ 4 section)</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input style={inputStyle} value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} placeholder="https://youtu.be/..." />
            <button className="btn sm" style={{ whiteSpace: "nowrap", marginTop: 4 }} onClick={fetchTranscript} disabled={busy !== "" || !ytUrl.trim()}>{busy === "fetch" ? "Đang lấy…" : "Lấy transcript"}</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 150 }}><label style={labelStyle}>YouTube ID</label><input style={inputStyle} value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} placeholder="tự điền" /></div>
            <div style={{ flex: 1, minWidth: 150 }}><label style={labelStyle}>Nguồn (ghi công)</label><input style={inputStyle} value={source} onChange={(e) => setSource(e.target.value)} placeholder="vd: Kênh ABC" /></div>
            <div style={{ flex: 1, minWidth: 150 }}><label style={labelStyle}>Tiêu đề</label><input style={inputStyle} value={lTitle} onChange={(e) => setLTitle(e.target.value)} placeholder="vd: Listening Test 1" /></div>
          </div>
          <label style={{ ...labelStyle, display: "block", marginTop: 12 }}>Transcript (input — không hiển thị cho người học)</label>
          <textarea style={{ ...inputStyle, fontFamily: "var(--mono)", fontSize: 12.5 }} rows={6} value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Tự lấy bằng nút trên, hoặc dán tay…" />
        </>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {[1, 2, 3].map((p) => (
              <button key={p} className={"chip" + (part === p ? " active" : "")} onClick={() => setPart(p as 1 | 2 | 3)}>Part {p} {p === 1 ? "(dễ, 13 câu)" : p === 2 ? "(vừa, 13 câu)" : "(khó, 14 câu)"}</button>
            ))}
          </div>
          <label style={labelStyle}>Passage (nội dung gốc của bạn — hiển thị cho người học, cách đoạn bằng dòng trống)</label>
          <textarea style={inputStyle} rows={8} value={passage} onChange={(e) => setPassage(e.target.value)} placeholder="Dán đoạn văn…" />
          <label style={{ ...labelStyle, display: "block", marginTop: 10 }}>Tiêu đề passage</label>
          <input style={inputStyle} value={rTitle} onChange={(e) => setRTitle(e.target.value)} placeholder="vd: Passage 2 — Urban beekeeping" />
        </>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "flex-end" }}>
        <div style={{ width: 140 }}><label style={labelStyle}>Band mục tiêu</label>
          <select style={inputStyle} value={band} onChange={(e) => setBand(e.target.value)}><option>5.5–6.5</option><option>6.5–7.5</option><option>7.5–8.5</option></select>
        </div>
        <button className="btn" style={{ marginTop: 4 }} onClick={generate} disabled={busy !== "" || (skill === "listening" ? !transcript.trim() : !passage.trim())}>{busy === "gen" ? "Đang sinh…" : skill === "listening" ? "Sinh 40 câu" : "Sinh câu hỏi"}</button>
      </div>

      {err && <div className="vmis" style={{ marginTop: 12 }}>{err}</div>}

      {skill === "listening" && secJson && (
        <>
          <h4 style={{ ...labelStyle, marginTop: 18, display: "block" }}>4 sections (QA/sửa rồi lưu)</h4>
          <textarea spellCheck={false} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontFamily: "var(--mono)", fontSize: 12.5, lineHeight: 1.5, background: "#fbf6ee", marginTop: 4 }} rows={18} value={secJson} onChange={(e) => setSecJson(e.target.value)} />
          <div style={{ marginTop: 12 }}><button className="btn" onClick={saveListening}>Lưu vào Mock</button></div>
        </>
      )}
      {skill === "reading" && qJson && (
        <>
          <h4 style={{ ...labelStyle, marginTop: 18, display: "block" }}>Câu hỏi Part {part} (QA/sửa rồi lưu)</h4>
          <textarea spellCheck={false} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--line)", fontFamily: "var(--mono)", fontSize: 12.5, lineHeight: 1.5, background: "#fbf6ee", marginTop: 4 }} rows={16} value={qJson} onChange={(e) => setQJson(e.target.value)} />
          <div style={{ marginTop: 12 }}><button className="btn" onClick={saveReading}>Lưu vào Mock (Part {part})</button></div>
        </>
      )}
    </div>
  );
}
