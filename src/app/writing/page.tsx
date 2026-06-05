// src/app/writing/page.tsx
"use client";
import { WRITING_BANK } from "@/data/speaking";
import WritingPractice from "@/components/WritingPractice";
import Timer from "@/components/Timer";
import { useLang, pick } from "@/lib/i18n";

export default function WritingPage() {
  const { lang } = useLang();
  const en = lang === "en";
  const T = (vi: string, eng: string) => (en ? eng : vi);
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
        <summary><span>{T("Band descriptor rút gọn (Task 2)", "Band descriptors at a glance (Task 2)")}</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <table className="tbl">
            <tbody>
              <tr><th>Band</th><th>Task Response</th><th>Coherence</th><th>Lexical</th><th>Grammar</th></tr>
              <tr><td>6</td>
                <td>{T("Đủ ý nhưng phát triển chưa đều", "Addresses the task but development is uneven")}</td>
                <td>{T("Liên kết có nhưng đôi chỗ máy móc", "Linking present but sometimes mechanical")}</td>
                <td>{T("Đủ dùng, vài lỗi từ", "Adequate, with some word errors")}</td>
                <td>{T("Trộn câu đơn/phức, lỗi còn nhiều nhưng hiểu được", "Mix of simple/complex; errors frequent but understandable")}</td></tr>
              <tr><td>7</td>
                <td>{T("Trả lời rõ, ý chính phát triển tốt", "Clear response; main ideas well developed")}</td>
                <td>{T("Sắp xếp logic, referencing tốt", "Logical organisation; good referencing")}</td>
                <td>{T("Linh hoạt, có collocation & từ ít gặp", "Flexible; collocations and less common items")}</td>
                <td>{T("Đa dạng cấu trúc; nhiều câu không lỗi", "Varied structures; many error-free sentences")}</td></tr>
              <tr><td>8</td>
                <td>{T("Ý sâu, lập luận thuyết phục", "In-depth ideas; persuasive argument")}</td>
                <td>{T("Mạch lạc gần như hoàn hảo", "Near-seamless coherence")}</td>
                <td>{T("Dùng từ rộng & khéo, hiếm lỗi", "Wide, skilful vocabulary; rare errors")}</td>
                <td>{T("Hầu hết câu không lỗi; kiểm soát tốt", "Most sentences error-free; strong control")}</td></tr>
            </tbody>
          </table>
        </div>
      </details>

      <details className="acc">
        <summary><span>{T("Khung 4 đoạn (opinion essay)", "Four-paragraph frame (opinion essay)")}</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <div className="rule"><div className="rule-t">{T("Mở bài (2–3 câu)", "Introduction (2–3 sentences)")}</div><div className="ex">{T("Paraphrase đề → nêu lập trường rõ ràng. Không “in recent years” sáo rỗng.", "Paraphrase the prompt → state a clear position. Avoid the empty “in recent years”.")}</div></div>
          <div className="rule"><div className="rule-t">{T("Thân 1 (lý do mạnh nhất)", "Body 1 (strongest reason)")}</div><div className="ex">{T("Câu chủ đề → giải thích → ví dụ cụ thể → câu chốt nối lại luận điểm.", "Topic sentence → explanation → concrete example → a sentence linking back to the point.")}</div></div>
          <div className="rule"><div className="rule-t">{T("Thân 2 (lý do thứ hai / phản biện)", "Body 2 (second reason / counter-argument)")}</div><div className="ex">{T("Cùng cấu trúc. Nếu là “discuss both views”, đây là chỗ xử lý phía còn lại.", "Same structure. For “discuss both views”, this is where you handle the other side.")}</div></div>
          <div className="rule"><div className="rule-t">{T("Kết bài (2 câu)", "Conclusion (2 sentences)")}</div><div className="ex">{T("Khẳng định lại quan điểm bằng từ khác, tổng kết — tuyệt đối không thêm ý mới.", "Restate your position in different words and sum up — never add new ideas.")}</div></div>
        </div>
      </details>

      <details className="acc">
        <summary><span>{T("Ngân hàng cấu trúc band 7+", "Band-7+ structure bank")}</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <div className="bank">
            {WRITING_BANK.map((g, gi) => (
              <div className="bgrp" key={gi}>
                <h4>{pick(lang, g.heading)}</h4>
                <ul>{g.phrases.map((p, i) => (<li key={i}>{p}</li>))}</ul>
              </div>
            ))}
          </div>
          <div className="note">{T("Đừng nhồi hết vào một bài. Band 7 không thưởng cho số lượng linking word — nó thưởng cho sự tự nhiên. Chọn vài cụm dùng đúng chỗ.", "Don't cram them all in. Band 7 rewards no points for the number of linkers — it rewards naturalness. Pick a few and use them where they fit.")}</div>
        </div>
      </details>

      <details className="acc">
        <summary><span>{T("Bài mẫu có chú thích (band ~8)", "Annotated model answer (band ~8)")}</span><span className="chev">›</span></summary>
        <div className="acc-body">
          <p style={{ fontStyle: "italic", fontFamily: "var(--display)", fontSize: 15, marginBottom: 14 }}>
            {T("Đề:", "Prompt:")} <em>Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?</em>
          </p>
          <div className="model">
            <p><span className="anno">{T("Mở bài — paraphrase + lập trường", "Intro — paraphrase + position")}</span>The proposition that secondary schools should oblige their students to undertake unpaid community work is gaining traction. While I acknowledge the logistical concerns this raises, I am firmly convinced that the benefits to both students and society justify making it a mandatory component of the curriculum.</p>
            <p><span className="anno">{T("Thân 1 — lý do + ví dụ + nominalisation", "Body 1 — reason + example + nominalisation")}</span>The most compelling argument in favour of compulsory service is its capacity to cultivate civic responsibility. Adolescents who spend time assisting in care homes or restoring public spaces develop an awareness of social need that no textbook can replicate. In my own city, a school programme pairing teenagers with elderly residents has reportedly reduced youth disengagement, a clear indication that exposure to real-world responsibility shapes character more effectively than abstract instruction.</p>
            <p><span className="anno">{T("Thân 2 — nhượng bộ + phản biện", "Body 2 — concession + rebuttal")}</span>Admittedly, critics contend that forcing participation strips the act of its altruistic value. This argument, however, overlooks the fact that habits, once formed, frequently outlast the compulsion that created them. A student initially reluctant to volunteer may, over time, come to value the experience — an outcome that would never arise had the opportunity not been imposed in the first place.</p>
            <p><span className="anno">{T("Kết bài — khẳng định lại", "Conclusion — restate")}</span>In light of the above, the case for embedding community service in school programmes is, to my mind, persuasive. Provided it is thoughtfully organised, such a policy stands to produce a generation that is not merely educated, but genuinely engaged with the world around it.</p>
          </div>
        </div>
      </details>
    </section>
  );
}
