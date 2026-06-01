import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteEmail, sendCustomerConfirmationEmail } from '@/lib/sesClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, vehicle_make, vehicle_model, vehicle_year } = body;

    if (!name || !phone || !vehicle_make || !vehicle_model || !vehicle_year) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Notify the team (existing behaviour — must succeed).
    await sendQuoteEmail(body);

    // 2. Fire-and-forget customer confirmation. If SES rejects the address,
    //    the env var is missing, or anything else goes wrong, log and move on —
    //    don't fail the form submission just because the auto-reply bounced.
    if (body.email) {
      sendCustomerConfirmationEmail(body).catch((err) => {
        console.error('Customer confirmation email failed:', err);
      });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
