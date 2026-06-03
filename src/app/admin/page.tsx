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
  const [tab, setTab] = useState<"reading" | "listening">("reading");
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
        <button className={"chip" + (tab === "reading" ? " active" : "")} onClick={() => setTab("reading")}>Reading</button>
        <button className={"chip" + (tab === "listening" ? " active" : "")} onClick={() => setTab("listening")}>Listening</button>
      </div>

      {msg && <div className="note" style={{ marginBottom: 14 }}>{msg}</div>}

      {tab === "reading" ? <ReadingForm onSave={save} /> : <ListeningForm onSave={save} />}

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
