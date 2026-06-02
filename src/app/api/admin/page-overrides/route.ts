import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { PAGE_COPY_REGISTRY, isKnownCopySlug } from '@/lib/pageCopyRegistry'

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

// GET /api/admin/page-overrides?slug=cash-for-damaged-cars
export async function GET(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const slug = new URL(req.url).searchParams.get('slug') ?? ''
  if (!isKnownCopySlug(slug)) {
    return NextResponse.json({ error: 'Unknown slug' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('page_overrides')
    .select('slug, blocks, published, updated_at')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    slug,
    blocks: (data?.blocks as Record<string, unknown> | undefined) ?? {},
    published: data?.published ?? false,
    updated_at: data?.updated_at ?? null,
  })
}

// PUT /api/admin/page-overrides  body: { slug, blocks, published? }
export async function PUT(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const slug = String(body.slug ?? '')
  if (!isKnownCopySlug(slug)) {
    return NextResponse.json({ error: 'Unknown slug' }, { status: 400 })
  }

  const spec = PAGE_COPY_REGISTRY[slug]
  const fieldByKey = new Map(spec.fields.map((f) => [f.key, f]))
  const incoming = (body.blocks ?? {}) as Record<string, unknown>

  // Only persist known fields; drop empties so the page falls back to its
  // in-code default rather than rendering a blank. Strings for text/textarea,
  // non-empty arrays for list fields.
  const blocks: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(incoming)) {
    const field = fieldByKey.get(key)
    if (!field) continue
    if (field.type === 'list') {
      if (Array.isArray(value) && value.length > 0) blocks[key] = value
    } else if (typeof value === 'string' && value.trim().length > 0) {
      blocks[key] = value
    }
  }

  const published = body.published === undefined ? true : Boolean(body.published)

  const { error } = await supabaseAdmin
    .from('page_overrides')
    .upsert({ slug, blocks, published, updated_at: new Date().toISOString() }, { onConflict: 'slug' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
