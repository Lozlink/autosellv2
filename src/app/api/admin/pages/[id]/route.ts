import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { parsePageSections } from '@/lib/pageSections'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_auth')?.value === 'true'

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const { id } = await params
  const { data, error } = await supabaseAdmin.from('pages').select('*').eq('id', id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_auth')?.value === 'true'

  if (!isAdmin) {
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
    title, slug, content, sections, meta_title, meta_description, meta_keywords,
    hero_subtitle, cta_heading, cta_description, cta_button_text, cta_button_link,
    published,
  } = body

  // Sanitize sections server-side (jsonb column is untyped); an empty array
  // is stored as null so "no sections" has one canonical representation.
  const parsedSections = sections !== undefined ? parsePageSections(sections) : undefined

  const { error } = await supabaseAdmin
    .from('pages')
    .update({
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(content !== undefined && { content }),
      ...(parsedSections !== undefined && {
        sections: parsedSections.length > 0 ? parsedSections : null,
      }),
      ...(meta_title !== undefined && { meta_title }),
      ...(meta_description !== undefined && { meta_description }),
      ...(meta_keywords !== undefined && { meta_keywords }),
      ...(hero_subtitle !== undefined && { hero_subtitle }),
      ...(cta_heading !== undefined && { cta_heading }),
      ...(cta_description !== undefined && { cta_description }),
      ...(cta_button_text !== undefined && { cta_button_text }),
      ...(cta_button_link !== undefined && { cta_button_link }),
      ...(published !== undefined && { published }),
    })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_auth')?.value === 'true'

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const { id } = await params
  const { error } = await supabaseAdmin.from('pages').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
