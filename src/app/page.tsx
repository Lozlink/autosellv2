/**
 * Home page (/) — the lovable-style layout Alex signed off on. Previously
 * lived at /requested-mockup; promoted to the canonical home page on this
 * branch. Associated components (MockHeader, OfferForm, Reveal, LiveActivity,
 * MobileMenu) live in ./_home/ (private folder — the underscore prefix
 * prevents Next from treating it as a route). The old hand-rolled home page
 * is preserved at ./_home/legacy-page.tsx.bak.
 *
 * Geist font is applied globally via app/layout.tsx, so no scoped <style>
 * block is needed here.
 */

import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import OfferForm from './_home/OfferForm'
import OfferCtaLink from './_home/OfferCtaLink'
import Reveal from './_home/Reveal'
import Header from '@/components/Header'
import { FAQPageJsonLd } from '@/components/JsonLd'
import { getPageOverridesCached, text, list } from '@/lib/pageContent'
import { PAGE_COPY_DEFAULTS } from '@/lib/pageCopyDefaults'
import { getGoogleReviews } from '@/lib/googleRating'

const SLUG = 'home'
const D = PAGE_COPY_DEFAULTS.home

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const b = await getPageOverridesCached(SLUG)
  const title = text(b, 'meta_title', D.meta_title)
  const description = text(b, 'meta_description', D.meta_description)
  return {
    title,
    description,
    keywords: text(b, 'meta_keywords', D.meta_keywords),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_AU',
      url: 'https://www.auto-sell.ai',
    },
    alternates: { canonical: 'https://www.auto-sell.ai' },
  }
}

// FAQ data — single source of truth for the on-page accordion AND the JSON-LD
// search snippets, and the default for the editable `faq_items` override.
interface FaqItem { q: string; a: string }
const FAQ_DEFAULTS: FaqItem[] = [
  {
    q: 'How do I sell my car online in Australia?',
    a: "Simply enter your vehicle details into our online valuation form — rego, make, model, and a few basic condition details. Our AI generates a fair market offer within seconds. If you're happy with it, accept online, and we'll organise pickup at a time that suits you. Payment is made via OSKO on the same day.",
  },
  {
    q: 'How long does it take to sell my car with Auto-Sell.ai?',
    a: 'Most customers complete the entire process — valuation to payment — within the same day. The AI valuation takes under 60 seconds. Once you accept the offer and we complete the pickup, payment hits your account instantly via OSKO. No multi-day waits.',
  },
  {
    q: 'What condition does my car need to be in?',
    a: "Any condition. Damaged, unregistered, high kilometres, mechanical issues — we buy it all. You don't need to fix anything up or spend money preparing the car before you sell. We assess it as-is and make you a genuine offer based on its actual current condition.",
  },
  {
    q: 'Will I get a better price than trading in at a dealership?',
    a: "In most cases, yes — often significantly more. Dealer trade-ins are designed to maximise the dealer's margin, not your return. Our AI uses real market data to calculate what your car is genuinely worth, giving you a fair offer that reflects actual buyer demand — not what a dealership is willing to pay.",
  },
  {
    q: 'Is there a fee to use Auto-Sell.ai?',
    a: 'None whatsoever. Getting a valuation is completely free with no obligation to accept. There are no listing fees, no admin charges, and no commission deducted from your payment. What we offer is exactly what you receive.',
  },
  {
    q: "Can I sell a car that's still under finance?",
    a: "Yes. If your vehicle is still under finance, you'll need to provide a payout letter from your finance company showing the current settlement figure. We handle the rest — paying out the finance balance and transferring any remaining amount directly to you.",
  },
]

// Lovable's exact palette (from getComputedStyle on the live site):
//   --graphite        220 14% 26% → #393F4C  (hero dark wedge, banners)
//   --graphite-deep   220 16% 20% → #2B303A  (form header, value-prop icons)
//   --accent          45 100% 51% → #FFC403  (gold CTA, accent everywhere)
//   --accent-soft     45 100% 96% → #FFFAEB  (cream wedge, soft tints)
//   --accent-strong   42 100% 45% → #E6A500  (gold shadows)
//   --surface         220 20% 98.5% → #FAFBFC (page surface)
const GOLD = '#FFC403'
const CREAM = '#FFFAEB'
const GRAPHITE = '#393F4C'
const GRAPHITE_DEEP = '#2B303A'
const SURFACE = '#FAFBFC'

// ─── Icon atoms ──────────────────────────────────────────────────────────

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CrossIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6l-12 12" />
    </svg>
  )
}

function StarRow({ size = 4, color = GOLD }: { size?: number; color?: string }) {
  return (
    <span className="flex" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className={`w-${size} h-${size}`} viewBox="0 0 24 24" fill={color}>
          <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
        </svg>
      ))}
    </span>
  )
}

function GoogleG({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.11A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.11V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.05l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  )
}

// MockHeader has been extracted to ./MockHeader.tsx as a client component so
// it can own the mobile-menu open state and render the dropdown in the same
// container as the header bar (matching the pattern in components/Header.tsx).

// ─── Hero ────────────────────────────────────────────────────────────────

async function Hero() {
  const b = await getPageOverridesCached(SLUG)
  return (
    <section
      id="offer"
      className="relative overflow-hidden"
      style={{
        // Layered background: deep gradient base (gives natural top→bottom depth),
        // then darker graphite as fallback.
        background: `radial-gradient(ellipse 120% 80% at 0% 0%, #4A5161 0%, ${GRAPHITE} 45%, #2A2F38 100%)`,
        backgroundColor: GRAPHITE,
      }}
    >
      {/* Subtle grid pattern overlay — bumped opacity so it actually reads. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden="true"
      />

      {/* Warm gold glow — soft accent in the upper-right (where the form sits)
          to break up the flat dark and tie the hero to the brand. */}
      <div
        className="absolute -top-32 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,195,37,0.18) 0%, rgba(255,195,37,0.06) 35%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom-left vignette — slight darkening for depth on the headline column. */}
      <div
        className="absolute bottom-0 left-0 w-[60%] h-[60%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(0,0,0,0.35) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Cream diagonal wedge inset into upper-right — lovable's signature.
          Whole section is dark graphite by default; the cream wedge is a
          parallelogram (clipPath) behind the form panel on lg+. */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{
          backgroundColor: CREAM,
          clipPath: 'polygon(45% 0%, 100% 0%, 100% 100%, 62% 100%)',
        }}
        aria-hidden="true"
      />

      {/* Black sedan photo on desktop — absolute, anchored bottom between
          headline and form panel. (Mobile renders the car in-flow further
          down — see the lg:hidden block below the buttons.) */}
      <div
        className="absolute bottom-0 hidden lg:block pointer-events-none z-0"
        aria-hidden="true"
        style={{ left: '38%' }}
      >
        <Image
          src="/images/stewart-mock/hero-car.png"
          alt=""
          width={520}
          height={350}
          sizes="520px"
          className="block"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-10 lg:pb-20">
        <div className="lg:flex lg:items-start lg:gap-16">
          {/* Left: headline column */}
          <div className="lg:w-[440px] lg:flex-shrink-0 text-white">
            {/* Live valuation pill */}
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'rgba(43, 48, 58, 0.85)', border: `1px solid rgba(255,255,255,0.12)` }}
            >
              <span className="relative inline-flex">
                <span className="absolute inline-flex h-2 w-2 rounded-full opacity-75 animate-ping" style={{ backgroundColor: GOLD }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
              </span>
              {text(b, 'hero_pill', D.hero_pill)}
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[52px] xl:text-6xl font-black leading-[1.05] tracking-tight">
              {text(b, 'hero_h1_line1', D.hero_h1_line1)}
              <br />
              <span style={{ color: GOLD }}>{text(b, 'hero_h1_line2', D.hero_h1_line2)}</span>
            </h1>

            <p className="mt-5 text-xl md:text-2xl font-bold leading-tight text-white">
              {text(b, 'hero_subhead', D.hero_subhead)}
            </p>

            <p className="mt-3 max-w-md text-base text-slate-300">
              {text(b, 'hero_subpara', D.hero_subpara)}
            </p>

            {/* Micro-trust row — desktop only. On mobile we surface the Google
                reviews / star-rating row instead (rendered below the buttons). */}
            <ul className="mt-5 hidden lg:flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-200">
              {list(b, 'hero_microtrust', D.hero_microtrust).map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <OfferCtaLink
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-slate-900 transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: GOLD,
                  boxShadow: '0 1px 0 rgba(180, 120, 0, 0.4) inset, 0 8px 24px rgba(255, 195, 37, 0.35)',
                }}
              >
                {text(b, 'hero_cta_primary', D.hero_cta_primary)}
                <span aria-hidden="true">›</span>
              </OfferCtaLink>
              <a
                href="tel:0492858699"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-white border transition-colors"
                style={{ backgroundColor: 'rgba(43,48,58,0.7)', borderColor: 'rgba(255,255,255,0.18)' }}
              >
                <PhoneIcon className="w-4 h-4" />
                {text(b, 'hero_cta_secondary', D.hero_cta_secondary)}
              </a>
            </div>

            {/* Star rating + 60+ Google reviews — shown on all viewports.
                Replaces the micro-trust checkmark row on mobile (which is
                desktop-only above). */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <StarRow size={4} />
              <span className="font-bold">{text(b, 'hero_rating_value', D.hero_rating_value)}</span>
              <span className="text-slate-300">· {text(b, 'hero_rating_count', D.hero_rating_count)}</span>
            </div>

            <div className="hidden lg:grid mt-6 grid-cols-3 gap-2.5 max-w-md">
              {list(b, 'hero_stats', D.hero_stats).map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg px-3 py-3"
                  style={{ backgroundColor: 'rgba(43,48,58,0.55)', border: `1px solid rgba(255,255,255,0.10)` }}
                >
                  <div className="text-xl font-black" style={{ color: GOLD }}>{s.stat}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: functional form panel (client component — owns state,
              validation, and 3-step progression). */}
          <div id="offer-form" className="relative scroll-mb-[88px] lg:scroll-mb-0 lg:max-w-[440px] lg:w-full lg:ml-auto mt-8 lg:mt-0">
            <OfferForm />
          </div>

          {/* Mobile-only hero car — appears AFTER the form panel on small
              screens, matching the reference mobile order. Desktop uses the
              absolute-positioned copy near the top of this section. */}
          <div className="lg:hidden mt-8 -mx-2 flex justify-center" aria-hidden="true">
            <Image
              src="/images/stewart-mock/hero-car.png"
              alt=""
              width={520}
              height={350}
              sizes="(max-width: 768px) 90vw, 520px"
              className="w-full max-w-md h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Trust strip (4 cards) ───────────────────────────────────────────────

async function TrustStrip() {
  const b = await getPageOverridesCached(SLUG)
  const ov = list<{ title?: string; sub?: string }>(b, 'trust_items', [])
  const items = [
    {
      title: 'We pay more than dealers',
      sub: 'Fair market prices, every time',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      ),
    },
    {
      title: 'Same-day payment',
      sub: 'OSKO instant bank transfer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      title: 'Safe & secure',
      sub: 'Licensed motor dealer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Free pickup Australia-wide',
      sub: 'We come to your door',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
  ]
  return (
    <section className="border-b border-slate-200" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-7 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <div key={it.title} className="flex items-start gap-3 group cursor-default">
            <span
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: CREAM, color: '#B8860B', border: `1px solid rgba(255, 195, 3, 0.30)` }}
              aria-hidden="true"
            >
              <span className="w-5 h-5 block">{it.icon}</span>
            </span>
            <div>
              <div className="text-sm font-bold leading-tight text-slate-900">{ov[i]?.title ?? it.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-tight">{ov[i]?.sub ?? it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Stats banner (dark) ─────────────────────────────────────────────────

async function StatsBanner() {
  const b = await getPageOverridesCached(SLUG)
  const stats = list(b, 'stats_banner', D.stats_banner)
  return (
    <section className="py-12" style={{ backgroundColor: GRAPHITE }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-4xl md:text-5xl font-black" style={{ color: GOLD }}>{s.stat}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── How It Works (4 numbered cards) ─────────────────────────────────────

async function HowItWorks() {
  const b = await getPageOverridesCached(SLUG)
  const ov = list<{ title?: string; body?: string }>(b, 'how_steps', [])
  const steps = [
    {
      n: 1,
      title: 'Get Your Instant AI Valuation',
      body:
        'Enter your rego, make, model and a few quick details. Our AI analyses live Australian market data and returns a fair, data-backed offer in under 60 seconds — no obligation.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M9 3v2h6V3M8 11l2 2 4-4" />
        </svg>
      ),
    },
    {
      n: 2,
      title: 'Accept Your Offer and Book a Pickup',
      body:
        "Happy with the number? We handle all the paperwork digitally — no printing, no trips anywhere. Our team comes to you at home, work, or wherever suits.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16z" />
          <path d="M9 13l2 2 4-4" />
        </svg>
      ),
    },
    {
      n: 3,
      title: 'Get Paid the Same Day via OSKO',
      body:
        "The money hits your bank account before we drive away. Real-time OSKO transfer — in your account in under a minute. Instant. Every time.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <circle cx="12" cy="12.5" r="2.5" />
          <path d="M7 9.5h.01M17 15.5h.01" />
        </svg>
      ),
    },
  ]
  return (
    <section id="how-it-works" className="py-20 border-y border-slate-200" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>{text(b, 'how_eyebrow', D.how_eyebrow)}</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {text(b, 'how_h2', D.how_h2)}
          </h2>
          <p className="mt-4 text-slate-500">
            {text(b, 'how_intro', D.how_intro)}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
            >
              {/* Number badge — dark circle in top-right */}
              <span
                className="absolute -top-3 -right-3 inline-flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-extrabold shadow-md"
                style={{ backgroundColor: GRAPHITE }}
              >
                {s.n}
              </span>
              {/* Cream/gold icon box top-left */}
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                style={{ backgroundColor: CREAM, color: '#B8860B', border: `1px solid rgba(255, 195, 3, 0.30)` }}
                aria-hidden="true"
              >
                <span className="w-5 h-5 block">{s.icon}</span>
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-2">{ov[i]?.title ?? s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{ov[i]?.body ?? s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why Us — Comparison table ───────────────────────────────────────────

function ProviderCell({ label, yes, highlight = false }: { label: string; yes: boolean; highlight?: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 py-3 px-2"
      style={highlight ? { backgroundColor: CREAM } : undefined}
    >
      <span
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
          yes ? '' : 'bg-slate-100 text-slate-400'
        }`}
        style={yes ? { backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#16A34A' } : undefined}
      >
        {yes ? <CheckIcon className="w-4 h-4" /> : <CrossIcon className="w-4 h-4" />}
      </span>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${highlight ? 'text-slate-900' : 'text-slate-500'}`}>
        {label}
      </span>
    </div>
  )
}

async function Comparison() {
  const b = await getPageOverridesCached(SLUG)
  const rows = list(b, 'comparison_rows', D.comparison_rows)
  const mark = (yes: boolean) =>
    yes ? (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#16A34A' }}>
        <CheckIcon className="w-4 h-4" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400">
        <CrossIcon className="w-4 h-4" />
      </span>
    )
  return (
    <section id="why" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>{text(b, 'cmp_eyebrow', D.cmp_eyebrow)}</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">{text(b, 'cmp_h2', D.cmp_h2)}</h2>
          <p className="mt-3 text-slate-500">{text(b, 'cmp_sub', D.cmp_sub)}</p>
        </div>
        {/* Desktop / tablet: 4-column grid table. */}
        <div className="hidden md:block rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}>
            <div className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 bg-slate-50 border-b border-slate-200">
              FEATURE
            </div>
            <div className="px-6 py-5 text-center border-b border-slate-200" style={{ backgroundColor: CREAM }}>
              <div className="text-base font-black text-slate-900">{text(b, 'cmp_col_us', D.cmp_col_us)}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.15em] mt-1" style={{ color: '#B8860B' }}>RECOMMENDED</div>
            </div>
            <div className="px-6 py-5 text-center text-base font-bold text-slate-500 bg-slate-50 border-b border-slate-200">{text(b, 'cmp_col_dealer', D.cmp_col_dealer)}</div>
            <div className="px-6 py-5 text-center text-base font-bold text-slate-500 bg-slate-50 border-b border-slate-200">{text(b, 'cmp_col_priv', D.cmp_col_priv)}</div>

            {rows.map((r, i) => {
              const isLast = i === rows.length - 1
              const borderCls = isLast ? '' : 'border-b border-slate-200'
              return (
                <div key={r.feat} className="contents">
                  <div className={`px-6 py-4 text-sm text-slate-700 ${borderCls}`}>{r.feat}</div>
                  <div className={`px-6 py-4 flex items-center justify-center ${borderCls}`} style={{ backgroundColor: CREAM }}>
                    {mark(r.us)}
                  </div>
                  <div className={`px-6 py-4 flex items-center justify-center ${borderCls}`}>{mark(r.dealer)}</div>
                  <div className={`px-6 py-4 flex items-center justify-center ${borderCls}`}>{mark(r.priv)}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: one card per row. Stacks the 3 provider results inside each
            row so feature names get full width and check/cross icons stay
            legible (vs. squeezing a 4-column grid into ~320px). */}
        <div className="md:hidden space-y-3">
          {rows.map((r) => (
            <div key={r.feat} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="px-4 py-3 text-sm font-black text-slate-900 border-b border-slate-200 bg-slate-50">
                {r.feat}
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-200">
                <ProviderCell label={text(b, 'cmp_col_us', D.cmp_col_us)} yes={r.us} highlight />
                <ProviderCell label={text(b, 'cmp_col_dealer', D.cmp_col_dealer)} yes={r.dealer} />
                <ProviderCell label="Private" yes={r.priv} />
              </div>
            </div>
          ))}
          <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] pt-1" style={{ color: '#B8860B' }}>
            Auto-Sell.ai · Recommended
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Brand marquee (dark) ────────────────────────────────────────────────

async function BrandMarquee() {
  const b = await getPageOverridesCached(SLUG)
  // Pulled directly from the lovable reference:
  //   - simpleicons.org CDN for brands available there (served in white)
  //   - 3 locally hosted SVGs (Alfa Romeo, Isuzu, Jaguar) downloaded from
  //     lovable's own /assets/brand-*.svg endpoints.
  // Order matches reference exactly. Plain <img> on purpose — these are tiny
  // SVGs/CDN-served PNG-icons and don't need next/image optimization, which
  // would also require allowlisting the simpleicons domain in next.config.
  const SI = (slug: string) => `https://cdn.simpleicons.org/${slug}/ffffff`
  const brands: { name: string; src: string }[] = [
    { name: 'Toyota', src: SI('toyota') },
    { name: 'Mazda', src: SI('mazda') },
    { name: 'Ford', src: SI('ford') },
    { name: 'Hyundai', src: SI('hyundai') },
    { name: 'Kia', src: SI('kia') },
    { name: 'Mitsubishi', src: SI('mitsubishi') },
    { name: 'Nissan', src: SI('nissan') },
    { name: 'Subaru', src: SI('subaru') },
    { name: 'Volkswagen', src: SI('volkswagen') },
    { name: 'MG', src: SI('mg') },
    { name: 'Isuzu', src: '/car-brand-logos/lovable/isuzu.svg' },
    { name: 'Tesla', src: SI('tesla') },
    { name: 'BMW', src: SI('bmw') },
    { name: 'Mercedes-Benz', src: '/car-brand-logos/lovable/mercedes.svg' },
    { name: 'Audi', src: SI('audi') },
    { name: 'Lexus', src: '/car-brand-logos/lovable/lexus.svg' },
    { name: 'Land Rover', src: '/car-brand-logos/lovable/landrover.svg' },
    { name: 'Jaguar', src: '/car-brand-logos/lovable/jaguar.svg' },
    { name: 'Porsche', src: SI('porsche') },
    { name: 'MINI', src: SI('mini') },
    { name: 'Volvo', src: SI('volvo') },
    { name: 'Honda', src: SI('honda') },
    { name: 'Suzuki', src: SI('suzuki') },
    { name: 'Skoda', src: SI('skoda') },
    { name: 'Peugeot', src: SI('peugeot') },
    { name: 'Renault', src: SI('renault') },
    { name: 'Jeep', src: SI('jeep') },
    { name: 'Fiat', src: SI('fiat') },
    { name: 'Alfa Romeo', src: '/car-brand-logos/lovable/alfaromeo.svg' },
  ]
  // Render the brand list twice so the marquee can loop seamlessly when the
  // first copy scrolls fully off (translateX(-50%) lands the second copy in
  // the exact same position the first started in).
  const track = [...brands, ...brands]
  return (
    <section className="py-12 border-y border-white/5 overflow-hidden" style={{ backgroundColor: GRAPHITE }}>
      <div className="text-center mb-7">
        <div className="text-[10px] font-black tracking-[0.22em]" style={{ color: GOLD }}>
          {text(b, 'marquee_eyebrow', D.marquee_eyebrow)}
        </div>
      </div>
      <div
        className="relative group"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)',
        }}
      >
        <div
          className="flex items-center gap-x-10"
          style={{
            width: 'max-content',
            animation: 'brandScroll 60s linear infinite',
          }}
        >
          {track.map((b, i) => {
            const isLocalSvg = b.src.endsWith('.svg') && b.src.startsWith('/')
            return (
              <span
                key={`${b.name}-${i}`}
                className="inline-flex items-center justify-center h-8 w-20 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                aria-label={b.name}
                title={b.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.name}
                  className="max-h-8 w-auto object-contain"
                  style={isLocalSvg ? { filter: 'brightness(0) invert(1)' } : undefined}
                  loading="lazy"
                  decoding="async"
                  aria-hidden={i >= brands.length ? 'true' : undefined}
                />
              </span>
            )
          })}
        </div>
        <style>{`
          @keyframes brandScroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .group:hover > div[style*="brandScroll"] {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  )
}

// ─── Why Australians Choose Us — 5 long-form sections ────────────────────

async function ValueProps() {
  const b = await getPageOverridesCached(SLUG)
  const items = list(b, 'value_props', D.value_props)
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>{text(b, 'why_eyebrow', D.why_eyebrow)}</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {text(b, 'why_h2', D.why_h2)}
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-700 leading-relaxed">
            {text(b, 'why_intro', D.why_intro)}
          </p>
        </div>
        <div className="space-y-10 md:space-y-12">
          {items.map((item) => (
            <article
              key={item.title}
              className="group relative pl-5 border-l-2 border-transparent transition-colors duration-300 hover:border-[#FFC325]"
            >
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-[#92560A]">
                {item.title}
              </h3>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── The AI Advantage ────────────────────────────────────────────────────

async function AIAdvantage() {
  const b = await getPageOverridesCached(SLUG)
  return (
    <section className="py-20" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>{text(b, 'ai_eyebrow', D.ai_eyebrow)}</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {text(b, 'ai_h2', D.ai_h2)}
          </h2>
        </div>
        <div className="space-y-6 text-base md:text-lg text-slate-700 leading-relaxed">
          <p>
            {text(b, 'ai_para1', D.ai_para1)}
          </p>
          <p>
            {text(b, 'ai_para2', D.ai_para2)}
          </p>
          <p>
            {text(b, 'ai_para3', D.ai_para3)}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Service Areas ───────────────────────────────────────────────────────

async function ServiceAreas() {
  const b = await getPageOverridesCached(SLUG)
  const cities = list(b, 'service_areas', D.service_areas)
  return (
    <section id="service-areas" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>{text(b, 'areas_eyebrow', D.areas_eyebrow)}</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            {text(b, 'areas_h2', D.areas_h2)}
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-700 leading-relaxed">
            {text(b, 'areas_intro', D.areas_intro)}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm md:text-base font-semibold text-slate-800 hover:border-[#FFC325] hover:text-[#92560A] hover:shadow-sm transition-all text-center"
            >
              {city.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What We Buy (vehicle type cards) ────────────────────────────────────

async function WhatWeBuy() {
  const b = await getPageOverridesCached(SLUG)
  const ov = list<string>(b, 'what_we_buy', [])
  const types = [
    {
      label: 'Cars',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.65 5H8.35a2 2 0 0 0-1.85 1.3L5 10 3 8" />
          <path d="M7 14h.01M17 14h.01" />
          <rect x="3" y="10" width="18" height="8" rx="2" />
        </svg>
      ),
    },
    {
      label: 'SUVs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      ),
    },
    {
      label: 'Utes',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      ),
    },
    {
      label: 'Vans',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      ),
    },
    {
      label: 'Trucks',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      ),
    },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>{text(b, 'buy_eyebrow', D.buy_eyebrow)}</div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10">{text(b, 'buy_h2', D.buy_h2)}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {types.map((t, i) => (
            <div
              key={t.label}
              className="group rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center gap-3 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-lg hover:border-[#FFC325]"
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                style={{ backgroundColor: CREAM, color: '#B8860B', border: `1px solid rgba(255,195,3,0.30)` }}
                aria-hidden="true"
              >
                <span className="w-6 h-6 block">{t.icon}</span>
              </span>
              <span className="text-base font-black text-slate-900 transition-colors duration-300 group-hover:text-[#92560A]">
                {ov[i] ?? t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Reviews (horizontal scroll) ─────────────────────────────────────────

async function Reviews() {
  const b = await getPageOverridesCached(SLUG)
  const staticReviews = list(b, 'reviews', D.reviews)

  // Pull live Google reviews + rating server-side (cached 30 min). Feature the
  // live, freshest reviews first, then top up with the curated static set so
  // the marquee stays full. De-dupe by name because the static defaults were
  // originally seeded from these same Google reviews. If the API is
  // unconfigured or down, getGoogleReviews returns empty -> pure static fallback.
  const { reviews: liveReviews, rating, userRatingsTotal } = await getGoogleReviews()
  const seen = new Set(liveReviews.map((r) => r.name.trim().toLowerCase()))
  const merged = [...liveReviews, ...staticReviews.filter((r) => !seen.has(r.name.trim().toLowerCase()))]
  const reviews = merged.length > 0 ? merged : staticReviews

  // Prefer the live rating/count; fall back to the editable copy when offline.
  const badgeRating = rating != null ? rating.toFixed(1) : text(b, 'reviews_badge_rating', D.reviews_badge_rating)
  const badgeCount = userRatingsTotal != null ? `${userRatingsTotal} reviews` : text(b, 'reviews_badge_count', D.reviews_badge_count)

  return (
    <section id="reviews" className="py-20 border-y border-slate-200 overflow-hidden" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>{text(b, 'reviews_eyebrow', D.reviews_eyebrow)}</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {text(b, 'reviews_h2_line1', D.reviews_h2_line1)}
            <br />{text(b, 'reviews_h2_line2', D.reviews_h2_line2)}
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm">
            <GoogleG className="w-4 h-4" />
            <span className="font-bold text-slate-900">Google Reviews</span>
            <StarRow size={4} />
            <span className="font-bold text-slate-900">{badgeRating}</span>
            <span className="text-slate-500">· {badgeCount}</span>
          </div>
        </div>
        {/* Duplicated track for seamless infinite scroll. Pauses on hover. */}
        <div
          className="relative group review-marquee"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, black 60px, black calc(100% - 60px), transparent 100%)',
          }}
        >
          <div
            className="flex items-stretch gap-5 py-2"
            style={{
              width: 'max-content',
              animation: 'reviewScroll 80s linear infinite',
            }}
          >
            {[...reviews, ...reviews].map((r, i) => (
              <div
                key={`${r.name}-${i}`}
                className="flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl border border-slate-200 p-5 bg-white relative"
                aria-hidden={i >= reviews.length ? 'true' : undefined}
              >
                <span className="absolute top-4 right-4">
                  <GoogleG className="w-5 h-5 opacity-90" />
                </span>
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-full font-bold inline-flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: GOLD, color: GRAPHITE_DEEP }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.when}{r.where ? ` · ${r.where}` : ''}</div>
                  </div>
                </div>
                <div className="mb-2"><StarRow size={3} /></div>
                <p className="text-sm text-slate-700 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes reviewScroll {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .review-marquee:hover > div[style*="reviewScroll"] {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA (dark card) ───────────────────────────────────────────────

async function FinalCta() {
  const b = await getPageOverridesCached(SLUG)
  const ov = list<{ title?: string; sub?: string }>(b, 'final_cta_stats', [])
  const stats = [
    {
      title: '10 min',
      sub: 'Average offer time',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      title: 'Same day',
      sub: 'OSKO payment',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      ),
    },
    {
      title: 'Free',
      sub: 'Australia-wide pickup',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
    {
      title: 'Licensed',
      sub: 'Motor dealer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ]
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div
          className="relative rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${GRAPHITE} 0%, ${GRAPHITE_DEEP} 100%)`,
          }}
        >
          {/* Soft gold glow in top-left */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,195,3,0.18) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative text-white">
            <div className="text-[11px] font-black tracking-[0.22em] mb-3" style={{ color: GOLD }}>{text(b, 'final_eyebrow', D.final_eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-black leading-tight">
              {text(b, 'final_h2_line1', D.final_h2_line1)}
              <br />
              <span style={{ color: GOLD }}>{text(b, 'final_h2_line2', D.final_h2_line2)}</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-md text-sm md:text-base leading-relaxed">
              {text(b, 'final_para', D.final_para)}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <OfferCtaLink
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-slate-900"
                style={{
                  background: `linear-gradient(180deg, ${GOLD}, #E6A500)`,
                  boxShadow: '0 1px 0 rgba(180,120,0,0.4) inset, 0 10px 30px rgba(255,195,3,0.35)',
                }}
              >
                {text(b, 'final_cta_primary', D.final_cta_primary)} <span aria-hidden="true">›</span>
              </OfferCtaLink>
              <a
                href="tel:0492858699"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-white border"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.18)' }}
              >
                <PhoneIcon className="w-4 h-4" />
                0492 858 699
              </a>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl p-5 text-white"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.10)',
                }}
              >
                <span className="inline-block w-5 h-5 mb-3" style={{ color: GOLD }} aria-hidden="true">
                  {s.icon}
                </span>
                <div className="text-2xl font-black">{ov[i]?.title ?? s.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{ov[i]?.sub ?? s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ (two-column) ────────────────────────────────────────────────────

async function FAQ() {
  const b = await getPageOverridesCached(SLUG)
  const faqs = list(b, 'faq_items', D.faq_items)
  return (
    <section id="faq" className="relative py-24 border-y border-slate-200 overflow-hidden" style={{ backgroundColor: SURFACE }}>
      {/* Subtle cream glow on right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(255,195,3,0.10) 0%, transparent 60%)` }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left intro column */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.22em] mb-4" style={{ color: '#B8860B' }}>{text(b, 'faq_eyebrow', D.faq_eyebrow)}</div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.05]">
              {text(b, 'faq_h2_pre', D.faq_h2_pre)} <span style={{ color: GOLD }}>{text(b, 'faq_h2_highlight', D.faq_h2_highlight)}</span>
              <br />
              {text(b, 'faq_h2_post', D.faq_h2_post)}
            </h2>
            <p className="mt-6 text-slate-500 max-w-md">
              {text(b, 'faq_intro', D.faq_intro)}
            </p>
            <a
              href="tel:0492858699"
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: GRAPHITE_DEEP }}
            >
              <PhoneIcon className="w-4 h-4" />
              0492 858 699
            </a>
          </div>
          {/* Right accordion column */}
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white border border-slate-200 overflow-hidden transition-all duration-300 hover:border-[#FFC325] hover:shadow-md open:border-[#FFC325] open:shadow-md"
              >
                <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full text-xs font-black flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-open:scale-110"
                    style={{ backgroundColor: CREAM, color: '#B8860B', border: `1px solid rgba(255,195,3,0.30)` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-sm md:text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#92560A]">
                    {f.q}
                  </span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 group-open:text-[#92560A] transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 pl-[68px] text-sm text-slate-600 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Sticky mobile bottom bar ────────────────────────────────────────────

async function MobileBottomBar() {
  const b = await getPageOverridesCached(SLUG)
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 px-3 py-3 flex gap-2 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)]">
      <a href="tel:0492858699" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-slate-900 border border-slate-300 bg-white">
        <PhoneIcon className="w-4 h-4" />
        {text(b, 'mbar_call', D.mbar_call)}
      </a>
      <OfferCtaLink
        className="flex-[1.4] inline-flex items-center justify-center px-4 py-3 rounded-lg font-bold text-slate-900"
        style={{ backgroundColor: GOLD }}
      >
        {text(b, 'mbar_offer', D.mbar_offer)}
      </OfferCtaLink>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────

export default async function Home() {
  const b = await getPageOverridesCached(SLUG)
  const faqItems = list(b, 'faq_items', FAQ_DEFAULTS)
  return (
    <div className="home-root min-h-screen bg-white pb-24 lg:pb-0">
      {/*
        Scoped CSS: lift the global FloatingPhoneIcon above the mobile bottom
        bar on this page so they don't stack on small screens. The global
        <Footer /> from app/layout.tsx renders below.
      */}
      <style>{`
        @media (max-width: 1023px) {
          body:has(.home-root) .fixed.bottom-6 { bottom: 5.5rem !important; }
        }
      `}</style>

      <FAQPageJsonLd items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
      <Header />
      {/* Hero is intentionally NOT wrapped in Reveal — it's above the fold and
          users should see it immediately. The internal stagger pill / heading /
          form panel keeps it from feeling static on first paint. */}
      <Hero />
      <Reveal><TrustStrip /></Reveal>
      <Reveal><StatsBanner /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      {/* Reviews moved up directly under How It Works — social proof lands
          right after we explain the process, well above the fold-deep content. */}
      <Reveal><Reviews /></Reveal>
      <Reveal><ValueProps /></Reveal>
      <Reveal><AIAdvantage /></Reveal>
      <Reveal><Comparison /></Reveal>
      <Reveal><BrandMarquee /></Reveal>
      <Reveal><WhatWeBuy /></Reveal>
      <Reveal><ServiceAreas /></Reveal>
      <Reveal><FinalCta /></Reveal>
      <Reveal><FAQ /></Reveal>
      <MobileBottomBar />
      {/*
        LiveActivity (fake activity counters) intentionally removed per Mark's
        feedback — overpromising / fabricated stats. Component file kept in
        the directory for now in case we revisit with real numbers.
      */}
    </div>
  )
}
