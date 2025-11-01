-- Create invites table
CREATE TABLE public.invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id TEXT NOT NULL,
  team_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'revoked')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  accepted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add index for performance
CREATE INDEX idx_invites_token ON public.invites(token);
CREATE INDEX idx_invites_email ON public.invites(invitee_email);
CREATE INDEX idx_invites_team ON public.invites(team_id);
CREATE INDEX idx_invites_status ON public.invites(status);

-- Enable RLS
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view invites sent to their email"
ON public.invites
FOR SELECT
USING (
  invitee_email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR created_by = auth.uid()
);

CREATE POLICY "Team captains can create invites"
ON public.invites
FOR INSERT
WITH CHECK (
  created_by = auth.uid() 
  AND EXISTS (
    SELECT 1 FROM public.enrollments 
    WHERE id = team_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update invites they created or received"
ON public.invites
FOR UPDATE
USING (
  created_by = auth.uid() 
  OR invitee_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

CREATE POLICY "Team captains can delete their invites"
ON public.invites
FOR DELETE
USING (created_by = auth.uid());

-- Trigger for updated_at
CREATE TRIGGER update_invites_updated_at
BEFORE UPDATE ON public.invites
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check if user is already in a team for competition
CREATE OR REPLACE FUNCTION public.check_team_membership(
  _user_id UUID,
  _competition_id TEXT
)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.enrollments
  WHERE competition_id = _competition_id
  AND (
    user_id = _user_id
    OR participant1_iin = (SELECT iin FROM profiles WHERE id = _user_id)
    OR participant2_iin = (SELECT iin FROM profiles WHERE id = _user_id)
    OR participant3_iin = (SELECT iin FROM profiles WHERE id = _user_id)
    OR participant4_iin = (SELECT iin FROM profiles WHERE id = _user_id)
    OR participant5_iin = (SELECT iin FROM profiles WHERE id = _user_id)
  )
  LIMIT 1;
$$;

-- Enable realtime for invites
ALTER PUBLICATION supabase_realtime ADD TABLE public.invites;