-- Add SEO meta fields to posts table.
-- These are optional; blog page falls back to title/excerpt when blank.
alter table posts add column if not exists meta_title text;
alter table posts add column if not exists meta_description text;
