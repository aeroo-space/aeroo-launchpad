-- Add participant5 columns to enrollments table for Space Settlement 2025
ALTER TABLE public.enrollments
ADD COLUMN IF NOT EXISTS participant5_full_name text,
ADD COLUMN IF NOT EXISTS participant5_iin text,
ADD COLUMN IF NOT EXISTS participant5_phone text,
ADD COLUMN IF NOT EXISTS participant5_school text,
ADD COLUMN IF NOT EXISTS participant5_city text,
ADD COLUMN IF NOT EXISTS participant5_grade text;