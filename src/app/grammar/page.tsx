import GrammarList from "@/components/GrammarList";
export default function GrammarPage() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Mục 01 — Trọng tâm</span>
        <h2>Ngữ pháp cho band 7.5+</h2>
        <p>Tám cụm cấu trúc tách band 6 khỏi band 7+. Mỗi bài: quy tắc, ví dụ đúng/sai, lỗi người Việt hay mắc, và quiz chấm ngay. Bấm vào tiêu đề để mở.</p>
      </div>
      <GrammarList />
    </section>
  );
}
