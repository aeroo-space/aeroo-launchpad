-- Drop the existing policy
DROP POLICY IF EXISTS "Users can join team via invite" ON public.team_members;

-- Create a better policy that checks for accepted invites
CREATE POLICY "Users can join team via accepted invite"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.invites
    WHERE invites.team_id = team_members.team_id
    AND invites.accepted_by = auth.uid()
    AND invites.status = 'accepted'
  )
);