// src/data/types.ts
// Các kiểu dữ liệu cho toàn bộ knowledge base. Thêm field ở đây khi mở rộng.

export type Band = "b6" | "b7" | "b8";

// Chuỗi song ngữ: hoặc string (chỉ VI, dùng cho cả 2 ngôn ngữ), hoặc {vi, en?}.
export type LS = string | { vi: string; en?: string };

export interface Example {
  kind: "good" | "bad" | "plain";
  html: LS; // cho phép <span class="hi/good/bad">
}

export interface GrammarPoint {
  rule: LS;
  examples: Example[];
}

export interface QuizItem {
  q: LS;
  options: LS[];
  answer: number; // index đáp án đúng
  explain: LS;
}

export interface GrammarLesson {
  id: string;
  title: LS;
  band: Band;
  intro: LS;
  points: GrammarPoint[];
  vietMistake: LS; // HTML
  quiz: QuizItem[];
}

export interface VocabCard {
  id: string;
  word: string;
  pos: string;
  def: LS; // nghĩa (song ngữ)
  example: string; // HTML, câu ví dụ tiếng Anh
  level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"; // CEFR
  synonyms?: string[];
  antonyms?: string[];
  phrases?: string[]; // collocations / cụm đi kèm
  register?: "formal" | "neutral" | "informal";
  skills?: ("W" | "S" | "R" | "L")[];
  useCase?: LS; // dùng tốt khi nào (song ngữ)
}

export interface VocabTopic {
  id: string;
  name: string;
  cards: VocabCard[];
  quiz: QuizItem[];
}

export interface ReadingQuestionTFNG {
  q: string;
  answer: "True" | "False" | "Not Given";
  explain: LS;
}

export interface ReadingTest {
  id: string;
  title: string;
  paragraphs: { label: string; text: string }[];
  tfng: ReadingQuestionTFNG[];
  mcq: QuizItem[];
}

export interface SpeakingQA {
  q: string;
  tip: LS;
}

export interface SpeakingPart {
  id: string;
  name: LS;
  type: "qa" | "cue";
  items?: SpeakingQA[];
  cue?: { title: string; bullets: string[]; tip: LS };
}
