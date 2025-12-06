# Supabase Migration for Forms

Run the following SQL in your Supabase SQL Editor to create the necessary tables for the Contact form and Waitlist.

## 1. Create Contact Messages Table

```sql
create table public.contact_messages (
  id uuid not null default gen_random_uuid (),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone not null default now(),
  constraint contact_messages_pkey primary key (id)
) tablespace pg_default;

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Allow inserts from public (anon)
create policy "Enable insert for everyone" on public.contact_messages
  for insert with check (true);
```

## 2. Create Waitlist Table

```sql
create table public.waitlist (
  id uuid not null default gen_random_uuid (),
  email text not null,
  interest text not null, -- 'cards', 'websites', or 'both'
  created_at timestamp with time zone not null default now(),
  constraint waitlist_pkey primary key (id),
  constraint waitlist_email_key unique (email)
) tablespace pg_default;

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow inserts from public (anon)
create policy "Enable insert for everyone" on public.waitlist
  for insert with check (true);
```
