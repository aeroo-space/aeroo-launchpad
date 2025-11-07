
-- Add award_place column to enrollments table
ALTER TABLE public.enrollments
ADD COLUMN award_place text;

-- Add comment explaining the field
COMMENT ON COLUMN public.enrollments.award_place IS 'Competition award place (e.g., "1st Place ASSC 2025", "2nd Place ASSC 2025", etc.)';
