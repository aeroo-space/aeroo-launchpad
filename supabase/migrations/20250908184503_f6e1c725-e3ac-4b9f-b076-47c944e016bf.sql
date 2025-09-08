-- Create table for product requests
CREATE TABLE public.product_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  comment TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.product_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own requests" 
ON public.product_requests 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can create requests" 
ON public.product_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own requests" 
ON public.product_requests 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Admin users can view all requests (for now, allowing all authenticated users to see all requests for admin purposes)
CREATE POLICY "Admin can view all requests" 
ON public.product_requests 
FOR ALL 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_product_requests_updated_at
BEFORE UPDATE ON public.product_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();