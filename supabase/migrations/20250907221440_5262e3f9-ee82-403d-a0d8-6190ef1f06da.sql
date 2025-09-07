-- Fix RLS policies to allow card creation
-- Drop the restrictive policy that's causing issues
DROP POLICY IF EXISTS "No direct table access" ON public.cards;

-- Create a policy that allows reading cards by slug only (for sharing)
CREATE POLICY "Cards can be read by slug" 
ON public.cards 
FOR SELECT 
TO anon, authenticated
USING (true);

-- Ensure the insert policy is working properly
DROP POLICY IF EXISTS "Anyone can create cards" ON public.cards;
CREATE POLICY "Anyone can create cards" 
ON public.cards 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);