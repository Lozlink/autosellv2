import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

type Tab = 'leads' | 'inquiries' | 'conversations'
type Range = '30' | '90' | '365' | 'all'

const VALID_TABS: Tab[] = ['leads', 'inquiries', 'conversations']
const VALID_RANGES: Range[] = ['30', '90', '365', 'all']

const DEFAULT_PAGE_SIZE = 50
const MAX_PAGE_SIZE = 200
const CONVERSATION_FALLBACK_CAP = 2000

function dateThreshold(range: Range): string | null {
  if (range === 'all') return null
  const days = parseInt(range, 10)
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

// Sanitises user input for use inside Supabase .or() filter strings.
// .or() parses commas and parentheses as syntax — leaving them in raw input
// silently breaks the query.
function sanitiseSearch(q: string): string {
  return q.replace(/[(),]/g, ' ').trim()
}

function searchClauseFor(tab: Tab, q: string): string {
  const safe = sanitiseSearch(q)
  if (!safe) return ''
  const like = `%${safe}%`
  if (tab === 'leads') {
    return [
      `name.ilike.${like}`,
      `email.ilike.${like}`,
      `phone.ilike.${like}`,
      `vin_or_reg.ilike.${like}`,
      `enquiry_type.ilike.${like}`,
      `message.ilike.${like}`,
    ].join(',')
  }
  // inquiries
  return [
    `name.ilike.${like}`,
    `email.ilike.${like}`,
    `phone.ilike.${like}`,
    `vehicle_make.ilike.${like}`,
    `vehicle_model.ilike.${like}`,
    `vehicle_year.ilike.${like}`,
    `vin_or_reg.ilike.${like}`,
    `postcode.ilike.${like}`,
    `enquiry_type.ilike.${like}`,
    `vehicle_description.ilike.${like}`,
    `message.ilike.${like}`,
  ].join(',')
}

function countSearchClause(tab: Exclude<Tab, 'conversations'>, q: string): string {
  return searchClauseFor(tab, q)
}

function conversationCountSearchClause(q: string): string {
  const safe = sanitiseSearch(q)
  if (!safe) return ''
  const like = `%${safe}%`
  return [
    `phone_number.ilike.${like}`,
    `incoming_message.ilike.${like}`,
    `outgoing_message.ilike.${like}`,
  ].join(',')
}

export async function GET(req: Request) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_auth')?.value === 'true'
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const url = new URL(req.url)
  const tabParam = url.searchParams.get('tab') ?? 'inquiries'
  const rangeParam = url.searchParams.get('range') ?? 'all'
  const pageParam = parseInt(url.searchParams.get('page') ?? '1', 10)
  const pageSizeParam = parseInt(url.searchParams.get('pageSize') ?? String(DEFAULT_PAGE_SIZE), 10)
  const qRaw = url.searchParams.get('q') ?? ''
  const q = sanitiseSearch(qRaw)

  const tab: Tab = (VALID_TABS as string[]).includes(tabParam) ? (tabParam as Tab) : 'inquiries'
  const range: Range = (VALID_RANGES as string[]).includes(rangeParam) ? (rangeParam as Range) : 'all'
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const pageSize = Math.min(
    Math.max(Number.isFinite(pageSizeParam) && pageSizeParam > 0 ? pageSizeParam : DEFAULT_PAGE_SIZE, 1),
    MAX_PAGE_SIZE,
  )
  const threshold = dateThreshold(range)

  // Build filtered count queries — counts respect the search filter so tab
  // badges accurately reflect what each tab would display.
  const buildCountQuery = (table: 'leads' | 'inquiries' | 'conversations') => {
    let qb = supabaseAdmin!.from(table).select('id', { count: 'exact', head: true })
    if (threshold) qb = qb.gte('created_at', threshold)
    if (q) {
      const clause =
        table === 'conversations'
          ? conversationCountSearchClause(q)
          : countSearchClause(table, q)
      if (clause) qb = qb.or(clause)
    }
    return qb
  }

  const [leadsCountRes, inquiriesCountRes, conversationsCountRes] = await Promise.all([
    buildCountQuery('leads'),
    buildCountQuery('inquiries'),
    buildCountQuery('conversations'),
  ])

  // For conversations, the count above counts message rows. The thread count
  // (distinct phone_numbers) requires the RPC; we'll override it below if the
  // RPC succeeds. As a fallback we leave the message count, which is at least
  // useful as a "there is some activity" signal.
  const counts = {
    leads: leadsCountRes.count ?? 0,
    inquiries: inquiriesCountRes.count ?? 0,
    conversations: conversationsCountRes.count ?? 0,
  }

  // ──────────── Active tab data ────────────
  if (tab === 'conversations') {
    const from = (page - 1) * pageSize

    // Try server-side thread aggregation via RPC.
    const rpcRes = await supabaseAdmin.rpc('get_conversation_threads', {
      threshold: threshold ?? null,
      search_query: q || null,
      page_offset: from,
      page_size: pageSize,
    })

    if (!rpcRes.error && Array.isArray(rpcRes.data)) {
      type ThreadRow = {
        phone_number: string
        platform: string
        last_at: string
        first_at: string
        message_count: number | string
        escalated: boolean
        total_count: number | string
      }
      const threadRows = rpcRes.data as ThreadRow[]
      const total = threadRows.length > 0 ? Number(threadRows[0].total_count) : 0
      counts.conversations = total

      const phones = threadRows.map((t) => t.phone_number)
      let messages: Array<{
        id: string
        phone_number: string
        incoming_message?: string
        outgoing_message?: string
        platform: string
        should_escalate?: boolean
        created_at: string
      }> = []

      if (phones.length > 0) {
        const messagesRes = await supabaseAdmin
          .from('conversations')
          .select('*')
          .in('phone_number', phones)
          .order('created_at', { ascending: true })
        if (messagesRes.error) {
          return NextResponse.json({ error: messagesRes.error.message }, { status: 500 })
        }
        messages = messagesRes.data ?? []
      }

      const messagesByPhone = new Map<string, typeof messages>()
      for (const m of messages) {
        const list = messagesByPhone.get(m.phone_number) ?? []
        list.push(m)
        messagesByPhone.set(m.phone_number, list)
      }

      const data = threadRows.map((t) => ({
        sessionId: t.phone_number,
        platform: t.platform,
        firstAt: t.first_at,
        lastAt: t.last_at,
        messageCount: Number(t.message_count),
        escalated: t.escalated,
        messages: messagesByPhone.get(t.phone_number) ?? [],
      }))

      const hasMore = from + threadRows.length < total

      return NextResponse.json({
        tab,
        range,
        q,
        page,
        pageSize,
        total,
        hasMore,
        data,
        counts,
        threadsAggregated: true,
      })
    }

    // Fallback when RPC is missing (migration not applied) — return raw rows
    // and let the client group. Cap defends against unbounded loads.
    let fallback = supabaseAdmin
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(CONVERSATION_FALLBACK_CAP)
    if (threshold) fallback = fallback.gte('created_at', threshold)
    if (q) {
      const clause = conversationCountSearchClause(q)
      if (clause) fallback = fallback.or(clause)
    }
    const fallbackRes = await fallback
    if (fallbackRes.error) {
      return NextResponse.json({ error: fallbackRes.error.message }, { status: 500 })
    }
    return NextResponse.json({
      tab,
      range,
      q,
      page: 1,
      pageSize: CONVERSATION_FALLBACK_CAP,
      total: counts.conversations,
      hasMore: false,
      data: fallbackRes.data ?? [],
      counts,
      threadsAggregated: false,
    })
  }

  // leads / inquiries
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let dataQuery = supabaseAdmin
    .from(tab)
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)
  if (threshold) dataQuery = dataQuery.gte('created_at', threshold)
  if (q) {
    const clause = countSearchClause(tab, q)
    if (clause) dataQuery = dataQuery.or(clause)
  }
  const dataRes = await dataQuery

  if (dataRes.error) {
    return NextResponse.json({ error: dataRes.error.message }, { status: 500 })
  }

  const total = dataRes.count ?? 0
  const hasMore = from + (dataRes.data?.length ?? 0) < total

  return NextResponse.json({
    tab,
    range,
    q,
    page,
    pageSize,
    total,
    hasMore,
    data: dataRes.data ?? [],
    counts,
  })
}
