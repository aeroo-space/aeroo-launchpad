-- Enable real-time updates for enrollments table
ALTER TABLE public.enrollments REPLICA IDENTITY FULL;

-- Add enrollments table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.enrollments;