import TipsList from "@/components/TipsList";
export default function TipsPage() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Mục 07</span>
        <h2>Mẹo &amp; Chiến lược</h2>
        <p>Chiến lược band 7+ theo từng kỹ năng (cập nhật theo band descriptor mới nhất). Bấm vào nhóm để mở.</p>
      </div>
      <TipsList />
    </section>
  );
}
