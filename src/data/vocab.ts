// src/data/vocab.ts
import { VocabTopic } from "./types";

export const VOCAB: VocabTopic[] = [
  {
    id: "environment",
    name: "Môi trường",
    cards: [
      { id: "mitigate", word: "mitigate", pos: "verb", def: "làm giảm nhẹ tác hại của thứ gì đó", example: "Planting trees can <span class='hi'>mitigate</span> the effects of climate change." },
      { id: "deplete", word: "deplete", pos: "verb", def: "làm cạn kiệt (tài nguyên)", example: "Overfishing has <span class='hi'>depleted</span> fish stocks worldwide." },
      { id: "sustainable", word: "sustainable", pos: "adj", def: "bền vững, duy trì được lâu dài", example: "We need a <span class='hi'>sustainable</span> approach to energy." },
      { id: "emissions", word: "emissions", pos: "noun", def: "khí/chất thải ra môi trường", example: "Carbon <span class='hi'>emissions</span> must be cut drastically." },
      { id: "degradation", word: "degradation", pos: "noun", def: "sự suy thoái, xuống cấp", example: "Environmental <span class='hi'>degradation</span> threatens biodiversity." },
    ],
    quiz: [
      { q: "'mitigate' nghĩa gần nhất với:", options: ["làm trầm trọng hơn", "làm giảm nhẹ", "phớt lờ"], answer: 1, explain: "mitigate = làm dịu/giảm nhẹ tác hại." },
      { q: "Chọn từ điền: 'Overfishing has ___ marine resources.'", options: ["depleted", "fostered", "streamlined"], answer: 0, explain: "deplete = làm cạn kiệt, hợp với 'tài nguyên biển'." },
    ],
  },
  {
    id: "education",
    name: "Giáo dục",
    cards: [
      { id: "foster", word: "foster", pos: "verb", def: "nuôi dưỡng, thúc đẩy (kỹ năng, phẩm chất)", example: "Group projects <span class='hi'>foster</span> collaboration." },
      { id: "curriculum", word: "curriculum", pos: "noun", def: "chương trình giảng dạy", example: "Coding has been added to the school <span class='hi'>curriculum</span>." },
      { id: "rote-learning", word: "rote learning", pos: "phrase", def: "học vẹt, học thuộc lòng không hiểu", example: "<span class='hi'>Rote learning</span> rarely builds deep understanding." },
      { id: "holistic", word: "holistic", pos: "adj", def: "toàn diện, xét tổng thể", example: "A <span class='hi'>holistic</span> education develops more than just academics." },
      { id: "attainment", word: "attainment", pos: "noun", def: "thành tích đạt được", example: "Socioeconomic background affects academic <span class='hi'>attainment</span>." },
    ],
    quiz: [
      { q: "'foster collaboration' nghĩa là:", options: ["ngăn cản hợp tác", "thúc đẩy sự hợp tác", "đo lường hợp tác"], answer: 1, explain: "foster = nuôi dưỡng/thúc đẩy." },
      { q: "'rote learning' ám chỉ:", options: ["học sáng tạo", "học vẹt thuộc lòng", "học nhóm"], answer: 1, explain: "rote learning = học thuộc lòng máy móc." },
    ],
  },
  {
    id: "technology",
    name: "Công nghệ",
    cards: [
      { id: "streamline", word: "streamline", pos: "verb", def: "tinh giản, làm cho hiệu quả hơn", example: "Automation has <span class='hi'>streamlined</span> the production process." },
      { id: "disruptive", word: "disruptive", pos: "adj", def: "có tính đột phá, làm thay đổi cuộc chơi", example: "AI is a <span class='hi'>disruptive</span> technology." },
      { id: "obsolete", word: "obsolete", pos: "adj", def: "lỗi thời, không còn dùng nữa", example: "Many manual jobs have become <span class='hi'>obsolete</span>." },
      { id: "surveillance", word: "surveillance", pos: "noun", def: "sự giám sát, theo dõi", example: "Facial recognition raises <span class='hi'>surveillance</span> concerns." },
      { id: "proliferation", word: "proliferation", pos: "noun", def: "sự lan rộng nhanh chóng", example: "The <span class='hi'>proliferation</span> of smartphones changed daily life." },
    ],
    quiz: [
      { q: "Từ trái nghĩa với 'obsolete':", options: ["cutting-edge", "outdated", "useless"], answer: 0, explain: "obsolete = lỗi thời; trái nghĩa là cutting-edge (tối tân)." },
      { q: "'disruptive technology' là công nghệ:", options: ["gây phiền nhiễu", "mang tính đột phá thay đổi cuộc chơi", "dễ hỏng"], answer: 1, explain: "Trong văn cảnh này 'disruptive' mang nghĩa tích cực: làm thay đổi ngành." },
    ],
  },
  {
    id: "society",
    name: "Xã hội",
    cards: [
      { id: "disparity", word: "disparity", pos: "noun", def: "sự chênh lệch, bất bình đẳng", example: "There is a widening income <span class='hi'>disparity</span>." },
      { id: "marginalised", word: "marginalised", pos: "adj", def: "bị gạt ra bên lề xã hội", example: "Policies should protect <span class='hi'>marginalised</span> groups." },
      { id: "cohesion", word: "cohesion", pos: "noun", def: "sự gắn kết", example: "Shared values strengthen social <span class='hi'>cohesion</span>." },
      { id: "alleviate", word: "alleviate", pos: "verb", def: "làm dịu, giảm bớt (vấn đề, nỗi khổ)", example: "Welfare programmes help <span class='hi'>alleviate</span> poverty." },
      { id: "demographic", word: "demographic", pos: "noun/adj", def: "thuộc về dân số/nhóm dân cư", example: "An ageing <span class='hi'>demographic</span> strains healthcare." },
    ],
    quiz: [
      { q: "'alleviate poverty' nghĩa là:", options: ["xóa bỏ hoàn toàn nghèo", "làm giảm bớt nghèo", "đo mức nghèo"], answer: 1, explain: "alleviate = làm dịu/giảm bớt." },
      { q: "'income disparity' là:", options: ["sự cân bằng thu nhập", "sự chênh lệch thu nhập", "tổng thu nhập"], answer: 1, explain: "disparity = sự chênh lệch/bất bình đẳng." },
    ],
  },
  {
    id: "health",
    name: "Sức khỏe",
    cards: [
      { id: "sedentary", word: "sedentary", pos: "adj", def: "ít vận động, ngồi nhiều", example: "A <span class='hi'>sedentary</span> lifestyle increases the risk of disease." },
      { id: "chronic", word: "chronic", pos: "adj", def: "mãn tính, kéo dài", example: "<span class='hi'>Chronic</span> illnesses place a heavy burden on health systems." },
      { id: "epidemic", word: "epidemic", pos: "noun", def: "dịch bệnh lan rộng", example: "Obesity has been described as a modern <span class='hi'>epidemic</span>." },
      { id: "well-being", word: "well-being", pos: "noun", def: "trạng thái khỏe mạnh, hạnh phúc", example: "Mental <span class='hi'>well-being</span> is as important as physical health." },
      { id: "preventive", word: "preventive", pos: "adj", def: "mang tính phòng ngừa", example: "<span class='hi'>Preventive</span> care reduces long-term costs." },
      { id: "deteriorate", word: "deteriorate", pos: "verb", def: "xấu đi, suy giảm", example: "Without exercise, health can gradually <span class='hi'>deteriorate</span>." },
    ],
    quiz: [
      { q: "'sedentary lifestyle' là lối sống:", options: ["năng động", "ít vận động, ngồi nhiều", "lành mạnh"], answer: 1, explain: "sedentary = ít vận động." },
      { q: "Từ chỉ bệnh 'mãn tính, kéo dài':", options: ["acute", "chronic", "minor"], answer: 1, explain: "chronic = mãn tính (trái với acute = cấp tính)." },
      { q: "'preventive care' nghĩa là chăm sóc:", options: ["sau khi bệnh nặng", "mang tính phòng ngừa", "khẩn cấp"], answer: 1, explain: "preventive = phòng ngừa." },
    ],
  },
  {
    id: "economy",
    name: "Kinh tế & Việc làm",
    cards: [
      { id: "incentive", word: "incentive", pos: "noun", def: "động lực, ưu đãi khuyến khích", example: "Tax breaks act as an <span class='hi'>incentive</span> for investment." },
      { id: "workforce", word: "workforce", pos: "noun", def: "lực lượng lao động", example: "Automation is reshaping the global <span class='hi'>workforce</span>." },
      { id: "recession", word: "recession", pos: "noun", def: "suy thoái kinh tế", example: "Unemployment rises sharply during a <span class='hi'>recession</span>." },
      { id: "lucrative", word: "lucrative", pos: "adj", def: "sinh lời, hái ra tiền", example: "Software engineering remains a <span class='hi'>lucrative</span> career." },
      { id: "outsource", word: "outsource", pos: "verb", def: "thuê ngoài (giao việc cho bên thứ ba)", example: "Many firms <span class='hi'>outsource</span> payroll to specialist providers." },
      { id: "redundant", word: "redundant", pos: "adj", def: "bị dư thừa, mất việc do cắt giảm", example: "Hundreds of workers were made <span class='hi'>redundant</span> after the merger." },
    ],
    quiz: [
      { q: "'incentive' nghĩa là:", options: ["hình phạt", "động lực/ưu đãi khuyến khích", "khoản nợ"], answer: 1, explain: "incentive = thứ tạo động lực." },
      { q: "Một công việc 'lucrative' là công việc:", options: ["nhàm chán", "sinh lời cao", "tạm thời"], answer: 1, explain: "lucrative = hái ra tiền." },
      { q: "'made redundant' nghĩa là:", options: ["được thăng chức", "bị mất việc do cắt giảm", "được tăng lương"], answer: 1, explain: "made redundant = bị cho thôi việc do dư thừa nhân sự." },
    ],
  },
];
