// src/app/leaderboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getSupabaseBrowser, supabaseEnabled } from "@/lib/supabase/client";
import { getMyProfile, setDisplayName } from "@/lib/profile";
import { useLang, pick } from "@/lib/i18n";

type Attempt = { user_id: string; test_id: string; overall_band: number | null; reading_band: number | null; listening_band: number | null; writing_band: number | null; created_at: string };
type Best = { userId: string; name: string; best: number; attempts: number; last: string };

function rel(d: string, lang: "vi" | "en") {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000), h = Math.floor(diff / 3600000), dd = Math.floor(diff / 86400000);
  if (m < 1) return lang === "vi" ? "vừa xong" : "just now";
  if (h < 1) return lang === "vi" ? `${m} phút trước` : `${m}m ago`;
  if (dd < 1) return lang === "vi" ? `${h} giờ trước` : `${h}h ago`;
  if (dd < 30) return lang === "vi" ? `${dd} ngày trước` : `${dd}d ago`;
  return new Date(d).toLocaleDateString();
}

export default function LeaderboardPage() {
  const { lang } = useLang();
  const T = (vi: string, en: string) => pick(lang, { vi, en });
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<{ userId: string; displayName: string | null; email: string | null } | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [saved, setSaved] = useState("");

  async function load() {
    const sb = getSupabaseBrowser();
    if (!sb) { setLoading(false); return; }
    const [{ data: att }, { data: profs }] = await Promise.all([
      sb.from("mock_attempts").select("user_id, test_id, overall_band, reading_band, listening_band, writing_band, created_at").order("created_at", { ascending: false }).limit(300),
      sb.from("profiles").select("id, display_name"),
    ]);
    setAttempts((att as Attempt[]) || []);
    const map: Record<string, string> = {};
    (profs || []).forEach((p: { id: string; display_name: string }) => { map[p.id] = p.display_name; });
    setNames(map);
    const prof = await getMyProfile();
    setMe(prof);
    setNameInput(prof?.displayName || "");
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function saveName() {
    const ok = await setDisplayName(nameInput);
    setSaved(ok ? T("Đã lưu tên.", "Name saved.") : T("Không lưu được.", "Could not save."));
    if (ok) load();
  }

  const nameOf = (id: string) => names[id] || T("Ẩn danh", "Anonymous");

  // Bảng xếp hạng: band tổng cao nhất mỗi người.
  const bestMap: Record<string, Best> = {};
  attempts.forEach((a) => {
    if (a.overall_band == null) return;
    const cur = bestMap[a.user_id];
    if (!cur) bestMap[a.user_id] = { userId: a.user_id, name: nameOf(a.user_id), best: a.overall_band, attempts: 1, last: a.created_at };
    else { cur.attempts++; cur.best = Math.max(cur.best, a.overall_band); if (a.created_at > cur.last) cur.last = a.created_at; }
  });
  const board = Object.values(bestMap).sort((a, b) => b.best - a.best);
  const recent = attempts.slice(0, 15);

  if (!supabaseEnabled)
    return <section style={{ maxWidth: 640 }}><div className="sec-head"><span className="eyebrow">Leaderboard</span><h2>{T("Bảng xếp hạng", "Leaderboard")}</h2></div><div className="card"><p style={{ fontSize: 14, color: "var(--ink-soft)" }}>{T("Cần bật Supabase.", "Requires Supabase.")}</p></div></section>;

  return (
    <section style={{ maxWidth: 760 }}>
      <div className="sec-head"><span className="eyebrow">{T("Cộng đồng", "Community")}</span><h2>{T("Bảng xếp hạng", "Leaderboard")}</h2></div>
      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginBottom: 16 }}>
        {T("Công khai: mọi người học chung thấy thành tích và hoạt động gần đây của nhau (hiển thị bằng tên, không phải email).",
           "Public: everyone learning together can see each other's results and recent activity (shown by name, not email).")}
      </p>

      {me ? (
        <div className="card">
          <span className="eyebrow">{T("Tên hiển thị của bạn", "Your display name")}</span>
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} maxLength={40} placeholder={T("Tên hiển thị", "Display name")}
              style={{ flex: 1, minWidth: 180, padding: "9px 12px", borderRadius: 9, border: "1.5px solid var(--line)", fontSize: 14, fontFamily: "var(--body)" }} />
            <button className="btn sm" onClick={saveName}>{T("Lưu tên", "Save name")}</button>
          </div>
          {saved && <div className="note" style={{ marginTop: 8 }}>{saved}</div>}
        </div>
      ) : (
        <div className="note" style={{ marginBottom: 16 }}>{T("Đăng nhập và làm 1 bài thi thử để xuất hiện trên bảng xếp hạng.", "Sign in and take a mock test to appear on the leaderboard.")}</div>
      )}

      {loading ? <div className="card"><p>{T("Đang tải…", "Loading…")}</p></div> : (
        <>
          <div className="card">
            <span className="eyebrow">{T("Xếp hạng theo band tổng cao nhất", "Ranked by best overall band")}</span>
            {board.length === 0 ? <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 8 }}>{T("Chưa có ai hoàn thành bài thi.", "No completed tests yet.")}</p> : (
              <table className="tbl" style={{ width: "100%", marginTop: 10 }}>
                <tbody>
                  <tr style={{ fontFamily: "var(--mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".07em", color: "var(--amber-deep)" }}>
                    <td>#</td><td>{T("Tên", "Name")}</td><td>{T("Band cao nhất", "Best band")}</td><td>{T("Số lần", "Attempts")}</td><td>{T("Gần nhất", "Last")}</td>
                  </tr>
                  {board.map((b, i) => (
                    <tr key={b.userId} style={me && b.userId === me.userId ? { background: "var(--amber-soft)", fontWeight: 700 } : undefined}>
                      <td>{i + 1}</td><td>{b.name}{me && b.userId === me.userId ? T(" (bạn)", " (you)") : ""}</td>
                      <td><b style={{ color: "var(--amber-deep)" }}>{b.best.toFixed(1)}</b></td><td>{b.attempts}</td><td style={{ whiteSpace: "nowrap" }}>{rel(b.last, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="card">
            <span className="eyebrow">{T("Hoạt động gần đây", "Recent activity")}</span>
            {recent.length === 0 ? <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 8 }}>—</p> : (
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                {recent.map((a, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontSize: 13.5, borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
                    <span><b>{nameOf(a.user_id)}</b> {T("thi đề", "took test")} {a.test_id} — <b style={{ color: "var(--amber-deep)" }}>{a.overall_band?.toFixed(1) ?? "—"}</b>
                      <span style={{ color: "var(--ink-soft)" }}> (R{a.reading_band ?? "—"} · L{a.listening_band ?? "—"} · W{a.writing_band ?? "—"})</span>
                    </span>
                    <span style={{ color: "var(--ink-soft)", whiteSpace: "nowrap" }}>{rel(a.created_at, lang)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
