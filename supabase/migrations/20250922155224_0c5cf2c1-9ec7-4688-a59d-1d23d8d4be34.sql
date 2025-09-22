-- Assign admin role to the current user (replace with your actual user ID if needed)
-- You can get your user ID from the auth.users table or from your profile
INSERT INTO public.user_roles (user_id, role) 
SELECT auth.uid(), 'admin'::app_role 
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
);