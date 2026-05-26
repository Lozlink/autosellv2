import { NextRequest, NextResponse } from 'next/server'
import { sendMessage } from '@/lib/twilioClient'

/**
 * SMS notification for inbound enquiries.
 *
 * POSTed from the /requested-mockup OfferForm (fire-and-forget — failures
 * here must not block the user's success state, since the lead is already
 * saved in Supabase + emailed by the time this fires).
 *
 * Sends to the team number configured in env (LEAD_NOTIFY_PHONE). Falls back
 * to the marketing phone (0492 858 699) when the env var is unset, matching
 * the number used throughout the rest of the site so nothing silently breaks.
 */

type Body = {
  name?: string
  phone?: string
  postcode?: string
  vehicle_make?: string
  vehicle_model?: string
  vehicle_year?: string
  vin_or_reg?: string
  source?: string
}

const DEFAULT_NOTIFY_PHONE = '+61492858699'

function compose(b: Body): string {
  const vehicle =
    [b.vehicle_year, b.vehicle_make, b.vehicle_model].filter(Boolean).join(' ').trim() ||
    (b.vin_or_reg ? `Rego ${b.vin_or_reg}` : 'Vehicle TBC')
  const lines = [
    'New Auto-Sell.ai enquiry',
    `${b.name || 'Unknown'} · ${b.phone || 'no phone'}`,
    vehicle,
    b.postcode ? `Postcode ${b.postcode}` : null,
    b.source ? `Source: ${b.source}` : null,
  ].filter(Boolean)
  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body

    if (!body?.name || !body?.phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const notifyPhone = process.env.LEAD_NOTIFY_PHONE || DEFAULT_NOTIFY_PHONE
    const message = compose(body)

    await sendMessage({ to: notifyPhone, body: message }, 'sms')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[notify-lead-sms] failed', error)
    return NextResponse.json({ error: 'Failed to send notification SMS' }, { status: 500 })
  }
}
