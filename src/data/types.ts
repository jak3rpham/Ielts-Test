// src/data/types.ts
// Các kiểu dữ liệu cho toàn bộ knowledge base. Thêm field ở đây khi mở rộng.

export type Band = "b6" | "b7" | "b8";

export interface Example {
  kind: "good" | "bad" | "plain";
  html: string; // cho phép <span class="hi/good/bad"> để tô màu
}

export interface GrammarPoint {
  rule: string;
  examples: Example[];
}

export interface QuizItem {
  q: string;
  options: string[];
  answer: number; // index đáp án đúng
  explain: string;
}

export interface GrammarLesson {
  id: string; // dùng làm khóa lưu tiến độ
  title: string;
  band: Band;
  intro: string;
  points: GrammarPoint[];
  vietMistake: string; // HTML
  quiz: QuizItem[];
}

export interface VocabCard {
  id: string;
  word: string;
  pos: string;
  def: string;
  example: string; // HTML
  level?: "B1" | "B2" | "C1" | "C2"; // CEFR ~ band
  synonyms?: string[];
  antonyms?: string[];
  phrases?: string[]; // collocations / cụm đi kèm
  register?: "formal" | "neutral" | "informal"; // slang/informal hợp Speaking, không hợp Writing
  skills?: ("W" | "S" | "R" | "L")[]; // mạnh ở kỹ năng nào: Writing/Speaking/Reading/Listening
  useCase?: string; // dùng tốt trong tình huống nào
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
  explain: string;
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
  tip: string;
}

export interface SpeakingPart {
  id: string;
  name: string;
  type: "qa" | "cue";
  items?: SpeakingQA[];
  cue?: { title: string; bullets: string[]; tip: string };
}
