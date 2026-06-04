// src/app/page.tsx — Tổng quan + Lộ trình
import Link from "next/link";

const STEPS = [
  { n: "1", title: "Vá nền ngữ pháp", desc: "Mạo từ, danh từ đếm được, thì, giới từ. Sửa lỗi gốc trước khi luyện đề.", href: "/grammar", cta: "Vào nhóm Nền tảng" },
  { n: "2", title: "Dựng câu phức & mạch lạc", desc: "Mệnh đề quan hệ, điều kiện, liên kết câu — đa dạng cấu trúc cho band 7.", href: "/grammar", cta: "Nhóm Câu & mệnh đề" },
  { n: "3", title: "Mở rộng từ vựng theo chủ đề", desc: "Học theo collocation, đồng/trái nghĩa, lọc theo level. Không học từ rời.", href: "/vocab", cta: "Học từ vựng" },
  { n: "4", title: "Nắm mô hình trả lời", desc: "PEEL cho Writing, PPF / Answer-Reason-Example cho Speaking.", href: "/frameworks", cta: "Xem cấu trúc" },
  { n: "5", title: "Học mẹo từng kỹ năng", desc: "Chiến lược band 7+ cho cả 4 kỹ năng, tránh các lỗi giết điểm.", href: "/tips", cta: "Xem mẹo" },
  { n: "6", title: "Luyện đề có bấm giờ", desc: "Listening, Reading, Writing (AI chấm), Speaking — áp lực thời gian thật.", href: "/reading", cta: "Bắt đầu luyện" },
];

export default function Home() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Bắt đầu từ đâu</span>
        <h2>Lộ trình học band 7.5+</h2>
        <p>Chưa biết học gì trước? Đi theo 6 bước này từ trên xuống. Mỗi bước bấm vào để tới đúng mục.</p>
      </div>

      <div className="grid g2" style={{ marginBottom: 28 }}>
        {STEPS.map((s) => (
          <Link key={s.n + s.title} href={s.href} className="card" style={{ textDecoration: "none", display: "block", margin: 0 }}>
            <div className="route" style={{ borderBottom: "none", padding: 0 }}>
              <span className="rn">{s.n}</span>
              <div>
                <b style={{ fontSize: 16 }}>{s.title}</b>
                <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>{s.desc}</p>
                <span style={{ display: "inline-block", marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--amber-deep)" }}>{s.cta} →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="sec-head">
        <span className="eyebrow">Bản đồ band</span>
        <h2 style={{ fontSize: 28 }}>Khoảng cách 6.5 → 7.5 nằm ở đâu</h2>
      </div>
      <div className="grid g3" style={{ marginBottom: 22 }}>
        <div className="stat accent"><div className="lbl">Band mục tiêu</div><div className="big">7.5</div><div className="sub">≈ C1 — &quot;good user&quot;</div></div>
        <div className="stat"><div className="lbl">Câu không lỗi cần đạt</div><div className="big">≈ 50%+</div><div className="sub">tiêu chí Grammar band 7</div></div>
        <div className="stat maroon"><div className="lbl">Vốn từ để đọc tự do</div><div className="big">8000</div><div className="sub">word families</div></div>
      </div>
      <div className="card">
        <h3>Bốn tiêu chí chấm điểm</h3>
        <table className="tbl">
          <tbody>
            <tr><th>Tiêu chí</th><th>Band 7 đòi hỏi gì</th></tr>
            <tr><td>Task / Fluency</td><td>Trả lời đủ ý, phát triển sâu, mạch lạc xuyên suốt.</td></tr>
            <tr><td>Coherence</td><td>Liên kết logic, referencing tự nhiên, không lạm dụng linking words.</td></tr>
            <tr><td>Lexical</td><td>Dùng từ linh hoạt, có collocation và một ít từ ít phổ biến.</td></tr>
            <tr><td>Grammar</td><td>Đa dạng cấu trúc; phần lớn câu không có lỗi.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
