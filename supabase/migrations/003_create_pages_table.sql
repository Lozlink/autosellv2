-- Create pages table for static/landing pages
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  meta_title text,
  meta_description text,
  meta_keywords text,
  content text not null,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_pages_published on pages(published);
create index if not exists idx_pages_created_at on pages(created_at desc);
create index if not exists idx_pages_slug on pages(slug);

-- Triggers to keep updated_at current
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_pages_updated_at on pages;
create trigger trg_pages_updated_at
before update on pages
for each row execute procedure set_updated_at();

-- Enable Row Level Security
alter table pages enable row level security;

-- Allow anyone to read published pages
drop policy if exists "Read published pages" on pages;
create policy "Read published pages" on pages
  for select using (published = true);

-- Service role can do anything
drop policy if exists "Service role full access" on pages;
create policy "Service role full access" on pages
  for all using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
