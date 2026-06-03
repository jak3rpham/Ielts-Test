import VocabStudio from "@/components/VocabStudio";
export default function VocabPage() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Mục 02</span>
        <h2>Từ vựng theo chủ đề</h2>
        <p>Học theo collocation và ngữ cảnh, không học từ rời. Lật thẻ để xem nghĩa + ví dụ; rồi làm quiz để kiểm tra.</p>
      </div>
      <VocabStudio />
    </section>
  );
}
