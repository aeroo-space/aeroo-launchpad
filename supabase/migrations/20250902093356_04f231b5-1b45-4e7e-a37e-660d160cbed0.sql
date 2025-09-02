-- Fix profiles table schema and functions

-- First, drop existing table if it exists with wrong schema
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table with correct schema
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  iin TEXT NOT NULL,
  phone TEXT NOT NULL,
  telegram TEXT NOT NULL,
  school TEXT NOT NULL,
  city TEXT NOT NULL,
  grade INTEGER NOT NULL,
  age INTEGER NOT NULL,
  is_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (id = auth.uid());

-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic updated_at updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create handle_new_user_registration function
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate required fields
  IF NEW.raw_user_meta_data->>'full_name' IS NULL OR 
     NEW.raw_user_meta_data->>'iin' IS NULL OR 
     NEW.raw_user_meta_data->>'phone' IS NULL OR 
     NEW.raw_user_meta_data->>'telegram' IS NULL OR 
     NEW.raw_user_meta_data->>'school' IS NULL OR 
     NEW.raw_user_meta_data->>'city' IS NULL OR 
     NEW.raw_user_meta_data->>'grade' IS NULL OR
     NEW.raw_user_meta_data->>'age' IS NULL THEN
    RAISE EXCEPTION 'All profile fields are required';
  END IF;

  -- Validate IIN format (12 digits)
  IF LENGTH(NEW.raw_user_meta_data->>'iin') != 12 OR 
     NEW.raw_user_meta_data->>'iin' !~ '^[0-9]{12}$' THEN
    RAISE EXCEPTION 'IIN must be exactly 12 digits';
  END IF;

  -- Validate phone format (+7 followed by 10 digits)
  IF NEW.raw_user_meta_data->>'phone' !~ '^\+7 [0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}$' THEN
    RAISE EXCEPTION 'Phone must be in format +7 777 777 77 77';
  END IF;

  -- Validate telegram format (starts with @)
  IF NEW.raw_user_meta_data->>'telegram' !~ '^@.+' THEN
    RAISE EXCEPTION 'Telegram must start with @';
  END IF;

  -- Validate grade is numeric
  IF NEW.raw_user_meta_data->>'grade' !~ '^[0-9]+$' THEN
    RAISE EXCEPTION 'Grade must be numeric';
  END IF;

  -- Validate age is numeric
  IF NEW.raw_user_meta_data->>'age' !~ '^[0-9]+$' THEN
    RAISE EXCEPTION 'Age must be numeric';
  END IF;

  -- Insert profile data
  INSERT INTO public.profiles (
    id,
    full_name,
    iin,
    phone,
    telegram,
    school,
    city,
    grade,
    age,
    is_complete,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'iin',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'telegram',
    NEW.raw_user_meta_data->>'school',
    NEW.raw_user_meta_data->>'city',
    (NEW.raw_user_meta_data->>'grade')::INTEGER,
    (NEW.raw_user_meta_data->>'age')::INTEGER,
    true,
    NOW(),
    NOW()
  ) ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_registration();