'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Reveal — wraps a section and fades+slides it into view when it crosses the
 * viewport bottom. Pure CSS transitions, no animation library. Intentionally
 * forgiving: once revealed, stays revealed (no flicker on scroll back up).
 *
 * Usage:
 *   <Reveal><HeavySection /></Reveal>
 *   <Reveal delay={120}><AnotherSection /></Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode
  /** Stagger delay in milliseconds. Useful when revealing sibling reveals close together. */
  delay?: number
  /** Element type to render. Defaults to 'div'. */
  as?: 'div' | 'section' | 'article'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect users who've turned off motion at the OS level.
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    // If the element is already in view on mount, show immediately.
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.9 && rect.bottom > 0) {
      setShown(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            obs.disconnect()
            break
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Plain inline styles — no Tailwind arbitrary keyframes needed, no extra CSS file.
  const style: React.CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: shown ? 'auto' : 'opacity, transform',
  }

  // @ts-expect-error - dynamic JSX element from string union
  return <Tag ref={ref as React.RefObject<HTMLElement>} className={className} style={style}>{children}</Tag>
}
