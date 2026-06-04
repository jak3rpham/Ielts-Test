// src/data/frameworks.ts

export interface FrameworkStep {
  letter?: string;
  name: string;
  desc: string;
}
export interface Framework {
  id: string;
  name: string;
  skill: "Writing" | "Speaking";
  when: string; // dùng khi nào
  steps: FrameworkStep[];
  example?: string; // ví dụ áp dụng (HTML cho phép <span class='hi'>)
  caveat?: string; // cảnh báo dùng sai
}

export const FRAMEWORKS: Framework[] = [
  {
    id: "intro-2-sentence",
    name: "Mở bài 2 câu (Writing T2)",
    skill: "Writing",
    when: "Mọi dạng essay Task 2.",
    steps: [
      { letter: "1", name: "Paraphrase đề", desc: "Viết lại chủ đề của đề bằng từ đồng nghĩa và cấu trúc khác — không chép lại nguyên văn đề." },
      { letter: "2", name: "Nêu lập trường (thesis)", desc: "Câu thứ hai nói rõ quan điểm/hướng đi của bài. Giám khảo phải thấy ngay bạn sẽ lập luận gì." },
    ],
    example: "<span class='hi'>The growing reliance on automation has prompted debate over its impact on employment.</span> While some fear widespread job losses, I would argue that technology ultimately creates more opportunities than it destroys.",
    caveat: "Tránh mở bài sáo rỗng kiểu 'In this modern era…' hay 'There are many reasons why…'. Vào thẳng chủ đề.",
  },
  {
    id: "peel",
    name: "PEEL — đoạn thân bài",
    skill: "Writing",
    when: "Mỗi đoạn thân bài triển khai MỘT ý chính.",
    steps: [
      { letter: "P", name: "Point — Câu chủ đề", desc: "Câu đầu nêu rõ ý chính của đoạn. Cụ thể, không mơ hồ: 'One major benefit of… is…'." },
      { letter: "E", name: "Explain — Giải thích", desc: "2–3 câu phát triển: tại sao điều đó đúng, nó vận hành thế nào." },
      { letter: "E", name: "Example — Ví dụ", desc: "Một ví dụ cụ thể (từ đời thực của bạn cũng được — giám khảo không kiểm chứng)." },
      { letter: "L", name: "Link — Chốt lại", desc: "Câu cuối nối ý về lại luận điểm/câu hỏi đề, dùng 'so', 'therefore', 'as a result'." },
    ],
    example: "<span class='hi'>P:</span> One significant benefit of remote work is improved work-life balance. <span class='hi'>E:</span> Without a daily commute, employees reclaim hours that can be spent on family or rest, which in turn raises job satisfaction. <span class='hi'>E:</span> In my own company, staff who switched to working from home reported noticeably lower stress. <span class='hi'>L:</span> This suggests that flexible arrangements benefit not only workers but also the organisations that employ them.",
    caveat: "Đừng nhồi nhiều ý vào một đoạn (lỗi 'liệt kê ý hời hợt'). Một ý đào sâu mạnh hơn ba ý nông. Độ sâu thắng độ rộng.",
  },
  {
    id: "essay-types",
    name: "Chọn cấu trúc theo DẠNG đề",
    skill: "Writing",
    when: "Đọc đề xong, nhận dạng để chọn đúng cách triển khai.",
    steps: [
      { name: "Opinion (agree/disagree)", desc: "Nêu lập trường rõ từ mở bài và GIỮ NGUYÊN suốt bài. 2 đoạn thân cùng bảo vệ quan điểm (hoặc 1 đoạn nhượng bộ)." },
      { name: "Discussion (both views)", desc: "Đoạn 1 trình bày phía A khách quan, đoạn 2 phía B, rồi nêu ý mình. Phải triển khai ĐỦ cả hai phía, lệch một bên thường kẹt band 6." },
      { name: "Problem / Solution", desc: "Đoạn 1 nêu nguyên nhân/vấn đề, đoạn 2 đề giải pháp THỰC TẾ và cụ thể. Chỉ liệt kê vấn đề là không đủ." },
      { name: "Two-part question", desc: "Đề hỏi 2 câu → mỗi đoạn thân trả lời một câu. Bỏ sót một câu = partial task response, tụt điểm." },
    ],
    caveat: "Lỗi giết điểm số 1 là trả lời thiếu phần đề hỏi. Gạch chân mọi yêu cầu trong đề trước khi viết.",
  },
  {
    id: "conclusion",
    name: "Kết bài 2 câu",
    skill: "Writing",
    when: "Đoạn cuối mọi essay.",
    steps: [
      { letter: "1", name: "Khẳng định lại quan điểm", desc: "Tóm lại lập trường bằng từ ngữ KHÁC mở bài (không lặp y nguyên)." },
      { letter: "2", name: "Câu chốt", desc: "Một câu tổng kết/nhận định cuối. Tuyệt đối KHÔNG thêm ý mới." },
    ],
    caveat: "Kết bài dài dòng làm bạn cạn giờ soát lỗi. Ngắn gọn 2–3 câu là đủ.",
  },
  {
    id: "are-speaking",
    name: "Answer–Reason–Example (Speaking P1 & P3)",
    skill: "Speaking",
    when: "Mọi câu hỏi Part 1 và Part 3. Cứu tinh khi gặp câu bất ngờ.",
    steps: [
      { letter: "A", name: "Answer — Trả lời thẳng", desc: "Trả lời trực tiếp câu hỏi trước, đừng vòng vo." },
      { letter: "R", name: "Reason — Lý do", desc: "Giải thích tại sao." },
      { letter: "E", name: "Example/Detail — Ví dụ/chi tiết", desc: "Một chi tiết cụ thể hoặc ví dụ cá nhân để mở rộng." },
    ],
    example: "<b>Do you like cooking?</b> <span class='hi'>(A)</span> I do, actually. <span class='hi'>(R)</span> I find it relaxing after a long day at work. <span class='hi'>(E)</span> Lately I've been trying to master Vietnamese dishes — my phở is finally getting there.",
    caveat: "Trả lời một câu cụt ('Yes, I do.') là án tử cho điểm Fluency. Luôn có ít nhất A-R-E.",
  },
  {
    id: "ppf-speaking",
    name: "PPF — Past / Present / Future (Speaking P2)",
    skill: "Speaking",
    when: "Cue card Part 2, khi sợ cạn ý trước 2 phút.",
    steps: [
      { letter: "P", name: "Past — Quá khứ", desc: "Bắt đầu, cách bạn gặp/biết nó, tình trạng trước đây (~30–40 giây)." },
      { letter: "P", name: "Present — Hiện tại", desc: "Tình hình hiện giờ, vì sao bạn thích/quan tâm (~60 giây)." },
      { letter: "F", name: "Future — Tương lai", desc: "Dự định, viễn cảnh sắp tới (~20–30 giây)." },
    ],
    example: "Chủ đề 'a skill you want to learn': <span class='hi'>Past</span> — how you first became interested; <span class='hi'>Present</span> — why it matters to you now; <span class='hi'>Future</span> — how you'll learn it and what it would change.",
    caveat: "Lợi ích phụ: dùng đủ 3 thì giúp khoe được nhiều cấu trúc ngữ pháp. NHƯNG đừng máy móc — nếu nhắm band 8, áp PPF cứng nhắc cho mọi đề nghe rất gượng và có thể lạc khỏi chủ đề chính. Để các thì chuyển TỰ NHIÊN, đừng ép.",
  },
  {
    id: "p3-mini-essay",
    name: "Part 3 như một essay thu nhỏ",
    skill: "Speaking",
    when: "Part 3 — câu hỏi trừu tượng, đòi lập luận sâu hơn.",
    steps: [
      { name: "Opinion", desc: "Nêu quan điểm rõ ràng." },
      { name: "Reason + Explain", desc: "Lý do + giải thích (dùng nominalisation, nhượng bộ: 'One reason may be…, although…')." },
      { name: "Example", desc: "Ví dụ minh họa." },
      { name: "Alternative view", desc: "Nhắc phía còn lại để câu trả lời cân bằng, sâu: 'That said, some would argue…'." },
    ],
    caveat: "Phao kéo dài khi bí: 'What's interesting about that is…' rồi nối sang ý liên quan.",
  },
];
