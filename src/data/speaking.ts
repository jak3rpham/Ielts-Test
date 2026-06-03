// src/data/speaking.ts
import { SpeakingPart } from "./types";

export const SPEAKING: SpeakingPart[] = [
  {
    id: "part1",
    name: "Part 1 — Khởi động",
    type: "qa",
    items: [
      { q: "Do you work or are you a student?", tip: "Trả lời thẳng + thêm 1 chi tiết. Đừng cụt lủn: 'I work as a… and what I enjoy most is…'" },
      { q: "What do you usually do in your free time?", tip: "Dùng thì hiện tại đơn cho thói quen + một collocation: 'I tend to unwind by…'" },
      { q: "Is your hometown a good place to live?", tip: "Nêu quan điểm + lý do + so sánh nhẹ. Tránh trả lời 'yes' rồi im." },
    ],
  },
  {
    id: "part2",
    name: "Part 2 — Cue card",
    type: "cue",
    cue: {
      title: "Describe a skill you would like to learn.",
      bullets: ["what the skill is", "why you want to learn it", "how you would learn it", "and explain how it would benefit you"],
      tip: "Có 1 phút chuẩn bị. Ghi 4 từ khóa theo 4 gạch đầu dòng. Nói 1.5–2 phút, dùng quá khứ/tương lai linh hoạt và ít nhất một câu điều kiện ('If I learned it, I would…').",
    },
  },
  {
    id: "part3",
    name: "Part 3 — Thảo luận",
    type: "qa",
    items: [
      { q: "Why do some people find it hard to learn new skills as adults?", tip: "Đây là phần 'academic'. Dùng nominalisation + nhượng bộ: 'One reason may be…, although…'" },
      { q: "Should governments fund adult education? Why?", tip: "Nêu lập trường rõ + 2 lý do + ví dụ. Dùng cụm band 7: 'There is a compelling case for…'" },
      { q: "How might technology change the way we learn in the future?", tip: "Dùng tương lai + suy đoán: 'It is likely that…', 'This could potentially…'" },
    ],
  },
];

export const SPEAKING_PHRASES = [
  "To be honest, …",
  "I suppose what I'd say is…",
  "It really depends on…",
  "Off the top of my head, …",
  "That's an interesting question — I'd say…",
  "If I had to choose, I'd go for…",
];

// Ngân hàng cụm cho Writing Task 2
export const WRITING_BANK: { heading: string; phrases: string[] }[] = [
  { heading: "Nêu quan điểm", phrases: ["I would argue that…", "From my perspective, …", "There is a compelling case for…", "I am firmly convinced that…"] },
  { heading: "Thêm lý do", phrases: ["A further consideration is…", "This is largely attributable to…", "What lends weight to this is…", "Coupled with this, …"] },
  { heading: "Nhượng bộ / phản biện", phrases: ["While it is true that…, …", "Admittedly, …; nevertheless, …", "This argument overlooks the fact that…", "It would be naïve to assume that…"] },
  { heading: "Ví dụ & dẫn chứng", phrases: ["A case in point is…", "This is borne out by…", "To illustrate, …", "Take, for instance, …"] },
  { heading: "Hệ quả", phrases: ["As a consequence, …", "This inevitably leads to…", "The upshot of this is that…", "…, thereby + V-ing"] },
  { heading: "Kết luận", phrases: ["On balance, …", "Weighing up both sides, …", "In light of the above, …", "The evidence strongly suggests that…"] },
];
