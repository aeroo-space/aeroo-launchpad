-- Create profiles table for user data
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    iin TEXT, -- Individual Identification Number
    phone TEXT,
    telegram TEXT,
    school TEXT,
    city TEXT,
    profile_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for profiles timestamps
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update enrollments table to add new fields
ALTER TABLE public.enrollments 
ADD COLUMN IF NOT EXISTS captain_iin TEXT,
ADD COLUMN IF NOT EXISTS captain_grade TEXT,
ADD COLUMN IF NOT EXISTS participant1_full_name TEXT,
ADD COLUMN IF NOT EXISTS participant1_iin TEXT,
ADD COLUMN IF NOT EXISTS participant1_phone TEXT,
ADD COLUMN IF NOT EXISTS participant1_school TEXT,
ADD COLUMN IF NOT EXISTS participant1_city TEXT,
ADD COLUMN IF NOT EXISTS participant1_grade TEXT,
ADD COLUMN IF NOT EXISTS participant2_full_name TEXT,
ADD COLUMN IF NOT EXISTS participant2_iin TEXT,
ADD COLUMN IF NOT EXISTS participant2_phone TEXT,
ADD COLUMN IF NOT EXISTS participant2_school TEXT,
ADD COLUMN IF NOT EXISTS participant2_city TEXT,
ADD COLUMN IF NOT EXISTS participant2_grade TEXT,
ADD COLUMN IF NOT EXISTS participant3_full_name TEXT,
ADD COLUMN IF NOT EXISTS participant3_iin TEXT,
ADD COLUMN IF NOT EXISTS participant3_phone TEXT,
ADD COLUMN IF NOT EXISTS participant3_school TEXT,
ADD COLUMN IF NOT EXISTS participant3_city TEXT,
ADD COLUMN IF NOT EXISTS participant3_grade TEXT,
ADD COLUMN IF NOT EXISTS mentor_full_name TEXT,
ADD COLUMN IF NOT EXISTS mentor_iin TEXT,
ADD COLUMN IF NOT EXISTS mentor_phone TEXT,
ADD COLUMN IF NOT EXISTS mentor_school TEXT,
ADD COLUMN IF NOT EXISTS mentor_city TEXT,
ADD COLUMN IF NOT EXISTS mentor_telegram TEXT;

-- Remove old participant info fields (they'll be replaced with structured data)
ALTER TABLE public.enrollments 
DROP COLUMN IF EXISTS participant2_info,
DROP COLUMN IF EXISTS participant3_info,
DROP COLUMN IF EXISTS participant4_info;