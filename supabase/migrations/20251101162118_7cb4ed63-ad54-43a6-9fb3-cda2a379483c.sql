-- Insert missing captain records for all enrollments without team_members entry
INSERT INTO public.team_members (user_id, team_id, competition_id, role, status, joined_at)
SELECT 
  e.user_id,
  e.id,
  e.competition_id,
  'captain',
  'active',
  e.created_at
FROM public.enrollments e
WHERE e.status = 'active'
  AND NOT EXISTS (
    SELECT 1 FROM public.team_members tm 
    WHERE tm.user_id = e.user_id 
    AND tm.team_id = e.id
    AND tm.role = 'captain'
  );