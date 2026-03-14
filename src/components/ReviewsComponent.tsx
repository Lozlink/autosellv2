'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Review {
  id: number
  name: string
  location: string
  rating: number
  review: string
  date: string
  verified: boolean
  url: string
}

// ─── Shared review card ────────────────────────────────────────────────────
function ReviewCard({ review, index, animate = true }: { review: Review; index: number; animate?: boolean }) {
  const content = (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex text-yellow-400 text-lg" aria-label={`${review.rating} stars`}>
          {''.repeat(review.rating)}
        </div>
        {review.verified && (
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: '#FFC325', color: '#000000' }}
          >
            Verified
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4 italic leading-relaxed flex-1">
        &#34;{review.review}&#34;
      </p>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-600">{review.name}</div>
          <div className="text-sm text-gray-600">{review.location}</div>
        </div>
        <div className="text-sm text-gray-600">
          {new Intl.DateTimeFormat('en-AU', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          }).format(new Date(review.date + 'T00:00:00Z'))}
        </div>
      </div>
    </div>
  )

  if (!animate) {
    return <Link href={review.url} className="block h-full">{content}</Link>
  }

  return (
    <Link href={review.url} className="block h-full">
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {content}
      </motion.div>
    </Link>
  )
}

// ─── Loading skeleton ──────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-16 h-4 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

// ─── Mobile horizontal snap-scroll carousel ────────────────────────────────
function MobileCarousel({ reviews }: { reviews: Review[] }) {
  const [activeDot, setActiveDot] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Track active dot via IntersectionObserver on each card
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll('[data-review-card]'))
    if (cards.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most-visible card
        let maxRatio = 0
        let maxIdx = 0
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            const idx = cards.indexOf(entry.target as HTMLElement)
            if (idx !== -1) maxIdx = idx
          }
        })
        if (maxRatio > 0.4) setActiveDot(maxIdx)
      },
      {
        root: container,
        threshold: [0.4, 0.6, 0.8],
      }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [reviews])

  function scrollTo(idx: number) {
    const container = scrollRef.current
    if (!container) return
    const cards = container.querySelectorAll('[data-review-card]')
    const card = cards[idx] as HTMLElement
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  return (
    <div className="space-y-4">
      {/* Scroll track — edge-to-edge on mobile */}
      <div
        ref={scrollRef}
        className="-mx-4 px-4 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-1 scrollbar-hide"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {reviews.map((review, index) => (
          <div
            key={review.id}
            data-review-card
            className="w-[85vw] flex-none snap-center"
          >
            <ReviewCard review={review} index={index} animate={false} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-2" aria-hidden="true">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="transition-all duration-300 rounded-full focus:outline-none"
              style={{
                width: activeDot === i ? 20 : 8,
                height: 8,
                backgroundColor: activeDot === i ? '#FFC325' : '#d1d5db',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Desktop rotating grid ─────────────────────────────────────────────────
function DesktopGrid({ reviews }: { reviews: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const getDisplayedReviews = useCallback(() => {
    if (reviews.length === 0) return []
    if (reviews.length <= 3) return reviews
    const displayed = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length
      displayed.push(reviews[index])
    }
    return displayed
  }, [reviews, currentIndex])

  // Auto-rotation — desktop only, this component is only rendered on lg+
  useEffect(() => {
    if (reviews.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviews])

  const displayedReviews = getDisplayedReviews()

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedReviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center space-x-2">
        {reviews.slice(0, Math.ceil(reviews.length / 3)).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={`w-3 h-3 rounded-full transition-colors ${
              Math.floor(currentIndex / 3) === index ? 'bg-[#FFC325]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────
export default function ReviewsComponent() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/google-reviews', { cache: 'no-store' })
        const data = await res.json()
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          // Only show reviews that have written text content
          const withText = data.reviews.filter((r: Review) => r.review && r.review.trim().length > 0)
          setReviews(withText.length > 0 ? withText : data.reviews)
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchReviews()
  }, [])

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mobile carousel — hidden on lg+ */}
      <div className="lg:hidden">
        <MobileCarousel reviews={reviews} />
      </div>

      {/* Desktop rotating grid — hidden below lg */}
      <div className="hidden lg:block">
        <DesktopGrid reviews={reviews} />
      </div>
    </div>
  )
}
