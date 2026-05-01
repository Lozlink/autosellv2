import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const DEFAULT_PAGE_SIZE = 25
const MAX_PAGE_SIZE = 100
type Range = '30' | '90' | '365' | 'all'
const VALID_RANGES: Range[] = ['30', '90', '365', 'all']

function dateThreshold(range: Range): string | null {
  if (range === 'all') return null
  const days = parseInt(range, 10)
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

function sanitiseSearch(q: string): string {
  return q.replace(/[(),]/g, ' ').trim()
}

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

export async function GET(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const url = new URL(req.url)
  const pageParam = parseInt(url.searchParams.get('page') ?? '1', 10)
  const pageSizeParam = parseInt(url.searchParams.get('pageSize') ?? String(DEFAULT_PAGE_SIZE), 10)
  const rangeParam = url.searchParams.get('range') ?? 'all'
  const qRaw = url.searchParams.get('q') ?? ''
  const status = url.searchParams.get('status') ?? 'all'

  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const pageSize = Math.min(
    Math.max(Number.isFinite(pageSizeParam) && pageSizeParam > 0 ? pageSizeParam : DEFAULT_PAGE_SIZE, 1),
    MAX_PAGE_SIZE,
  )
  const range: Range = (VALID_RANGES as string[]).includes(rangeParam) ? (rangeParam as Range) : 'all'
  const threshold = dateThreshold(range)
  const q = sanitiseSearch(qRaw)

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabaseAdmin
    .from('posts')
    .select('*', { count: 'exact' })
    .order('updated_at', { ascending: false })
    .range(from, to)

  if (threshold) query = query.gte('updated_at', threshold)
  if (status === 'published') query = query.eq('published', true)
  if (status === 'draft') query = query.eq('published', false)
  if (q) {
    const like = `%${q}%`
    query = query.or(
      [
        `title.ilike.${like}`,
        `slug.ilike.${like}`,
        `excerpt.ilike.${like}`,
        `category.ilike.${like}`,
        `meta_title.ilike.${like}`,
        `meta_description.ilike.${like}`,
      ].join(','),
    )
  }

  const { data, error, count } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const total = count ?? 0
  const hasMore = from + (data?.length ?? 0) < total

  return NextResponse.json({
    data: data ?? [],
    page,
    pageSize,
    total,
    hasMore,
    range,
    q,
    status,
  })
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    title,
    slug,
    excerpt,
    content,
    image_url,
    category,
    read_time,
    meta_title,
    meta_description,
    published = true,
  } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('posts').insert({
    title,
    slug,
    excerpt: excerpt || null,
    content,
    image_url: image_url || null,
    category: category || null,
    read_time: read_time || null,
    meta_title: meta_title || null,
    meta_description: meta_description || null,
    published,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
