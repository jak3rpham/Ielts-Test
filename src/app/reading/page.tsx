import ReadingStudio from "@/components/ReadingStudio";
import Timer from "@/components/Timer";
export default function ReadingPage() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Mục 04</span>
        <h2>Reading — luyện dạng câu hỏi</h2>
        <p>Các đoạn văn học thuật (nguyên gốc), kèm hai dạng câu hỏi: True / False / Not Given và trắc nghiệm. Đặt đồng hồ, chọn đề, trả lời xong bấm chấm.</p>
      </div>
      <Timer minutes={20} label="Reading (1 đoạn)" />
      <ReadingStudio />
    </section>
  );
}
