-- supabase/schema.sql
-- Chạy file này trong Supabase Dashboard > SQL Editor (một lần) sau khi tạo project.

-- Bảng lưu tiến độ học của từng user.
create table if not exists public.user_progress (
  user_id    uuid not null references auth.users(id) on delete cascade,
  item_id    text not null,                       -- vd: 'grammar:complex-sentences', 'vocab:mitigate'
  state      jsonb not null default '{}'::jsonb,  -- vd: {"correct": 2, "seen": true}
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

-- Bật Row Level Security: mỗi user chỉ thấy & sửa dữ liệu của chính mình.
alter table public.user_progress enable row level security;

create policy "read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "upsert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

create policy "delete own progress"
  on public.user_progress for delete
  using (auth.uid() = user_id);

-- GỢI Ý MỞ RỘNG (chưa bật):
-- Khi muốn đưa knowledge base lên DB thay vì file, tạo thêm các bảng:
--   create table public.lessons (id text primary key, type text, band text, payload jsonb, published bool default true);
--   create table public.lesson_versions (...);  -- nếu cần lịch sử chỉnh sửa
-- rồi cho admin (role riêng) ghi, còn user chỉ đọc bản published.

-- ============================================================
-- BẢNG CONTENT — chứa đề Reading/Listening nhập qua trang /admin.
-- App gộp đề ở đây với đề trong file data.
-- ============================================================
create table if not exists public.content (
  id         text primary key,        -- vd 'reading:my-test-ab12'
  type       text not null,           -- 'reading' | 'listening'
  payload    jsonb not null,          -- object đúng cấu trúc trong src/data
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.content enable row level security;

-- Ai cũng đọc được đề đã publish (kể cả học viên chưa đăng nhập).
create policy "read published content"
  on public.content for select
  using (published = true);

-- Chỉ người ĐÃ ĐĂNG NHẬP mới thêm/sửa/xóa đề (admin).
create policy "auth insert content"
  on public.content for insert to authenticated with check (true);
create policy "auth update content"
  on public.content for update to authenticated using (true);
create policy "auth delete content"
  on public.content for delete to authenticated using (true);

-- MUỐN GIỚI HẠN CHỈ MÌNH BẠN làm admin: thay 3 policy trên bằng điều kiện email, ví dụ:
--   create policy "admin insert" on public.content for insert to authenticated
--     with check ( (auth.jwt() ->> 'email') = 'ban@email.com' );
-- (làm tương tự cho update/delete)
