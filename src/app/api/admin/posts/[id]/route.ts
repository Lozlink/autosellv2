import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

async function requireAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const { id } = await params
  const { data, error } = await supabaseAdmin.from('posts').select('*').eq('id', id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  if (!data) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params
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
    published,
  } = body

  const { error } = await supabaseAdmin
    .from('posts')
    .update({
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt: excerpt || null }),
      ...(content !== undefined && { content }),
      ...(image_url !== undefined && { image_url: image_url || null }),
      ...(category !== undefined && { category: category || null }),
      ...(read_time !== undefined && { read_time: read_time || null }),
      ...(meta_title !== undefined && { meta_title: meta_title || null }),
      ...(meta_description !== undefined && { meta_description: meta_description || null }),
      ...(published !== undefined && { published }),
    })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const { id } = await params
  const { error } = await supabaseAdmin.from('posts').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
