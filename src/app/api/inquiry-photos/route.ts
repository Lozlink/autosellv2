import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import {
  INQUIRY_PHOTOS_BUCKET,
  INQUIRY_PHOTO_ATTACH_WINDOW_MS,
  MAX_INQUIRY_PHOTOS,
  MAX_INQUIRY_PHOTO_BYTES,
  type InquiryPhotoMime,
} from '@/lib/inquiryPhotos'

// Customer photo upload for a quote-form inquiry.
//
// One photo per request: each stays well under Vercel's 4.5 MB body limit and
// the form can report per-photo progress. The inquiry id is the only
// credential - a v4 UUID minted by the browser at submit time (unguessable),
// further limited to a window after the inquiry was created and a hard
// per-inquiry cap. The anon key never touches Storage: every write goes
// through the service role here, and the admin reads via signed URLs.

const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const EXTENSION: Record<InquiryPhotoMime, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

// Trust the bytes, not the client's declared MIME type.
function sniffImageType(b: Uint8Array): InquiryPhotoMime | null {
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg'
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png'
  if (
    b.length >= 12 &&
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && // "RIFF"
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50 // "WEBP"
  ) {
    return 'image/webp'
  }
  return null
}

type InquiryRow = { id: string; created_at: string; photo_paths: string[] | null }

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Photo uploads are not configured' }, { status: 500 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Expected multipart form data' }, { status: 400 })
  }

  const inquiryId = formData.get('inquiry_id')
  const photo = formData.get('photo')
  if (typeof inquiryId !== 'string' || !UUID_V4_RE.test(inquiryId)) {
    return NextResponse.json({ error: 'Invalid inquiry id' }, { status: 400 })
  }
  if (!(photo instanceof Blob) || photo.size === 0) {
    return NextResponse.json({ error: 'No photo provided' }, { status: 400 })
  }
  if (photo.size > MAX_INQUIRY_PHOTO_BYTES) {
    return NextResponse.json({ error: 'Photo is too large' }, { status: 413 })
  }

  const bytes = new Uint8Array(await photo.arrayBuffer())
  const mime = sniffImageType(bytes)
  if (!mime) {
    return NextResponse.json({ error: 'Unsupported image format - use JPG, PNG or WebP' }, { status: 415 })
  }

  // The inquiry must exist and still be inside the attach window. These
  // checks give the customer a useful message; the SQL function re-checks
  // them atomically when appending.
  const lookup = await supabaseAdmin
    .from('inquiries')
    .select('id, created_at, photo_paths')
    .eq('id', inquiryId)
    .maybeSingle()
  if (lookup.error) {
    console.error('[inquiry-photos] lookup failed', lookup.error)
    return NextResponse.json({ error: 'Could not verify inquiry' }, { status: 500 })
  }
  const inquiry = lookup.data as InquiryRow | null
  if (!inquiry) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
  }
  const createdAt = new Date(inquiry.created_at).getTime()
  if (!Number.isFinite(createdAt) || Date.now() - createdAt > INQUIRY_PHOTO_ATTACH_WINDOW_MS) {
    return NextResponse.json({ error: 'The window for adding photos has closed' }, { status: 410 })
  }
  const existing = Array.isArray(inquiry.photo_paths) ? inquiry.photo_paths.length : 0
  if (existing >= MAX_INQUIRY_PHOTOS) {
    return NextResponse.json({ error: `Maximum of ${MAX_INQUIRY_PHOTOS} photos reached` }, { status: 409 })
  }

  const path = `${inquiryId}/${uuidv4()}.${EXTENSION[mime]}`
  const bucket = supabaseAdmin.storage.from(INQUIRY_PHOTOS_BUCKET)
  const upload = await bucket.upload(path, bytes, { contentType: mime, upsert: false })
  if (upload.error) {
    console.error('[inquiry-photos] upload failed', upload.error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 502 })
  }

  // NULL back means nothing was appended (cap hit between our check and
  // now, or window closed) - remove the orphaned object.
  const append = await supabaseAdmin.rpc('append_inquiry_photo', {
    p_inquiry_id: inquiryId,
    p_path: path,
    p_max: MAX_INQUIRY_PHOTOS,
  })
  const paths: unknown = append.data
  if (append.error || !Array.isArray(paths)) {
    await bucket.remove([path])
    if (append.error) {
      console.error('[inquiry-photos] append failed', append.error)
      return NextResponse.json({ error: 'Could not attach photo' }, { status: 500 })
    }
    return NextResponse.json({ error: `Maximum of ${MAX_INQUIRY_PHOTOS} photos reached` }, { status: 409 })
  }

  return NextResponse.json({ success: true, count: paths.length, max: MAX_INQUIRY_PHOTOS })
}
