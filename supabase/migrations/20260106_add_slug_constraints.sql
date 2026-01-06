DO $$
BEGIN
    -- Check and add cards_slug_key
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cards_slug_key') THEN
        ALTER TABLE public.cards ADD CONSTRAINT cards_slug_key UNIQUE (slug);
    END IF;

    -- Check and add website_configs_slug_key
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'website_configs_slug_key') THEN
        ALTER TABLE public.website_configs ADD CONSTRAINT website_configs_slug_key UNIQUE (slug);
    END IF;

    -- Check and add appointments_booking_key
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'appointments_booking_key') THEN
        ALTER TABLE public.appointments ADD CONSTRAINT appointments_booking_key UNIQUE (card_id, visitor_email, appointment_date);
    END IF;
END $$;
