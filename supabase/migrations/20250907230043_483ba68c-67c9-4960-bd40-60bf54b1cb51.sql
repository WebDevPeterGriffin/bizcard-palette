DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'cards' AND policyname = 'Anyone can update headshot'
  ) THEN
    CREATE POLICY "Anyone can update headshot"
    ON public.cards
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;

-- Restrict updates to only headshot_url via trigger
CREATE OR REPLACE FUNCTION public.allow_only_headshot_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.id <> OLD.id
     OR NEW.full_name <> OLD.full_name
     OR COALESCE(NEW.role, '') <> COALESCE(OLD.role, '')
     OR COALESCE(NEW.company, '') <> COALESCE(OLD.company, '')
     OR COALESCE(NEW.phone, '') <> COALESCE(OLD.phone, '')
     OR COALESCE(NEW.email, '') <> COALESCE(OLD.email, '')
     OR COALESCE(NEW.website, '') <> COALESCE(OLD.website, '')
     OR NEW.slug <> OLD.slug
     OR NEW.style_id <> OLD.style_id
     OR NEW.socials <> OLD.socials
     OR COALESCE(NEW.headshot_url, '') = COALESCE(OLD.headshot_url, '')
  THEN
    RAISE EXCEPTION 'Only headshot_url can be updated publicly';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS restrict_cards_update_columns ON public.cards;
CREATE TRIGGER restrict_cards_update_columns
BEFORE UPDATE ON public.cards
FOR EACH ROW
EXECUTE FUNCTION public.allow_only_headshot_update();

DROP TRIGGER IF EXISTS update_cards_updated_at ON public.cards;
CREATE TRIGGER update_cards_updated_at
BEFORE UPDATE ON public.cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();