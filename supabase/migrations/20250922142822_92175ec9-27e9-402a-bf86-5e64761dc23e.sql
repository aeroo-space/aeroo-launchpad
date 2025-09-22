-- Add league column to enrollments table
ALTER TABLE public.enrollments 
ADD COLUMN league text;