// src/data/writing.ts
export interface WritingPrompt {
  id: string;
  type: string;
  prompt: string;
}

export const WRITING_PROMPTS: WritingPrompt[] = [
  { id: "wp-tech-jobs", type: "Agree/Disagree", prompt: "Some people believe that automation and artificial intelligence will create more jobs than they destroy. To what extent do you agree or disagree?" },
  { id: "wp-community", type: "Agree/Disagree", prompt: "Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?" },
  { id: "wp-remote", type: "Discuss both views", prompt: "Some argue that working from home benefits employees, while others believe it harms productivity and collaboration. Discuss both views and give your own opinion." },
  { id: "wp-tuition", type: "Discuss both views", prompt: "Some people think university education should be free for all, while others believe students should pay for it themselves. Discuss both views and give your opinion." },
  { id: "wp-environment", type: "Problem/Solution", prompt: "Many cities are experiencing severe air pollution. What are the main causes of this problem, and what measures could be taken to address it?" },
  { id: "wp-ageing", type: "Problem/Solution", prompt: "In many countries, the population is ageing rapidly. What problems does this cause, and how can societies prepare for it?" },
  { id: "wp-advertising", type: "Two-part question", prompt: "Advertising influences what people buy. Why has advertising become so powerful, and is this a positive or negative development?" },
  { id: "wp-tourism", type: "Two-part question", prompt: "International tourism has grown enormously in recent decades. What are the reasons for this, and do the benefits outweigh the drawbacks?" },
];
