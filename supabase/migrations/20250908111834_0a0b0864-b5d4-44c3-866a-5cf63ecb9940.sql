-- Enable required extensions
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema extensions;

-- Schedule the delete-user edge function to process scheduled deletions every minute
select
  cron.schedule(
    'process-scheduled-card-deletions',
    '* * * * *', -- every minute
    $$
    select net.http_post(
      url := 'https://ichuswmtnolzjbjdxcej.supabase.co/functions/v1/delete-user',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljaHVzd210bm9sempiamR4Y2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNDgxMTksImV4cCI6MjA3MjgyNDExOX0.EEOl38EKlCyabzqeoinLq3NKcm6VuJw_XzUzEgLfO8Y"}'::jsonb,
      body := '{"action":"process_scheduled"}'::jsonb
    ) as request_id;
    $$
  );