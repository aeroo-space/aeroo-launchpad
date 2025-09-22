-- Add participant4 fields to enrollments table
ALTER TABLE public.enrollments 
ADD COLUMN participant4_full_name text,
ADD COLUMN participant4_iin text,
ADD COLUMN participant4_phone text,
ADD COLUMN participant4_school text,
ADD COLUMN participant4_city text,
ADD COLUMN participant4_grade text;