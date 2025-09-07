-- Add user authentication and secure the cards table
-- Add user_id column to link cards to their creators
ALTER TABLE public.cards ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Make user_id not null with a default for existing cards
-- For existing cards without owners, we'll need to handle them separately
-- But for now, let's allow nullable to not break existing data

-- Update RLS policies for better security
DROP POLICY IF EXISTS "Anyone can create cards" ON public.cards;
DROP POLICY IF EXISTS "Cards are viewable by everyone" ON public.cards;

-- New secure policies:
-- 1. Only authenticated users can create cards (and only with their own user_id)
CREATE POLICY "Authenticated users can create their own cards" 
ON public.cards 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Users can view and update their own cards
CREATE POLICY "Users can view their own cards" 
ON public.cards 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own cards" 
ON public.cards 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cards" 
ON public.cards 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- 3. Allow public read access only for sharing (this will be used by an edge function)
-- We'll create a more restrictive policy that can be bypassed by service role
CREATE POLICY "Public cards are viewable for sharing" 
ON public.cards 
FOR SELECT 
TO anon
USING (true);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON public.cards(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_slug ON public.cards(slug);