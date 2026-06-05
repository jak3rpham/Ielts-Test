"use client";
import SpeakingStudio from "@/components/SpeakingStudio";
import { useLang } from "@/lib/i18n";
export default function SpeakingPage() {
  const en = useLang().lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Section 06" : "Mục 06"}</span>
        <h2>{en ? "Speaking — prompts & tactics" : "Speaking — bộ đề & chiến thuật"}</h2>
        <p>{en ? "All three parts, with band-7+ guidance per question and a phrase bank." : "Ba phần thi, kèm gợi ý band 7+ cho từng câu và ngân hàng cụm từ."}</p>
      </div>
      <SpeakingStudio />
    </section>
  );
}
