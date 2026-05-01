interface GoogleMapEmbedProps {
  /** Optional embed URL override. When unset, defaults to an Australia-wide service-area map. */
  embedSrc?: string
  /** Direct link to the Google Business Profile (used by the "View larger map" link). */
  profileUrl?: string
  className?: string
  height?: number
  title?: string
}

// Single source of truth for the Auto-Sell.AI Google Maps embed.
// Exported so footer + contact page render the same place.
export const DEFAULT_EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6627.154192890174!2d150.8962532!3d-33.8490153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12974f9c62484b%3A0x7dc9ecf85fabfd4!2sAuto-Sell.AI!5e0!3m2!1sen!2sau!4v1777593075457!5m2!1sen!2sau"
export const DEFAULT_PROFILE_URL = "https://maps.app.goo.gl/uLQeCZTU6npZnjBHA"


export default function GoogleMapEmbed({
                                         embedSrc = DEFAULT_EMBED_SRC,
                                         profileUrl = DEFAULT_PROFILE_URL,
                                         className = 'w-full',
                                         height = 400,
                                         title = 'Auto-Sell.ai service area on Google Maps',
                                       }: GoogleMapEmbedProps) {
  return (
      <div className={className}>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
          <iframe
              title={title}
              src={embedSrc}
              width="100%"
              height={height}
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-[#FFC325]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="font-medium">Australia-wide service</span>
            </div>
            <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#FFC325] hover:underline inline-flex items-center gap-1"
            >
              View on Google Maps
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
  )
}
