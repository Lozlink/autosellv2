'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const GOLD = '#FFC325'

interface Card {
  stat: string
  statLabel: string
  title: string
  description: string
  href: string
  imageSrc: string
  imageAlt: string
  /** Tailwind bg class for the image container, e.g. 'bg-white' */
  imageBg: string
  /** object-contain with padding for logos; object-cover for photos */
  objectFit: 'contain' | 'cover'
}

const CARDS: Card[] = [
  {
    stat: '30',
    statLabel: 'min',
    title: 'Instant Payment',
    description: 'AI-powered pricing and same-day OSKO transfer. Get paid in seconds, not weeks.',
    href: '/value-propositions/immediate-payment',
    imageSrc: '/images/branding/osko-and-payid-icon.jpg',
    imageAlt: 'OSKO and PayID instant payment',
    imageBg: 'bg-white',
    objectFit: 'contain',
  },
  {
    stat: '0',
    statLabel: 'km driven',
    title: 'We Come To You',
    description: 'On-site inspection at your driveway, suburb or workplace. Completely free, Australia-wide.',
    href: '/value-propositions/on-site-inspections',
    imageSrc: '/images/branding/on-site.jpg',
    imageAlt: 'On-site car inspection service',
    imageBg: 'bg-gray-100',
    objectFit: 'cover',
  },
  {
    stat: '7',
    statLabel: 'days a week',
    title: 'Open Every Day',
    description: 'Sell any day that suits you. Our AI and team work 24/7 to get you the best offer.',
    href: '/value-propositions/open-7-days',
    imageSrc: '/images/branding/7days.jpg',
    imageAlt: 'Open 7 days a week',
    imageBg: 'bg-gray-900',
    objectFit: 'cover',
  },
]

// ─── Desktop stagger variants ──────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

// ─── Mobile featured-card panel variants ──────────────────────────────────
const panelVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
    transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] as [number, number, number, number] },
  }),
}

// ─── Desktop single card ───────────────────────────────────────────────────
function DesktopCard({ card }: { card: Card }) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link
        href={card.href}
        className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-[#FFC325]/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        aria-label={card.title}
      >
        {/* Image strip */}
        <div className={`relative w-full h-36 flex-shrink-0 ${card.imageBg}`}>
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            sizes="33vw"
            className={card.objectFit === 'contain' ? 'object-contain p-6' : 'object-cover object-center'}
          />
          <div
            className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
            style={{ backgroundColor: GOLD }}
            aria-hidden="true"
          />
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-black leading-none text-gray-900" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {card.stat}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {card.statLabel}
            </span>
          </div>
          <div className="w-8 h-[2px] mb-3 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden="true" />
          <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-snug">{card.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.description}</p>
          <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-gray-400 group-hover:text-gray-900 transition-colors duration-200">
            <span>Learn more</span>
            <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Mobile tabbed showcase ────────────────────────────────────────────────
const AUTO_SCROLL_INTERVAL = 4000 // ms between auto-advances

function MobileShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const pauseUntilRef = useRef(0) // timestamp — pause auto-scroll after user tap
  const card = CARDS[activeIdx]

  // Auto-advance on an interval
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return // user recently tapped
      setDir(1)
      setActiveIdx(prev => (prev + 1) % CARDS.length)
    }, AUTO_SCROLL_INTERVAL)
    return () => clearInterval(id)
  }, [])

  const goTo = useCallback((idx: number) => {
    pauseUntilRef.current = Date.now() + 8000 // pause 8s after manual tap
    setDir(idx > activeIdx ? 1 : -1)
    setActiveIdx(idx)
  }, [activeIdx])

  return (
    <div className="w-full">
      {/* Tab strip */}
      <div className="flex rounded-xl bg-gray-100 p-1 mb-4 gap-1" role="tablist">
        {CARDS.map((c, i) => (
          <button
            key={c.href}
            role="tab"
            aria-selected={activeIdx === i}
            onClick={() => goTo(i)}
            className="relative flex-1 flex flex-col items-center py-2 px-1 rounded-lg text-center transition-colors duration-200 focus:outline-none"
          >
            {/* Active pill behind text */}
            {activeIdx === i && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-lg bg-white shadow-sm"
                style={{ zIndex: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex flex-col items-center gap-0.5">
              <span
                className="text-lg font-black leading-none"
                style={{
                  color: activeIdx === i ? GOLD : '#9ca3af',
                  fontVariantNumeric: 'tabular-nums',
                  transition: 'color 0.2s',
                }}
              >
                {c.stat}
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-wide leading-tight"
                style={{ color: activeIdx === i ? '#111827' : '#9ca3af', transition: 'color 0.2s' }}
              >
                {c.statLabel}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Animated card panel */}
      <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 380 }}>
        <AnimatePresence custom={dir} initial={false} mode="wait">
          <motion.div
            key={activeIdx}
            custom={dir}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Link
              href={card.href}
              className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white overflow-hidden"
              aria-label={card.title}
            >
              {/* Image */}
              <div className={`relative w-full flex-shrink-0 ${card.imageBg}`} style={{ height: 160 }}>
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className={card.objectFit === 'contain' ? 'object-contain p-6' : 'object-cover object-center'}
                  priority={activeIdx === 0}
                />
                {/* Gold accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-full"
                  style={{ backgroundColor: GOLD }}
                  aria-hidden="true"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5">
                <div className="w-8 h-[2px] mb-3 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden="true" />
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.description}</p>
                <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold text-gray-400">
                  <span>Learn more</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-3" aria-hidden="true">
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full focus:outline-none"
            style={{
              width: activeIdx === i ? 20 : 8,
              height: 8,
              backgroundColor: activeIdx === i ? GOLD : '#d1d5db',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────
export default function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <div ref={ref}>
      {/* Mobile tabbed showcase — hidden on sm+ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="block sm:hidden"
      >
        <MobileShowcase />
      </motion.div>

      {/* Desktop 3-column grid — hidden below sm */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="hidden sm:grid sm:grid-cols-3 gap-4 md:gap-5"
      >
        {CARDS.map((card) => (
          <DesktopCard key={card.href} card={card} />
        ))}
      </motion.div>
    </div>
  )
}
