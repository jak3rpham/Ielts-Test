// src/data/tips.ts

export interface Tip {
  tip: string;
  detail: string;
}
export interface TipGroup {
  id: string;
  name: string;
  band: "b6" | "b7" | "b8";
  intro: string;
  tips: Tip[];
}

export const TIPS: TipGroup[] = [
  {
    id: "mindset",
    name: "Tư duy nền tảng",
    band: "b7",
    intro: "Mấy hiểu lầm khiến người giỏi tiếng Anh vẫn kẹt band 6.5.",
    tips: [
      { tip: "IELTS là bài thi NGÔN NGỮ, không phải thi thông minh", detail: "Không có điểm thưởng cho ý tưởng cao siêu. Một ý đơn giản nhưng triển khai rõ ràng ăn điểm cao hơn ý phức tạp mà bạn diễn đạt lủng củng. Chọn ý dễ bảo vệ nhất, không phải ý 'ngầu' nhất." },
      { tip: "Template học thuộc lòng bị trừ điểm", detail: "Giám khảo nghe/đọc hàng nghìn bài nên nhận ra ngay cụm sáo rỗng học vẹt. Học khung và cấu trúc thì được, nhưng ý và câu chữ phải tự sinh cho từng đề. Cụm 'In this modern era…' là cờ đỏ." },
      { tip: "Khoảng cách 7→8 là độ tinh, không phải từ khó hơn", detail: "Phần lớn người thi chững lại ở 6.5–7.0. Vượt lên không nhờ từ to hơn mà nhờ lập luận sắc, diễn đạt chính xác, sắc thái tinh tế." },
    ],
  },
  {
    id: "writing-strategy",
    name: "Writing Task 2 — chiến lược",
    band: "b7",
    intro: "Chia 40 phút thành 3 giai đoạn: phân tích đề → viết → soát.",
    tips: [
      { tip: "Dành 1–2 phút phân tích đề TRƯỚC khi viết", detail: "Đa số nhảy vào viết ngay rồi mới nghĩ — dẫn đến lạc đề. Đọc kỹ: đề hỏi mấy phần? Dạng gì (agree/disagree, discuss both, problem/solution, two-part)? Mỗi dạng đòi cách trả lời khác nhau." },
      { tip: "Trả lời ĐỦ MỌI phần của đề (lỗi giết điểm số 1)", detail: "Partial task response là lỗi ẩn phổ biến nhất. Đề 'do you agree, and why?' mà chỉ nêu quan điểm không giải thích 'why' → Task Response tụt thẳng. Gạch chân từng yêu cầu trong đề, đảm bảo bài chạm hết." },
      { tip: "Quan điểm rõ từ mở bài và giữ nguyên xuyên suốt", detail: "Với opinion essay, lập trường phải lộ ngay ở introduction. Nếu quan điểm đổi giữa chừng hoặc mập mờ, Task Response bị trừ. Discussion essay thì phải triển khai CẢ HAI phía cho đủ trước khi nêu ý mình." },
      { tip: "Mỗi đoạn thân: câu chủ đề → giải thích → ví dụ → chốt", detail: "Lỗi hay gặp là nêu ý rồi bỏ lửng, không giải thích/minh họa. Một ý được đào sâu mạnh hơn ba ý hời hợt." },
      { tip: "Dùng ví dụ từ đời thực của chính bạn", detail: "Giám khảo không kiểm chứng được 'nghiên cứu cho thấy…' — và mấy số liệu bịa thường lộ. Ví dụ cụ thể từ trải nghiệm cá nhân thuyết phục và an toàn hơn." },
      { tip: "Thi trên máy KHÔNG có spell-check", detail: "Gõ sai chính tả bị tính là lỗi spelling. Lập danh sách từ bạn hay gõ sai và học cho chắc. Chừa 2–3 phút cuối để soát lỗi." },
      { tip: "Đừng nhồi linking words", detail: "Coherence không thưởng cho số lượng từ nối. Nhồi 'Moreover, Furthermore, In addition' liên tục nghe máy móc, còn bị trừ. Dùng đúng chỗ, tự nhiên." },
    ],
  },
  {
    id: "reading-strategy",
    name: "Reading — chiến lược",
    band: "b7",
    intro: "60 phút, 3 đoạn, 40 câu — quản lý thời gian là tất cả.",
    tips: [
      { tip: "Đọc câu hỏi TRƯỚC, rồi quét đoạn tìm từ khóa", detail: "Đừng đọc kỹ từng chữ từ đầu. Nắm câu hỏi muốn gì, rồi scan đoạn để định vị vùng chứa đáp án, đọc kỹ đúng vùng đó." },
      { tip: "Phân bổ ~20 phút mỗi đoạn", detail: "Đừng sa lầy một câu khó. Khoanh tạm, đi tiếp, quay lại sau. Đoạn 3 thường khó nhất nên đừng để cạn giờ ở đó." },
      { tip: "True / False / Not Given: phân biệt False với Not Given", detail: "False = đoạn văn nói NGƯỢC lại. Not Given = đoạn văn KHÔNG đề cập (không xác nhận cũng không phủ định). Nhiều người chọn False trong khi đáp án là Not Given vì tự suy diễn." },
      { tip: "Cẩn thận từ tuyệt đối", detail: "'always', 'never', 'all', 'only' trong câu hỏi thường khiến mệnh đề thành False/Not Given vì đoạn văn hiếm khi tuyệt đối hóa như vậy." },
      { tip: "Chuyển đáp án cẩn thận, đúng chính tả", detail: "Reading cũng tính lỗi chính tả ở dạng điền từ. Chép sai từ trong đoạn cũng mất điểm." },
    ],
  },
  {
    id: "listening-strategy",
    name: "Listening — chiến lược",
    band: "b7",
    intro: "Bạn chỉ nghe MỘT lần — chuẩn bị trước khi audio chạy là mấu chốt.",
    tips: [
      { tip: "Dự đoán loại đáp án trước khi nghe", detail: "Tranh thủ lúc đọc câu hỏi, đoán chỗ trống cần điền là số, tên, ngày, hay danh từ. Não biết trước cần bắt gì sẽ nghe trúng hơn." },
      { tip: "Để ý GIỚI HẠN TỪ", detail: "'No more than two words' mà bạn viết ba từ là sai, dù đúng nghĩa. Đọc kỹ yêu cầu số từ." },
      { tip: "Chính tả và số nhiều tính điểm", detail: "Nghe đúng nhưng viết sai chính tả hoặc thiếu 's' số nhiều vẫn mất điểm. Luyện viết chính xác các từ thường gặp." },
      { tip: "Đừng dừng lại ở câu vừa lỡ", detail: "Lỡ một câu thì bỏ, bắt kịp câu sau ngay. Ngồi tiếc câu cũ là mất luôn 2–3 câu kế tiếp." },
      { tip: "Dùng dấu hiệu chuyển ý", detail: "Người nói thường báo hiệu bằng 'however', 'but actually', 'let me correct that' — chỗ đó hay là đáp án đúng (sửa lại thông tin trước đó)." },
    ],
  },
  {
    id: "speaking-strategy",
    name: "Speaking — chiến lược",
    band: "b7",
    intro: "Từ cuối 2024, band descriptor nghiêng mạnh về fluency & coherence. Tự nhiên ăn điểm hơn 'ngầu'.",
    tips: [
      { tip: "Không bao giờ trả lời một câu cụt", detail: "'Do you like cooking?' → 'Yes' là án tử cho Fluency. Công thức: trả lời + lý do + chi tiết. 'I do, actually — I got into it during lockdown and now I mostly cook Vietnamese dishes.'" },
      { tip: "Cue card: viết TỪ KHÓA, đừng viết câu", detail: "1 phút chuẩn bị: ghi 4–5 từ khóa (mỗi gạch đầu dòng một từ + mở + kết). Viết câu đầy đủ rồi đọc lại nghe rất giả và tụt Fluency." },
      { tip: "Có sẵn 'phao' kéo dài khi bí", detail: "Sợ nhất là cạn ý sau 40 giây. Khi bí, dùng 'What's interesting about that is…' rồi nối sang một ý liên quan để nói tiếp tự nhiên." },
      { tip: "Đừng nghe như đọc bài học thuộc", detail: "Giám khảo nhận ra câu học vẹt tức thì, và khoảnh khắc đó Fluency rớt. Nói như đang trò chuyện thật, không phải đọc kịch bản." },
      { tip: "Xin nhắc lại câu hỏi là BÌNH THƯỜNG", detail: "Ở Part 3, 'Could you repeat that, please?' không hề bị trừ điểm — đó là giao tiếp tự nhiên. Đừng hoảng khi không nghe rõ." },
      { tip: "Dùng từ vựng theo chủ đề + collocation", detail: "Lexical Resource cao hơn khi bạn dùng từ đúng ngữ cảnh và cụm đi với nhau tự nhiên, không phải nhồi từ 'kêu' lạc lõng." },
      { tip: "Tự ghi âm và nghe lại", detail: "Người thi nghe lại bản ghi của chính mình cải thiện điểm đáng kể — vì nghe ra chỗ ngập ngừng, lặp từ, lỗi mình không tự nhận ra lúc nói." },
    ],
  },
  {
    id: "vocab-building",
    name: "Xây vốn từ đúng cách",
    band: "b7",
    intro: "Cách học từ quyết định việc bạn có DÙNG được nó trong phòng thi hay không.",
    tips: [
      { tip: "Học theo chủ đề, không học danh sách rời", detail: "Chia thành cụm nhỏ theo chủ đề hay ra (Media, Work, Globalisation, Environment…) thay vì một list khổng lồ. Não nhớ theo ngữ cảnh tốt hơn nhiều." },
      { tip: "Học collocation, không học từ đơn lẻ", detail: "Biết 'pollution' chưa đủ; phải biết 'tackle pollution', 'curb pollution', 'air pollution'. Từ đi với từ nào mới là thứ tạo ra band 7+ Lexical." },
      { tip: "Luyện paraphrase", detail: "Khả năng diễn đạt lại một ý bằng từ khác là kỹ năng lõi cho cả Writing lẫn Speaking. Lấy một câu, viết lại 2–3 cách." },
      { tip: "Chỉ dùng từ khi đã chắc nghĩa và cách dùng", detail: "Dùng từ 'sang' nhưng sai sắc thái/ngữ pháp còn hại hơn dùng từ đơn giản mà đúng. Đừng nhét từ mới học chưa vững vào bài thi." },
    ],
  },
];
