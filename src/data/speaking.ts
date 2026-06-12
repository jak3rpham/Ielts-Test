// src/data/speaking.ts
import { SpeakingPart } from "./types";
import type { LS } from "./types";
const L = (vi: string, en: string): LS => ({ vi, en });

export const SPEAKING: SpeakingPart[] = [
  {
    id: "part1",
    name: L("Part 1 — Khởi động", "Part 1 — Warm-up"),
    type: "qa",
    items: [
      { q: "Do you work or are you a student?", tip: L("Trả lời thẳng + thêm 1 chi tiết. Đừng cụt lủn: 'I work as a… and what I enjoy most is…'", "Answer directly + add one detail. Don't be terse: 'I work as a… and what I enjoy most is…'") },
      { q: "What do you usually do in your free time?", tip: L("Dùng thì hiện tại đơn cho thói quen + một collocation: 'I tend to unwind by…'", "Use present simple for habits + a collocation: 'I tend to unwind by…'") },
      { q: "Is your hometown a good place to live?", tip: L("Nêu quan điểm + lý do + so sánh nhẹ. Tránh trả lời 'yes' rồi im.", "Give an opinion + reason + light comparison. Don't just say 'yes' and stop.") },
    ],
  },
  {
    id: "part2",
    name: L("Part 2 — Cue card", "Part 2 — Cue card"),
    type: "cue",
    cue: {
      title: "Describe a skill you would like to learn.",
      bullets: ["what the skill is", "why you want to learn it", "how you would learn it", "and explain how it would benefit you"],
      tip: L("Có 1 phút chuẩn bị. Ghi 4 từ khóa theo 4 gạch đầu dòng. Nói 1.5–2 phút, dùng quá khứ/tương lai linh hoạt và ít nhất một câu điều kiện ('If I learned it, I would…').", "You get 1 minute to prepare. Jot 4 keywords for the 4 bullets. Speak 1.5–2 minutes, mix past/future flexibly and use at least one conditional ('If I learned it, I would…')."),
    },
  },
  {
    id: "part3",
    name: L("Part 3 — Thảo luận", "Part 3 — Discussion"),
    type: "qa",
    items: [
      { q: "Why do some people find it hard to learn new skills as adults?", tip: L("Đây là phần 'academic'. Dùng nominalisation + nhượng bộ: 'One reason may be…, although…'", "This is the 'academic' part. Use nominalisation + concession: 'One reason may be…, although…'") },
      { q: "Should governments fund adult education? Why?", tip: L("Nêu lập trường rõ + 2 lý do + ví dụ. Dùng cụm band 7: 'There is a compelling case for…'", "State a clear position + 2 reasons + example. Use a band-7 phrase: 'There is a compelling case for…'") },
      { q: "How might technology change the way we learn in the future?", tip: L("Dùng tương lai + suy đoán: 'It is likely that…', 'This could potentially…'", "Use future + speculation: 'It is likely that…', 'This could potentially…'") },
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

// Ngân hàng cụm cho Writing Task 2 (heading song ngữ)
export const WRITING_BANK: { heading: LS; phrases: string[] }[] = [
  { heading: L("Nêu quan điểm", "State an opinion"), phrases: ["I would argue that…", "From my perspective, …", "There is a compelling case for…", "I am firmly convinced that…"] },
  { heading: L("Thêm lý do", "Add a reason"), phrases: ["A further consideration is…", "This is largely attributable to…", "What lends weight to this is…", "Coupled with this, …"] },
  { heading: L("Nhượng bộ / phản biện", "Concede / rebut"), phrases: ["While it is true that…, …", "Admittedly, …; nevertheless, …", "This argument overlooks the fact that…", "It would be naïve to assume that…"] },
  { heading: L("Ví dụ & dẫn chứng", "Examples & evidence"), phrases: ["A case in point is…", "This is borne out by…", "To illustrate, …", "Take, for instance, …"] },
  { heading: L("Hệ quả", "Consequences"), phrases: ["As a consequence, …", "This inevitably leads to…", "The upshot of this is that…", "…, thereby + V-ing"] },
  { heading: L("Kết luận", "Conclusion"), phrases: ["On balance, …", "Weighing up both sides, …", "In light of the above, …", "The evidence strongly suggests that…"] },
];
