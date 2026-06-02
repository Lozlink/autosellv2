-- Copy overrides for hardcoded marketing pages (Refined B).
-- Hardcoded routes (e.g. /cash-for-damaged-cars, /sell-toyota) are NOT rows in
-- the `pages` table and are not served by the [...slug] catch-all. This table
-- lets an admin override individual copy strings on those pages without editing
-- code, keyed by the page's public slug. The page renders in-code defaults
-- unless a published override exists.

create table if not exists page_overrides (
  slug text primary key,
  blocks jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current (reuses set_updated_at() from migration 003).
drop trigger if exists trg_page_overrides_updated_at on page_overrides;
create trigger trg_page_overrides_updated_at
before update on page_overrides
for each row execute procedure set_updated_at();

alter table page_overrides enable row level security;

-- Anyone may read published overrides (anon key, used during SSR).
drop policy if exists "Read published page_overrides" on page_overrides;
create policy "Read published page_overrides" on page_overrides
  for select using (published = true);

-- Service role (admin API) can do anything.
drop policy if exists "Service role full access page_overrides" on page_overrides;
create policy "Service role full access page_overrides" on page_overrides
  for all using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
