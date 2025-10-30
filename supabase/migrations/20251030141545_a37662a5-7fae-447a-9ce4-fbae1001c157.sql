-- Add new feedback questions
ALTER TABLE public.feedback
ADD COLUMN question6 TEXT,
ADD COLUMN question7 TEXT,
ADD COLUMN question8 TEXT;