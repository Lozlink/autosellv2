import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_auth')?.value === 'true'

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })
  }

  const [leadsRes, inquiriesRes, conversationsRes] = await Promise.all([
    supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200),
    supabaseAdmin
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200),
    supabaseAdmin
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500),
  ])

  if (leadsRes.error || inquiriesRes.error) {
    return NextResponse.json(
      { error: leadsRes.error?.message || inquiriesRes.error?.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    leads: leadsRes.data ?? [],
    inquiries: inquiriesRes.data ?? [],
    conversations: conversationsRes.data ?? [],
  })
}
