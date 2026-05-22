'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Six-up value proposition strip — sits below the comparison table.
 * Concise statements that mirror the value-prop pages already live in
 * /value-propositions/*, without overpromising new numbers.
 */

const GOLD = '#FFC325'

interface Prop {
  title: string
  description: string
  icon: React.ReactNode
}

// Small inline-svg icons. Stroke-based so they inherit currentColor.
const I = {
  pricetag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  shieldX: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9.5 9.5l5 5M14.5 9.5l-5 5" />
    </svg>
  ),
  thumbsUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9A2 2 0 0 0 19.66 9H14z" />
      <line x1="7" y1="22" x2="7" y2="11" />
    </svg>
  ),
  badge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5 18 22l-6-3-6 3 2.5-8.5" />
    </svg>
  ),
}

const PROPS: Prop[] = [
  {
    title: 'Fair market offers',
    description: 'Transparent pricing built on real market data — no lowball trade-in tricks.',
    icon: I.pricetag,
  },
  {
    title: 'Same-day OSKO payment',
    description: 'Funds arrive in your account in seconds the moment we collect the car.',
    icon: I.bolt,
  },
  {
    title: 'We come to you',
    description: 'Free pickup at your driveway, suburb or workplace — Australia-wide.',
    icon: I.pin,
  },
  {
    title: 'No listings or time wasters',
    description: 'Skip the strangers, scams and lowball Marketplace offers.',
    icon: I.shieldX,
  },
  {
    title: 'No pressure to accept',
    description: 'Walk away anytime. Zero obligation. The offer is yours to consider.',
    icon: I.thumbsUp,
  },
  {
    title: 'Licensed motor dealer',
    description: 'Fully licensed and insured — paperwork handled end-to-end.',
    icon: I.badge,
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export default function ValuePropsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
    >
      {PROPS.map((p) => (
        <motion.div
          key={p.title}
          variants={itemVariants}
          className="friendly-card p-5 md:p-6 flex flex-col"
        >
          <span
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 flex-shrink-0"
            style={{
              backgroundColor: 'rgba(255, 195, 37, 0.12)',
              color: '#92560A',
            }}
            aria-hidden="true"
          >
            <span className="w-5 h-5 block">{p.icon}</span>
          </span>
          <div className="w-8 h-[2px] mb-3 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden="true" />
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5 leading-snug">
            {p.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
