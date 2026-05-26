/**
 * /requested-mockup — 1:1 replica of https://drive-offer-swift.lovable.app/
 *
 * Mark designated this as the home page going forward. Treat as the live
 * marketing surface — match reference exactly. Routing stays at
 * /requested-mockup (do not touch /).
 */

import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import LiveActivity from './LiveActivity'
import OfferForm from './OfferForm'

export const metadata: Metadata = {
  title: 'Sell Your Car Today — Same Day Payment | Auto-Sell.ai',
  description:
    'Get a fair instant offer on your car in minutes and get paid same day via OSKO. Trusted by thousands of Australian sellers. No dealers, no hassle.',
}

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

// ─── Header ──────────────────────────────────────────────────────────────

function MockHeader() {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderBottom: `1px solid ${GOLD}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        <Link href="/requested-mockup" className="flex items-center" aria-label="Auto-Sell.ai home">
          <Image
            src="/brand-guideline/autosell-logo/PNG/1 (1).png"
            alt="Auto-Sell.ai"
            width={140}
            height={70}
            priority
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-slate-700">
          <Link href="#how" className="hover:text-slate-900 transition-colors">How it works</Link>
          <Link href="#why" className="hover:text-slate-900 transition-colors">Why us</Link>
          <Link href="#reviews" className="hover:text-slate-900 transition-colors">Reviews</Link>
          <Link href="#faq" className="hover:text-slate-900 transition-colors">FAQ</Link>
          <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
        </nav>
        <a
          href="tel:0492858699"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 border border-slate-300 hover:border-slate-900 transition-colors"
        >
          <PhoneIcon className="w-4 h-4" />
          0492 858 699
        </a>
      </div>
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="offer" className="relative overflow-hidden" style={{ backgroundColor: GRAPHITE }}>
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
              Live valuation desk open now
            </span>

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-[64px] xl:text-7xl font-black leading-[1.02] tracking-tight">
              {/* Mobile: 2 lines — "Sell Your" / "Car Today" */}
              <span className="lg:hidden">
                Sell Your
                <br />
                Car <span style={{ color: GOLD }}>Today</span>
              </span>
              {/* Desktop: 3 lines — matches the reference desktop hero */}
              <span className="hidden lg:inline">
                Sell
                <br />
                Your Car
                <br />
                <span style={{ color: GOLD }}>Today</span>
              </span>
            </h1>

            <p className="mt-5 text-2xl md:text-3xl font-bold leading-tight">
              Offer in 10 mins. Paid same day.
            </p>

            <p className="mt-3 max-w-md text-base text-slate-300">
              Australia&apos;s smartest car buying service. Fair offers, free pickup, instant OSKO transfer.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#offer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-slate-900 transition-transform hover:scale-[1.02]"
                style={{
                  backgroundColor: GOLD,
                  boxShadow: '0 1px 0 rgba(180, 120, 0, 0.4) inset, 0 8px 24px rgba(255, 195, 37, 0.35)',
                }}
              >
                Get My Offer
                <span aria-hidden="true">›</span>
              </a>
              <a
                href="tel:0492858699"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-white border transition-colors"
                style={{ backgroundColor: 'rgba(43,48,58,0.7)', borderColor: 'rgba(255,255,255,0.18)' }}
              >
                <PhoneIcon className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Star rating + stats — desktop only. Reference renders them
                further down on mobile in the dark stats banner section. */}
            <div className="hidden lg:flex mt-6 items-center gap-2 text-sm">
              <StarRow size={4} />
              <span className="font-bold">4.9</span>
              <span className="text-slate-300">· 60+ Google reviews</span>
            </div>

            <div className="hidden lg:grid mt-6 grid-cols-3 gap-2.5 max-w-md">
              {[
                { stat: '2,500+', label: 'Cars bought' },
                { stat: '$18M+', label: 'Paid out' },
                { stat: '10 min', label: 'Avg offer' },
              ].map((s) => (
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
          <div id="offer-form" className="relative lg:max-w-[440px] lg:w-full lg:ml-auto mt-8 lg:mt-0">
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

function TrustStrip() {
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
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3 group cursor-default">
            <span
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: CREAM, color: '#B8860B', border: `1px solid rgba(255, 195, 3, 0.30)` }}
              aria-hidden="true"
            >
              <span className="w-5 h-5 block">{it.icon}</span>
            </span>
            <div>
              <div className="text-sm font-bold leading-tight text-slate-900">{it.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 leading-tight">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Stats banner (dark) ─────────────────────────────────────────────────

function StatsBanner() {
  const stats = [
    { stat: '$18M+', label: 'Paid to sellers' },
    { stat: '2,500+', label: 'Cars purchased' },
    { stat: '10 min', label: 'Average offer time' },
    { stat: '4.9★', label: 'Google rating' },
  ]
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

function HowItWorks() {
  const steps = [
    {
      n: 1,
      title: 'Tell us about your car',
      body: 'Enter your rego or VIN and answer a few quick questions. Takes 60 seconds.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M9 3v2h6V3M8 11l2 2 4-4" />
        </svg>
      ),
    },
    {
      n: 2,
      title: 'Receive your offer',
      body: 'Our pricing engine combines market data with real-time data for a fair offer.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
          <path d="M7 21 8.6 19.6c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
          <path d="M2 7h3a2 2 0 0 1 1.7 1L9 11M3 22l3-3" />
        </svg>
      ),
    },
    {
      n: 3,
      title: 'Book a free inspection',
      body: 'We come to you anywhere in Australia at a time that suits — no fees, no obligation.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16z" />
          <path d="M9 13l2 2 4-4" />
        </svg>
      ),
    },
    {
      n: 4,
      title: 'Get paid same day',
      body: 'OSKO instant bank transfer the moment we collect — funds in your account in seconds.',
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
    <section id="how" className="py-20 border-y border-slate-200" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>HOW IT WORKS</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            From offer to paid — in 4 steps
          </h2>
          <p className="mt-4 text-slate-500">No haggling. No tyre-kickers. No delays.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
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
              <h3 className="text-lg font-black text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
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

function Comparison() {
  const rows = [
    { feat: 'Same-day payment', us: true, dealer: false, priv: false },
    { feat: 'Free Australia-wide pickup', us: true, dealer: false, priv: false },
    { feat: 'No haggling or pressure', us: true, dealer: false, priv: false },
    { feat: 'Buys damaged / unregistered', us: true, dealer: false, priv: false },
    { feat: 'Handles all paperwork', us: true, dealer: true, priv: false },
    { feat: 'No strangers at your door', us: true, dealer: true, priv: false },
    { feat: 'Fair market price', us: true, dealer: false, priv: true },
  ]
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
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>WHY US</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">The smart way to sell</h2>
          <p className="mt-3 text-slate-500">Compare your options.</p>
        </div>
        {/* Desktop / tablet: 4-column grid table. */}
        <div className="hidden md:block rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}>
            <div className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 bg-slate-50 border-b border-slate-200">
              FEATURE
            </div>
            <div className="px-6 py-5 text-center border-b border-slate-200" style={{ backgroundColor: CREAM }}>
              <div className="text-base font-black text-slate-900">Auto-Sell.ai</div>
              <div className="text-[10px] font-black uppercase tracking-[0.15em] mt-1" style={{ color: '#B8860B' }}>RECOMMENDED</div>
            </div>
            <div className="px-6 py-5 text-center text-base font-bold text-slate-500 bg-slate-50 border-b border-slate-200">Dealer</div>
            <div className="px-6 py-5 text-center text-base font-bold text-slate-500 bg-slate-50 border-b border-slate-200">Private sale</div>

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
                <ProviderCell label="Auto-Sell.ai" yes={r.us} highlight />
                <ProviderCell label="Dealer" yes={r.dealer} />
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

function BrandMarquee() {
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
          WE BUY EVERY MAKE &amp; MODEL
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

// ─── Why Auto-Sell — 6 value props ───────────────────────────────────────

function ValueProps() {
  const props = [
    {
      title: 'Fair market offers',
      body: 'Transparent pricing engine combining market data and real-time data.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />
        </svg>
      ),
    },
    {
      title: 'Same-day OSKO payments',
      body: 'Funds in your account the moment we collect — verified instantly.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      title: 'We come to you',
      body: 'Free pickup anywhere in Australia, including remote areas.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      title: 'No listings or time wasters',
      body: 'Skip the strangers, scams and lowball offers from private buyers.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'No pressure to accept',
      body: 'Walk away anytime. Zero obligation. The offer is yours.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      ),
    },
    {
      title: 'Licensed motor dealer',
      body: "Fully licensed and insured. Australia's most trusted car buyer.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>WHY AUTO-SELL.AI</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Built for sellers who
            <br />value their time
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {props.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 text-white"
                style={{ backgroundColor: GRAPHITE_DEEP }}
                aria-hidden="true"
              >
                <span className="w-5 h-5 block">{p.icon}</span>
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-1.5">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What We Buy (vehicle type cards) ────────────────────────────────────

function WhatWeBuy() {
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
        <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>WHAT WE BUY</div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10">Any vehicle, any condition</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {types.map((t) => (
            <div key={t.label} className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center gap-3">
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                style={{ backgroundColor: CREAM, color: '#B8860B', border: `1px solid rgba(255,195,3,0.30)` }}
                aria-hidden="true"
              >
                <span className="w-6 h-6 block">{t.icon}</span>
              </span>
              <span className="text-base font-black text-slate-900">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Reviews (horizontal scroll) ─────────────────────────────────────────

function Reviews() {
  const reviews = [
    { name: 'Charmian Grove', when: '60 days ago', where: 'Wetherill Park, NSW', quote: 'Fantastic experience with Alex, Tony and the team! Friendly, honest, helpful — got the price I needed and the whole process was seamless. Highly recommend.' },
    { name: 'Nick Dimitriadis', when: '60 days ago', where: 'Sydney, NSW', quote: 'Great experience dealing with Alex, a true professional. Straight to the point, offered genuine experience and a fair value for one of our fleet cars.' },
    { name: 'Olrielle Foley', when: '90 days ago', where: 'Sydney, NSW', quote: 'Fantastic experience selling my car to Alex and his team. Friendly, professional and incredibly easygoing. Communication was clear and prompt the whole way.' },
    { name: 'Johnathan Matti', when: '150 days ago', where: 'Sydney, NSW', quote: 'Auto-Sell.ai made selling my car incredibly easy. Fast, simple and stress-free. I just entered my details and they handled everything. Highly recommend!' },
    { name: 'Uzziel', when: '150 days ago', where: 'Sydney, NSW', quote: 'Alex and John made the whole process easy and seamless. They arrived early, which I appreciated. Honest approach throughout.' },
    { name: 'Michael Slevin', when: '210 days ago', where: 'Sydney, NSW', quote: 'Easy to deal with from start to finish. Communication was clear and straightforward, which made the whole process stress-free. Professional yet friendly.' },
    { name: 'Mario P.', when: '90 days ago', where: 'Sydney, NSW', quote: 'This place is perfect — my experience with Alex was so fast and professional. Got what I wanted and a free Uber ride home.' },
    { name: 'Jared Keens', when: '270 days ago', where: 'Sydney, NSW', quote: 'Alex was easy to deal with from start to finish. Fair offer without any high-pressure tactics. The whole process was straightforward and stress-free.' },
    { name: 'Phillip Ngo', when: '60 days ago', where: 'Sydney, NSW', quote: 'Sold and picked up from my house within 20 minutes. Great service, super quick, with a super fair price!' },
    { name: 'Danielle Elosman', when: '30 days ago', where: 'Sydney, NSW', quote: 'These guys came super fast. Asked to sell my car and got paid instantly! They paid the most than all the other competitors. Auto-Sell.ai was the best.' },
  ]
  return (
    <section id="reviews" className="py-20 border-y border-slate-200 overflow-hidden" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold tracking-[0.22em] mb-3" style={{ color: '#B8860B' }}>CUSTOMER REVIEWS</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Loved by sellers
            <br />across Australia
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm">
            <GoogleG className="w-4 h-4" />
            <span className="font-bold text-slate-900">Google Reviews</span>
            <StarRow size={4} />
            <span className="font-bold text-slate-900">4.9</span>
            <span className="text-slate-500">· 60+ reviews</span>
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
                    <div className="text-xs text-slate-500">{r.when} · {r.where}</div>
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

function FinalCta() {
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
            <div className="text-[11px] font-black tracking-[0.22em] mb-3" style={{ color: GOLD }}>READY WHEN YOU ARE</div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Get your offer in
              <br />
              <span style={{ color: GOLD }}>under 60 seconds</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-md">
              No spam. No pressure. Just a fair offer, free pickup and same-day payment.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#offer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-slate-900"
                style={{
                  background: `linear-gradient(180deg, ${GOLD}, #E6A500)`,
                  boxShadow: '0 1px 0 rgba(180,120,0,0.4) inset, 0 10px 30px rgba(255,195,3,0.35)',
                }}
              >
                Start Now <span aria-hidden="true">›</span>
              </a>
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
            {stats.map((s) => (
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
                <div className="text-2xl font-black">{s.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ (two-column) ────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    { q: 'How quickly can I get a quote?', a: 'Our AI-powered system typically provides quotes within 30 minutes of submitting your car details. During business hours, many quotes are available in just 10-15 minutes.' },
    { q: 'Do you really pay on the same day?', a: 'Yes! Once we inspect your vehicle and complete the paperwork, we transfer the money directly to your bank account via OSKO, which typically processes within minutes.' },
    { q: "What if my car isn't running?", a: "No problem! We buy cars in all conditions - running or not, damaged or perfect. We'll arrange towing if needed and still provide competitive offers." },
    { q: 'Are there any hidden fees?', a: "Absolutely not. Our quote is what you get paid. We don't charge any fees, commissions, or deduct costs for paperwork, towing, or processing." },
    { q: 'How do you determine the price?', a: 'We use real-time market data, RedBook pricing, and our extensive network of buyers to ensure you get the best possible price for your vehicle.' },
    { q: 'What areas do you service?', a: 'We operate Australia-wide! From major cities to remote areas, we can arrange pickup and payment anywhere in Australia.' },
    { q: 'What documents do I need?', a: "You'll need your vehicle registration, driver's license, and proof of ownership. We'll help you with all the paperwork during the inspection." },
    { q: 'Can I change my mind after accepting an offer?', a: 'Yes, you can change your mind up until we complete the final paperwork and payment. However, once payment is made, the sale is final.' },
    { q: 'Do you buy all car brands?', a: 'Yes! We buy all makes and models - Toyota, Ford, Holden, BMW, Mercedes, and everything in between. No car is too old or too new.' },
    { q: 'What if I still owe money on my car?', a: "We can still buy your car even if you have a loan. We'll work with your lender to pay off the loan and give you any remaining equity." },
  ]
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
            <div className="text-[11px] font-bold tracking-[0.22em] mb-4" style={{ color: '#B8860B' }}>FAQ</div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05]">
              Got
              <br />
              <span style={{ color: GOLD }}>questions?</span>
              <br />
              We&apos;ve got
              <br />
              answers.
            </h2>
            <p className="mt-6 text-slate-500 max-w-md">
              Everything you need to know before selling. Still curious? Our team is one call away.
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
              <details key={f.q} className="group rounded-xl bg-white border border-slate-200 overflow-hidden">
                <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full text-xs font-black flex-shrink-0"
                    style={{ backgroundColor: CREAM, color: '#B8860B', border: `1px solid rgba(255,195,3,0.30)` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-sm md:text-base font-bold text-slate-900">{f.q}</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
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

function MobileBottomBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 px-3 py-3 flex gap-2 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)]">
      <a href="tel:0492858699" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-slate-900 border border-slate-300 bg-white">
        <PhoneIcon className="w-4 h-4" />
        Call
      </a>
      <a
        href="#offer"
        className="flex-[1.4] inline-flex items-center justify-center px-4 py-3 rounded-lg font-bold text-slate-900"
        style={{ backgroundColor: GOLD }}
      >
        Get My Offer
      </a>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────

export default function RequestedMockupPage() {
  return (
    <div className="stewart-mock-root min-h-screen bg-white pb-24 lg:pb-0">
      {/*
        Scoped CSS: lift the global FloatingPhoneIcon above the mobile bottom
        bar on this page so they don't stack on small screens. The global
        <Footer /> from app/layout.tsx is intentionally left intact below.
      */}
      <style>{`
        @media (max-width: 1023px) {
          body:has(.stewart-mock-root) .fixed.bottom-6 { bottom: 5.5rem !important; }
        }
      `}</style>

      <MockHeader />
      <Hero />
      <TrustStrip />
      <StatsBanner />
      <HowItWorks />
      <Comparison />
      <BrandMarquee />
      <ValueProps />
      <LiveActivity />
      <WhatWeBuy />
      <Reviews />
      <FinalCta />
      <FAQ />
      <MobileBottomBar />
    </div>
  )
}
