import { NextRequest, NextResponse } from 'next/server';
import { createCloseLead, createCloseNote } from '@/lib/closeClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      vehicle_description,
      vin_or_reg,
      postcode,
      message,
      // Autograb enrichment data
      autograb_badge,
      autograb_colour,
      autograb_body_type,
      autograb_transmission,
      autograb_engine_size,
    } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing required fields: name and phone' }, { status: 400 });
    }

    // Build lead name for quick identification in Close
    const vehicleLabel = vehicle_make && vehicle_model
      ? `${vehicle_year || ''} ${vehicle_make} ${vehicle_model}`.trim()
      : 'Vehicle TBD';
    const leadName = `${name} — ${vehicleLabel}`;

    // Build contact
    const contacts: { name: string; phones: { phone: string; type: string }[]; emails?: { email: string; type: string }[] } [] = [
      {
        name,
        phones: [{ phone, type: 'mobile' }],
        ...(email ? { emails: [{ email, type: 'office' }] } : {}),
      },
    ];

    // Create lead in Close
    const lead = await createCloseLead({
      name: leadName,
      contacts,
    });

    // Build a rich note with all vehicle + Autograb data
    const noteLines: string[] = [
      '🚗 VEHICLE DETAILS',
      '─────────────────────',
    ];

    if (vehicle_make) noteLines.push(`Make: ${vehicle_make}`);
    if (vehicle_model) noteLines.push(`Model: ${vehicle_model}`);
    if (vehicle_year) noteLines.push(`Year: ${vehicle_year}`);
    if (autograb_badge) noteLines.push(`Badge: ${autograb_badge}`);
    if (autograb_colour) noteLines.push(`Colour: ${autograb_colour}`);
    if (autograb_body_type) noteLines.push(`Body Type: ${autograb_body_type}`);
    if (autograb_transmission) noteLines.push(`Transmission: ${autograb_transmission}`);
    if (autograb_engine_size) noteLines.push(`Engine: ${autograb_engine_size}`);
    if (vin_or_reg && vin_or_reg !== 'manual_entry') noteLines.push(`Rego/VIN: ${vin_or_reg}`);
    if (postcode) noteLines.push(`Postcode: ${postcode}`);

    noteLines.push('');
    noteLines.push('📋 LEAD SOURCE');
    noteLines.push('─────────────────────');
    noteLines.push('Source: auto-sell.ai');
    if (message) noteLines.push(`Message: ${message}`);
    if (vehicle_description) noteLines.push(`Description: ${vehicle_description}`);

    await createCloseNote({
      lead_id: lead.id,
      note: noteLines.join('\n'),
    });

    return NextResponse.json({ success: true, lead_id: lead.id });
  } catch (error) {
    console.error('Close CRM lead creation error:', error);

    // Don't let Close CRM failure block the user's form submission
    return NextResponse.json(
      { error: 'CRM sync failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}
