-- Check existing triggers on cards table and modify the function to allow booking updates
-- First, let's see what triggers exist
SELECT tgname FROM pg_trigger WHERE tgrelid = 'public.cards'::regclass;

-- Update the allow_only_headshot_update function to allow booking fields to be updated
CREATE OR REPLACE FUNCTION public.allow_only_headshot_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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

  -- For public/anon updates, allow changing headshot_url, booking_enabled, and booking_instructions
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
  THEN
    -- Check if only allowed fields are being updated
    IF NOT (
      -- Allow headshot_url changes
      (COALESCE(NEW.headshot_url, '') <> COALESCE(OLD.headshot_url, ''))
      -- Allow booking field changes
      OR (NEW.booking_enabled <> OLD.booking_enabled)
      OR (COALESCE(NEW.booking_instructions, '') <> COALESCE(OLD.booking_instructions, ''))
    ) THEN
      RAISE EXCEPTION 'Only headshot_url and booking fields can be updated publicly';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;