-- Create security definer function to get current user's email
CREATE OR REPLACE FUNCTION public.get_current_user_email()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email::text FROM auth.users WHERE id = auth.uid();
$$;

-- Drop existing policies that reference auth.users directly
DROP POLICY IF EXISTS "Users can view invites sent to their email" ON public.invites;
DROP POLICY IF EXISTS "Users can update invites they created or received" ON public.invites;

-- Recreate policies using the security definer function
CREATE POLICY "Users can view invites sent to their email" 
ON public.invites 
FOR SELECT 
USING (
  invitee_email = public.get_current_user_email() 
  OR created_by = auth.uid()
);

CREATE POLICY "Users can update invites they created or received" 
ON public.invites 
FOR UPDATE 
USING (
  created_by = auth.uid() 
  OR invitee_email = public.get_current_user_email()
);