// Shared constants for customer photo uploads on quote-form inquiries.
// Imported by both the browser (OfferForm / PhotoPicker) and the server
// route, so keep this file free of secrets and Node-only imports.

export const INQUIRY_PHOTOS_BUCKET = 'inquiry-photos'

/** Hard cap per inquiry. Also enforced atomically by append_inquiry_photo(). */
export const MAX_INQUIRY_PHOTOS = 6

/**
 * Per-file cap enforced by the upload route. The browser downscales to
 * ~<=1600px JPEG (typically 200-700 KB) before sending, so this is a backstop.
 * Must stay under Vercel's 4.5 MB request-body limit for route handlers.
 */
export const MAX_INQUIRY_PHOTO_BYTES = 4 * 1024 * 1024

export const INQUIRY_PHOTO_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
export type InquiryPhotoMime = (typeof INQUIRY_PHOTO_MIME_TYPES)[number]

/**
 * How long after an inquiry is created the customer may still attach photos.
 * Covers the post-submit "add photos" prompt on the success screen. Mirrored
 * in the SQL function; keep the two in sync.
 */
export const INQUIRY_PHOTO_ATTACH_WINDOW_MS = 24 * 60 * 60 * 1000
