-- Update handle_new_user_registration to make telegram optional
CREATE OR REPLACE FUNCTION public.handle_new_user_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Validate required fields (telegram is now optional)
  IF NEW.raw_user_meta_data->>'full_name' IS NULL OR 
     NEW.raw_user_meta_data->>'iin' IS NULL OR 
     NEW.raw_user_meta_data->>'phone' IS NULL OR 
     NEW.raw_user_meta_data->>'school' IS NULL OR 
     NEW.raw_user_meta_data->>'city' IS NULL OR 
     NEW.raw_user_meta_data->>'grade' IS NULL OR
     NEW.raw_user_meta_data->>'age' IS NULL THEN
    RAISE EXCEPTION 'Required profile fields are missing';
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

  -- Validate telegram format only if provided (starts with @)
  IF NEW.raw_user_meta_data->>'telegram' IS NOT NULL AND 
     NEW.raw_user_meta_data->>'telegram' != '' AND
     NEW.raw_user_meta_data->>'telegram' != '@' AND
     NEW.raw_user_meta_data->>'telegram' !~ '^@.+' THEN
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

  -- Insert profile data (telegram can be NULL)
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
    CASE 
      WHEN NEW.raw_user_meta_data->>'telegram' IN ('', '@') THEN NULL
      ELSE NEW.raw_user_meta_data->>'telegram'
    END,
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
$function$;