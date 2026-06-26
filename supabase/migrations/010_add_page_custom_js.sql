-- Per-page Custom JavaScript (parallel to custom_css). Lets editors add schema
-- markup (JSON-LD) and other scripts to the pages they build. This executes
-- arbitrary author JavaScript on the page — admin-authored only, and an
-- intentional/accepted XSS surface (see CMS_PAGE_GUIDE / agency note).
alter table pages add column if not exists custom_js text;
