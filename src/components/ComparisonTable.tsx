'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Three-way comparison: Auto-Sell.ai vs Dealer trade-in vs Private sale.
 *
 * Designed to be honest: each column wins where it genuinely wins. Private
 * sale wins on top-dollar potential; dealer trade-in wins when you're rolling
 * into a new purchase; Auto-Sell wins on speed + zero-effort without
 * requiring a new car. The reader picks based on what matters to them.
 *
 * Auto-Sell's column carries a subtle gold tint because this is our site,
 * but there is intentionally no "RECOMMENDED" badge or stacked-deck framing.
 */

const GOLD = '#FFC325'

type Cell = boolean | 'partial' | string

interface Column {
  key: 'autoSell' | 'dealer' | 'privateSale'
  title: string
  bestFor: string
  highlight: boolean
}

const COLUMNS: Column[] = [
  { key: 'autoSell', title: 'Auto-Sell.ai', bestFor: 'Best for fast & easy', highlight: true },
  { key: 'dealer', title: 'Dealer trade-in', bestFor: 'Best when buying another car', highlight: false },
  { key: 'privateSale', title: 'Private sale', bestFor: 'Best for top dollar', highlight: false },
]

interface Row {
  feature: string
  autoSell: Cell
  dealer: Cell
  privateSale: Cell
}

const ROWS: Row[] = [
  {
    feature: 'Potential to fetch the highest sale price',
    autoSell: 'partial',
    dealer: false,
    privateSale: true,
  },
  {
    feature: 'Sell without buying another car',
    autoSell: true,
    dealer: false,
    privateSale: true,
  },
  {
    feature: 'No listings, ads or strangers to meet',
    autoSell: true,
    dealer: true,
    privateSale: false,
  },
  {
    feature: 'Funds in your bank account same day',
    autoSell: true,
    dealer: 'Trade-in credit',
    privateSale: 'Varies',
  },
  {
    feature: 'Free pickup — no driving anywhere',
    autoSell: true,
    dealer: false,
    privateSale: false,
  },
  {
    feature: 'Works if the car isn’t running',
    autoSell: true,
    dealer: false,
    privateSale: false,
  },
  {
    feature: 'All paperwork handled for you',
    autoSell: true,
    dealer: true,
    privateSale: false,
  },
]

// ─── Atoms ────────────────────────────────────────────────────────────────

function Check({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-label="Yes"
      className={`w-5 h-5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function Cross({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-label="No"
      className={`w-5 h-5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
    </svg>
  )
}

function Partial({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-label="Sometimes"
      className={`w-5 h-5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <line x1="6" y1="12" x2="18" y2="12" strokeLinecap="round" />
    </svg>
  )
}

function renderCell(value: Cell, highlighted: boolean) {
  if (value === true) {
    return (
      <span
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
          highlighted ? 'bg-amber-100 text-[#92560A]' : 'bg-gray-100 text-gray-600'
        }`}
      >
        <Check />
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-400">
        <Cross />
      </span>
    )
  }
  if (value === 'partial') {
    return (
      <span
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
          highlighted ? 'bg-amber-50 text-[#92560A]' : 'bg-gray-100 text-gray-500'
        }`}
        title="Sometimes — depends on the car and the buyer"
      >
        <Partial />
      </span>
    )
  }
  return <span className="text-xs md:text-sm text-gray-500 font-medium">{value}</span>
}

// ─── Component ────────────────────────────────────────────────────────────

export default function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <div ref={ref}>
      {/* ─── Desktop / tablet — full table ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden md:block"
      >
        <div className="friendly-card overflow-hidden">
          <div
            className="grid"
            style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}
            role="table"
            aria-label="Compare Auto-Sell, dealer trade-in and private sale"
          >
            {/* Header row */}
            <div className="px-5 pt-6 pb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 border-b border-gray-100">
              What you might value
            </div>
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                className={`px-4 pt-6 pb-4 text-center ${
                  col.highlight ? 'border-l border-r border-t' : 'border-b border-gray-100'
                }`}
                style={
                  col.highlight
                    ? {
                        borderColor: GOLD,
                        backgroundColor: 'rgba(255, 195, 37, 0.06)',
                      }
                    : undefined
                }
              >
                <div className="text-sm md:text-base font-black text-gray-900 leading-tight">
                  {col.title}
                </div>
                <div className="text-[11px] mt-1 font-semibold uppercase tracking-wide text-gray-500">
                  {col.bestFor}
                </div>
              </div>
            ))}

            {/* Body rows */}
            {ROWS.map((row, i) => {
              const isLast = i === ROWS.length - 1
              return (
                <div key={row.feature} className="contents">
                  <div
                    className={`px-5 py-4 text-sm md:text-[15px] text-gray-700 font-medium ${
                      !isLast ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    {row.feature}
                  </div>
                  {COLUMNS.map((col) => {
                    const value = row[col.key]
                    if (col.highlight) {
                      return (
                        <div
                          key={col.key}
                          className={`px-4 py-4 text-center border-l border-r ${
                            isLast ? 'border-b' : 'border-b'
                          }`}
                          style={{
                            borderLeftColor: GOLD,
                            borderRightColor: GOLD,
                            borderBottomColor: isLast ? GOLD : 'rgba(255, 195, 37, 0.18)',
                            backgroundColor: 'rgba(255, 195, 37, 0.05)',
                          }}
                        >
                          {renderCell(value, true)}
                        </div>
                      )
                    }
                    return (
                      <div
                        key={col.key}
                        className={`px-4 py-4 text-center ${
                          !isLast ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        {renderCell(value, false)}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center max-w-2xl mx-auto">
          A dash means it depends on the car and the buyer. Private sales typically pay more
          but take weeks of effort. Dealer trade-ins are fastest when you&apos;re buying their next car.
        </p>
      </motion.div>

      {/* ─── Mobile — one card per option ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="md:hidden space-y-4"
      >
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            className="friendly-card p-5"
            style={
              col.highlight
                ? {
                    borderColor: GOLD,
                    backgroundColor: 'rgba(255, 195, 37, 0.05)',
                  }
                : undefined
            }
          >
            <h3 className="text-base font-black text-gray-900">{col.title}</h3>
            <div className="text-[11px] mt-0.5 mb-4 font-semibold uppercase tracking-wide text-gray-500">
              {col.bestFor}
            </div>
            <ul className="space-y-2.5">
              {ROWS.map((row) => {
                const value = row[col.key]
                return (
                  <li key={row.feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0">
                      {value === true ? (
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                            col.highlight ? 'bg-amber-100 text-[#92560A]' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : value === false ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400">
                          <Cross className="w-3.5 h-3.5" />
                        </span>
                      ) : value === 'partial' ? (
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                            col.highlight ? 'bg-amber-50 text-[#92560A]' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <Partial className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-500 font-bold pt-0.5">~</span>
                      )}
                    </span>
                    <span className="text-sm text-gray-700 leading-tight">
                      {row.feature}
                      {typeof value === 'string' && value !== 'partial' && (
                        <span className="block text-[11px] text-gray-500 mt-0.5">{value}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <p className="text-xs text-gray-500 text-center pt-1">
          A dash means it depends on the car and the buyer.
        </p>
      </motion.div>
    </div>
  )
}
