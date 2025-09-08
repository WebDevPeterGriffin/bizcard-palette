-- Update public.allow_only_headshot_update to bypass checks for service_role
CREATE OR REPLACE FUNCTION public.allow_only_headshot_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claims json;
  jwt_role text;
BEGIN
  -- Extract JWT role if available
  BEGIN
    claims := current_setting('request.jwt.claims', true)::json;
    jwt_role := coalesce(claims->>'role', '');
  EXCEPTION WHEN others THEN
    jwt_role := '';
  END;

  -- Bypass checks for service role calls (edge functions using service key)
  IF jwt_role = 'service_role' THEN
    RETURN NEW;
  END IF;

  -- For public/anon updates, only allow changing headshot_url
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