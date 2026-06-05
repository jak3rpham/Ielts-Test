// src/data/frameworks.ts
import type { LS } from "./types";

export interface FrameworkStep { letter?: string; name: LS; desc: LS; }
export interface Framework {
  id: string;
  name: LS;
  skill: "Writing" | "Speaking";
  when: LS;
  steps: FrameworkStep[];
  example?: LS;
  caveat?: LS;
}
const L = (vi: string, en: string): LS => ({ vi, en });

export const FRAMEWORKS: Framework[] = [
  {
    id: "intro-2-sentence", skill: "Writing",
    name: L("Mở bài 2 câu (Writing T2)", "Two-sentence introduction (Writing T2)"),
    when: L("Mọi dạng essay Task 2.", "Every Task 2 essay."),
    steps: [
      { letter: "1", name: L("Paraphrase đề", "Paraphrase the prompt"), desc: L("Viết lại chủ đề bằng từ đồng nghĩa và cấu trúc khác — không chép nguyên văn đề.", "Restate the topic with synonyms and a different structure — don't copy the prompt.") },
      { letter: "2", name: L("Nêu lập trường (thesis)", "State your position (thesis)"), desc: L("Câu thứ hai nói rõ quan điểm/hướng đi của bài.", "The second sentence states your stance or the direction of the essay.") },
    ],
    example: L("<span class='hi'>The growing reliance on automation has prompted debate over its impact on employment.</span> While some fear widespread job losses, I would argue that technology ultimately creates more opportunities than it destroys.", "<span class='hi'>The growing reliance on automation has prompted debate over its impact on employment.</span> While some fear widespread job losses, I would argue that technology ultimately creates more opportunities than it destroys."),
    caveat: L("Tránh mở bài sáo rỗng kiểu 'In this modern era…'. Vào thẳng chủ đề.", "Avoid empty openers like 'In this modern era…'. Get straight to the topic."),
  },
  {
    id: "peel", skill: "Writing",
    name: L("PEEL — đoạn thân bài", "PEEL — body paragraph"),
    when: L("Mỗi đoạn thân triển khai MỘT ý chính.", "Each body paragraph develops ONE main idea."),
    steps: [
      { letter: "P", name: L("Point — Câu chủ đề", "Point — topic sentence"), desc: L("Câu đầu nêu rõ ý chính của đoạn, cụ thể.", "The first sentence states the paragraph's main idea, specifically.") },
      { letter: "E", name: L("Explain — Giải thích", "Explain"), desc: L("2–3 câu phát triển: tại sao điều đó đúng, nó vận hành thế nào.", "2–3 sentences developing why it's true and how it works.") },
      { letter: "E", name: L("Example — Ví dụ", "Example"), desc: L("Một ví dụ cụ thể (từ đời thực của bạn cũng được).", "A concrete example (your own real life is fine).") },
      { letter: "L", name: L("Link — Chốt lại", "Link"), desc: L("Câu cuối nối ý về lại luận điểm/câu hỏi đề.", "A closing sentence tying back to the point or the prompt.") },
    ],
    example: L("<span class='hi'>P:</span> One benefit of remote work is improved work-life balance. <span class='hi'>E:</span> Without a commute, employees reclaim hours for family or rest, raising satisfaction. <span class='hi'>E:</span> In my own company, staff who switched reported lower stress. <span class='hi'>L:</span> This suggests flexible arrangements benefit both workers and employers.", "<span class='hi'>P:</span> One benefit of remote work is improved work-life balance. <span class='hi'>E:</span> Without a commute, employees reclaim hours for family or rest, raising satisfaction. <span class='hi'>E:</span> In my own company, staff who switched reported lower stress. <span class='hi'>L:</span> This suggests flexible arrangements benefit both workers and employers."),
    caveat: L("Đừng nhồi nhiều ý vào một đoạn. Một ý đào sâu mạnh hơn ba ý nông.", "Don't cram many ideas into one paragraph. One developed idea beats three shallow ones."),
  },
  {
    id: "essay-types", skill: "Writing",
    name: L("Chọn cấu trúc theo DẠNG đề", "Choosing structure by question TYPE"),
    when: L("Đọc đề xong, nhận dạng để chọn đúng cách triển khai.", "After reading the prompt, identify the type to pick the right approach."),
    steps: [
      { name: L("Opinion (agree/disagree)", "Opinion (agree/disagree)"), desc: L("Nêu lập trường rõ và GIỮ NGUYÊN suốt bài.", "State a clear stance and KEEP it throughout.") },
      { name: L("Discussion (both views)", "Discussion (both views)"), desc: L("Triển khai ĐỦ cả hai phía rồi nêu ý mình.", "Develop BOTH sides fully, then give your view.") },
      { name: L("Problem / Solution", "Problem / Solution"), desc: L("Nguyên nhân + giải pháp THỰC TẾ, cụ thể.", "Causes + REALISTIC, specific solutions.") },
      { name: L("Two-part question", "Two-part question"), desc: L("Mỗi đoạn thân trả lời một câu. Bỏ sót = tụt điểm.", "Each body answers one question. Skipping one drops your score.") },
    ],
    caveat: L("Lỗi giết điểm số 1 là trả lời thiếu phần đề hỏi. Gạch chân mọi yêu cầu.", "The number-one score killer is missing part of the task. Underline every requirement."),
  },
  {
    id: "conclusion", skill: "Writing",
    name: L("Kết bài 2 câu", "Two-sentence conclusion"),
    when: L("Đoạn cuối mọi essay.", "The final paragraph of any essay."),
    steps: [
      { letter: "1", name: L("Khẳng định lại quan điểm", "Restate your position"), desc: L("Tóm lại lập trường bằng từ ngữ KHÁC mở bài.", "Summarise your stance in DIFFERENT words from the intro.") },
      { letter: "2", name: L("Câu chốt", "Closing thought"), desc: L("Một câu tổng kết. KHÔNG thêm ý mới.", "One summarising sentence. Add NO new ideas.") },
    ],
    caveat: L("Kết bài dài dòng làm bạn cạn giờ soát lỗi. Ngắn gọn là đủ.", "A long conclusion eats your proofreading time. Keep it short."),
  },
  {
    id: "are-speaking", skill: "Speaking",
    name: L("Answer–Reason–Example (Speaking P1 & P3)", "Answer–Reason–Example (Speaking P1 & P3)"),
    when: L("Mọi câu hỏi Part 1 và Part 3.", "Every Part 1 and Part 3 question."),
    steps: [
      { letter: "A", name: L("Answer — Trả lời thẳng", "Answer directly"), desc: L("Trả lời trực tiếp câu hỏi trước, đừng vòng vo.", "Answer the question first, no waffling.") },
      { letter: "R", name: L("Reason — Lý do", "Reason"), desc: L("Giải thích tại sao.", "Explain why.") },
      { letter: "E", name: L("Example/Detail", "Example/Detail"), desc: L("Một chi tiết cụ thể hoặc ví dụ cá nhân để mở rộng.", "A concrete detail or personal example to expand.") },
    ],
    example: L("<b>Do you like cooking?</b> <span class='hi'>(A)</span> I do, actually. <span class='hi'>(R)</span> I find it relaxing after work. <span class='hi'>(E)</span> Lately I've been mastering Vietnamese dishes — my phở is finally getting there.", "<b>Do you like cooking?</b> <span class='hi'>(A)</span> I do, actually. <span class='hi'>(R)</span> I find it relaxing after work. <span class='hi'>(E)</span> Lately I've been mastering Vietnamese dishes — my phở is finally getting there."),
    caveat: L("Trả lời cụt ('Yes, I do.') là án tử cho Fluency. Luôn có ít nhất A-R-E.", "One-word answers ('Yes, I do.') are fatal for Fluency. Always give at least A-R-E."),
  },
  {
    id: "ppf-speaking", skill: "Speaking",
    name: L("PPF — Past / Present / Future (Speaking P2)", "PPF — Past / Present / Future (Speaking P2)"),
    when: L("Cue card Part 2, khi sợ cạn ý trước 2 phút.", "Part 2 cue cards, when you fear running out before 2 minutes."),
    steps: [
      { letter: "P", name: L("Past — Quá khứ", "Past"), desc: L("Bắt đầu, cách bạn gặp/biết nó (~30–40 giây).", "How you first encountered it (~30–40 sec).") },
      { letter: "P", name: L("Present — Hiện tại", "Present"), desc: L("Tình hình hiện giờ, vì sao bạn quan tâm (~60 giây).", "The current situation and why it matters to you (~60 sec).") },
      { letter: "F", name: L("Future — Tương lai", "Future"), desc: L("Dự định, viễn cảnh sắp tới (~20–30 giây).", "Your plans or what's ahead (~20–30 sec).") },
    ],
    caveat: L("Lợi ích phụ: khoe được nhiều thì. NHƯNG đừng máy móc — nếu nhắm band 8, áp PPF cứng cho mọi đề nghe rất gượng. Để các thì chuyển tự nhiên.", "Bonus: it shows tense range. BUT don't be mechanical — forcing PPF onto every cue card sounds stiff if you aim for band 8. Let tenses shift naturally."),
  },
  {
    id: "p3-mini-essay", skill: "Speaking",
    name: L("Part 3 như một essay thu nhỏ", "Part 3 as a mini-essay"),
    when: L("Part 3 — câu hỏi trừu tượng, đòi lập luận sâu hơn.", "Part 3 — abstract questions needing deeper argument."),
    steps: [
      { name: L("Opinion", "Opinion"), desc: L("Nêu quan điểm rõ ràng.", "State a clear opinion.") },
      { name: L("Reason + Explain", "Reason + Explain"), desc: L("Lý do + giải thích, dùng nhượng bộ: 'One reason may be…, although…'.", "Reason + explanation, with concession: 'One reason may be…, although…'.") },
      { name: L("Example", "Example"), desc: L("Ví dụ minh họa.", "An illustrative example.") },
      { name: L("Alternative view", "Alternative view"), desc: L("Nhắc phía còn lại để câu trả lời cân bằng: 'That said, some would argue…'.", "Acknowledge the other side for balance: 'That said, some would argue…'.") },
    ],
    caveat: L("Phao kéo dài khi bí: 'What's interesting about that is…' rồi nối sang ý liên quan.", "Stalling lifeline: 'What's interesting about that is…' then link to a related idea."),
  },
];
