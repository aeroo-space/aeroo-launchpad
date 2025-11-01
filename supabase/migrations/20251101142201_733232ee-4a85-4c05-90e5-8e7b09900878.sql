-- Create team_members table to track team membership via user accounts
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('captain', 'member')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'removed')),
  joined_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members
CREATE POLICY "Users can view their team memberships"
  ON public.team_members
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Team captains can view their team members"
  ON public.team_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE enrollments.id = team_members.team_id
      AND enrollments.user_id = auth.uid()
    )
  );

CREATE POLICY "Team captains can manage team members"
  ON public.team_members
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE enrollments.id = team_members.team_id
      AND enrollments.user_id = auth.uid()
    )
  );

-- Create index for performance
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Archive existing participant data to a backup table before removing columns
CREATE TABLE public.enrollments_archive (
  id uuid,
  team_id uuid,
  competition_id text,
  participant1_full_name text,
  participant1_iin text,
  participant1_phone text,
  participant1_school text,
  participant1_city text,
  participant1_grade text,
  participant2_full_name text,
  participant2_iin text,
  participant2_phone text,
  participant2_school text,
  participant2_city text,
  participant2_grade text,
  participant3_full_name text,
  participant3_iin text,
  participant3_phone text,
  participant3_school text,
  participant3_city text,
  participant3_grade text,
  participant4_full_name text,
  participant4_iin text,
  participant4_phone text,
  participant4_school text,
  participant4_city text,
  participant4_grade text,
  participant5_full_name text,
  participant5_iin text,
  participant5_phone text,
  participant5_school text,
  participant5_city text,
  participant5_grade text,
  mentor_full_name text,
  mentor_iin text,
  mentor_phone text,
  mentor_school text,
  mentor_city text,
  mentor_telegram text,
  archived_at timestamp with time zone DEFAULT now()
);

-- Copy existing enrollment data to archive
INSERT INTO public.enrollments_archive (
  id, team_id, competition_id,
  participant1_full_name, participant1_iin, participant1_phone, participant1_school, participant1_city, participant1_grade,
  participant2_full_name, participant2_iin, participant2_phone, participant2_school, participant2_city, participant2_grade,
  participant3_full_name, participant3_iin, participant3_phone, participant3_school, participant3_city, participant3_grade,
  participant4_full_name, participant4_iin, participant4_phone, participant4_school, participant4_city, participant4_grade,
  participant5_full_name, participant5_iin, participant5_phone, participant5_school, participant5_city, participant5_grade,
  mentor_full_name, mentor_iin, mentor_phone, mentor_school, mentor_city, mentor_telegram
)
SELECT 
  id, id as team_id, competition_id,
  participant1_full_name, participant1_iin, participant1_phone, participant1_school, participant1_city, participant1_grade,
  participant2_full_name, participant2_iin, participant2_phone, participant2_school, participant2_city, participant2_grade,
  participant3_full_name, participant3_iin, participant3_phone, participant3_school, participant3_city, participant3_grade,
  participant4_full_name, participant4_iin, participant4_phone, participant4_school, participant4_city, participant4_grade,
  participant5_full_name, participant5_iin, participant5_phone, participant5_school, participant5_city, participant5_grade,
  mentor_full_name, mentor_iin, mentor_phone, mentor_school, mentor_city, mentor_telegram
FROM public.enrollments
WHERE participant1_full_name IS NOT NULL 
   OR participant2_full_name IS NOT NULL 
   OR participant3_full_name IS NOT NULL 
   OR participant4_full_name IS NOT NULL 
   OR participant5_full_name IS NOT NULL
   OR mentor_full_name IS NOT NULL;

-- Create team_member entries for existing team captains
INSERT INTO public.team_members (team_id, user_id, role, status, joined_at)
SELECT id, user_id, 'captain', 'active', created_at
FROM public.enrollments
ON CONFLICT (team_id, user_id) DO NOTHING;

-- Drop old participant columns from enrollments
ALTER TABLE public.enrollments
  DROP COLUMN IF EXISTS participant1_full_name,
  DROP COLUMN IF EXISTS participant1_iin,
  DROP COLUMN IF EXISTS participant1_phone,
  DROP COLUMN IF EXISTS participant1_school,
  DROP COLUMN IF EXISTS participant1_city,
  DROP COLUMN IF EXISTS participant1_grade,
  DROP COLUMN IF EXISTS participant2_full_name,
  DROP COLUMN IF EXISTS participant2_iin,
  DROP COLUMN IF EXISTS participant2_phone,
  DROP COLUMN IF EXISTS participant2_school,
  DROP COLUMN IF EXISTS participant2_city,
  DROP COLUMN IF EXISTS participant2_grade,
  DROP COLUMN IF EXISTS participant3_full_name,
  DROP COLUMN IF EXISTS participant3_iin,
  DROP COLUMN IF EXISTS participant3_phone,
  DROP COLUMN IF EXISTS participant3_school,
  DROP COLUMN IF EXISTS participant3_city,
  DROP COLUMN IF EXISTS participant3_grade,
  DROP COLUMN IF EXISTS participant4_full_name,
  DROP COLUMN IF EXISTS participant4_iin,
  DROP COLUMN IF EXISTS participant4_phone,
  DROP COLUMN IF EXISTS participant4_school,
  DROP COLUMN IF EXISTS participant4_city,
  DROP COLUMN IF EXISTS participant4_grade,
  DROP COLUMN IF EXISTS participant5_full_name,
  DROP COLUMN IF EXISTS participant5_iin,
  DROP COLUMN IF EXISTS participant5_phone,
  DROP COLUMN IF EXISTS participant5_school,
  DROP COLUMN IF EXISTS participant5_city,
  DROP COLUMN IF EXISTS participant5_grade,
  DROP COLUMN IF EXISTS mentor_full_name,
  DROP COLUMN IF EXISTS mentor_iin,
  DROP COLUMN IF EXISTS mentor_phone,
  DROP COLUMN IF EXISTS mentor_school,
  DROP COLUMN IF EXISTS mentor_city,
  DROP COLUMN IF EXISTS mentor_telegram;

-- Enable realtime for team_members
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;