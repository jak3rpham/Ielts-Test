"use client";
import ReadingStudio from "@/components/ReadingStudio";
import Timer from "@/components/Timer";
import { useLang } from "@/lib/i18n";
export default function ReadingPage() {
  const en = useLang().lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Section 04" : "Mục 04"}</span>
        <h2>{en ? "Reading — question-type practice" : "Reading — luyện dạng câu hỏi"}</h2>
        <p>{en ? "Original academic passages with two question types: True / False / Not Given and multiple choice. Set the timer, pick a test, then grade." : "Các đoạn văn học thuật (nguyên gốc), kèm hai dạng câu hỏi: True / False / Not Given và trắc nghiệm. Đặt đồng hồ, chọn đề, trả lời xong bấm chấm."}</p>
      </div>
      <Timer minutes={20} label={en ? "Reading (1 passage)" : "Reading (1 đoạn)"} />
      <ReadingStudio />
    </section>
  );
}
