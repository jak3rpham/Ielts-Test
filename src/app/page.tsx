"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

const STEPS = [
  { n: "1", href: "/grammar", vi: { t: "Vá nền ngữ pháp", d: "Mạo từ, danh từ đếm được, thì, giới từ. Sửa lỗi gốc trước khi luyện đề.", c: "Vào nhóm Nền tảng" }, en: { t: "Fix your grammar base", d: "Articles, countable nouns, tenses, prepositions. Fix root errors before practising.", c: "Go to Foundation" } },
  { n: "2", href: "/grammar", vi: { t: "Dựng câu phức & mạch lạc", d: "Mệnh đề quan hệ, điều kiện, liên kết câu — đa dạng cấu trúc cho band 7.", c: "Nhóm Câu & mệnh đề" }, en: { t: "Build complex, cohesive sentences", d: "Relative clauses, conditionals, cohesion — structural range for band 7.", c: "Sentences & clauses" } },
  { n: "3", href: "/vocab", vi: { t: "Mở rộng từ vựng theo chủ đề", d: "Học theo collocation, đồng/trái nghĩa, lọc theo level. Không học từ rời.", c: "Học từ vựng" }, en: { t: "Grow topic vocabulary", d: "Learn by collocation, synonyms/antonyms, filtered by level. No isolated words.", c: "Study vocabulary" } },
  { n: "4", href: "/frameworks", vi: { t: "Nắm mô hình trả lời", d: "PEEL cho Writing, PPF / Answer-Reason-Example cho Speaking.", c: "Xem cấu trúc" }, en: { t: "Master answer frameworks", d: "PEEL for Writing, PPF / Answer-Reason-Example for Speaking.", c: "View frameworks" } },
  { n: "5", href: "/tips", vi: { t: "Học mẹo từng kỹ năng", d: "Chiến lược band 7+ cho cả 4 kỹ năng, tránh các lỗi giết điểm.", c: "Xem mẹo" }, en: { t: "Learn per-skill tips", d: "Band-7+ strategy for all four skills; avoid score-killing mistakes.", c: "View tips" } },
  { n: "6", href: "/reading", vi: { t: "Luyện đề có bấm giờ", d: "Listening, Reading, Writing (AI chấm), Speaking — áp lực thời gian thật.", c: "Bắt đầu luyện" }, en: { t: "Practise under timed conditions", d: "Listening, Reading, Writing (AI-graded), Speaking — real time pressure.", c: "Start practising" } },
];

export default function Home() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Where to start" : "Bắt đầu từ đâu"}</span>
        <h2>{en ? "A roadmap to band 7.5+" : "Lộ trình học band 7.5+"}</h2>
        <p>{en ? "Not sure what to study first? Follow these six steps top to bottom. Tap any step to jump to it." : "Chưa biết học gì trước? Đi theo 6 bước này từ trên xuống. Mỗi bước bấm vào để tới đúng mục."}</p>
      </div>

      <div className="grid g2" style={{ marginBottom: 28 }}>
        {STEPS.map((s) => {
          const c = en ? s.en : s.vi;
          return (
            <Link key={s.n + c.t} href={s.href} className="card" style={{ textDecoration: "none", display: "block", margin: 0 }}>
              <div className="route" style={{ borderBottom: "none", padding: 0 }}>
                <span className="rn">{s.n}</span>
                <div>
                  <b style={{ fontSize: 16 }}>{c.t}</b>
                  <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>{c.d}</p>
                  <span style={{ display: "inline-block", marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--amber-deep)" }}>{c.c} →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="sec-head">
        <span className="eyebrow">{en ? "Band map" : "Bản đồ band"}</span>
        <h2 style={{ fontSize: 28 }}>{en ? "Where the 6.5 → 7.5 gap lives" : "Khoảng cách 6.5 → 7.5 nằm ở đâu"}</h2>
      </div>
      <div className="grid g3" style={{ marginBottom: 22 }}>
        <div className="stat accent"><div className="lbl">{en ? "Target band" : "Band mục tiêu"}</div><div className="big">7.5</div><div className="sub">≈ C1 — &quot;good user&quot;</div></div>
        <div className="stat"><div className="lbl">{en ? "Error-free sentences needed" : "Câu không lỗi cần đạt"}</div><div className="big">≈ 50%+</div><div className="sub">{en ? "band-7 grammar criterion" : "tiêu chí Grammar band 7"}</div></div>
        <div className="stat maroon"><div className="lbl">{en ? "Words to read freely" : "Vốn từ để đọc tự do"}</div><div className="big">8000</div><div className="sub">word families</div></div>
      </div>
      <div className="card">
        <h3>{en ? "The four marking criteria" : "Bốn tiêu chí chấm điểm"}</h3>
        <table className="tbl">
          <tbody>
            <tr><th>{en ? "Criterion" : "Tiêu chí"}</th><th>{en ? "What band 7 demands" : "Band 7 đòi hỏi gì"}</th></tr>
            <tr><td>Task / Fluency</td><td>{en ? "Address all parts, develop ideas, stay coherent throughout." : "Trả lời đủ ý, phát triển sâu, mạch lạc xuyên suốt."}</td></tr>
            <tr><td>Coherence</td><td>{en ? "Logical links, natural referencing, no overuse of connectors." : "Liên kết logic, referencing tự nhiên, không lạm dụng linking words."}</td></tr>
            <tr><td>Lexical</td><td>{en ? "Flexible word use, collocations, some less common items." : "Dùng từ linh hoạt, có collocation và một ít từ ít phổ biến."}</td></tr>
            <tr><td>Grammar</td><td>{en ? "A range of structures; most sentences error-free." : "Đa dạng cấu trúc; phần lớn câu không có lỗi."}</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
