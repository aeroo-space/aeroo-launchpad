-- Add admin role to the most recent user (assuming that's you)
INSERT INTO public.user_roles (user_id, role) 
VALUES ('7a92b59d-f81b-42c4-bb97-110406011f5c', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;