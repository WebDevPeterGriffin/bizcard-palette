-- Create website_configs table
CREATE TABLE IF NOT EXISTS website_configs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template TEXT NOT NULL DEFAULT 'realtor',
    config JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, template)
);

-- Enable RLS
ALTER TABLE website_configs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own website configs"
    ON website_configs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own website configs"
    ON website_configs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own website configs"
    ON website_configs FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own website configs"
    ON website_configs FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_website_configs_updated_at
    BEFORE UPDATE ON website_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for website assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload website assets"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'website-assets' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own website assets"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'website-assets' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own website assets"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'website-assets' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Anyone can view website assets"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'website-assets');
