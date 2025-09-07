-- Create cards table
CREATE TABLE public.cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  style_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  socials JSONB DEFAULT '{}'::jsonb,
  headshot_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Cards are viewable by everyone" 
ON public.cards 
FOR SELECT 
USING (true);

-- Allow anonymous inserts for card creation
CREATE POLICY "Anyone can create cards" 
ON public.cards 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for headshots
INSERT INTO storage.buckets (id, name, public) VALUES ('headshots', 'headshots', true);

-- Create storage policies
CREATE POLICY "Headshot images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'headshots');

CREATE POLICY "Anyone can upload headshot images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'headshots');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cards_updated_at
BEFORE UPDATE ON public.cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();