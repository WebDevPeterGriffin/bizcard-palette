-- Create admin_auth_codes table for temporary authentication codes
CREATE TABLE public.admin_auth_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL,
  email TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_auth_codes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access (for edge functions)
CREATE POLICY "Service role full access" 
ON public.admin_auth_codes 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create index for better performance on code lookups
CREATE INDEX idx_admin_auth_codes_code ON public.admin_auth_codes(code);
CREATE INDEX idx_admin_auth_codes_expires_at ON public.admin_auth_codes(expires_at);

-- Create function to clean up expired codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_admin_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM public.admin_auth_codes 
  WHERE expires_at < now() OR used = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;