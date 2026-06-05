"use client";
import MockTest from "@/components/MockTest";
import { useLang } from "@/lib/i18n";
export default function MockPage() {
  const en = useLang().lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Placement" : "Xếp band"}</span>
        <h2>{en ? "Mock test — estimate your band" : "Thi thử — ước tính band"}</h2>
        <p>{en
          ? "A quick 3-skill placement test (Reading · Listening · Writing) drawn at random from an original bank. Ideal for checking a learner's level before teaching."
          : "Bài thi thử nhanh 3 kỹ năng (Reading · Listening · Writing), rút ngẫu nhiên từ ngân hàng đề gốc. Phù hợp để kiểm tra trình độ người học trước khi dạy."}</p>
      </div>
      <MockTest />
    </section>
  );
}
