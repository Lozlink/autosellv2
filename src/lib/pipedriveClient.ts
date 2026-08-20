// Pipedrive sunset the v1 endpoints for core entities (Persons, Deals, etc.)
// on 31 Jul 2026, but Leads and Notes have no v2 equivalents — so this client
// deliberately mixes /api/v2 (persons) and /api/v1 (leads, notes).
const PIPEDRIVE_API_BASE = 'https://api.pipedrive.com';

function getAuthHeaders(): Record<string, string> {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  if (!apiToken) throw new Error('PIPEDRIVE_API_TOKEN is not configured');
  return {
    'x-api-token': apiToken,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

interface PipedrivePersonPayload {
  name: string;
  phones?: { value: string; primary?: boolean; label?: string }[];
  emails?: { value: string; primary?: boolean; label?: string }[];
}

interface PipedriveLeadPayload {
  title: string;
  person_id: number;
  [key: string]: unknown; // custom fields via their Pipedrive field keys
}

interface PipedriveNotePayload {
  lead_id: string;
  content: string; // rendered as HTML in Pipedrive — use <br> for line breaks
}

// Pipedrive wraps every response in { success, data }.
async function pipedrivePost<T>(path: string, payload: unknown, label: string): Promise<T> {
  const res = await fetch(`${PIPEDRIVE_API_BASE}${path}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Pipedrive ${label} error ${res.status}: ${errorText}`);
  }

  const body = (await res.json()) as { success: boolean; data: T };
  return body.data;
}

export async function createPipedrivePerson(payload: PipedrivePersonPayload): Promise<{ id: number }> {
  return pipedrivePost('/api/v2/persons', payload, 'person');
}

// Lead ids are UUID strings, unlike numeric person/note ids.
export async function createPipedriveLead(payload: PipedriveLeadPayload): Promise<{ id: string }> {
  return pipedrivePost('/api/v1/leads', payload, 'lead');
}

export async function createPipedriveNote(payload: PipedriveNotePayload): Promise<{ id: number }> {
  return pipedrivePost('/api/v1/notes', payload, 'note');
}
