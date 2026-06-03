# IELTS Studio

Bộ công cụ luyện IELTS (Grammar · Vocabulary · Writing · Reading · Speaking) — dùng để tự học và để dạy.
Stack: **Next.js (App Router) + Supabase**. Chạy được ngay cả khi chưa cấu hình Supabase.

---

## 1. Chạy local trong 2 phút

```bash
npm install
npm run dev
```

Mở http://localhost:3000 — app chạy ở **chế độ localStorage**: tiến độ quiz lưu trên máy này, không cần đăng nhập.
Đủ để bạn xem giao diện và để 1 người học thử.

## 2. Bật chế độ nhiều người dùng (đăng nhập + lưu tiến độ đa thiết bị)

1. Tạo project miễn phí tại https://supabase.com → vào **Project Settings → API**, copy `Project URL` và `anon public key`.
2. Tạo file `.env.local` (copy từ `.env.local.example`):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb....
   ```
3. Vào Supabase **SQL Editor**, dán toàn bộ nội dung `supabase/schema.sql` rồi Run (tạo bảng `user_progress` + bật RLS).
4. Trong Supabase **Authentication → Providers**, bật **Email** (magic link đã đủ).
5. `npm run dev` lại. Giờ nút "Đăng nhập" hoạt động; mỗi học viên có tiến độ riêng, đăng nhập máy nào cũng thấy.

> App tự phát hiện có env hay không. Có → bật auth + lưu DB. Không → localStorage. Không cần đổi code.

## 2b. Bật AI chấm Writing

1. Lấy API key tại https://console.anthropic.com.
2. Thêm vào `.env.local` (KHÔNG có tiền tố `NEXT_PUBLIC` — key phải kín ở server):
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ANTHROPIC_MODEL=claude-sonnet-4-6
   ```
3. `npm run dev` lại. Vào tab Writing T2 → viết bài → "Chấm bài bằng AI".
   Hệ thống gọi Claude qua route server `/api/grade`, trả về band cho 4 tiêu chí + nhận xét + sửa lỗi trọng điểm.

> Key chỉ nằm ở server (route handler), không bao giờ lộ ra trình duyệt. Trên Vercel, thêm `ANTHROPIC_API_KEY` ở Project Settings → Environment Variables.

## 3. Deploy lên Vercel (miễn phí, vài chục học viên dư sức)

1. Push code lên một repo GitHub.
2. Vào https://vercel.com → Import repo đó.
3. Thêm 2 biến môi trường (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) trong Vercel Project Settings.
4. Trong Supabase **Authentication → URL Configuration**, thêm domain Vercel vào *Redirect URLs* (vd `https://your-app.vercel.app/auth/callback`).
5. Deploy. Mỗi lần `git push` Vercel tự build lại.

---

## Thêm đề (2 cách)

**Cách A — Trang /admin (cần Supabase + đăng nhập).** Vào `/admin`, chọn Reading/Listening, điền form, bấm lưu. Đề lưu vào bảng `content` và hiện ngay cho học viên (gộp với đề trong file). Trang chỉ mở khi đã đăng nhập; muốn giới hạn đúng email của bạn, xem chú thích cuối `supabase/schema.sql`.

**Cách B — Dán tay vào file data.** Xem `TEMPLATES.md` — có khối mẫu chú thích từng ô cho Reading, Listening, Vocab, Grammar. Dán nội dung bạn có vào, đặt `id` mới, lưu file.

> Bạn là người đưa nội dung vào. Với đề bạn đã có, có thể dán vào khung chat để được format thành JSON đúng cấu trúc.

## Mở rộng knowledge base

Toàn bộ nội dung nằm trong `src/data/` dưới dạng object có kiểu (`src/data/types.ts`):

| File | Nội dung | Thêm bài bằng cách |
|------|----------|--------------------|
| `grammar.ts` | Bài ngữ pháp + quiz | thêm 1 object vào mảng `GRAMMAR` |
| `vocab.ts` | Chủ đề từ vựng + flashcard + quiz | thêm 1 object vào mảng `VOCAB` |
| `reading.ts` | Bài đọc + TFNG + MCQ | thêm 1 object vào mảng `READING` |
| `speaking.ts` | Part 1/2/3 + ngân hàng cụm Writing | sửa `SPEAKING`, `WRITING_BANK` |

Mỗi `id` là khóa lưu tiến độ — đặt id mới khi thêm bài, đừng trùng.

### Khi nội dung lớn / muốn cộng sự thêm bài không đụng code
Chuyển nội dung từ file sang bảng Supabase (gợi ý schema có sẵn cuối `supabase/schema.sql`), hoặc gắn một headless CMS (Payload — self-host được).

### Chừa sẵn cho tầng AI
Vì progress đã lưu theo `item_id`, sau này dễ làm: gợi ý bài theo điểm yếu, hoặc thêm route gọi Claude API để chấm Writing tự động theo band descriptor.

---

## Cấu trúc

```
src/
  app/            # các trang (App Router): /, /grammar, /vocab, /writing, /reading, /speaking, /login
  components/     # UI tương tác (Quiz, Flashcards, ReadingTest, Nav…)
  data/           # KNOWLEDGE BASE — sửa ở đây để thêm nội dung
  lib/            # supabase client/server + hook lưu tiến độ
supabase/schema.sql
```

Nội dung học do mình tự soạn (không dùng đề thi thật), dùng để dạy thoải mái.
