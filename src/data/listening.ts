// src/data/listening.ts

export interface ListeningQuestion {
  type: "fill" | "choice";
  q: string;
  answer: string; // fill: đáp án text; choice: text của lựa chọn đúng
  options?: string[]; // chỉ cho type "choice"
  explain?: string;
}

export interface ListeningItem {
  id: string;
  title: string;
  youtubeId?: string; // ID video YouTube để nhúng (vd "dQw4w9WgXcQ")
  externalLink?: string; // hoặc link audio/đề ngoài
  source: string; // ghi rõ nguồn (tôn trọng tác giả)
  durationMin: number; // để set đồng hồ
  questions: ListeningQuestion[];
}

// LƯU Ý BẢN QUYỀN:
// - Chỉ NHÚNG video (không chép transcript/đáp án của đề Cambridge có bản quyền).
// - Ưu tiên video kèm sẵn câu hỏi, hoặc tự soạn câu hỏi gốc cho video bạn chọn.
// - Thay youtubeId bằng ID video bạn tự chọn từ kênh luyện thi uy tín.

export const LISTENING: ListeningItem[] = [
  {
    id: "sample-form-completion",
    title: "Ví dụ — Form completion (thay video của bạn vào)",
    youtubeId: "", // <-- DÁN ID VIDEO YOUTUBE BẠN CHỌN VÀO ĐÂY
    source: "Placeholder — chọn video luyện nghe của riêng bạn rồi điền ID + đáp án.",
    durationMin: 10,
    questions: [
      { type: "fill", q: "1. The caller wants to book a table for ___ people.", answer: "six", explain: "Nghe số người được nhắc tới." },
      { type: "fill", q: "2. The reservation is for ___ (day of week).", answer: "Friday" },
      { type: "choice", q: "3. The caller prefers to sit…", answer: "by the window", options: ["near the door", "by the window", "on the terrace"] },
    ],
  },
];

// Nguồn đề CHÍNH THỐNG, miễn phí — dẫn link, không sao chép.
export const OFFICIAL_SOURCES: { name: string; url: string; note: string }[] = [
  { name: "British Council — Take IELTS", url: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests", note: "Practice test miễn phí cho cả 4 kỹ năng, có đáp án." },
  { name: "British Council — IELTS Ready", url: "https://takeielts.britishcouncil.org/take-ielts/prepare/ielts-ready", note: "Bộ mock test chính thống, theo dõi tiến độ." },
  { name: "IDP — Free practice tests", url: "https://ielts.idp.com/prepare/article-free-practice-tests", note: "Đề luyện kèm đáp án, bấm giờ được." },
  { name: "ielts.org — Sample test questions", url: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions", note: "Câu hỏi mẫu chính thức kèm đáp án." },
];
