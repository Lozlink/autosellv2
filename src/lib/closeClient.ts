const CLOSE_API_BASE = 'https://api.close.com/api/v1';

function getAuthHeader(): string {
  const apiKey = process.env.CLOSE_API_KEY;
  if (!apiKey) throw new Error('CLOSE_API_KEY is not configured');
  return 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64');
}

interface CloseContact {
  name: string;
  phones?: { phone: string; type: string }[];
  emails?: { email: string; type: string }[];
}

interface CloseLeadPayload {
  name: string;
  contacts: CloseContact[];
  [key: string]: unknown; // custom fields via custom.cf_xxx
}

interface CloseNotePayload {
  lead_id: string;
  note: string;
}

export async function createCloseLead(payload: CloseLeadPayload): Promise<{ id: string }> {
  const res = await fetch(`${CLOSE_API_BASE}/lead/`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Close API error ${res.status}: ${errorText}`);
  }

  return res.json();
}

export async function createCloseNote(payload: CloseNotePayload): Promise<{ id: string }> {
  const res = await fetch(`${CLOSE_API_BASE}/activity/note/`, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Close API note error ${res.status}: ${errorText}`);
  }

  return res.json();
}
