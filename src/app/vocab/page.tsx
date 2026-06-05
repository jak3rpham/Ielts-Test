"use client";
import VocabStudio from "@/components/VocabStudio";
import { useLang } from "@/lib/i18n";
export default function VocabPage() {
  const en = useLang().lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Section 02" : "Mục 02"}</span>
        <h2>{en ? "Vocabulary by topic" : "Từ vựng theo chủ đề"}</h2>
        <p>{en ? "Learn by collocation and context, not isolated words. Flip a card for the meaning + example, then take the quiz." : "Học theo collocation và ngữ cảnh, không học từ rời. Lật thẻ để xem nghĩa + ví dụ; rồi làm quiz để kiểm tra."}</p>
      </div>
      <VocabStudio />
    </section>
  );
}
