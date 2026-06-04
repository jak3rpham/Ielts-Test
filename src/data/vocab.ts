// src/data/vocab.ts
import { VocabTopic } from "./types";

// Mỗi từ là một "entry từ điển": level, đồng/trái nghĩa, collocations, sắc thái, kỹ năng phù hợp, use case.
// Lưu ý: từ register "informal" hợp SPEAKING, KHÔNG nên dùng trong Writing học thuật.

export const VOCAB: VocabTopic[] = [
  {
    id: "environment",
    name: "Môi trường",
    cards: [
      { id: "mitigate", word: "mitigate", pos: "verb", level: "C1", register: "formal", skills: ["W", "S"], def: "làm giảm nhẹ tác hại", example: "Planting trees can <span class='hi'>mitigate</span> the effects of climate change.", synonyms: ["alleviate", "reduce", "lessen"], antonyms: ["aggravate", "worsen"], phrases: ["mitigate the impact", "mitigate the risk", "mitigate climate change"], useCase: "Đề giải pháp (problem/solution): nói về cách giảm nhẹ hậu quả." },
      { id: "deplete", word: "deplete", pos: "verb", level: "C1", register: "formal", skills: ["W", "R"], def: "làm cạn kiệt (tài nguyên)", example: "Overfishing has <span class='hi'>depleted</span> fish stocks worldwide.", synonyms: ["exhaust", "drain", "use up"], antonyms: ["replenish", "restore"], phrases: ["deplete resources", "deplete reserves", "rapidly depleted"], useCase: "Nói về tài nguyên thiên nhiên bị dùng hết." },
      { id: "sustainable", word: "sustainable", pos: "adj", level: "B2", register: "neutral", skills: ["W", "S"], def: "bền vững, duy trì được lâu dài", example: "We need a <span class='hi'>sustainable</span> approach to energy.", synonyms: ["viable", "long-term", "eco-friendly"], antonyms: ["unsustainable", "wasteful"], phrases: ["sustainable development", "sustainable energy", "environmentally sustainable"], useCase: "Hầu như đề môi trường nào cũng dùng được." },
      { id: "emissions", word: "emissions", pos: "noun", level: "B2", register: "neutral", skills: ["W", "S", "R"], def: "khí/chất thải ra môi trường", example: "Carbon <span class='hi'>emissions</span> must be cut drastically.", synonyms: ["discharge", "pollutants"], antonyms: [], phrases: ["carbon emissions", "cut/reduce emissions", "greenhouse gas emissions"], useCase: "Chủ đề biến đổi khí hậu, giao thông, công nghiệp." },
      { id: "degradation", word: "degradation", pos: "noun", level: "C1", register: "formal", skills: ["W", "R"], def: "sự suy thoái, xuống cấp", example: "Environmental <span class='hi'>degradation</span> threatens biodiversity.", synonyms: ["deterioration", "decline"], antonyms: ["improvement", "restoration"], phrases: ["environmental degradation", "soil degradation", "land degradation"], useCase: "Mô tả tình trạng môi trường xấu đi." },
    ],
    quiz: [
      { q: "'mitigate' nghĩa gần nhất với:", options: ["làm trầm trọng hơn", "làm giảm nhẹ", "phớt lờ"], answer: 1, explain: "mitigate = làm dịu/giảm nhẹ. Trái nghĩa: aggravate." },
      { q: "Chọn từ điền: 'Overfishing has ___ marine resources.'", options: ["depleted", "fostered", "streamlined"], answer: 0, explain: "deplete = làm cạn kiệt, đi với 'resources'." },
      { q: "Trái nghĩa của 'deplete' là:", options: ["replenish", "exhaust", "drain"], answer: 0, explain: "replenish = bổ sung lại; còn lại đều là đồng nghĩa của deplete." },
    ],
  },
  {
    id: "education",
    name: "Giáo dục",
    cards: [
      { id: "foster", word: "foster", pos: "verb", level: "C1", register: "formal", skills: ["W", "S"], def: "nuôi dưỡng, thúc đẩy (kỹ năng, phẩm chất)", example: "Group projects <span class='hi'>foster</span> collaboration.", synonyms: ["cultivate", "nurture", "promote"], antonyms: ["suppress", "hinder"], phrases: ["foster creativity", "foster independence", "foster a sense of"], useCase: "Nói lợi ích của một phương pháp giáo dục." },
      { id: "curriculum", word: "curriculum", pos: "noun", level: "B2", register: "neutral", skills: ["W", "S", "R"], def: "chương trình giảng dạy", example: "Coding has been added to the school <span class='hi'>curriculum</span>.", synonyms: ["syllabus", "course of study"], antonyms: [], phrases: ["school curriculum", "national curriculum", "part of the curriculum"], useCase: "Đề bàn về môn học nên/không nên dạy." },
      { id: "rote-learning", word: "rote learning", pos: "phrase", level: "C1", register: "neutral", skills: ["W", "S"], def: "học vẹt, thuộc lòng không hiểu", example: "<span class='hi'>Rote learning</span> rarely builds deep understanding.", synonyms: ["memorisation", "learning by heart"], antonyms: ["critical thinking", "active learning"], phrases: ["rely on rote learning", "rote memorisation"], useCase: "Phê phán phương pháp dạy truyền thống." },
      { id: "holistic", word: "holistic", pos: "adj", level: "C2", register: "formal", skills: ["W"], def: "toàn diện, xét tổng thể", example: "A <span class='hi'>holistic</span> education develops more than just academics.", synonyms: ["comprehensive", "all-round"], antonyms: ["narrow", "fragmented"], phrases: ["holistic approach", "holistic development"], useCase: "Lập luận giáo dục nên phát triển con người toàn diện." },
      { id: "attainment", word: "attainment", pos: "noun", level: "C1", register: "formal", skills: ["W", "R"], def: "thành tích đạt được", example: "Socioeconomic background affects academic <span class='hi'>attainment</span>.", synonyms: ["achievement", "accomplishment"], antonyms: ["failure"], phrases: ["academic attainment", "educational attainment", "levels of attainment"], useCase: "Bàn về kết quả học tập và yếu tố ảnh hưởng." },
    ],
    quiz: [
      { q: "'foster collaboration' nghĩa là:", options: ["ngăn cản hợp tác", "thúc đẩy sự hợp tác", "đo lường hợp tác"], answer: 1, explain: "foster = nuôi dưỡng/thúc đẩy. Đồng nghĩa: cultivate, promote." },
      { q: "'rote learning' ám chỉ:", options: ["học sáng tạo", "học vẹt thuộc lòng", "học nhóm"], answer: 1, explain: "rote learning = học thuộc lòng máy móc; đối lập critical thinking." },
      { q: "'holistic' phù hợp kỹ năng nào nhất?", options: ["Writing học thuật", "tán gẫu đời thường", "không kỹ năng nào"], answer: 0, explain: "Từ trang trọng (formal), hợp Writing hơn là nói chuyện thường ngày." },
    ],
  },
  {
    id: "technology",
    name: "Công nghệ",
    cards: [
      { id: "streamline", word: "streamline", pos: "verb", level: "C1", register: "neutral", skills: ["W", "S"], def: "tinh giản, làm hiệu quả hơn", example: "Automation has <span class='hi'>streamlined</span> the production process.", synonyms: ["optimise", "simplify"], antonyms: ["complicate"], phrases: ["streamline the process", "streamline operations"], useCase: "Nói lợi ích công nghệ với công việc/sản xuất." },
      { id: "disruptive", word: "disruptive", pos: "adj", level: "C1", register: "neutral", skills: ["W", "S"], def: "có tính đột phá, làm thay đổi cuộc chơi", example: "AI is a <span class='hi'>disruptive</span> technology.", synonyms: ["groundbreaking", "transformative"], antonyms: ["conventional"], phrases: ["disruptive technology", "disruptive innovation"], useCase: "Mô tả công nghệ làm thay đổi cả một ngành." },
      { id: "obsolete", word: "obsolete", pos: "adj", level: "C1", register: "neutral", skills: ["W", "S", "R"], def: "lỗi thời, không còn dùng", example: "Many manual jobs have become <span class='hi'>obsolete</span>.", synonyms: ["outdated", "antiquated"], antonyms: ["cutting-edge", "state-of-the-art"], phrases: ["become obsolete", "render obsolete"], useCase: "Nói nghề/công nghệ bị thay thế." },
      { id: "surveillance", word: "surveillance", pos: "noun", level: "C1", register: "formal", skills: ["W", "R"], def: "sự giám sát, theo dõi", example: "Facial recognition raises <span class='hi'>surveillance</span> concerns.", synonyms: ["monitoring", "observation"], antonyms: ["privacy"], phrases: ["mass surveillance", "under surveillance", "surveillance camera"], useCase: "Bàn về quyền riêng tư và công nghệ." },
      { id: "proliferation", word: "proliferation", pos: "noun", level: "C2", register: "formal", skills: ["W"], def: "sự lan rộng nhanh chóng", example: "The <span class='hi'>proliferation</span> of smartphones changed daily life.", synonyms: ["spread", "explosion"], antonyms: ["decline"], phrases: ["the proliferation of", "rapid proliferation"], useCase: "Mở câu nói về sự bùng nổ của một thứ gì đó." },
    ],
    quiz: [
      { q: "Từ trái nghĩa với 'obsolete':", options: ["cutting-edge", "outdated", "antiquated"], answer: 0, explain: "obsolete = lỗi thời; trái nghĩa cutting-edge (tối tân)." },
      { q: "'disruptive technology' là công nghệ:", options: ["gây phiền nhiễu", "mang tính đột phá", "dễ hỏng"], answer: 1, explain: "Ở đây 'disruptive' nghĩa tích cực: làm thay đổi ngành." },
      { q: "'surveillance' thường đi với chủ đề:", options: ["quyền riêng tư", "ẩm thực", "thể thao"], answer: 0, explain: "surveillance gắn với privacy/giám sát." },
    ],
  },
  {
    id: "society",
    name: "Xã hội",
    cards: [
      { id: "disparity", word: "disparity", pos: "noun", level: "C1", register: "formal", skills: ["W", "R"], def: "sự chênh lệch, bất bình đẳng", example: "There is a widening income <span class='hi'>disparity</span>.", synonyms: ["inequality", "gap"], antonyms: ["parity", "equality"], phrases: ["income disparity", "widening disparity", "gender disparity"], useCase: "Bàn bất bình đẳng kinh tế/xã hội." },
      { id: "marginalised", word: "marginalised", pos: "adj", level: "C1", register: "formal", skills: ["W"], def: "bị gạt ra bên lề xã hội", example: "Policies should protect <span class='hi'>marginalised</span> groups.", synonyms: ["disadvantaged", "excluded"], antonyms: ["privileged"], phrases: ["marginalised communities", "socially marginalised"], useCase: "Nói về nhóm yếu thế cần được hỗ trợ." },
      { id: "cohesion", word: "cohesion", pos: "noun", level: "C1", register: "formal", skills: ["W"], def: "sự gắn kết", example: "Shared values strengthen social <span class='hi'>cohesion</span>.", synonyms: ["unity", "solidarity"], antonyms: ["division", "fragmentation"], phrases: ["social cohesion", "community cohesion"], useCase: "Bàn yếu tố gắn kết cộng đồng." },
      { id: "alleviate", word: "alleviate", pos: "verb", level: "C1", register: "formal", skills: ["W", "S"], def: "làm dịu, giảm bớt", example: "Welfare programmes help <span class='hi'>alleviate</span> poverty.", synonyms: ["ease", "relieve", "mitigate"], antonyms: ["aggravate"], phrases: ["alleviate poverty", "alleviate suffering", "alleviate pressure"], useCase: "Đề giải pháp cho vấn đề xã hội." },
      { id: "demographic", word: "demographic", pos: "noun/adj", level: "C1", register: "formal", skills: ["W", "R"], def: "thuộc về dân số/nhóm dân cư", example: "An ageing <span class='hi'>demographic</span> strains healthcare.", synonyms: ["population group"], antonyms: [], phrases: ["ageing demographic", "demographic change", "demographic shift"], useCase: "Bàn về già hóa dân số, cơ cấu dân cư." },
    ],
    quiz: [
      { q: "'alleviate poverty' nghĩa là:", options: ["xóa bỏ hoàn toàn nghèo", "làm giảm bớt nghèo", "đo mức nghèo"], answer: 1, explain: "alleviate = làm dịu/giảm bớt. Đồng nghĩa: ease, relieve." },
      { q: "'income disparity' là:", options: ["sự cân bằng thu nhập", "sự chênh lệch thu nhập", "tổng thu nhập"], answer: 1, explain: "disparity = chênh lệch; trái nghĩa parity." },
      { q: "Trái nghĩa của 'cohesion':", options: ["unity", "solidarity", "fragmentation"], answer: 2, explain: "fragmentation = sự chia rẽ; hai cái kia đồng nghĩa cohesion." },
    ],
  },
  {
    id: "health",
    name: "Sức khỏe",
    cards: [
      { id: "sedentary", word: "sedentary", pos: "adj", level: "C1", register: "formal", skills: ["W", "R"], def: "ít vận động, ngồi nhiều", example: "A <span class='hi'>sedentary</span> lifestyle increases the risk of disease.", synonyms: ["inactive"], antonyms: ["active"], phrases: ["sedentary lifestyle", "sedentary work"], useCase: "Bàn lối sống và bệnh tật." },
      { id: "chronic", word: "chronic", pos: "adj", level: "B2", register: "neutral", skills: ["W", "S", "R"], def: "mãn tính, kéo dài", example: "<span class='hi'>Chronic</span> illnesses burden health systems.", synonyms: ["persistent", "long-term"], antonyms: ["acute", "temporary"], phrases: ["chronic disease", "chronic condition", "chronic pain"], useCase: "Phân biệt với 'acute' (cấp tính)." },
      { id: "epidemic", word: "epidemic", pos: "noun", level: "B2", register: "neutral", skills: ["W", "R"], def: "dịch bệnh lan rộng", example: "Obesity has been described as a modern <span class='hi'>epidemic</span>.", synonyms: ["outbreak", "plague"], antonyms: [], phrases: ["an epidemic of", "reach epidemic proportions"], useCase: "Dùng cả nghĩa bóng: 'epidemic of loneliness'." },
      { id: "well-being", word: "well-being", pos: "noun", level: "B2", register: "neutral", skills: ["W", "S"], def: "trạng thái khỏe mạnh, hạnh phúc", example: "Mental <span class='hi'>well-being</span> matters as much as physical health.", synonyms: ["welfare"], antonyms: [], phrases: ["mental well-being", "promote well-being"], useCase: "Chủ đề sức khỏe tinh thần." },
      { id: "preventive", word: "preventive", pos: "adj", level: "C1", register: "formal", skills: ["W"], def: "mang tính phòng ngừa", example: "<span class='hi'>Preventive</span> care reduces long-term costs.", synonyms: ["precautionary"], antonyms: ["reactive"], phrases: ["preventive care", "preventive measures"], useCase: "Lập luận phòng bệnh hơn chữa bệnh." },
    ],
    quiz: [
      { q: "'sedentary lifestyle' là lối sống:", options: ["năng động", "ít vận động", "lành mạnh"], answer: 1, explain: "sedentary = ít vận động; trái nghĩa active." },
      { q: "Trái nghĩa của 'chronic' (bệnh):", options: ["acute", "persistent", "long-term"], answer: 0, explain: "acute = cấp tính; hai cái kia đồng nghĩa chronic." },
      { q: "'preventive care' là chăm sóc:", options: ["sau khi bệnh nặng", "mang tính phòng ngừa", "khẩn cấp"], answer: 1, explain: "preventive = phòng ngừa; trái nghĩa reactive." },
    ],
  },
  {
    id: "economy",
    name: "Kinh tế & Việc làm",
    cards: [
      { id: "incentive", word: "incentive", pos: "noun", level: "B2", register: "neutral", skills: ["W", "S", "R"], def: "động lực, ưu đãi khuyến khích", example: "Tax breaks act as an <span class='hi'>incentive</span> for investment.", synonyms: ["motivation", "stimulus"], antonyms: ["deterrent"], phrases: ["financial incentive", "provide an incentive", "incentive to do sth"], useCase: "Bàn chính sách khuyến khích hành vi." },
      { id: "workforce", word: "workforce", pos: "noun", level: "B2", register: "neutral", skills: ["W", "S", "R"], def: "lực lượng lao động", example: "Automation is reshaping the global <span class='hi'>workforce</span>.", synonyms: ["labour force", "staff"], antonyms: [], phrases: ["skilled workforce", "enter the workforce"], useCase: "Chủ đề việc làm, tự động hóa." },
      { id: "recession", word: "recession", pos: "noun", level: "B2", register: "neutral", skills: ["W", "R"], def: "suy thoái kinh tế", example: "Unemployment rises during a <span class='hi'>recession</span>.", synonyms: ["downturn", "slump"], antonyms: ["boom", "growth"], phrases: ["economic recession", "during a recession", "slip into recession"], useCase: "Bàn chu kỳ kinh tế, thất nghiệp." },
      { id: "lucrative", word: "lucrative", pos: "adj", level: "C1", register: "neutral", skills: ["W", "S"], def: "sinh lời, hái ra tiền", example: "Software engineering is a <span class='hi'>lucrative</span> career.", synonyms: ["profitable", "well-paid"], antonyms: ["unprofitable"], phrases: ["lucrative career", "lucrative deal", "highly lucrative"], useCase: "Nói về nghề/ngành kiếm nhiều tiền." },
      { id: "redundant", word: "redundant", pos: "adj", level: "C1", register: "neutral", skills: ["W", "S", "R"], def: "bị dư thừa, mất việc do cắt giảm", example: "Hundreds were made <span class='hi'>redundant</span> after the merger.", synonyms: ["laid off", "dismissed"], antonyms: ["hired", "retained"], phrases: ["made redundant", "redundancy package"], useCase: "Diễn đạt 'bị cho thôi việc' kiểu trang trọng (Anh-Anh)." },
    ],
    quiz: [
      { q: "Trái nghĩa của 'incentive':", options: ["deterrent", "motivation", "stimulus"], answer: 0, explain: "deterrent = thứ răn đe/cản trở; hai cái kia đồng nghĩa." },
      { q: "Một công việc 'lucrative' là:", options: ["nhàm chán", "sinh lời cao", "tạm thời"], answer: 1, explain: "lucrative = hái ra tiền; đồng nghĩa profitable." },
      { q: "'made redundant' nghĩa là:", options: ["được thăng chức", "bị mất việc do cắt giảm", "được tăng lương"], answer: 1, explain: "made redundant = bị cho thôi việc do dư nhân sự." },
    ],
  },
  {
    id: "media",
    name: "Truyền thông",
    cards: [
      { id: "biased", word: "biased", pos: "adj", level: "B2", register: "neutral", skills: ["W", "S", "R"], def: "thiên vị, không khách quan", example: "Some news coverage is heavily <span class='hi'>biased</span>.", synonyms: ["partial", "one-sided"], antonyms: ["impartial", "objective"], phrases: ["politically biased", "biased reporting"], useCase: "Phê phán báo chí thiếu khách quan." },
      { id: "credible", word: "credible", pos: "adj", level: "C1", register: "neutral", skills: ["W", "S", "R"], def: "đáng tin cậy", example: "Readers struggle to find <span class='hi'>credible</span> sources online.", synonyms: ["reliable", "trustworthy"], antonyms: ["dubious", "unreliable"], phrases: ["credible source", "credible evidence"], useCase: "Bàn về độ tin cậy của thông tin." },
      { id: "misinformation", word: "misinformation", pos: "noun", level: "C1", register: "neutral", skills: ["W", "R"], def: "thông tin sai lệch", example: "Social media accelerates the spread of <span class='hi'>misinformation</span>.", synonyms: ["disinformation", "falsehoods"], antonyms: ["facts"], phrases: ["spread misinformation", "combat misinformation"], useCase: "Chủ đề mạng xã hội, tin giả." },
      { id: "sensationalism", word: "sensationalism", pos: "noun", level: "C2", register: "formal", skills: ["W"], def: "lối giật gân câu khách", example: "<span class='hi'>Sensationalism</span> sells but distorts understanding.", synonyms: ["scaremongering"], antonyms: ["objectivity"], phrases: ["media sensationalism", "resort to sensationalism"], useCase: "Phê phán báo lá cải." },
      { id: "scrutiny", word: "scrutiny", pos: "noun", level: "C1", register: "formal", skills: ["W", "R"], def: "sự soi xét kỹ lưỡng", example: "Public figures face constant media <span class='hi'>scrutiny</span>.", synonyms: ["examination", "inspection"], antonyms: ["neglect"], phrases: ["under scrutiny", "public scrutiny", "close scrutiny"], useCase: "Bàn người nổi tiếng và sự riêng tư." },
    ],
    quiz: [
      { q: "Trái nghĩa của 'biased':", options: ["partial", "one-sided", "objective"], answer: 2, explain: "objective = khách quan; hai cái kia đồng nghĩa biased." },
      { q: "'a credible source' là nguồn:", options: ["đáng tin cậy", "miễn phí", "ẩn danh"], answer: 0, explain: "credible = đáng tin; trái nghĩa dubious." },
      { q: "'sensationalism' chỉ lối đưa tin:", options: ["khách quan", "giật gân câu khách", "ngắn gọn"], answer: 1, explain: "sensationalism = giật gân để câu chú ý." },
    ],
  },
  {
    id: "globalisation",
    name: "Toàn cầu hóa",
    cards: [
      { id: "interconnected", word: "interconnected", pos: "adj", level: "C1", register: "neutral", skills: ["W", "S"], def: "liên kết chặt với nhau", example: "Economies today are deeply <span class='hi'>interconnected</span>.", synonyms: ["interdependent", "linked"], antonyms: ["isolated", "independent"], phrases: ["interconnected world", "increasingly interconnected"], useCase: "Mở bài về toàn cầu hóa." },
      { id: "homogenise", word: "homogenise", pos: "verb", level: "C2", register: "formal", skills: ["W"], def: "làm đồng nhất (mất bản sắc)", example: "Globalisation may <span class='hi'>homogenise</span> local cultures.", synonyms: ["standardise"], antonyms: ["diversify"], phrases: ["homogenise culture"], useCase: "Phê phán mặt trái toàn cầu hóa với văn hóa." },
      { id: "multinational", word: "multinational", pos: "adj/noun", level: "B2", register: "neutral", skills: ["W", "S", "R"], def: "đa quốc gia", example: "<span class='hi'>Multinational</span> corporations wield enormous influence.", synonyms: ["global", "transnational"], antonyms: ["local"], phrases: ["multinational corporation (MNC)", "multinational company"], useCase: "Bàn về tập đoàn lớn xuyên biên giới." },
      { id: "outsourcing", word: "outsourcing", pos: "noun", level: "C1", register: "neutral", skills: ["W", "S", "R"], def: "việc thuê ngoài (thường ra nước khác)", example: "<span class='hi'>Outsourcing</span> has shifted millions of jobs.", synonyms: ["subcontracting"], antonyms: ["in-house production"], phrases: ["outsourcing jobs", "labour outsourcing"], useCase: "Bàn việc làm dịch chuyển giữa các nước." },
      { id: "indigenous", word: "indigenous", pos: "adj", level: "C1", register: "formal", skills: ["W", "R"], def: "bản địa, thổ dân", example: "<span class='hi'>Indigenous</span> traditions risk disappearing.", synonyms: ["native", "local"], antonyms: ["foreign", "imported"], phrases: ["indigenous people", "indigenous culture"], useCase: "Bàn bảo tồn văn hóa bản địa." },
    ],
    quiz: [
      { q: "'homogenise cultures' nghĩa là:", options: ["làm đa dạng hơn", "làm đồng nhất, mất bản sắc", "bảo tồn"], answer: 1, explain: "homogenise = san phẳng thành giống nhau; trái nghĩa diversify." },
      { q: "'indigenous' nghĩa là:", options: ["bản địa/thổ dân", "hiện đại", "nhập khẩu"], answer: 0, explain: "indigenous = bản địa; trái nghĩa foreign/imported." },
      { q: "Trái nghĩa của 'interconnected':", options: ["interdependent", "linked", "isolated"], answer: 2, explain: "isolated = tách biệt; hai cái kia đồng nghĩa." },
    ],
  },
];
