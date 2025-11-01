-- Drop the restrictive INSERT policy on team_members
DROP POLICY IF EXISTS "Users can join team via accepted invite" ON public.team_members;

-- Create a simpler policy that allows users to insert themselves as team members
-- if they have an accepted invite
CREATE POLICY "Users can join team via invite"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.invites
    WHERE invites.team_id = team_members.team_id
    AND invites.invitee_email = (SELECT email FROM auth.users WHERE id = auth.uid())::text
    AND invites.status = 'accepted'
  )
);