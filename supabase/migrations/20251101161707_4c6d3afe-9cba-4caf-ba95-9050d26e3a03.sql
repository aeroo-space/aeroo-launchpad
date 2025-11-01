-- Add competition_id column to team_members
ALTER TABLE public.team_members 
ADD COLUMN competition_id TEXT;

-- Create index for better performance
CREATE INDEX idx_team_members_competition_id ON public.team_members(competition_id);

-- Update existing team_members with competition_id from enrollments
UPDATE public.team_members tm
SET competition_id = e.competition_id
FROM public.enrollments e
WHERE tm.team_id = e.id;

-- Insert the missing team member record for the accepted invite
INSERT INTO public.team_members (user_id, team_id, role, status, joined_at, competition_id)
SELECT 
  i.accepted_by,
  i.team_id,
  'member',
  'active',
  i.updated_at,
  i.competition_id
FROM public.invites i
WHERE i.status = 'accepted' 
  AND i.accepted_by IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.team_members tm 
    WHERE tm.user_id = i.accepted_by 
    AND tm.team_id = i.team_id
  );