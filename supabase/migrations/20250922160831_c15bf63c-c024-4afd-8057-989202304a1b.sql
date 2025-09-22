-- Add phone column to product_requests table
ALTER TABLE public.product_requests 
ADD COLUMN phone TEXT;