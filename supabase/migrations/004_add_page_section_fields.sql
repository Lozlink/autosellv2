-- Add hero and CTA section fields to pages
alter table pages add column if not exists hero_subtitle text;
alter table pages add column if not exists cta_heading text;
alter table pages add column if not exists cta_description text;
alter table pages add column if not exists cta_button_text text;
alter table pages add column if not exists cta_button_link text;
