-- Make telegram column nullable in profiles table
ALTER TABLE public.profiles 
ALTER COLUMN telegram DROP NOT NULL;