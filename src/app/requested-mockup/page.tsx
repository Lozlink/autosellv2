/**
 * Stewart's Mock — replica of https://drive-offer-swift.lovable.app/
 *
 * Built as a separate route (/requested-mockup) so it lives alongside the real
 * homepage for side-by-side comparison. This page intentionally includes
 * the patterns Mark (correctly) called out as slop:
 *   - "Live valuation desk open now" fake-urgency pill
 *   - "Offer in 10 mins" overpromise
 *   - "Priority quote lane · no dealer runaround" filler copy
 *   - "STEP 1 OF 3" form chunking (same data, more taps)
 *   - "$18M+ paid / 2,500+ cars" unverified stats
 *   - "LIVE: 250 offers in last 24h" fake activity counters
 *   - "Auto-Sell wins every row" comparison table with RECOMMENDED badge
 *   - Six-up generic value-prop grid duplicating Why Choose
 *
 * If we ever ship anything from this, it should be cherry-picked carefully.
 * Most of this is theatre, not design.
 */

import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stewart Mock — Auto-Sell.ai',
  description: 'Internal mock — replica of the lovable.app reference for visual comparison only.',
  robots: { index: false, follow: false },
}

// Lovable's actual extracted palette (via getComputedStyle on the live site):
//   --graphite        220 14% 26% → rgb(57, 63, 76)    → #393F4C (hero, banners)
//   --graphite-deep   220 16% 20% → ~rgb(43, 48, 58)   → #2B303A (form panel, CTA card)
//   border-on-dark    220 14% 36% →                   → #4F5666 (dividers on dark)
//   --accent-soft     45 100% 96% → rgb(255, 250, 235) → #FFFAEB (cream wedge, soft tints)
//   --accent          45 100% 51% → ~#FFC403           (we use Auto-Sell brand gold #FFC325)
// These values are used inline as Tailwind arbitrary classes (bg-[#393F4C] etc.)
// throughout the file. Only CREAM and GOLD are needed as JS constants because
// they appear inside `style={{}}` props for SVG fills and gradient stops.
const GOLD = '#FFC325'
const CREAM = '#FFFAEB'

// ─── Inline atoms ─────────────────────────────────────────────────────────

function SparkleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M12 2l2.39 6.27L20.61 10l-6.22 1.73L12 18l-2.39-6.27L3.39 10l6.22-1.73z" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// ─── Mock header (matches lovable's nav exactly) ──────────────────────────

function MockHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        <Link href="/requested-mockup" className="flex items-center" aria-label="Auto-Sell.ai">
          <Image
            src="/brand-guideline/autosell-logo/PNG/1 (1).png"
            alt="Auto-Sell.ai"
            width={140}
            height={70}
            priority
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</Link>
          <Link href="#why-us" className="hover:text-slate-900 transition-colors">Why us</Link>
          <Link href="#reviews" className="hover:text-slate-900 transition-colors">Reviews</Link>
          <Link href="#faq" className="hover:text-slate-900 transition-colors">FAQ</Link>
          <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
        </nav>
        <a
          href="tel:0492858699"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-slate-900 border border-slate-300 hover:border-slate-900 transition-colors"
        >
          <PhoneIcon className="w-4 h-4" />
          0492 858 699
        </a>
      </div>
    </header>
  )
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CrossIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
    </svg>
  )
}

// ─── Hero section with embedded mock form ─────────────────────────────────

function LovableHero() {
  return (
    <section className="relative overflow-hidden bg-[#393F4C] text-white pt-10 pb-16 md:pb-20">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Big diagonal cream wedge from top-right corner — lovable's signature */}
      <div
        className="absolute -top-16 right-0 w-[60%] h-[120%] hidden lg:block"
        style={{
          background:
            'linear-gradient(135deg, transparent 0%, transparent 38%, #FFFAEB 42%, #FFFAEB 100%)',
        }}
        aria-hidden="true"
      />

      {/* Black car photo — smaller / zoomed out so the whole car (incl. wheels) is visible
          between the headline and the form, sitting just above the trust strip */}
      <div className="absolute inset-x-0 bottom-8 lg:bottom-10 hidden lg:flex justify-center pointer-events-none" aria-hidden="true">
        <div className="relative w-[460px] xl:w-[540px] aspect-[1264/848]">
          <Image
            src="/images/stewart-mock/hero-car.png"
            alt=""
            fill
            sizes="(min-width: 1280px) 540px, 460px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-center">
          {/* ─── Left column ──────────────────────────────────────── */}
          <div>
            {/* Fake live-urgency pill */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-[#2B303A]/80 border border-[#4F5666]">
              <span className="relative inline-flex">
                <span className="absolute inline-flex h-2 w-2 rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              Live valuation desk open now
            </span>

            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-[64px] xl:text-7xl font-black leading-[1.02] tracking-tight">
              Sell Your Car
              <br />
              <span style={{ color: GOLD }}>Today</span>
            </h1>

            <p className="mt-5 text-2xl md:text-3xl font-bold leading-tight">
              Offer in 10 mins. Paid same day.
            </p>

            <p className="mt-3 max-w-md text-base text-slate-400">
              Australia&apos;s smartest car buying service. Fair offers, free pickup, instant
              OSKO transfer.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#mock-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-900 transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: GOLD }}
              >
                Get My Offer
                <span aria-hidden="true">›</span>
              </a>
              <a
                href="tel:0492858699"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white bg-[#2B303A]/80 border border-[#4F5666] hover:bg-[#4F5666]/80 transition-colors"
              >
                <PhoneIcon className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Star rating row */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="flex" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill={GOLD}>
                    <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
                  </svg>
                ))}
              </span>
              <span className="font-bold">4.9</span>
              <span className="text-slate-400">· 60+ Google reviews</span>
            </div>

            {/* Stat tiles */}
            <div className="mt-6 grid grid-cols-3 gap-2 max-w-md">
              {[
                { stat: '2,500+', label: 'Cars bought' },
                { stat: '$18M+', label: 'Paid out' },
                { stat: '10 min', label: 'Avg offer' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg px-3 py-3 bg-[#2B303A]/60 border border-[#4F5666]"
                >
                  <div className="text-xl font-black" style={{ color: GOLD }}>
                    {s.stat}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right column — mock form panel (two-tone: dark header + cream body) ─ */}
          <div id="mock-form" className="relative">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5), 0 18px 36px -12px rgba(0,0,0,0.35)',
              }}
            >
              {/* ─── Dark header zone ─────────────────────────────────── */}
              <div className="bg-[#2B303A] px-6 md:px-7 py-5 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em]" style={{ color: GOLD }}>
                      AUTO-SELL.AI
                    </div>
                    <h2 className="text-2xl md:text-[26px] font-black mt-1 text-white leading-tight">
                      Get Your Offer Now
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Priority quote lane · no dealer runaround
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-900 flex-shrink-0"
                    style={{ backgroundColor: GOLD }}
                    aria-hidden="true"
                  >
                    <SparkleIcon className="w-5 h-5" />
                  </span>
                </div>
                {/* Gold accent line at the bottom of the dark zone */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: GOLD }} />
              </div>

              {/* ─── Cream body zone (form fields + CTA) — default state shows rego mode ─ */}
              <div className="bg-white px-6 md:px-7 py-6">
                {/* Step indicator */}
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-500">
                  <span className="text-slate-900">Step 1 of 3</span>
                  <span>Vehicle</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full mb-5">
                  <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: GOLD }} />
                </div>

                {/* Big dashed-gold REGO + STATE input — DEFAULT collapsed rego mode */}
                <div
                  className="relative rounded-2xl px-4 py-4 border-2 border-dashed flex items-center justify-between gap-3 mb-3"
                  style={{
                    backgroundColor: 'rgba(255, 195, 37, 0.10)',
                    borderColor: GOLD,
                  }}
                >
                  <span
                    className="text-base font-black tracking-widest"
                    style={{ color: 'rgba(146, 86, 10, 0.55)' }}
                  >
                    ENTER REGO
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-black text-white bg-[#2B303A]"
                  >
                    STATE
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <a
                  href="#"
                  className="block text-xs font-bold mb-5 hover:underline"
                  style={{ color: '#92560A' }}
                >
                  No plate? Unregistered car? Click here →
                </a>

                {/* Big gold CTA — strong yellow drop-shadow glow */}
                <button
                  type="button"
                  className="w-full rounded-xl py-4 text-base font-black tracking-wider text-slate-900 transition-transform hover:scale-[1.01]"
                  style={{
                    backgroundColor: GOLD,
                    boxShadow:
                      '0 1px 0 rgba(180, 120, 0, 0.4) inset, 0 8px 24px rgba(255, 195, 37, 0.45), 0 16px 40px rgba(255, 195, 37, 0.25)',
                  }}
                >
                  GET MY INSTANT OFFER →
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-[12px] text-slate-500">
                  <CheckIcon className="w-3.5 h-3.5" />
                  <span>Free · No obligation · 30 second offer</span>
                </div>

                {/* OR divider + phone fallback */}
                <div className="flex items-center gap-3 my-4 text-[10px] font-bold text-slate-400">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span>OR</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>
                <a
                  href="tel:0492858699"
                  className="flex items-center justify-center gap-2 text-sm font-bold text-slate-900"
                >
                  <PhoneIcon className="w-4 h-4" />
                  Call 0492 858 699
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Trust strip (4 mini-cards under hero) ────────────────────────────────

function LovableTrustStrip() {
  // Icons matching lovable's design — outlined in gold on a soft cream tile
  const items = [
    {
      title: 'We pay more than dealers',
      sub: 'Fair market prices, every time',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <circle cx="12" cy="12.5" r="2.5" />
          <path d="M7 9.5h.01M17 15.5h.01" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Same-day payment',
      sub: 'OSKO instant bank transfer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Safe & secure',
      sub: 'Licensed motor dealer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Free pickup Australia-wide',
      sub: 'We come to your door',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7z" strokeLinejoin="round" />
          <circle cx="6" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      ),
    },
  ]
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
              style={{
                backgroundColor: CREAM,
                color: '#92560A',
                border: `1px solid rgba(255, 195, 37, 0.25)`,
              }}
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

// ─── Giant stats banner ───────────────────────────────────────────────────

function LovableStatsBanner() {
  const stats = [
    { stat: '$18M+', label: 'Paid to sellers' },
    { stat: '2,500+', label: 'Cars purchased' },
    { stat: '10 min', label: 'Average offer time' },
    { stat: '4.9★', label: 'Google rating' },
  ]
  return (
    <section className="bg-[#393F4C] py-14 border-t border-[#2B303A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-4xl md:text-5xl font-black" style={{ color: GOLD }}>
              {s.stat}
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── "How It Works" — 4 step (lovable's version) ──────────────────────────

function LovableHowItWorks() {
  const steps = [
    { n: 1, title: 'Tell us about your car', body: 'Enter your rego or VIN and answer a few quick questions. Takes 60 seconds.' },
    { n: 2, title: 'Receive your offer', body: 'Our pricing engine combines market data with real-time data for a fair offer.' },
    { n: 3, title: 'Book a free inspection', body: 'We come to you anywhere in Australia at a time that suits — no fees, no obligation.' },
    { n: 4, title: 'Get paid same day', body: 'OSKO instant bank transfer the moment we collect — funds in your account in seconds.' },
  ]
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[10px] font-bold tracking-[0.2em] text-amber-600 mb-2">HOW IT WORKS</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">From offer to paid — in 4 steps</h2>
          <p className="mt-3 text-slate-500">No haggling. No tyre-kickers. No delays.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-slate-200 p-6 bg-white hover:shadow-lg transition-shadow">
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-900 font-black text-lg mb-4"
                style={{ backgroundColor: GOLD }}
              >
                {s.n}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Smear comparison table (lovable's "Auto-Sell wins everything" pattern) ─

function LovableComparisonSmear() {
  const rows = [
    'Same-day payment',
    'Free Australia-wide pickup',
    'No haggling or pressure',
    'Buys damaged / unregistered',
    'Handles all paperwork',
    'No strangers at your door',
    'Fair market price',
  ]
  // Intentionally rigged: every row Auto-Sell wins, others lose
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[10px] font-bold tracking-[0.2em] text-amber-600 mb-2">WHY US</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">The smart way to sell</h2>
          <p className="mt-3 text-slate-500">Compare your options.</p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}>
            <div className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">FEATURE</div>
            <div className="relative px-5 py-4 text-center text-sm font-black text-slate-900 border-l-2 border-r-2 border-t-2 border-b" style={{ borderColor: GOLD, backgroundColor: 'rgba(255, 195, 37, 0.08)' }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-slate-900" style={{ backgroundColor: GOLD }}>Recommended</span>
              Auto-Sell.ai
            </div>
            <div className="px-5 py-4 text-center text-sm font-bold text-slate-500 border-b border-slate-200">Dealer</div>
            <div className="px-5 py-4 text-center text-sm font-bold text-slate-500 border-b border-slate-200">Private sale</div>

            {rows.map((row, i) => {
              const isLast = i === rows.length - 1
              return (
                <div key={row} className="contents">
                  <div className={`px-5 py-4 text-sm text-slate-700 ${!isLast ? 'border-b border-slate-200' : ''}`}>{row}</div>
                  <div className={`px-5 py-4 text-center border-l-2 border-r-2 ${isLast ? 'border-b-2' : 'border-b'}`} style={{ borderLeftColor: GOLD, borderRightColor: GOLD, borderBottomColor: isLast ? GOLD : 'rgba(255, 195, 37, 0.18)', backgroundColor: 'rgba(255, 195, 37, 0.05)' }}>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700"><CheckIcon /></span>
                  </div>
                  <div className={`px-5 py-4 text-center ${!isLast ? 'border-b border-slate-200' : ''}`}>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400"><CrossIcon /></span>
                  </div>
                  <div className={`px-5 py-4 text-center ${!isLast ? 'border-b border-slate-200' : ''}`}>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400"><CrossIcon /></span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 6-card generic value props ───────────────────────────────────────────

function LovableValueProps() {
  const props = [
    { title: 'Fair market offers', body: 'Transparent pricing engine combining market data and real-time data.' },
    { title: 'Same-day OSKO payments', body: 'Funds in your account the moment we collect — verified instantly.' },
    { title: 'We come to you', body: 'Free pickup anywhere in Australia, including remote areas.' },
    { title: 'No listings or time wasters', body: 'Skip the strangers, scams and lowball offers from private buyers.' },
    { title: 'No pressure to accept', body: 'Walk away anytime. Zero obligation. The offer is yours.' },
    { title: 'Licensed motor dealer', body: "Fully licensed and insured. Australia's most trusted car buyer." },
  ]
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[10px] font-bold tracking-[0.2em] text-amber-600 mb-2">WHY AUTO-SELL.AI</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">Built for sellers who value their time</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {props.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-amber-700" style={{ backgroundColor: 'rgba(255, 195, 37, 0.15)' }} aria-hidden="true">
                <CheckIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">{p.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Fake live activity counters (light cream cards) ──────────────────────

function LovableLiveActivity() {
  const items = [
    {
      tag: 'LIVE',
      n: '248',
      label: 'Offers in last 24h',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      tag: 'TODAY',
      n: '38',
      label: 'Cars purchased today',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M5 17h14M7 17V8l2-3h6l2 3v9M9 17v2M15 17v2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      tag: 'THIS WEEK',
      n: '$184,783',
      label: 'Paid out to sellers',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18M7 15h4" strokeLinecap="round" />
        </svg>
      ),
    },
  ]
  return (
    <section className="bg-white pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((it) => (
          <div
            key={it.label}
            className="rounded-2xl p-5 flex items-center gap-4 border"
            style={{
              backgroundColor: 'rgba(255, 195, 37, 0.06)',
              borderColor: 'rgba(255, 195, 37, 0.18)',
            }}
          >
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-lg flex-shrink-0"
              style={{
                backgroundColor: 'rgba(255, 195, 37, 0.15)',
                color: '#92560A',
              }}
              aria-hidden="true"
            >
              <span className="w-5 h-5 block">{it.icon}</span>
            </span>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                <span className="relative inline-flex">
                  <span className="absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                {it.tag}
              </div>
              <div className="text-3xl font-black text-slate-900 mt-0.5">{it.n}</div>
              <div className="text-xs text-slate-500 mt-0.5">{it.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Brand marquee (logos on dark) ────────────────────────────────────────

function LovableBrandMarquee() {
  // Brand mark glyphs as monogram circles since we don't have the SVG library here.
  // On the real lovable site these are actual logo SVGs in light gray on dark.
  const brands = ['Mitsubishi', 'Nissan', 'Subaru', 'Volkswagen', 'MG', 'Tesla', 'BMW', 'Mercedes', 'Audi', 'Lexus', 'Land Rover']
  return (
    <section className="bg-[#393F4C] py-10 border-t border-[#2B303A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <div className="text-[10px] font-black tracking-[0.2em] text-amber-400 mb-6">WE BUY EVERY MAKE & MODEL</div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 text-slate-400">
          {brands.map((b) => (
            <span
              key={b}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#4F5666] text-[10px] font-bold opacity-80"
              aria-label={b}
              title={b}
            >
              {b.slice(0, 2).toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What We Buy (vehicle types) ──────────────────────────────────────────

function LovableWhatWeBuy() {
  const types = [
    { label: 'Cars', icon: '🚗' },
    { label: 'SUVs', icon: '🚙' },
    { label: 'Utes', icon: '🛻' },
    { label: 'Vans', icon: '🚐' },
    { label: 'Trucks', icon: '🚚' },
  ]
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <div className="text-[10px] font-black tracking-[0.2em] text-amber-600 mb-2">WHAT WE BUY</div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">Any vehicle, any condition</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {types.map((t) => (
            <div
              key={t.label}
              className="rounded-2xl p-6 border flex flex-col items-center gap-3"
              style={{
                backgroundColor: 'rgba(255, 195, 37, 0.05)',
                borderColor: 'rgba(255, 195, 37, 0.18)',
              }}
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg text-2xl"
                style={{ backgroundColor: 'rgba(255, 195, 37, 0.15)' }}
                aria-hidden="true"
              >
                {t.icon}
              </span>
              <span className="text-base font-bold text-slate-900">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Customer Reviews (horizontal scroll) ─────────────────────────────────

function LovableReviews() {
  const reviews = [
    { name: 'Charmian Grove', when: '60 days ago', where: 'Wetherill Park, NSW', quote: 'Fantastic experience with Alex, Tony and the team! Friendly, honest, helpful — got the price I needed and the whole process was seamless. Highly recommend.' },
    { name: 'Nick Dimitriadis', when: '60 days ago', where: 'Sydney, NSW', quote: 'Great experience dealing with Alex, a true professional. Straight to the point, offered genuine experience and a fair value for one of our fleet cars.' },
    { name: 'Olrielle Foley', when: '90 days ago', where: 'Sydney, NSW', quote: 'Fantastic experience selling my car to Alex and his team. Friendly, professional and incredibly easygoing. Communication was clear and prompt the whole way.' },
    { name: 'Phillip Ngo', when: '60 days ago', where: 'Sydney, NSW', quote: 'Sold and picked up from my house within 20 minutes. Great service, super quick, with a super fair price!' },
    { name: 'Danielle Elosman', when: '30 days ago', where: 'Sydney, NSW', quote: 'These guys came super fast. Asked to sell my car and got paid instantly! They paid the most than all the other competitors. Auto-Sell.ai was the best.' },
  ]
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[10px] font-black tracking-[0.2em] text-amber-600 mb-2">CUSTOMER REVIEWS</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">Loved by sellers across Australia</h2>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
            <span className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill={GOLD}>
                  <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
                </svg>
              ))}
            </span>
            <span className="font-bold text-slate-900">4.9</span>
            <span>· 60+ reviews</span>
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory">
          {reviews.map((r) => (
            <div key={r.name} className="snap-start flex-shrink-0 w-[320px] md:w-[380px] rounded-2xl border border-slate-200 p-5 bg-white">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 font-bold inline-flex items-center justify-center flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-xs text-slate-500">{r.when} · {r.where}</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA — dark card with 2x2 stat grid ─────────────────────────────

function LovableFinalCta() {
  const stats = [
    {
      title: '10 min',
      sub: 'Average offer time',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Same day',
      sub: 'OSKO payment',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18M7 15h4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Free',
      sub: 'Australia-wide pickup',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M3 7h11v9H3zM14 11h4l3 3v2h-7zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Licensed',
      sub: 'Motor dealer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <div className="text-[10px] font-black tracking-[0.2em] text-amber-400 mb-2">READY WHEN YOU ARE</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Get your offer in <span style={{ color: GOLD }}>under 60 seconds</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-md">
              No spam. No pressure. Just a fair offer, free pickup and same-day payment.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#mock-form" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-900" style={{ backgroundColor: GOLD }}>
                Start Now <span aria-hidden="true">›</span>
              </a>
              <a href="tel:0492858699" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-slate-900 bg-white">
                <PhoneIcon className="w-4 h-4" />
                0492 858 699
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-5 border border-[#4F5666] bg-[#2B303A]/60 text-white"
              >
                <span className="inline-block w-5 h-5 mb-3 text-amber-400" aria-hidden="true">
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

// ─── FAQ (numbered accordion) ─────────────────────────────────────────────

function LovableFAQ() {
  const faqs = [
    { q: 'How quickly can I get a quote?', a: 'Most rego-based quotes come back inside 10 minutes during business hours.' },
    { q: 'Do you really pay on the same day?', a: 'Yes — funds are sent via OSKO the moment we collect the vehicle and the paperwork is signed.' },
    { q: 'What if my car isn’t running?', a: 'Not a problem. We arrange free pickup for non-running cars Australia-wide.' },
    { q: 'Are there any hidden fees?', a: 'None. The figure we quote is what lands in your account.' },
    { q: 'How do you determine the price?', a: 'Our pricing engine blends live market data with recent comparable sales and condition signals.' },
    { q: 'What areas do you service?', a: 'Australia-wide. We come to you, from major metros to regional addresses.' },
    { q: 'What documents do I need?', a: 'Photo ID, registration papers and any service history you have on hand.' },
    { q: 'Can I change my mind after accepting an offer?', a: 'Up until paperwork is signed, yes. After signing, the sale is final.' },
    { q: 'Do you buy all car brands?', a: 'Yes — every Australian make and model from budget hatchbacks to luxury European cars.' },
    { q: 'What if I still owe money on my car?', a: 'We work directly with your financier to clear the balance and pay you the remainder.' },
  ]
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-[10px] font-black tracking-[0.2em] text-amber-600 mb-2">FAQ</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">
            Got questions?
            <br />
            <span className="text-slate-600 font-bold">We&apos;ve got answers.</span>
          </h2>
          <p className="mt-3 text-slate-500">
            Everything you need to know before selling. Still curious? Our team is one call away.
          </p>
          <a href="tel:0492858699" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg font-bold text-slate-900 bg-white border border-slate-200">
            <PhoneIcon className="w-4 h-4" />
            0492 858 699
          </a>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={f.q} className="group rounded-xl bg-white border border-slate-200 overflow-hidden">
              <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none">
                <span className="text-xs font-black text-amber-600 w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-sm md:text-base font-bold text-slate-900">{f.q}</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 pl-[44px] text-sm text-slate-600 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/*
 * NOTE: Floating sticky icons are NOT defined here.
 *
 * The Auto-Sell app already renders FloatingPhoneIcon and LazyChatbotWidget
 * globally from src/app/layout.tsx — those appear on every page including
 * /requested-mockup, which gives us the same bottom-right floating-icons pattern
 * the lovable reference uses. Defining a duplicate set here would render two
 * stacks of icons, so this slot is deliberately empty.
 */

// ─── Sticky mobile bottom bar ─────────────────────────────────────────────

function LovableMobileBottomBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-200 px-3 py-3 flex gap-2 shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)]">
      <a href="tel:0492858699" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-slate-900 border border-slate-300 bg-white">
        <PhoneIcon className="w-4 h-4" />
        Call
      </a>
      <a href="#mock-form" className="flex-[1.4] inline-flex items-center justify-center px-4 py-3 rounded-lg font-bold text-slate-900" style={{ backgroundColor: GOLD }}>
        Get My Offer
      </a>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function StewartMockPage() {
  return (
    <div className="stewart-mock-root min-h-screen bg-white pb-24 lg:pb-0">
      {/*
        Scoped CSS — lifts the global FloatingPhoneIcon clear of our mobile
        bottom bar (only on this page). Without this, the bottom-right phone
        icon would render on top of / behind the "Call · Get My Offer" bar
        on mobile. Desktop is unaffected — bottom bar is lg:hidden.
      */}
      <style>{`
        @media (max-width: 1023px) {
          .stewart-mock-root ~ * .fixed.bottom-6,
          body:has(.stewart-mock-root) .fixed.bottom-6 {
            bottom: 5.5rem !important;
          }
        }
      `}</style>

      {/* Internal-only banner so we never confuse ourselves about which page this is */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs font-bold text-center py-2 px-4">
        Internal mock · replica of lovable.app reference · not the live homepage
      </div>

      <MockHeader />
      <LovableHero />
      <LovableTrustStrip />
      <LovableStatsBanner />
      <section id="how-it-works"><LovableHowItWorks /></section>
      <section id="why-us"><LovableComparisonSmear /></section>
      <LovableBrandMarquee />
      <LovableValueProps />
      <LovableLiveActivity />
      <LovableWhatWeBuy />
      <section id="reviews"><LovableReviews /></section>
      <LovableFinalCta />
      <section id="faq"><LovableFAQ /></section>
      <LovableMobileBottomBar />
      {/*
        Floating phone + chat icons are rendered globally from app/layout.tsx
        (FloatingPhoneIcon + LazyChatbotWidget). We intentionally do NOT add a
        duplicate set here — the global ones already do the lovable-style
        floating-icons-in-bottom-right job.
      */}
    </div>
  )
}
