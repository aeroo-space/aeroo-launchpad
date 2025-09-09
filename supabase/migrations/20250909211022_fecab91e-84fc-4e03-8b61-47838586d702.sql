-- Fix security vulnerability: Remove anonymous access to product_requests
-- This policy currently allows anonymous users to view all customer data
-- We need to remove the "OR (auth.uid() IS NULL)" condition

DROP POLICY IF EXISTS "Users can view their own requests" ON public.product_requests;

-- Create new secure policy that only allows authenticated users to view their own requests
CREATE POLICY "Users can view their own requests" 
ON public.product_requests 
FOR SELECT 
USING (auth.uid() = user_id);

-- Note: Admin access is still maintained through the separate "Admin can view all requests" policy