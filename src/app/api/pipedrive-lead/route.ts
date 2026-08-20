import { NextRequest, NextResponse } from 'next/server';
import { createPipedrivePerson, createPipedriveLead, createPipedriveNote } from '@/lib/pipedriveClient';

// Note content is rendered as HTML in Pipedrive, so lead-supplied values must
// be escaped before they land in the note.
function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

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

    // Build lead title for quick identification in Pipedrive
    const vehicleLabel = vehicle_make && vehicle_model
      ? `${vehicle_year || ''} ${vehicle_make} ${vehicle_model}`.trim()
      : 'Vehicle TBD';
    const leadTitle = `${name} — ${vehicleLabel}`;

    // Pipedrive requires the contact to exist as a Person before a lead can
    // reference it (unlike Close, where contacts ride along on the lead).
    const person = await createPipedrivePerson({
      name,
      phones: [{ value: phone, primary: true, label: 'mobile' }],
      ...(email ? { emails: [{ value: email, primary: true, label: 'work' }] } : {}),
    });

    const lead = await createPipedriveLead({
      title: leadTitle,
      person_id: person.id,
    });

    // Build a rich note with all vehicle + Autograb data
    const noteLines: string[] = [
      '🚗 VEHICLE DETAILS',
      '─────────────────────',
    ];

    if (vehicle_make) noteLines.push(`Make: ${esc(vehicle_make)}`);
    if (vehicle_model) noteLines.push(`Model: ${esc(vehicle_model)}`);
    if (vehicle_year) noteLines.push(`Year: ${esc(vehicle_year)}`);
    if (autograb_badge) noteLines.push(`Badge: ${esc(autograb_badge)}`);
    if (autograb_colour) noteLines.push(`Colour: ${esc(autograb_colour)}`);
    if (autograb_body_type) noteLines.push(`Body Type: ${esc(autograb_body_type)}`);
    if (autograb_transmission) noteLines.push(`Transmission: ${esc(autograb_transmission)}`);
    if (autograb_engine_size) noteLines.push(`Engine: ${esc(autograb_engine_size)}`);
    if (vin_or_reg && vin_or_reg !== 'manual_entry') noteLines.push(`Rego/VIN: ${esc(vin_or_reg)}`);
    if (postcode) noteLines.push(`Postcode: ${esc(postcode)}`);

    noteLines.push('');
    noteLines.push('📋 LEAD SOURCE');
    noteLines.push('─────────────────────');
    noteLines.push('Source: auto-sell.ai');
    if (message) noteLines.push(`Message: ${esc(message)}`);
    if (vehicle_description) noteLines.push(`Description: ${esc(vehicle_description)}`);

    await createPipedriveNote({
      lead_id: lead.id,
      content: noteLines.join('<br>'),
    });

    return NextResponse.json({ success: true, lead_id: lead.id });
  } catch (error) {
    console.error('Pipedrive lead creation error:', error);

    // Don't let Pipedrive failure block the user's form submission
    return NextResponse.json(
      { error: 'CRM sync failed', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}
