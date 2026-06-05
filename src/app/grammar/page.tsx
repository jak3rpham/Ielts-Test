"use client";
import GrammarList from "@/components/GrammarList";
import { useLang } from "@/lib/i18n";
export default function GrammarPage() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Section 01 — Core" : "Mục 01 — Trọng tâm"}</span>
        <h2>{en ? "Grammar for band 7.5+" : "Ngữ pháp cho band 7.5+"}</h2>
        <p>{en ? "Grouped into four clusters, ordered from foundation to advanced. New to it? Start with 'Foundation'. Use the filter to see only the level you need." : "Gom theo 4 nhóm, xếp từ nền tảng đến nâng cao. Mới bắt đầu thì học nhóm 'Nền tảng' trước. Dùng bộ lọc để chỉ xem đúng mức bạn cần."}</p>
      </div>
      <GrammarList />
    </section>
  );
}
