-- Structured content sections for CMS pages.
-- Nullable jsonb array of typed section blocks (see src/lib/pageSections.ts).
-- Null or [] means the page renders the legacy markdown `content` field only,
-- so existing pages are unaffected.
alter table pages add column if not exists sections jsonb;
