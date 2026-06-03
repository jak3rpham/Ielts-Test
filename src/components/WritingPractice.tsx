// src/components/WritingPractice.tsx
"use client";
import { useState } from "react";
import { WRITING_PROMPTS } from "@/data/writing";
import { useProgress } from "@/lib/progress";

interface Crit { band: number; comment: string; }
interface GradeResult {
  task_response: Crit; coherence: Crit; lexical: Crit; grammar: Crit;
  overall: number; summary: string;
  corrections: { original: string; better: string; why: string }[];
  error?: string;
}

function bandClass(b: number) {
  if (b >= 7) return "b7";
  if (b >= 6) return "b6";
  return "b8";
}

export default function WritingPractice() {
  const { update } = useProgress();
  const [promptId, setPromptId] = useState(WRITING_PROMPTS[0].id);
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const prompt = WRITING_PROMPTS.find((p) => p.id === promptId)!;
  const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  async function grade() {
    setLoading(true);
    setErr(null);
    setResult(null);
    try {
      const r = await fetch("/api/grade", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: prompt.prompt, essay }),
      });
      const data = await r.json();
      if (!r.ok) {
        setErr(data.error || "Có lỗi khi chấm.");
      } else {
        setResult(data);
        update(`writing:${promptId}`, { overall: data.overall, at: Date.now() });
      }
    } catch (e) {
      setErr("Lỗi mạng: " + String(e));
    } finally {
      setLoading(false);
    }
  }

  const crits: [string, Crit][] = result
    ? [
        ["Task Response", result.task_response],
        ["Coherence & Cohesion", result.coherence],
        ["Lexical Resource", result.lexical],
        ["Grammar (GRA)", result.grammar],
      ]
    : [];

  return (
    <div className="card">
      <h3>Luyện viết &amp; chấm bằng AI</h3>
      <div className="chips">
        {WRITING_PROMPTS.map((p) => (
          <button key={p.id} className={"chip" + (p.id === promptId ? " active" : "")} onClick={() => setPromptId(p.id)}>
            {p.type}
          </button>
        ))}
      </div>
      <div className="note" style={{ marginTop: 0, marginBottom: 12 }}>
        <b>Đề ({prompt.type}):</b> {prompt.prompt}
      </div>
      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Viết bài của bạn ở đây (mục tiêu ~250 từ)…"
        rows={12}
        style={{ width: "100%", padding: "14px", borderRadius: 10, border: "1.5px solid var(--line)", fontSize: 14.5, fontFamily: "var(--body)", lineHeight: 1.6, resize: "vertical" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, flexWrap: "wrap", gap: 10 }}>
        <span className="fc-count">{words} từ {words < 250 && words > 0 ? "(nên ≥ 250)" : ""}</span>
        <button className="btn" onClick={grade} disabled={loading || words < 40}>
          {loading ? "Đang chấm…" : "Chấm bài bằng AI"}
        </button>
      </div>

      {err && <div className="vmis" style={{ marginTop: 14 }}>{err}</div>}

      {result && (
        <div style={{ marginTop: 18 }}>
          <div className="grid g2" style={{ marginBottom: 14 }}>
            {crits.map(([name, c]) => (
              <div className="card" key={name} style={{ margin: 0 }}>
                <h3 style={{ fontSize: 16, justifyContent: "space-between" }}>
                  {name} <span className={"pill " + bandClass(c.band)}>{c.band}</span>
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{c.comment}</p>
              </div>
            ))}
          </div>
          <div className="score-banner" style={{ marginBottom: 14 }}>
            <div className="scr">{result.overall}</div>
            <div>{result.summary}</div>
          </div>
          {result.corrections?.length > 0 && (
            <div className="card" style={{ margin: 0 }}>
              <h3 style={{ fontSize: 16 }}>Sửa lỗi trọng điểm</h3>
              {result.corrections.map((c, i) => (
                <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px dashed var(--line)" }}>
                  <div className="ex"><span className="bad">✗ {c.original}</span></div>
                  <div className="ex"><span className="good">✓ {c.better}</span></div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 3 }}>{c.why}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
