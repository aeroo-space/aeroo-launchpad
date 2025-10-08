-- Fix security issue: Require authentication for product request submissions
-- Drop existing permissive INSERT policy
DROP POLICY IF EXISTS "Users can create requests" ON public.product_requests;

-- Recreate INSERT policy requiring authentication
CREATE POLICY "Authenticated users can create requests" 
ON public.product_requests 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Also ensure user_id is NOT NULL by adding a constraint
ALTER TABLE public.product_requests 
ALTER COLUMN user_id SET NOT NULL;