import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteEmail } from '@/lib/sesClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, vehicle_make, vehicle_model, vehicle_year } = body;

    if (!name || !phone || !vehicle_make || !vehicle_model || !vehicle_year) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sendQuoteEmail(body);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
