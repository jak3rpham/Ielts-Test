"use client";
import MockTest from "@/components/MockTest";
import { useLang } from "@/lib/i18n";
export default function MockPage() {
  const en = useLang().lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Full mock" : "Thi thử đầy đủ"}</span>
        <h2>{en ? "Full mock test — all four skills" : "Thi thử đầy đủ — đủ 4 kỹ năng"}</h2>
        <p>{en
          ? "A full exam simulation: Reading 40 questions, Listening 40 questions, and Writing Task 1 + Task 2. A different test is drawn each time, and every attempt is saved to your profile."
          : "Mô phỏng bài thi thật: Reading 40 câu, Listening 40 câu, và Writing Task 1 + Task 2. Mỗi lần một đề khác, và mỗi lần thi đều được lưu vào hồ sơ."}</p>
      </div>
      <MockTest />
    </section>
  );
}
