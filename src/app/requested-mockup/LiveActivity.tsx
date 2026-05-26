'use client'

import { useEffect, useState } from 'react'

const CREAM = '#FFFAEB'

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M7 17V8l2-3h6l2 3v9M9 17v2M15 17v2" />
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </svg>
  )
}

function formatMoney(n: number) {
  return '$' + n.toLocaleString('en-AU')
}

/**
 * Live activity counters with randomized increments. Counters start from a
 * stable baseline (rendered same on server + first client paint to avoid
 * hydration mismatch), then begin ticking up after mount.
 */
export default function LiveActivity() {
  const [offers, setOffers] = useState(248)
  const [today, setToday] = useState(38)
  const [paid, setPaid] = useState(184_581)

  useEffect(() => {
    // Offers (~LIVE): tick up every 6–14s by 1
    const offersTimer = setInterval(() => {
      setOffers((n) => n + 1)
    }, 6000 + Math.random() * 8000)

    // Today: tick up every 25–60s by 1
    const todayTimer = setInterval(() => {
      setToday((n) => n + 1)
    }, 25000 + Math.random() * 35000)

    // Paid out: tick up every 4–9s by a randomized car-sale amount ($1.2k–$9.8k)
    const paidTimer = setInterval(() => {
      const bump = Math.floor(1200 + Math.random() * 8600)
      setPaid((n) => n + bump)
    }, 4000 + Math.random() * 5000)

    return () => {
      clearInterval(offersTimer)
      clearInterval(todayTimer)
      clearInterval(paidTimer)
    }
  }, [])

  const items = [
    { tag: 'LIVE', n: String(offers), label: 'Offers in last 24h', icon: <BoltIcon /> },
    { tag: 'TODAY', n: String(today), label: 'Cars purchased today', icon: <CarIcon /> },
    { tag: 'THIS WEEK', n: formatMoney(paid), label: 'Paid out to sellers', icon: <WalletIcon /> },
  ]

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((it) => (
          <div key={it.label} className="rounded-2xl p-5 flex items-center gap-4 border border-slate-200 bg-white shadow-sm">
            <span
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
              style={{ backgroundColor: CREAM, color: '#B8860B', border: '1px solid rgba(255,195,3,0.30)' }}
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
              <div
                key={it.n}
                className="text-3xl font-black text-slate-900 mt-0.5 leading-tight transition-all"
                style={{ animation: 'liveTick 400ms ease-out' }}
              >
                {it.n}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{it.label}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes liveTick {
          0% { transform: translateY(-4px); opacity: 0.4; color: #B8860B; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
