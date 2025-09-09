-- Enable booking for existing cards
UPDATE cards 
SET 
  booking_enabled = true,
  booking_instructions = 'Thank you for your interest in scheduling a meeting. Please select a convenient time and I''ll get back to you shortly.'
WHERE booking_enabled = false;