-- Remove authentication requirements and fix security by restricting bulk access
-- Remove user_id column since we don't need user accounts
ALTER TABLE public.cards DROP COLUMN IF EXISTS user_id;

-- Update RLS policies to allow creation and individual access but prevent bulk queries
DROP POLICY IF EXISTS "Authenticated users can create their own cards" ON public.cards;
DROP POLICY IF EXISTS "Users can view their own cards" ON public.cards;
DROP POLICY IF EXISTS "Users can update their own cards" ON public.cards;
DROP POLICY IF EXISTS "Users can delete their own cards" ON public.cards;
DROP POLICY IF EXISTS "Public cards are viewable for sharing" ON public.cards;

-- Allow anyone to create cards (no authentication needed)
CREATE POLICY "Anyone can create cards" 
ON public.cards 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Restrict direct table access - cards can only be accessed via edge function
-- This prevents bulk queries while allowing individual card access through our secure endpoint
CREATE POLICY "No direct table access" 
ON public.cards 
FOR SELECT 
TO anon, authenticated
USING (false);

-- Allow service role full access (for edge function)
CREATE POLICY "Service role full access" 
ON public.cards 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);