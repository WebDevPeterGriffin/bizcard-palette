-- Enable Row Level Security on cards and appointments tables
-- This ensures users can only access data they're authorized to see

-- ============================================================================
-- CARDS TABLE - Row Level Security
-- ============================================================================

-- Enable RLS
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can view published cards (for public card viewing)
CREATE POLICY "Public cards are viewable by everyone"
  ON public.cards
  FOR SELECT
  USING (true);

-- Policy 2: Admins can do everything with cards
CREATE POLICY "Admins have full access to cards"
  ON public.cards
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Note: If you want card owners to be able to edit their own cards in the future,
-- you'll need to add a user_id column to the cards table and create additional policies.
-- For now, only admins can create/update/delete cards.

-- ============================================================================
-- APPOINTMENTS TABLE - Row Level Security
-- ============================================================================

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view appointments for cards they own (if applicable)
-- For now, we'll allow admins to view all appointments
CREATE POLICY "Admins can view all appointments"
  ON public.appointments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Policy 2: Anyone can create an appointment (public booking)
-- This allows visitors to book appointments without authentication
CREATE POLICY "Anyone can create appointments"
  ON public.appointments
  FOR INSERT
  WITH CHECK (true);

-- Policy 3: Admins can update/delete appointments
CREATE POLICY "Admins can manage all appointments"
  ON public.appointments
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete appointments"
  ON public.appointments
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these queries to verify RLS is enabled:

-- Check RLS status
-- SELECT tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE schemaname = 'public' 
-- AND tablename IN ('cards', 'appointments');

-- View all policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- AND tablename IN ('cards', 'appointments');
