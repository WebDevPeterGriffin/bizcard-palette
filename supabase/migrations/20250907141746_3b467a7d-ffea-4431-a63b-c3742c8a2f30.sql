-- Create storage bucket for headshots if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('headshots', 'headshots', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for headshots bucket
CREATE POLICY "Anyone can view headshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'headshots');

CREATE POLICY "Anyone can upload headshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'headshots');

CREATE POLICY "Anyone can update headshots"
ON storage.objects FOR UPDATE
USING (bucket_id = 'headshots');

CREATE POLICY "Anyone can delete headshots"
ON storage.objects FOR DELETE
USING (bucket_id = 'headshots');