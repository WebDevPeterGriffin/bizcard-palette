-- Add custom_domain and domain_config columns to website_configs
ALTER TABLE website_configs 
ADD COLUMN IF NOT EXISTS custom_domain TEXT,
ADD COLUMN IF NOT EXISTS domain_config JSONB;

-- Ensure custom_domain is unique across all websites
ALTER TABLE website_configs 
ADD CONSTRAINT unique_custom_domain UNIQUE (custom_domain);

-- Index for faster lookups in middleware
CREATE INDEX IF NOT EXISTS idx_website_configs_custom_domain ON website_configs (custom_domain);
