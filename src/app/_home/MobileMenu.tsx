'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const LINKS: { href: string; label: string }[] = [
  { href: '#how', label: 'How it works' },
  { href: '#why', label: 'Why us' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
]

const GOLD = '#FFC325'

/**
 * MobileMenu — hamburger toggle + slide-in drawer for /requested-mockup.
 * Client component because the open/closed state lives here; MockHeader stays
 * in the server page.tsx and slots this in alongside the desktop nav.
 *
 * Closes on: link tap, Escape key, backdrop click, hash change. Locks body
 * scroll while open so the page underneath doesn't drift.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Portal target lives on document.body. We can't read window/document during
  // SSR, so flip a mounted flag in an effect so the portal call only runs
  // client-side.
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close on Escape + hash change (e.g. clicking #how scrolls + should close).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onHash = () => setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('hashchange', onHash)
    }
  }, [open])

  // Lock body scroll while drawer is open.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const prev = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : prev
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Hamburger button — only on mobile/tablet */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mock-mobile-drawer"
        onClick={() => setOpen((s) => !s)}
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {open ? (
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

      {/*
        Full-screen overlay drawer — rendered via a portal to document.body so
        it escapes any ancestor that would create a containing block for
        position:fixed (MockHeader has backdrop-blur which does exactly that,
        and would otherwise clip the drawer to the header bar height).
        Conditionally rendered — when closed, it's not in the DOM at all.
      */}
      {mounted && open && createPortal(
        <div
          id="mock-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="lg:hidden fixed inset-0 z-[60] flex flex-col isolate"
          style={{
            backgroundColor: '#ffffff',
            animation: 'mockMenuFadeIn 180ms ease-out',
          }}
        >
          {/* Keyframe defined inline so this component is self-contained. */}
          <style>{`
            @keyframes mockMenuFadeIn {
              from { opacity: 0; transform: scale(1.01); }
              to   { opacity: 1; transform: scale(1); }
            }
          `}</style>

          {/* Drawer header — close + Auto-Sell logo */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0"
            style={{ backgroundColor: '#ffffff' }}
          >
            <Link
              href="/requested-mockup"
              onClick={() => setOpen(false)}
              className="flex items-center"
              aria-label="Auto-Sell.ai home"
            >
              <Image
                src="/brand-guideline/autosell-logo/PNG/1 (1).png"
                alt="Auto-Sell.ai"
                width={120}
                height={60}
                priority
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links — explicit white bg on the scrollable region too */}
          <nav
            className="flex-1 overflow-y-auto px-3 py-4"
            style={{ backgroundColor: '#ffffff' }}
          >
            <ul className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.href} className="block w-full">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-3 rounded-lg text-base font-bold hover:bg-amber-50 transition-colors"
                    style={{ color: '#0f172a' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sticky footer — primary CTA + phone */}
          <div
            className="border-t border-slate-200 p-4 space-y-3 flex-shrink-0"
            style={{ backgroundColor: '#ffffff' }}
          >
            <a
              href="#offer"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-lg font-bold text-slate-900"
              style={{
                backgroundColor: GOLD,
                boxShadow: '0 1px 0 rgba(180, 120, 0, 0.4) inset, 0 8px 24px rgba(255, 195, 37, 0.35)',
              }}
            >
              Get My Free Valuation →
            </a>
            <a
              href="tel:0492858699"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-slate-900 border border-slate-300"
              style={{ backgroundColor: '#ffffff' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              0492 858 699
            </a>
            <p className="text-xs text-slate-500 text-center">Open 7 days · 8am–6pm AEST</p>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
