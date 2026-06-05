// src/app/writing/page.tsx
"use client";
import { WRITING_BANK } from "@/data/speaking";
import WritingPractice from "@/components/WritingPractice";
import Timer from "@/components/Timer";
import { useLang } from "@/lib/i18n";

export default function WritingPage() {
  const en = useLang().lang === "en";
  return (
    <section>
      <div className="sec-head">
        <span className="eyebrow">{en ? "Section 05" : "Mục 05"}</span>
        <h2>Writing Task 2</h2>
        <p>{en ? "Write an essay and let AI grade it on the four IELTS criteria. Below: band descriptors, a writing frame, a structure bank and an annotated model." : "Viết bài rồi để AI chấm theo 4 tiêu chí IELTS. Bên dưới là band descriptor, khung viết, ngân hàng cấu trúc và bài mẫu."}</p>
      </div>

      <Timer minutes={40} label="Writing Task 2" />
      <WritingPractice />

      <details className="acc" open>
        <summary><span>Band descriptor rút gọn (Task 2)</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <table className="tbl">
            <tbody>
              <tr><th>Band</th><th>Task Response</th><th>Coherence</th><th>Lexical</th><th>Grammar</th></tr>
              <tr><td>6</td><td>Đủ ý nhưng phát triển chưa đều</td><td>Liên kết có nhưng đôi chỗ máy móc</td><td>Đủ dùng, vài lỗi từ</td><td>Trộn câu đơn/phức, lỗi còn nhiều nhưng hiểu được</td></tr>
              <tr><td>7</td><td>Trả lời rõ, ý chính phát triển tốt</td><td>Sắp xếp logic, referencing tốt</td><td>Linh hoạt, có collocation &amp; từ ít gặp</td><td>Đa dạng cấu trúc; nhiều câu không lỗi</td></tr>
              <tr><td>8</td><td>Ý sâu, lập luận thuyết phục</td><td>Mạch lạc gần như hoàn hảo</td><td>Dùng từ rộng &amp; khéo, hiếm lỗi</td><td>Hầu hết câu không lỗi; kiểm soát tốt</td></tr>
            </tbody>
          </table>
        </div>
      </details>

      <details className="acc">
        <summary><span>Khung 4 đoạn (opinion essay)</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <div className="rule"><div className="rule-t">Mở bài (2–3 câu)</div><div className="ex">Paraphrase đề → nêu lập trường rõ ràng. Không &quot;in recent years&quot; sáo rỗng.</div></div>
          <div className="rule"><div className="rule-t">Thân 1 (lý do mạnh nhất)</div><div className="ex">Câu chủ đề → giải thích → ví dụ cụ thể → câu chốt nối lại luận điểm.</div></div>
          <div className="rule"><div className="rule-t">Thân 2 (lý do thứ hai / phản biện)</div><div className="ex">Cùng cấu trúc. Nếu là &quot;discuss both views&quot;, đây là chỗ xử lý phía còn lại.</div></div>
          <div className="rule"><div className="rule-t">Kết bài (2 câu)</div><div className="ex">Khẳng định lại quan điểm bằng từ khác, tổng kết — tuyệt đối không thêm ý mới.</div></div>
        </div>
      </details>

      <details className="acc">
        <summary><span>Ngân hàng cấu trúc band 7+</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <div className="bank">
            {WRITING_BANK.map((g) => (
              <div className="bgrp" key={g.heading}>
                <h4>{g.heading}</h4>
                <ul>
                  {g.phrases.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="note">Đừng nhồi hết vào một bài. Band 7 không thưởng cho số lượng linking word — nó thưởng cho sự tự nhiên. Chọn vài cụm dùng đúng chỗ.</div>
        </div>
      </details>

      <details className="acc">
        <summary><span>Bài mẫu có chú thích (band ~8)</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <p style={{ fontStyle: "italic", fontFamily: "var(--display)", fontSize: 15, marginBottom: 14 }}>
            Đề: <em>Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?</em>
          </p>
          <div className="model">
            <p><span className="anno">Mở bài — paraphrase + lập trường</span>The proposition that secondary schools should oblige their students to undertake unpaid community work is gaining traction. While I acknowledge the logistical concerns this raises, I am firmly convinced that the benefits to both students and society justify making it a mandatory component of the curriculum.</p>
            <p><span className="anno">Thân 1 — lý do + ví dụ + nominalisation</span>The most compelling argument in favour of compulsory service is its capacity to cultivate civic responsibility. Adolescents who spend time assisting in care homes or restoring public spaces develop an awareness of social need that no textbook can replicate. In my own city, a school programme pairing teenagers with elderly residents has reportedly reduced youth disengagement, a clear indication that exposure to real-world responsibility shapes character more effectively than abstract instruction.</p>
            <p><span className="anno">Thân 2 — nhượng bộ + phản biện</span>Admittedly, critics contend that forcing participation strips the act of its altruistic value. This argument, however, overlooks the fact that habits, once formed, frequently outlast the compulsion that created them. A student initially reluctant to volunteer may, over time, come to value the experience — an outcome that would never arise had the opportunity not been imposed in the first place.</p>
            <p><span className="anno">Kết bài — khẳng định lại</span>In light of the above, the case for embedding community service in school programmes is, to my mind, persuasive. Provided it is thoughtfully organised, such a policy stands to produce a generation that is not merely educated, but genuinely engaged with the world around it.</p>
          </div>
        </div>
      </details>
    </section>
  );
}
