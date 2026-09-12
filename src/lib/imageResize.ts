// Browser-only. Downscales a photo before upload so mobile submissions stay
// fast and under the server's per-file cap.
//
// Orientation: modern browsers apply EXIF orientation when decoding into an
// <img> (CSS `image-orientation: from-image` is the default), and drawImage()
// uses that oriented bitmap. The re-encoded JPEG therefore displays upright
// everywhere without any EXIF parsing here.

const MAX_EDGE_PX = 1600
const JPEG_QUALITY = 0.82
/** Originals already small enough are sent as-is to avoid a needless re-encode. */
const PASSTHROUGH_MAX_BYTES = 1024 * 1024
/** A decode that never settles would otherwise wedge the upload queue. */
const DECODE_TIMEOUT_MS = 20_000

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const timer = window.setTimeout(() => {
      img.src = ''
      reject(new Error('That photo took too long to process'))
    }, DECODE_TIMEOUT_MS)
    img.onload = () => {
      window.clearTimeout(timer)
      resolve(img)
    }
    img.onerror = () => {
      window.clearTimeout(timer)
      reject(new Error('Could not decode image'))
    }
    img.src = url
  })
}

/**
 * Returns a JPEG no larger than `maxEdge` on its longest side.
 * Throws if the browser cannot decode the file (e.g. HEIC on Android Chrome;
 * iOS Safari already hands the picker a JPEG). Callers decide whether to fall
 * back to the original or reject the photo.
 */
export async function downscaleImage(file: File, maxEdge = MAX_EDGE_PX): Promise<Blob> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const longest = Math.max(img.naturalWidth, img.naturalHeight)
    if (longest === 0) throw new Error('Empty image')

    const scale = Math.min(1, maxEdge / longest)
    if (scale === 1 && file.type === 'image/jpeg' && file.size <= PASSTHROUGH_MAX_BYTES) return file

    const width = Math.max(1, Math.round(img.naturalWidth * scale))
    const height = Math.max(1, Math.round(img.naturalHeight * scale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas unsupported')
    ctx.drawImage(img, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY))
    if (!blob) throw new Error('Could not encode image')
    return blob
  } finally {
    URL.revokeObjectURL(url)
  }
}
