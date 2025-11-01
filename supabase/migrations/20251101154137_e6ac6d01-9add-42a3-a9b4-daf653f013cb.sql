-- Create team_members entries for accepted invites that don't have them yet
INSERT INTO public.team_members (team_id, user_id, role, status, joined_at)
SELECT 
  i.team_id,
  i.accepted_by,
  'member',
  'active',
  i.updated_at
FROM public.invites i
WHERE i.status = 'accepted'
  AND i.accepted_by IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.team_members tm
    WHERE tm.team_id = i.team_id 
    AND tm.user_id = i.accepted_by
  );