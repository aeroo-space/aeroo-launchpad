-- Remove admin role from all users except nussupov.nis@gmail.com
DELETE FROM public.user_roles 
WHERE role = 'admin' 
AND user_id NOT IN (
  SELECT u.id 
  FROM auth.users u 
  WHERE u.email = 'nussupov.nis@gmail.com'
);