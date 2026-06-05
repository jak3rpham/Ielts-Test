// src/data/listening.ts
import type { LS } from "./types";

export interface ListeningQuestion {
  type: "fill" | "choice";
  q: string;
  answer: string;
  options?: string[];
  explain?: string;
}

export interface ListeningItem {
  id: string;
  title: string;
  youtubeId?: string;
  externalLink?: string;
  source: string;
  durationMin: number;
  questions: ListeningQuestion[];
}

// COPYRIGHT NOTE: only EMBED videos (no copying of copyrighted transcripts/answers).
// Prefer videos that already include questions, or write your own original questions.

export const LISTENING: ListeningItem[] = [
  {
    id: "sample-form-completion",
    title: "Sample — Form completion (swap in your own video)",
    youtubeId: "",
    source: "Placeholder — choose your own practice video, then add its ID + answers.",
    durationMin: 10,
    questions: [
      { type: "fill", q: "1. The caller wants to book a table for ___ people.", answer: "six", explain: "Listen for the number of people mentioned." },
      { type: "fill", q: "2. The reservation is for ___ (day of week).", answer: "Friday" },
      { type: "choice", q: "3. The caller prefers to sit…", answer: "by the window", options: ["near the door", "by the window", "on the terrace"] },
    ],
  },
];

// Official, free sources — linked, not copied. Note is bilingual.
export const OFFICIAL_SOURCES: { name: string; url: string; note: LS }[] = [
  { name: "British Council — Take IELTS", url: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests", note: { vi: "Practice test miễn phí cho cả 4 kỹ năng, có đáp án.", en: "Free practice tests for all four skills, with answers." } },
  { name: "British Council — IELTS Ready", url: "https://takeielts.britishcouncil.org/take-ielts/prepare/ielts-ready", note: { vi: "Bộ mock test chính thống, theo dõi tiến độ.", en: "Official mock tests with progress tracking." } },
  { name: "IDP — Free practice tests", url: "https://ielts.idp.com/prepare/article-free-practice-tests", note: { vi: "Đề luyện kèm đáp án, bấm giờ được.", en: "Practice tests with answers and a timer." } },
  { name: "ielts.org — Sample test questions", url: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions", note: { vi: "Câu hỏi mẫu chính thức kèm đáp án.", en: "Official sample questions with answers." } },
];
