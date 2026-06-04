import GrammarList from "@/components/GrammarList";
export default function GrammarPage() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Mục 01 — Trọng tâm</span>
        <h2>Ngữ pháp cho band 7.5+</h2>
        <p>Gom theo 4 nhóm, xếp từ nền tảng đến nâng cao. Mới bắt đầu thì học nhóm "Nền tảng" trước. Dùng bộ lọc để chỉ xem đúng mức bạn cần.</p>
      </div>
      <GrammarList />
    </section>
  );
}
