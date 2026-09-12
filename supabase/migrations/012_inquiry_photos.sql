-- Customer photo uploads for quote-form inquiries.
--
-- Photos live in a PRIVATE Storage bucket. Only the server writes to it
-- (service role, via /api/inquiry-photos) and only the admin reads from it
-- (short-lived signed URLs from /api/admin/leads). The anon key never touches
-- the bucket, and the inquiries row only stores object paths.

alter table inquiries
  add column if not exists photo_paths text[] not null default '{}';

-- Private bucket. The browser downscales to ~<=1600px JPEG before upload, so
-- the 5 MB per-object cap is a backstop rather than a target.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'inquiry-photos',
  'inquiry-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Atomic append with the per-inquiry cap and the attach window enforced in
-- the same statement, so concurrent one-file-per-request uploads cannot
-- overshoot. Returns the new array, or NULL when nothing was appended
-- (missing inquiry, cap reached, or window closed) - the caller then deletes
-- the object it just uploaded.
create or replace function append_inquiry_photo(
  p_inquiry_id uuid,
  p_path text,
  p_max int default 6
)
returns text[]
language sql
set search_path = public
as $$
  update inquiries
     set photo_paths = array_append(photo_paths, p_path)
   where id = p_inquiry_id
     and coalesce(array_length(photo_paths, 1), 0) < p_max
     and created_at > now() - interval '24 hours'
  returning photo_paths;
$$;

-- Server-only: keep it off the anon/authenticated RPC surface.
revoke execute on function append_inquiry_photo(uuid, text, int) from public, anon, authenticated;
grant execute on function append_inquiry_photo(uuid, text, int) to service_role;
