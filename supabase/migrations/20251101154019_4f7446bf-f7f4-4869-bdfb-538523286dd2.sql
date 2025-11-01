-- Allow users to add themselves to a team when accepting an invite
CREATE POLICY "Users can join team via accepted invite"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() 
  AND EXISTS (
    SELECT 1 FROM public.invites
    WHERE invites.team_id = team_members.team_id
    AND invites.invitee_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    AND invites.status = 'accepted'
  )
);