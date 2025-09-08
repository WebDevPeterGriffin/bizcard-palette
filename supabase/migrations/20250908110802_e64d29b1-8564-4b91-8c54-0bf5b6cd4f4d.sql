-- Add scheduled deletion field to cards table
ALTER TABLE public.cards ADD COLUMN scheduled_deletion_at TIMESTAMP WITH TIME ZONE;

-- Create index for efficient querying of scheduled deletions
CREATE INDEX idx_cards_scheduled_deletion ON public.cards(scheduled_deletion_at) WHERE scheduled_deletion_at IS NOT NULL;

-- Create function to clean up scheduled deletions
CREATE OR REPLACE FUNCTION public.process_scheduled_deletions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function will be called by edge function to process scheduled deletions
  -- We don't auto-delete here to ensure proper cleanup of storage files
  UPDATE public.cards 
  SET scheduled_deletion_at = NULL 
  WHERE scheduled_deletion_at <= now() 
  AND scheduled_deletion_at IS NOT NULL;
END;
$$;