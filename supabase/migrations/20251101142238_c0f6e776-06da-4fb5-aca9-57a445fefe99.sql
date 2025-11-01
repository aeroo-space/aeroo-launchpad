-- Enable RLS on archive table
ALTER TABLE public.enrollments_archive ENABLE ROW LEVEL SECURITY;

-- Only admins can view archived data
CREATE POLICY "Only admins can view archived enrollments"
  ON public.enrollments_archive
  FOR SELECT
  USING (public.is_admin());