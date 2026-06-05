// src/data/mocktests.ts
// Ngân hàng đề THI THỬ — nội dung gốc, TÁCH RIÊNG khỏi đề luyện (reading.ts/listening.ts).
// Listening dùng transcript gốc + trình duyệt đọc to (Web Speech API).

export interface MockReadingQ {
  type: "TFNG" | "MCQ";
  q: string;
  options?: string[];
  answer: string | number; // TFNG: "True"|"False"|"Not Given" ; MCQ: index
}
export interface MockReading { id: string; title: string; passage: string[]; questions: MockReadingQ[]; }

export interface MockListeningQ {
  type: "GAP" | "MCQ";
  q: string;
  options?: string[];
  answer: string | number; // GAP: từ cần điền (so sánh không phân biệt hoa/thường) ; MCQ: index
}
export interface MockListening { id: string; title: string; transcript: string; questions: MockListeningQ[]; }

export interface MockWriting { id: string; type: string; prompt: string; }

export const READING_MOCKS: MockReading[] = [
  {
    id: "rm1",
    title: "The return of the night train",
    passage: [
      "After decades of decline, overnight sleeper trains are enjoying an unexpected revival across Europe. Airlines had long made them seem slow and outdated, but rising concern about the climate has changed the calculation for many travellers. A journey that once felt like a quaint relic is now marketed as a low-carbon alternative to short-haul flights.",
      "The economics, however, remain difficult. Sleeper services are expensive to run: they require specialised carriages, large crews, and tracks that are often busy with daytime traffic. Several operators that launched new routes with great fanfare have quietly scaled them back, citing thin margins. Supporters argue that without government subsidies, comparable to those enjoyed by aviation, night trains cannot compete on price alone.",
      "Passengers, for their part, seem willing to trade speed for comfort and conscience. Surveys suggest that travellers value the ability to sleep through a journey and arrive rested, avoiding both airport queues and city-centre hotels. Whether this enthusiasm is strong enough to sustain the network without public funding is a question that the next decade will answer.",
    ],
    questions: [
      { type: "TFNG", q: "Night trains are more popular now than they were several decades ago.", answer: "True" },
      { type: "TFNG", q: "Airlines have publicly supported the revival of sleeper trains.", answer: "Not Given" },
      { type: "TFNG", q: "Running sleeper services is cheaper than running daytime trains.", answer: "False" },
      { type: "TFNG", q: "Every new night-train route launched recently has been successful.", answer: "False" },
      { type: "MCQ", q: "According to the passage, what changed travellers' view of night trains?", options: ["Lower ticket prices", "Concern about the climate", "Faster journey times"], answer: 1 },
      { type: "MCQ", q: "What do supporters say night trains need to compete on price?", options: ["Government subsidies", "More airports", "Shorter routes"], answer: 0 },
      { type: "MCQ", q: "Why do passengers reportedly prefer sleeper trains?", options: ["They are the fastest option", "They can sleep and arrive rested", "They are always cheaper"], answer: 1 },
      { type: "MCQ", q: "What does the final paragraph suggest about the future?", options: ["It is guaranteed to succeed", "It is uncertain and depends on funding", "It will definitely fail"], answer: 1 },
    ],
  },
  {
    id: "rm2",
    title: "Why we misremember",
    passage: [
      "Human memory is often imagined as a recording device that faithfully stores the past. In reality, it is far more creative. Each time we recall an event, the brain reconstructs it, and small details can be altered, added, or lost in the process. Far from being a flaw, this flexibility may help us generalise from experience and imagine the future.",
      "Psychologists have shown that memories can be surprisingly easy to distort. In classic experiments, simply asking a question in a particular way changed what witnesses later claimed to have seen. People have even been led to confidently recall entire events that never happened, a phenomenon with serious implications for the reliability of eyewitness testimony in court.",
      "None of this means memory is useless. For everyday purposes it is remarkably effective. But the findings caution against treating vivid recollection as proof of accuracy. Confidence, researchers stress, is not the same as correctness — a lesson that legal systems around the world are slowly beginning to absorb.",
    ],
    questions: [
      { type: "TFNG", q: "Memory works exactly like a recording device.", answer: "False" },
      { type: "TFNG", q: "The way a question is asked can change what people remember.", answer: "True" },
      { type: "TFNG", q: "Most courts have already fully reformed their use of eyewitness testimony.", answer: "Not Given" },
      { type: "TFNG", q: "The author believes memory is useless for daily life.", answer: "False" },
      { type: "MCQ", q: "What does the passage say happens when we recall an event?", options: ["The brain reconstructs it", "It is replayed perfectly", "It is permanently deleted"], answer: 0 },
      { type: "MCQ", q: "What is one serious implication of memory distortion?", options: ["Slower thinking", "Unreliable eyewitness testimony", "Better imagination only"], answer: 1 },
      { type: "MCQ", q: "What key distinction do researchers stress?", options: ["Confidence is not the same as correctness", "Memory equals intelligence", "Older memories are always wrong"], answer: 0 },
      { type: "MCQ", q: "How does the author view memory's flexibility?", options: ["As purely a flaw", "As possibly useful for generalising and imagining", "As irrelevant"], answer: 1 },
    ],
  },
];

export const LISTENING_MOCKS: MockListening[] = [
  {
    id: "lm1",
    title: "Library induction",
    transcript:
      "Hello and welcome to the city library. Let me run through a few things to help you get started. Your library card lasts for two years, and you can borrow up to twelve items at a time. Books can be kept for three weeks, but DVDs must be returned within seven days. If you return something late, there is a fine of twenty cents per day. The quiet study area is on the second floor, next to the computer room. If you need to book a group room, please do so online at least one day in advance. Finally, the library closes at eight o'clock on weekdays and at five on Saturdays.",
    questions: [
      { type: "GAP", q: "A library card lasts for ___ years.", answer: "two" },
      { type: "GAP", q: "You can borrow up to ___ items at a time.", answer: "twelve" },
      { type: "GAP", q: "DVDs must be returned within ___ days.", answer: "seven" },
      { type: "MCQ", q: "Where is the quiet study area?", options: ["First floor", "Second floor", "Ground floor"], answer: 1 },
      { type: "MCQ", q: "How far in advance must you book a group room?", options: ["At least one day", "At least one week", "On the same day"], answer: 0 },
      { type: "MCQ", q: "What time does the library close on Saturdays?", options: ["Eight o'clock", "Five o'clock", "Seven o'clock"], answer: 1 },
    ],
  },
  {
    id: "lm2",
    title: "Booking a guided tour",
    transcript:
      "Good morning, thanks for calling Greenwood Tours. We offer three guided walks. The morning forest walk leaves at nine and lasts about two hours; it costs fifteen dollars per person. The afternoon coastal walk is a little longer, around three hours, and costs twenty dollars. We also run an evening wildlife tour, but that one needs a minimum of six people to go ahead. Please wear sturdy shoes and bring water, as there are no shops along the routes. You can pay on the day, but we do ask you to reserve your place by phone the day before.",
    questions: [
      { type: "GAP", q: "The morning forest walk leaves at ___.", answer: "nine" },
      { type: "GAP", q: "The coastal walk costs ___ dollars.", answer: "twenty" },
      { type: "GAP", q: "The evening tour needs a minimum of ___ people.", answer: "six" },
      { type: "MCQ", q: "How long is the afternoon coastal walk?", options: ["Two hours", "Around three hours", "One hour"], answer: 1 },
      { type: "MCQ", q: "What are callers told to bring?", options: ["Sturdy shoes and water", "Food and a map", "A tent"], answer: 0 },
      { type: "MCQ", q: "How should you reserve a place?", options: ["By phone the day before", "Online a week before", "No booking needed"], answer: 0 },
    ],
  },
];

export const WRITING_MOCKS: MockWriting[] = [
  { id: "wm1", type: "Task 2 — Opinion", prompt: "Some people believe that public libraries are no longer necessary in the digital age. To what extent do you agree or disagree?" },
  { id: "wm2", type: "Task 2 — Discussion", prompt: "Some think governments should fund space exploration, while others believe the money should be spent on problems on Earth. Discuss both views and give your own opinion." },
  { id: "wm3", type: "Task 2 — Problem/Solution", prompt: "In many cities, young people are leaving rural areas to find work. What problems does this cause, and what measures could address them?" },
];
