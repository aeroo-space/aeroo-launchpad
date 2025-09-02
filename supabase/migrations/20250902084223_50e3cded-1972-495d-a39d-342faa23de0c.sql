-- Create or replace function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile data from user metadata
  INSERT INTO public.profiles (
    user_id,
    full_name,
    iin,
    phone,
    telegram,
    school,
    city,
    grade,
    profile_completed
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'iin',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'telegram',
    NEW.raw_user_meta_data->>'school',
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'grade',
    CASE 
      WHEN NEW.raw_user_meta_data->>'full_name' IS NOT NULL 
           AND NEW.raw_user_meta_data->>'iin' IS NOT NULL 
      THEN true 
      ELSE false 
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_registration();