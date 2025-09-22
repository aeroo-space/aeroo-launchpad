-- Add admin role to the current user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('2d8f2f88-4777-4f62-ad70-969d12502d22', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;