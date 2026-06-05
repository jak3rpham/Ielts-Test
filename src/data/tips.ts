// src/data/tips.ts
import type { LS } from "./types";

export interface Tip { tip: LS; detail: LS; }
export interface TipGroup {
  id: string;
  name: LS;
  band: "b6" | "b7" | "b8";
  intro: LS;
  tips: Tip[];
}

const L = (vi: string, en: string): LS => ({ vi, en });

export const TIPS: TipGroup[] = [
  {
    id: "mindset", band: "b7",
    name: L("Tư duy nền tảng", "Core mindset"),
    intro: L("Mấy hiểu lầm khiến người giỏi tiếng Anh vẫn kẹt band 6.5.", "Misconceptions that keep good English speakers stuck at 6.5."),
    tips: [
      { tip: L("IELTS là bài thi NGÔN NGỮ, không phải thi thông minh", "IELTS tests LANGUAGE, not intelligence"), detail: L("Không có điểm thưởng cho ý tưởng cao siêu. Một ý đơn giản triển khai rõ ràng ăn điểm cao hơn ý phức tạp diễn đạt lủng củng. Chọn ý dễ bảo vệ nhất, không phải ý 'ngầu' nhất.", "There are no bonus points for clever ideas. A simple idea developed clearly scores higher than a complex one expressed clumsily. Pick the idea easiest to defend, not the most impressive.") },
      { tip: L("Template học thuộc lòng bị trừ điểm", "Memorised templates are penalised"), detail: L("Giám khảo nghe/đọc hàng nghìn bài nên nhận ra ngay cụm sáo rỗng học vẹt. Học khung thì được, nhưng ý và câu chữ phải tự sinh cho từng đề.", "Examiners see thousands of scripts and spot rote phrases instantly. Learning frameworks is fine, but the ideas and wording must be generated fresh for each prompt.") },
      { tip: L("Khoảng cách 7→8 là độ tinh, không phải từ khó hơn", "The 7→8 gap is precision, not harder words"), detail: L("Phần lớn người thi chững ở 6.5–7.0. Vượt lên nhờ lập luận sắc, diễn đạt chính xác, sắc thái tinh tế — không phải từ to hơn.", "Most test-takers plateau at 6.5–7.0. Moving up comes from sharper reasoning, precise expression and nuance — not bigger words.") },
    ],
  },
  {
    id: "writing-strategy", band: "b7",
    name: L("Writing Task 2 — chiến lược", "Writing Task 2 — strategy"),
    intro: L("Chia 40 phút thành 3 giai đoạn: phân tích đề → viết → soát.", "Split the 40 minutes into three phases: analyse → write → check."),
    tips: [
      { tip: L("Dành 1–2 phút phân tích đề TRƯỚC khi viết", "Spend 1–2 minutes analysing the prompt BEFORE writing"), detail: L("Đa số nhảy vào viết ngay rồi mới nghĩ — dẫn đến lạc đề. Xác định: đề hỏi mấy phần? Dạng gì? Mỗi dạng đòi cách trả lời khác nhau.", "Most people start writing then think — and drift off-topic. Identify: how many parts? which type? Each type demands a different response.") },
      { tip: L("Trả lời ĐỦ MỌI phần của đề (lỗi giết điểm số 1)", "Answer EVERY part (the number-one score killer)"), detail: L("Partial task response là lỗi ẩn phổ biến nhất. Gạch chân từng yêu cầu trong đề, đảm bảo bài chạm hết.", "Partial task response is the most common hidden error. Underline each requirement and make sure your essay hits all of them.") },
      { tip: L("Quan điểm rõ từ mở bài và giữ nguyên xuyên suốt", "State a clear position upfront and keep it consistent"), detail: L("Với opinion essay, lập trường phải lộ ngay ở mở bài. Quan điểm đổi giữa chừng hoặc mập mờ → Task Response bị trừ.", "For opinion essays your stance must be clear from the introduction. A shifting or vague position lowers Task Response.") },
      { tip: L("Thi trên máy KHÔNG có spell-check", "The computer test has NO spell-check"), detail: L("Gõ sai chính tả bị tính là lỗi spelling. Chừa 2–3 phút cuối để soát lỗi.", "Typos count as spelling errors. Leave 2–3 minutes at the end to proofread.") },
      { tip: L("Đừng nhồi linking words", "Don't overuse linking words"), detail: L("Coherence không thưởng cho số lượng từ nối. Nhồi 'Moreover, Furthermore' liên tục nghe máy móc và bị trừ. Dùng đúng chỗ.", "Coherence rewards no points for quantity of connectors. Cramming 'Moreover, Furthermore' sounds mechanical and is penalised. Use them where they fit.") },
    ],
  },
  {
    id: "reading-strategy", band: "b7",
    name: L("Reading — chiến lược", "Reading — strategy"),
    intro: L("60 phút, 3 đoạn, 40 câu — quản lý thời gian là tất cả.", "60 minutes, 3 passages, 40 questions — time management is everything."),
    tips: [
      { tip: L("Đọc câu hỏi TRƯỚC, rồi quét tìm từ khóa", "Read questions FIRST, then scan for keywords"), detail: L("Đừng đọc kỹ từng chữ từ đầu. Nắm câu hỏi muốn gì, rồi scan để định vị vùng chứa đáp án, đọc kỹ đúng vùng đó.", "Don't read every word from the top. Know what the question wants, scan to locate the area, then read that part closely.") },
      { tip: L("Phân bổ ~20 phút mỗi đoạn", "Budget ~20 minutes per passage"), detail: L("Đừng sa lầy một câu khó. Khoanh tạm, đi tiếp, quay lại sau.", "Don't get stuck on one hard question. Mark it, move on, come back later.") },
      { tip: L("Phân biệt False với Not Given", "Distinguish False from Not Given"), detail: L("False = đoạn văn nói NGƯỢC lại. Not Given = đoạn văn KHÔNG đề cập. Nhiều người chọn False trong khi đáp án là Not Given vì tự suy diễn.", "False = the text contradicts it. Not Given = the text doesn't mention it. Many pick False when the answer is Not Given because they over-infer.") },
    ],
  },
  {
    id: "listening-strategy", band: "b7",
    name: L("Listening — chiến lược", "Listening — strategy"),
    intro: L("Bạn chỉ nghe MỘT lần — chuẩn bị trước khi audio chạy là mấu chốt.", "You hear it ONCE — preparing before the audio is the key."),
    tips: [
      { tip: L("Dự đoán loại đáp án trước khi nghe", "Predict the answer type before listening"), detail: L("Tranh thủ lúc đọc câu hỏi, đoán chỗ trống cần số, tên, ngày hay danh từ. Não biết trước cần bắt gì sẽ nghe trúng hơn.", "While reading the questions, predict whether the gap needs a number, name, date or noun. Knowing what to listen for helps you catch it.") },
      { tip: L("Để ý GIỚI HẠN TỪ", "Watch the WORD LIMIT"), detail: L("'No more than two words' mà viết ba từ là sai, dù đúng nghĩa.", "If it says 'no more than two words' and you write three, it's wrong even if the meaning is right.") },
      { tip: L("Dùng dấu hiệu chuyển ý / sửa thông tin", "Use signposting and correction cues"), detail: L("'however', 'but actually', 'let me correct that' — chỗ đó hay là đáp án đúng (thông tin được sửa lại).", "'however', 'but actually', 'let me correct that' — these often signal the correct, revised answer.") },
    ],
  },
  {
    id: "speaking-strategy", band: "b7",
    name: L("Speaking — chiến lược", "Speaking — strategy"),
    intro: L("Band descriptor mới nghiêng mạnh về fluency & coherence. Tự nhiên ăn điểm hơn 'ngầu'.", "Recent band descriptors lean heavily on fluency & coherence. Natural beats fancy."),
    tips: [
      { tip: L("Không bao giờ trả lời một câu cụt", "Never give one-word answers"), detail: L("Công thức: trả lời + lý do + chi tiết. 'Yes' là án tử cho Fluency.", "Formula: answer + reason + detail. A bare 'Yes' is fatal for Fluency.") },
      { tip: L("Cue card: viết TỪ KHÓA, đừng viết câu", "Cue card: jot KEYWORDS, not sentences"), detail: L("Viết câu đầy đủ rồi đọc lại nghe rất giả và tụt Fluency.", "Writing full sentences and reading them back sounds artificial and lowers Fluency.") },
      { tip: L("Xin nhắc lại câu hỏi là BÌNH THƯỜNG", "Asking for repetition is FINE"), detail: L("Ở Part 3, 'Could you repeat that, please?' không hề bị trừ điểm — đó là giao tiếp tự nhiên.", "In Part 3, 'Could you repeat that, please?' is not penalised — it's natural communication.") },
    ],
  },
  {
    id: "vocab-building", band: "b7",
    name: L("Xây vốn từ đúng cách", "Building vocabulary the right way"),
    intro: L("Cách học từ quyết định việc bạn có DÙNG được nó trong phòng thi hay không.", "How you learn words decides whether you can USE them in the exam."),
    tips: [
      { tip: L("Học theo chủ đề, không học danh sách rời", "Learn by topic, not in random lists"), detail: L("Chia thành cụm nhỏ theo chủ đề hay ra thay vì một list khổng lồ. Não nhớ theo ngữ cảnh tốt hơn nhiều.", "Group words into small topic clusters rather than one huge list. The brain remembers in context far better.") },
      { tip: L("Học collocation, không học từ đơn lẻ", "Learn collocations, not isolated words"), detail: L("Biết 'pollution' chưa đủ; phải biết 'tackle pollution', 'curb pollution'. Từ đi với từ nào mới tạo ra band 7+ Lexical.", "Knowing 'pollution' isn't enough; you need 'tackle pollution', 'curb pollution'. Which words go together is what builds band-7+ lexical resource.") },
      { tip: L("Chỉ dùng từ khi đã chắc nghĩa và cách dùng", "Only use a word once you're sure of it"), detail: L("Dùng từ 'sang' nhưng sai sắc thái còn hại hơn dùng từ đơn giản mà đúng.", "Using a fancy word with the wrong nuance hurts more than using a simple one correctly.") },
    ],
  },
];
