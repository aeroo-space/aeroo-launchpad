-- Extend enrollments with detailed team registration fields and harden timestamp trigger
-- Ensure RLS is enabled (idempotent)
alter table public.enrollments enable row level security;

-- Harden and (re)create the updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Ensure trigger exists
drop trigger if exists trg_enrollments_updated_at on public.enrollments;
create trigger trg_enrollments_updated_at
before update on public.enrollments
for each row execute function public.update_updated_at_column();

-- Add missing columns for team registration (idempotent)
alter table public.enrollments
  add column if not exists email text,
  add column if not exists telegram text,
  add column if not exists captain_full_name text,
  add column if not exists captain_phone text,
  add column if not exists captain_age integer,
  add column if not exists city text,
  add column if not exists study_place text,
  add column if not exists participant2_info text,
  add column if not exists participant3_info text,
  add column if not exists participant4_info text,
  add column if not exists source text,
  add column if not exists consent boolean not null default false;