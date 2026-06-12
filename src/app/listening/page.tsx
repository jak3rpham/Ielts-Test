"use client";
import ListeningStudio from "@/components/ListeningStudio";
import { useLang } from "@/lib/i18n";
export default function ListeningPage() {
  const en = useLang().lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Section 03" : "Mục 03"}</span>
        <h2>{en ? "Listening — listen & answer" : "Listening — nghe & trả lời"}</h2>
        <p>{en ? "Embed a practice video you choose, set the timer, answer, then grade. Links to free official tests are below." : "Nhúng video luyện nghe bạn chọn, đặt đồng hồ, làm câu hỏi rồi chấm. Bên dưới là link tới các bộ đề chính thống miễn phí."}</p>
      </div>
      <ListeningStudio />
    </section>
  );
}
