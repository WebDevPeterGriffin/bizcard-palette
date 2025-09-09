-- Create function to enable booking for cards (bypasses the restriction trigger)
CREATE OR REPLACE FUNCTION public.enable_booking_for_cards()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Temporarily disable the trigger
  ALTER TABLE public.cards DISABLE TRIGGER allow_only_headshot_update_trigger;
  
  -- Update the cards
  UPDATE public.cards 
  SET 
    booking_enabled = true,
    booking_instructions = 'Thank you for your interest in scheduling a meeting. Please select a convenient time and I''ll get back to you shortly.'
  WHERE booking_enabled = false;
  
  -- Re-enable the trigger
  ALTER TABLE public.cards ENABLE TRIGGER allow_only_headshot_update_trigger;
END;
$function$;

-- Execute the function
SELECT public.enable_booking_for_cards();