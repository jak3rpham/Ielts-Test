-- ============================================================
-- LEADERBOARD CÔNG KHAI: profiles (tên hiển thị) + mở quyền đọc mock_attempts.
-- App công khai: ai cũng xem được thành tích/hoạt động của mọi người, HIỂN THỊ BẰNG TÊN
-- (không lộ email). Chạy 1 lần trong Supabase SQL Editor.
-- ============================================================

create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Tên hiển thị đọc công khai (cho leaderboard); chỉ chủ tài khoản tự sửa.
create policy "profiles public read"   on public.profiles for select using (true);
create policy "profiles insert own"    on public.profiles for insert with check (auth.uid() = id);
create policy "profiles update own"    on public.profiles for update using (auth.uid() = id);

-- Cho phép đọc CÔNG KHAI điểm mock (thêm policy, vẫn giữ "read own").
-- Postgres gộp nhiều policy SELECT bằng OR -> không phá quyền cũ.
create policy "attempts public read" on public.mock_attempts for select using (true);
