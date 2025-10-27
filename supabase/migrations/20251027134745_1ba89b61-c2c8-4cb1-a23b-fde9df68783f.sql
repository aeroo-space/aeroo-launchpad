-- Add submission_link column to enrollments table
ALTER TABLE public.enrollments 
ADD COLUMN IF NOT EXISTS submission_link TEXT;