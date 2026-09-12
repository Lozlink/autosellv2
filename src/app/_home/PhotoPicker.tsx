'use client'

import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { downscaleImage } from '@/lib/imageResize'
import { INQUIRY_PHOTO_MIME_TYPES, MAX_INQUIRY_PHOTOS, MAX_INQUIRY_PHOTO_BYTES } from '@/lib/inquiryPhotos'

// Compact, opt-in photo picker for the quote form.
//
// Deliberately NOT a dropzone. On mobile it is a single tappable line that
// opens the native picker; `accept="image/*"` without `capture` keeps all
// three iOS options (Take Photo / Photo Library / Browse). Thumbnails only
// appear once something is chosen, so an untouched form looks unchanged.
// The hidden file input is standalone - never inside a native <form>.

export type PhotoStatus = 'pending' | 'uploading' | 'done' | 'error'

export interface PendingPhoto {
  id: string
  file: File
  previewUrl: string
  status: PhotoStatus
  /**
   * Downscaled upload body. Started the moment the photo is chosen so the
   * upload can begin as soon as the lead is saved. Rejects if unusable.
   */
  prepared: Promise<Blob>
  error?: string
  /** Set when the browser could not decode/resize it; retrying cannot help. */
  unusable?: boolean
}

export function createPendingPhoto(file: File): PendingPhoto {
  return {
    id: uuidv4(),
    file,
    previewUrl: URL.createObjectURL(file),
    status: 'pending',
    prepared: enqueuePrepare(file),
  }
}

// Decoding a 12 MP photo holds ~48 MB of bitmap. Six chosen at once would
// decode in parallel and can crash the tab on older phones - and a crash
// here loses the lead. Serialise so only one decode is in memory at a time.
let prepareChain: Promise<unknown> = Promise.resolve()

function enqueuePrepare(file: File): Promise<Blob> {
  const run = prepareChain.then(() => prepareUploadBody(file))
  prepareChain = run.catch(() => undefined)
  return run
}

async function prepareUploadBody(file: File): Promise<Blob> {
  try {
    return await downscaleImage(file)
  } catch {
    // Browser couldn't decode it (typically HEIC on Android Chrome; iOS
    // already hands the picker a JPEG). Send the original if the server
    // will accept it, otherwise flag it so the customer can swap it.
    if (!(INQUIRY_PHOTO_MIME_TYPES as readonly string[]).includes(file.type)) {
      throw new Error('That photo format isn’t supported — try a JPG')
    }
    if (file.size > MAX_INQUIRY_PHOTO_BYTES) throw new Error('That photo is too large')
    return file
  }
}

export default function PhotoPicker({
  photos,
  onAdd,
  onRemove,
  onRetry,
  notice,
  prompt = 'Add photos of your car',
  sublabel = 'optional',
  align = 'left',
  disabled = false,
}: {
  photos: PendingPhoto[]
  onAdd: (files: File[]) => void
  /** Omit to make thumbnails read-only (post-submit). */
  onRemove?: (id: string) => void
  /** Omit before the lead exists - there is nothing to retry against yet. */
  onRetry?: () => void
  notice?: string | null
  prompt?: string
  sublabel?: string
  align?: 'left' | 'center'
  disabled?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const centered = align === 'center'
  const canAddMore = photos.length < MAX_INQUIRY_PHOTOS
  const failed = photos.filter((p) => p.status === 'error')
  const firstError = failed[0]?.error
  const canRetry = Boolean(onRetry) && failed.some((p) => !p.unusable)

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          // Clear so choosing the same photo again re-fires onChange.
          e.target.value = ''
          if (files.length) onAdd(files)
        }}
      />

      {canAddMore && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className={`min-h-[44px] inline-flex items-center gap-2 text-[13px] font-bold text-slate-700 hover:text-slate-900 disabled:opacity-60 ${
            centered ? 'w-full justify-center' : ''
          }`}
        >
          <CameraIcon className="w-4 h-4 flex-shrink-0" />
          <span>{prompt}</span>
          {sublabel && <span className="font-semibold text-slate-400">· {sublabel}</span>}
          {photos.length > 0 && (
            <span className="font-semibold text-slate-400">
              {photos.length}/{MAX_INQUIRY_PHOTOS}
            </span>
          )}
        </button>
      )}

      {photos.length > 0 && (
        <div className={`mt-2 flex flex-wrap gap-2 ${centered ? 'justify-center' : ''}`}>
          {photos.map((p) => (
            <Thumb key={p.id} photo={p} onRemove={onRemove} />
          ))}
        </div>
      )}

      {notice && <p className="mt-1.5 text-xs font-bold text-amber-700">{notice}</p>}

      {failed.length > 0 && (
        <p className="mt-1.5 text-xs font-bold text-red-600">
          {failed.length === 1 ? firstError || 'A photo didn’t upload.' : `${failed.length} photos didn’t upload.`}
          {canRetry && (
            <>
              {' '}
              <button type="button" onClick={onRetry} className="underline">
                Retry
              </button>
            </>
          )}
        </p>
      )}
    </div>
  )
}

function Thumb({ photo, onRemove }: { photo: PendingPhoto; onRemove?: (id: string) => void }) {
  const removable = Boolean(onRemove) && photo.status !== 'uploading' && photo.status !== 'done'
  return (
    <div
      className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200"
      title={photo.error}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
      <img src={photo.previewUrl} alt="" className="w-full h-full object-cover" />

      {photo.status === 'uploading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <span className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-slate-800 animate-spin" />
        </div>
      )}
      {photo.status === 'done' && (
        <span
          className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: '#16A34A' }}
          aria-label="Uploaded"
        >
          <CheckIcon className="w-3 h-3" />
        </span>
      )}
      {photo.status === 'error' && (
        <span
          className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-600 text-white text-[11px] font-black"
          aria-label="Failed"
        >
          !
        </span>
      )}

      {removable && onRemove && (
        <button
          type="button"
          aria-label="Remove photo"
          onClick={() => onRemove(photo.id)}
          className="absolute top-0.5 right-0.5 w-6 h-6 rounded-full bg-slate-900/70 text-white flex items-center justify-center"
        >
          <XIcon className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

// ─── Icons (match OfferForm's hand-rolled style) ──────────────────────────

function CameraIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
