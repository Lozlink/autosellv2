import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const { session_id, incoming_message, outgoing_message } = body

    if (!session_id) {
      return NextResponse.json({ error: 'session_id required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('conversations').insert({
      phone_number: session_id,
      incoming_message: incoming_message || null,
      outgoing_message: outgoing_message || null,
      platform: 'web',
      should_escalate: false,
    })

    if (error) {
      console.error('Conversation save error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
