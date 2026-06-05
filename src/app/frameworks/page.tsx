"use client";
import FrameworksList from "@/components/FrameworksList";
import { useLang } from "@/lib/i18n";
export default function FrameworksPage() {
  const { lang } = useLang();
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{lang === "en" ? "Section 08" : "Mục 08"}</span>
        <h2>{lang === "en" ? "Frameworks & Structures" : "Cấu trúc & Mô hình trả lời"}</h2>
        <p>{lang === "en" ? "Scaffolds for building Writing and Speaking answers. They are scaffolding, NOT scripts — use the frame, fill it with your own content." : "Khung dựng câu trả lời cho Writing và Speaking. Là giàn giáo, KHÔNG phải kịch bản học thuộc — dùng khung, tự điền nội dung của mình."}</p>
      </div>
      <FrameworksList />
    </section>
  );
}
