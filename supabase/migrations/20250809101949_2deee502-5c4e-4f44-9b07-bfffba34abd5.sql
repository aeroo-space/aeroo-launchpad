-- Create enrollments table (idempotent)
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  competition_id text not null,
  team_name text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_enrollments_user_id on public.enrollments(user_id);
create index if not exists idx_enrollments_competition_id on public.enrollments(competition_id);

-- Enable Row Level Security
alter table public.enrollments enable row level security;

-- Recreate policies safely
drop policy if exists "Users can view their own enrollments" on public.enrollments;
drop policy if exists "Users can create their own enrollments" on public.enrollments;
drop policy if exists "Users can update their own enrollments" on public.enrollments;
drop policy if exists "Users can delete their own enrollments" on public.enrollments;

create policy "Users can view their own enrollments"
  on public.enrollments
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own enrollments"
  on public.enrollments
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own enrollments"
  on public.enrollments
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own enrollments"
  on public.enrollments
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Update timestamp function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Recreate trigger safely
drop trigger if exists trg_enrollments_updated_at on public.enrollments;
create trigger trg_enrollments_updated_at
before update on public.enrollments
for each row execute function public.update_updated_at_column();