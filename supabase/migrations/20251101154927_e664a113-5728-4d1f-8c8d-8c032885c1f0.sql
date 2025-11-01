-- Allow team captains to view profiles of their team members
CREATE POLICY "Team captains can view their members' profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.team_members tm1
    JOIN public.team_members tm2 ON tm1.team_id = tm2.team_id
    WHERE tm1.user_id = auth.uid()
    AND tm1.role = 'captain'
    AND tm1.status = 'active'
    AND tm2.user_id = profiles.id
    AND tm2.status = 'active'
  )
);