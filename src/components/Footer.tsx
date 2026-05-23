import Link from 'next/link'
import Image from 'next/image'
import { DEFAULT_EMBED_SRC, DEFAULT_PROFILE_URL } from '@/components/GoogleMapEmbed'
import { getGoogleRating } from '@/lib/googleRating'

const popularLocations = [
  { label: 'Sydney', href: '/sell-my-car-sydney' },
  { label: 'Melbourne', href: '/sell-my-car-melbourne' },
  { label: 'Brisbane', href: '/sell-my-car-brisbane' },
  { label: 'Perth', href: '/sell-my-car-perth' },
  { label: 'Adelaide', href: '/sell-my-car-adelaide' },
  { label: 'Gold Coast', href: '/sell-my-car-gold-coast' },
  { label: 'Canberra', href: '/sell-my-car-canberra' },
]

const popularBrands = [
  { label: 'Toyota', href: '/sell-toyota' },
  { label: 'Mazda', href: '/sell-mazda' },
  { label: 'Hyundai', href: '/sell-hyundai' },
  { label: 'Ford', href: '/sell-ford' },
  { label: 'BMW', href: '/sell-bmw' },
  { label: 'Mercedes', href: '/sell-mercedes' },
  { label: 'Honda', href: '/sell-honda' },
  { label: 'Nissan', href: '/sell-nissan' },
]

const vehicleTypes = [
  { label: 'SUVs', href: '/sell-suvs' },
  { label: 'Utes', href: '/sell-utes' },
  { label: 'Sedans', href: '/sell-sedans' },
  { label: 'Hatchbacks', href: '/sell-hatchbacks' },
  { label: 'Trucks', href: '/sell-trucks' },
  { label: 'Vans', href: '/sell-van' },
]

// const FACEBOOK_URL = 'https://www.facebook.com/autosell.ai'
const INSTAGRAM_URL = 'https://www.instagram.com/auto.sell.ai/'
// const LINKEDIN_URL = 'https://www.linkedin.com/company/auto-sell-ai'
// const TIKTOK_URL = 'https://www.tiktok.com/@autosell.ai'

export default async function Footer() {
  const { rating } = await getGoogleRating()
  const ratingLabel = rating != null ? rating.toFixed(1) : '5.0'

  return (
    <footer className="bg-white text-gray-700 border-t-2" style={{ borderColor: '#FFC325' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 md:py-12 md:pb-12">
        {/* Top: 4-column grid for desktop, stacked for mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1 — Company */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left order-1">
            <div className="flex justify-center md:justify-start items-center mb-3">
              <Link href="/">
                <Image
                  src="/brand-guideline/autosell-logo/PNG/1 (1).png"
                  alt="Auto-Sell.ai — sell your car online in seconds"
                  width={250}
                  height={100}
                  className="w-[180px] md:w-[200px] h-auto"
                />
              </Link>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Australia&apos;s smarter way to sell your car. AI-powered quotes in 30 minutes,
              same-day OSKO payment, and free Australia-wide pickup.
            </p>

            {/* Trust signals */}
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4" fill="#FFC325" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500 font-semibold">Rated {ratingLabel} Stars</span>
            </div>

            {/* Social */}
            <div className="flex justify-center md:justify-start gap-3">
              {/*<a*/}
              {/*  href={FACEBOOK_URL}*/}
              {/*  target="_blank"*/}
              {/*  rel="noopener noreferrer"*/}
              {/*  aria-label="Auto-Sell.ai on Facebook"*/}
              {/*  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFC325] hover:text-white flex items-center justify-center transition-colors text-gray-600"*/}
              {/*>*/}
              {/*  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">*/}
              {/*    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />*/}
              {/*  </svg>*/}
              {/*</a>*/}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Auto-Sell.ai on Instagram"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFC325] hover:text-white flex items-center justify-center transition-colors text-gray-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/*<a*/}
              {/*  href={LINKEDIN_URL}*/}
              {/*  target="_blank"*/}
              {/*  rel="noopener noreferrer"*/}
              {/*  aria-label="Auto-Sell.ai on LinkedIn"*/}
              {/*  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFC325] hover:text-white flex items-center justify-center transition-colors text-gray-600"*/}
              {/*>*/}
              {/*  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">*/}
              {/*    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />*/}
              {/*  </svg>*/}
              {/*</a>*/}
              {/*<a*/}
              {/*  href={TIKTOK_URL}*/}
              {/*  target="_blank"*/}
              {/*  rel="noopener noreferrer"*/}
              {/*  aria-label="Auto-Sell.ai on TikTok"*/}
              {/*  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#FFC325] hover:text-white flex items-center justify-center transition-colors text-gray-600"*/}
              {/*>*/}
              {/*  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">*/}
              {/*    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.4a8.16 8.16 0 0 0 4.71 1.51v-3.4a4.85 4.85 0 0 1-1.78-.4z" />*/}
              {/*  </svg>*/}
              {/*</a>*/}
            </div>
          </div>

          {/* Column 2 — Quick Links + Services */}
          <div className="text-center md:text-left order-3 md:order-2">
            <h4 className="text-base font-bold mb-3 text-gray-800 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-[#FFC325] transition-colors">Home</Link></li>
              <li><Link href="/#sell-form" className="text-gray-600 hover:text-[#FFC325] transition-colors">Sell Your Car</Link></li>
              <li><Link href="/#how-it-works" className="text-gray-600 hover:text-[#FFC325] transition-colors">How It Works</Link></li>
              <li><Link href="/#reviews" className="text-gray-600 hover:text-[#FFC325] transition-colors">Customer Reviews</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-[#FFC325] transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-[#FFC325] transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#FFC325] transition-colors">Contact Us</Link></li>
              <li><Link href="/car-valuation-guide" className="text-gray-600 hover:text-[#FFC325] transition-colors">Valuation Guide</Link></li>
              <li><Link href="/cash-for-damaged-cars" className="text-gray-600 hover:text-[#FFC325] transition-colors">Cash for Damaged Cars</Link></li>
            </ul>
          </div>

          {/* Column 3 — Locations + Vehicle Types */}
          <div className="text-center md:text-left order-4 md:order-3">
            <h4 className="text-base font-bold mb-3 text-gray-800 uppercase tracking-wide">
              Cities We Buy In
            </h4>
            <ul className="space-y-2 text-sm mb-6">
              {popularLocations.map((loc) => (
                <li key={loc.href}>
                  <Link href={loc.href} className="text-gray-600 hover:text-[#FFC325] transition-colors">
                    Sell My Car {loc.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-base font-bold mb-3 text-gray-800 uppercase tracking-wide">
              Vehicle Types
            </h4>
            <ul className="space-y-2 text-sm">
              {vehicleTypes.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-gray-600 hover:text-[#FFC325] transition-colors">
                    Sell {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact + Map */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left order-2 md:order-4">
            <h4 className="text-base font-bold mb-3 text-gray-800 uppercase tracking-wide">
              Get In Touch
            </h4>

            <ul className="space-y-3 text-sm mb-5">
              <li>
                <a
                  href="tel:0492858699"
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-[#FFC325] font-semibold transition-colors"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0492 858 699
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@auto-sell.ai"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FFC325] transition-colors break-all"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@auto-sell.ai
                </a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start text-gray-600">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Australia-wide service<br />Sydney, NSW (HQ)</span>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start text-gray-600">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Open 7 days &middot; 8am–6pm AEST</span>
              </li>
            </ul>

            {/* Google Map embed (lightweight) */}
            <div className="rounded-lg overflow-hidden border border-gray-200 mb-3">
              <iframe
                title="Auto-Sell.ai location on Google Maps"
                src={DEFAULT_EMBED_SRC}
                width="100%"
                height="140"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={DEFAULT_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFC325] hover:underline"
            >
              View on Google Maps
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Brand strip */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h4 className="text-xs font-bold mb-3 text-gray-500 uppercase tracking-widest text-center md:text-left">
            We Buy All Major Brands
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-2 text-sm">
            {popularBrands.map((brand, i) => (
              <span key={brand.href} className="flex items-center">
                <Link href={brand.href} className="text-gray-600 hover:text-[#FFC325] transition-colors">
                  Sell {brand.label}
                </Link>
                {i < popularBrands.length - 1 && (
                  <span className="text-gray-300 ml-3" aria-hidden="true">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-500 text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Auto-Sell.ai. All rights reserved.</p>
              <p className="text-xs mt-1">ABN: 87 689 164 832 &middot; Australian-owned and operated</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
              <Link href="/privacy" className="text-zinc-500 hover:text-gray-800 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-500 hover:text-gray-800 transition-colors">
                Terms &amp; Conditions
              </Link>
              <Link href="/contact" className="text-zinc-500 hover:text-gray-800 transition-colors">
                Contact Us
              </Link>
              <Link href="/blog" className="text-zinc-500 hover:text-gray-800 transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
