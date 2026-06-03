# TEMPLATES — Cách thêm đề bằng tay (dán vào file data)

Đây là cách 1 (không cần Supabase). Bạn dán nội dung **mình tự có** vào các file trong `src/data/`,
đặt `id` mới (không trùng), lưu lại, `npm run dev` là thấy. (Cách 2 là trang `/admin` nhập bằng form, cần Supabase.)

> Bạn cung cấp nội dung. Đừng dán nguyên văn đề có bản quyền vào bản công khai.

---

## Thêm 1 đề READING — mở `src/data/reading.ts`, chép khối này vào trong mảng `READING`

```ts
{
  id: "reading-XXX",                 // <- ĐẶT ID MỚI, không trùng
  title: "DÁN TIÊU ĐỀ BÀI ĐỌC",
  paragraphs: [
    { label: "A", text: "DÁN ĐOẠN A VÀO ĐÂY" },
    { label: "B", text: "DÁN ĐOẠN B VÀO ĐÂY" },
    // ...thêm đoạn nếu cần
  ],
  tfng: [
    { q: "DÁN CÂU KHẲNG ĐỊNH", answer: "True",      explain: "DÁN GIẢI THÍCH" },
    { q: "DÁN CÂU KHẲNG ĐỊNH", answer: "False",     explain: "" },
    { q: "DÁN CÂU KHẲNG ĐỊNH", answer: "Not Given", explain: "" },
    // answer phải đúng 1 trong: "True" | "False" | "Not Given"
  ],
  mcq: [
    {
      q: "DÁN CÂU HỎI TRẮC NGHIỆM",
      options: ["LỰA CHỌN 1", "LỰA CHỌN 2", "LỰA CHỌN 3"],
      answer: 0,                     // <- SỐ THỨ TỰ đáp án đúng (0 = lựa chọn đầu)
      explain: "DÁN GIẢI THÍCH",
    },
  ],
},
```

---

## Thêm 1 đề LISTENING — mở `src/data/listening.ts`, chép khối này vào trong mảng `LISTENING`

```ts
{
  id: "listening-XXX",               // <- ĐẶT ID MỚI
  title: "DÁN TIÊU ĐỀ",
  youtubeId: "DÁN_ID_VIDEO",         // phần sau "watch?v=" trong link YouTube
  source: "GHI NGUỒN VIDEO",         // tôn trọng tác giả
  durationMin: 10,                   // số phút cho đồng hồ
  questions: [
    { type: "fill",   q: "1. ...___...", answer: "đáp_án" , explain: "" },
    { type: "choice", q: "2. ...?", answer: "Lựa chọn đúng", options: ["A", "Lựa chọn đúng", "C"], explain: "" },
    // type "fill"  -> học viên gõ; so khớp không phân biệt hoa/thường, tự cắt khoảng trắng
    // type "choice"-> answer phải GÕ ĐÚNG nội dung của lựa chọn đúng
  ],
},
```

---

## Thêm TỪ VỰNG — mở `src/data/vocab.ts`, thêm 1 chủ đề vào mảng `VOCAB`

```ts
{
  id: "topic-XXX",
  name: "TÊN CHỦ ĐỀ",
  cards: [
    { id: "tu1", word: "word", pos: "verb", def: "nghĩa tiếng Việt", example: "Câu ví dụ có <span class='hi'>word</span>." },
  ],
  quiz: [
    { q: "Câu hỏi?", options: ["A", "B", "C"], answer: 1, explain: "Giải thích." },
  ],
},
```

## Thêm BÀI NGỮ PHÁP — mở `src/data/grammar.ts` (cấu trúc xem các bài có sẵn).

---

### Mẹo nhanh nhất
Bạn **dán đề thô vào khung chat với tôi**, tôi format lại thành đúng khối ở trên để bạn chỉ việc copy vào.
