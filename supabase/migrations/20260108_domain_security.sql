-- Migration: Domain Security & Audit Columns
-- Adds columns for domain verification tracking, ownership proof, and abuse prevention

-- Add audit/security columns
ALTER TABLE website_configs
ADD COLUMN IF NOT EXISTS domain_added_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS domain_verified_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS domain_verification_token TEXT,
ADD COLUMN IF NOT EXISTS domain_removed_at TIMESTAMPTZ;

-- Add domain format check constraint
-- Ensures only valid domain formats can be stored
-- Pattern: alphanumeric start, optional hyphens, at least one dot, valid TLD
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'valid_domain_format'
    ) THEN
        ALTER TABLE website_configs
        ADD CONSTRAINT valid_domain_format 
        CHECK (
            custom_domain IS NULL 
            OR custom_domain ~* '^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$'
        );
    END IF;
END $$;

-- Index for finding unverified domains (for cleanup job)
CREATE INDEX IF NOT EXISTS idx_website_configs_unverified_domains 
ON website_configs (domain_added_at) 
WHERE custom_domain IS NOT NULL AND domain_verified_at IS NULL;

-- Index for cooldown checks (finding recently removed domains)
CREATE INDEX IF NOT EXISTS idx_website_configs_domain_removed 
ON website_configs (domain_removed_at) 
WHERE domain_removed_at IS NOT NULL;

-- Comment the columns for documentation
COMMENT ON COLUMN website_configs.domain_added_at IS 'Timestamp when domain was first connected';
COMMENT ON COLUMN website_configs.domain_verified_at IS 'Timestamp when DNS verification passed';
COMMENT ON COLUMN website_configs.domain_verification_token IS 'Unique token for TXT record ownership verification';
COMMENT ON COLUMN website_configs.domain_removed_at IS 'Timestamp when domain was removed (for cooldown enforcement)';
