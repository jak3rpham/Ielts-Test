"use client";
import TipsList from "@/components/TipsList";
import { useLang } from "@/lib/i18n";
export default function TipsPage() {
  const { lang } = useLang();
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{lang === "en" ? "Section 07" : "Mục 07"}</span>
        <h2>{lang === "en" ? "Tips & Strategy" : "Mẹo & Chiến lược"}</h2>
        <p>{lang === "en" ? "Band-7+ strategies for each skill, aligned with the latest band descriptors. Tap a group to open." : "Chiến lược band 7+ theo từng kỹ năng (cập nhật theo band descriptor mới nhất). Bấm vào nhóm để mở."}</p>
      </div>
      <TipsList />
    </section>
  );
}
