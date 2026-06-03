import ListeningStudio from "@/components/ListeningStudio";
export default function ListeningPage() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Mục 03</span>
        <h2>Listening — nghe &amp; trả lời</h2>
        <p>Nhúng video luyện nghe bạn chọn, đặt đồng hồ, làm câu hỏi rồi chấm. Bên dưới là link tới các bộ đề chính thống miễn phí.</p>
      </div>
      <ListeningStudio />
    </section>
  );
}
