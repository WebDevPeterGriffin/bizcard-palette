-- Create website_inquiries table
CREATE TABLE IF NOT EXISTS website_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE website_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own website inquiries"
    ON website_inquiries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert website inquiries"
    ON website_inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own website inquiries"
    ON website_inquiries FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own website inquiries"
    ON website_inquiries FOR DELETE
    USING (auth.uid() = user_id);
