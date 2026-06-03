// src/app/page.tsx — Tổng quan (server component)
export default function Home() {
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">Bản đồ band 7.5</span>
        <h2>Khoảng cách giữa 6.5 và 7.5 nằm ở đâu</h2>
        <p>Không phải ở việc biết thêm từ &quot;khó&quot;. Nó nằm ở độ chính xác của ngữ pháp, độ linh hoạt khi diễn đạt, và khả năng kiểm soát từ — đúng những thứ bộ này tập trung vào.</p>
      </div>
      <div className="grid g3" style={{ marginBottom: 22 }}>
        <div className="stat accent"><div className="lbl">Band mục tiêu</div><div className="big">7.5</div><div className="sub">≈ C1 — &quot;good user&quot;</div></div>
        <div className="stat"><div className="lbl">Câu không lỗi cần đạt</div><div className="big">≈ 50%+</div><div className="sub">tiêu chí Grammar band 7</div></div>
        <div className="stat maroon"><div className="lbl">Vốn từ để đọc tự do</div><div className="big">8000</div><div className="sub">word families, không cần từ điển</div></div>
      </div>
      <div className="grid g2">
        <div className="card">
          <h3>Bốn tiêu chí chấm điểm</h3>
          <table className="tbl">
            <tbody>
              <tr><th>Tiêu chí</th><th>Band 7 đòi hỏi gì</th></tr>
              <tr><td>Task / Fluency</td><td>Trả lời đủ ý, phát triển sâu, mạch lạc xuyên suốt.</td></tr>
              <tr><td>Coherence</td><td>Liên kết logic, dùng referencing tự nhiên, không lạm dụng linking words.</td></tr>
              <tr><td>Lexical</td><td>Dùng từ linh hoạt, có collocation và một ít từ ít phổ biến.</td></tr>
              <tr><td>Grammar</td><td>Đa dạng cấu trúc; phần lớn câu không có lỗi.</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Lộ trình gợi ý</h3>
          <div className="route"><span className="rn">1</span><div><b>Vá nền ngữ pháp</b><p>Articles, thì, mệnh đề quan hệ, câu phức — sửa lỗi hệ thống trước khi luyện đề.</p></div></div>
          <div className="route"><span className="rn">2</span><div><b>Mở rộng từ theo chủ đề</b><p>Học collocation, không học từ rời. Tập trung dải tần suất 3000–5000.</p></div></div>
          <div className="route"><span className="rn">3</span><div><b>Viết &amp; nói có phản hồi</b><p>Mỗi bài viết phải được soi theo band descriptor, không viết cho có.</p></div></div>
        </div>
      </div>
      <div className="note">Mẹo dùng để dạy: mỗi tab là một buổi học độc lập. Khi đăng nhập (sau khi cấu hình Supabase), tiến độ quiz được lưu theo từng học viên; chưa cấu hình thì lưu tạm trên máy.</div>
    </section>
  );
}
