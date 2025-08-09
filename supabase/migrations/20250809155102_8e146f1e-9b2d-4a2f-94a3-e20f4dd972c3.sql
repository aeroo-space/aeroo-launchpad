-- Prevent duplicate registrations per user per competition
CREATE UNIQUE INDEX IF NOT EXISTS enrollments_user_competition_uidx
ON public.enrollments (user_id, competition_id);