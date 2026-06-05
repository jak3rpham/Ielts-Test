import Link from "next/link";
import { QTYPES, SKILL_ORDER } from "@/data/qtypes";

const SKILL_VI: Record<string, string> = { Listening: "Listening", Reading: "Reading", Writing: "Writing", Speaking: "Speaking" };

export default function QTypesIndex() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Thư viện</span>
        <h2>Dạng đề theo kỹ năng</h2>
        <p>Mỗi dạng đề là một trang kiến thức sâu: cách làm, cấu trúc, từ vựng phổ quát + từ vựng riêng cho dạng, bài mẫu, lỗi thường gặp. Chọn dạng bạn muốn nghiên cứu.</p>
      </div>

      {SKILL_ORDER.map((skill) => {
        const items = QTYPES.filter((q) => q.skill === skill);
        const groups = Array.from(new Set(items.map((q) => q.group)));
        return (
          <div key={skill} style={{ marginBottom: 30 }}>
            <h3 style={{ fontFamily: "var(--display)", fontWeight: 900, fontSize: 24, marginBottom: 4 }}>{SKILL_VI[skill]}</h3>
            {groups.map((g) => (
              <div key={g} style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--amber-deep)", margin: "10px 0 8px" }}>{g}</div>
                <div className="grid g2">
                  {items.filter((q) => q.group === g).map((q) => (
                    <Link key={q.id} href={`/qtypes/${q.id}`} className="card" style={{ textDecoration: "none", display: "block", margin: 0, opacity: q.built ? 1 : 0.62 }}>
                      <h3 style={{ fontSize: 16, justifyContent: "space-between" }}>
                        {q.name.vi}
                        <span className={"pill " + (q.built ? "b7" : "b6")}>{q.built ? "Có sẵn" : "Sắp có"}</span>
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{q.summary.vi}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
