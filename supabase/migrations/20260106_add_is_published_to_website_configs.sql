-- Add is_published column
ALTER TABLE website_configs 
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;

-- Update RLS for SELECT
DROP POLICY IF EXISTS "Users can view their own website configs" ON website_configs;

CREATE POLICY "Users can view own or published website configs"
    ON website_configs FOR SELECT
    USING (auth.uid() = user_id OR is_published = true);

-- Ensure UPDATE policy allows updating is_published (it should already, as it checks auth.uid() = user_id)
-- But let's verify we don't need to change anything else. 
-- The existing UPDATE policy is:
-- CREATE POLICY "Users can update their own website configs"
--     ON website_configs FOR UPDATE
--     USING (auth.uid() = user_id)
--     WITH CHECK (auth.uid() = user_id);
-- This is fine, as only the owner should be able to publish/unpublish.
