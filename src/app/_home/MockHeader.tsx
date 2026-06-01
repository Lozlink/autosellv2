'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const GOLD = '#FFC325'

const NAV_LINKS: { href: string; label: string }[] = [
  { href: '#how', label: 'How it works' },
  { href: '#why', label: 'Why us' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
]

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

/**
 * MockHeader — client component so it can own the mobile menu open state.
 * Mirrors the structure of components/Header.tsx: the mobile menu is rendered
 * inside the same <header> wrapper as a sibling of the flex bar, NOT a full
 * screen overlay. Just expands the header downward with a vertical link list.
 */
export default function MockHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderBottom: `1px solid ${GOLD}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header bar ──────────────────────────────────────────────── */}
        <div className="flex items-center justify-between py-3">
          <Link href="/requested-mockup" className="flex items-center" aria-label="Auto-Sell.ai home">
            <Image
              src="/brand-guideline/autosell-logo/PNG/1 (1).png"
              alt="Auto-Sell.ai"
              width={140}
              height={70}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-slate-900 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop phone CTA */}
          <a
            href="tel:0492858699"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 border border-slate-300 hover:border-slate-900 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            0492 858 699
          </a>

          {/* Mobile right cluster — phone pill + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:0492858699"
              aria-label="Call 0492 858 699"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 rounded-full text-xs font-bold text-slate-900 border border-slate-300 hover:border-slate-900 transition-colors whitespace-nowrap"
            >
              <PhoneIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">0492 858 699</span>
            </a>
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mock-mobile-menu"
              onClick={() => setIsMenuOpen((s) => !s)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                {isMenuOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ─── Mobile menu panel — sits below the header bar in the same
            sticky container. Same pattern as components/Header.tsx. */}
        {isMenuOpen && (
          <motion.div
            id="mock-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden py-3 border-t border-slate-200"
            style={{ backgroundColor: '#ffffff' }}
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-2 py-3 rounded-lg text-base font-semibold transition-colors hover:bg-amber-50"
                  style={{ color: '#0f172a' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile-only CTA pair, mirroring components/Header.tsx tail */}
              <a
                href="#offer"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded-lg font-bold text-slate-900"
                style={{
                  backgroundColor: GOLD,
                  boxShadow: '0 1px 0 rgba(180, 120, 0, 0.4) inset, 0 8px 24px rgba(255, 195, 37, 0.35)',
                }}
              >
                Get My Free Valuation →
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
