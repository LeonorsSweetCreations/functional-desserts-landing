-- The Functional Desserts Program landing page
-- Run in Supabase Studio (SQL editor) or with `supabase db push`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- leads: every email captured on the page (waiting list and free guide)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  email              text not null,
  first_name         text,
  source             text not null check (source in ('waitlist', 'free_guide')),
  utm_source         text,
  utm_medium         text,
  utm_campaign       text,
  consent            boolean not null default false,
  synced_to_systeme  boolean not null default false,
  systeme_contact_id text,
  created_at         timestamptz not null default now(),
  constraint leads_email_source_unique unique (email, source)
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_unsynced_idx on public.leads (synced_to_systeme) where synced_to_systeme = false;

alter table public.leads enable row level security;
-- No policies on purpose: only the service role (server Route Handler) reads or writes.

-- ---------------------------------------------------------------------------
-- testimonials: real student quotes, published ones are readable by anyone
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  text         text not null,
  photo_url    text,
  highlight    text,                 -- short phrase shown as the card title
  is_published boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

alter table public.testimonials enable row level security;

drop policy if exists "Published testimonials are public" on public.testimonials;
create policy "Published testimonials are public"
  on public.testimonials
  for select
  to anon, authenticated
  using (is_published = true);

-- ---------------------------------------------------------------------------
-- Grants: defence in depth on top of RLS. The browser never talks to these
-- tables directly; the server uses the service role for leads and the anon
-- key only to read published testimonials.
-- ---------------------------------------------------------------------------
revoke all on table public.leads from anon, authenticated;
revoke all on table public.testimonials from anon, authenticated;
grant select on table public.testimonials to anon, authenticated;
