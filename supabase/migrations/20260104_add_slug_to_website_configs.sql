-- Add slug column to website_configs
ALTER TABLE website_configs 
ADD COLUMN slug text UNIQUE;

-- Create index for faster lookups
CREATE INDEX idx_website_configs_slug ON website_configs(slug);
