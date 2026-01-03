-- Migration: Add user_id to cards table for user ownership
-- Run this in Supabase SQL Editor

-- 1. Add nullable user_id column (existing cards will have NULL)
ALTER TABLE public.cards 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Create index for performance
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON public.cards(user_id);

-- 3. RLS policy: Users can update their own cards
DROP POLICY IF EXISTS "Users can update own cards" ON public.cards;
CREATE POLICY "Users can update own cards"
ON public.cards FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. RLS policy: Users can delete their own cards
DROP POLICY IF EXISTS "Users can delete own cards" ON public.cards;
CREATE POLICY "Users can delete own cards"
ON public.cards FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 5. Update existing INSERT policy to allow authenticated users to create cards with their user_id
-- Keep existing "Anyone can create cards" policy for anonymous card creation
-- Add new policy for authenticated users
DROP POLICY IF EXISTS "Authenticated users can create cards" ON public.cards;
CREATE POLICY "Authenticated users can create cards"
ON public.cards FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
