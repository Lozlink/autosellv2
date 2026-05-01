-- Server-side aggregation for conversation threads.
-- Groups raw conversation messages by phone_number (session) and returns one
-- row per thread with summary fields, plus a window-function total_count for
-- pagination. Optional date and search filters applied before grouping.
create or replace function get_conversation_threads(
  threshold timestamptz default null,
  search_query text default null,
  page_offset int default 0,
  page_size int default 50
)
returns table (
  phone_number text,
  platform text,
  last_at timestamptz,
  first_at timestamptz,
  message_count bigint,
  escalated boolean,
  total_count bigint
)
language sql
security definer
set search_path = public
as $$
  with filtered as (
    select *
    from conversations
    where
      (threshold is null or created_at >= threshold)
      and (
        search_query is null
        or search_query = ''
        or phone_number ilike '%' || search_query || '%'
        or coalesce(incoming_message, '') ilike '%' || search_query || '%'
        or coalesce(outgoing_message, '') ilike '%' || search_query || '%'
      )
  ),
  thread_summaries as (
    select
      phone_number,
      (array_agg(platform order by created_at asc))[1] as platform,
      max(created_at) as last_at,
      min(created_at) as first_at,
      count(*) as message_count,
      bool_or(coalesce(should_escalate, false)) as escalated
    from filtered
    group by phone_number
  ),
  counted as (
    select *, count(*) over () as total_count
    from thread_summaries
  )
  select
    phone_number,
    platform,
    last_at,
    first_at,
    message_count,
    escalated,
    total_count
  from counted
  order by last_at desc
  offset page_offset
  limit page_size;
$$;

revoke execute on function get_conversation_threads(timestamptz, text, int, int) from public;
grant execute on function get_conversation_threads(timestamptz, text, int, int) to service_role;
