// Server-side helper to fetch the live Google rating, review count AND the
// review text for Auto-Sell.AI's Google Places listing. Cached for 30 minutes
// via Next's fetch cache so a single network call is shared across every
// server render that needs Google data (homepage reviews + footer rating).

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GoogleRating {
  rating: number | null
  userRatingsTotal: number | null
}

// Shape consumed by the homepage Reviews marquee. Mirrors the static
// `reviews` page-copy entries so live and fallback data are interchangeable.
// Google reviews carry no city, so `where` is intentionally blank.
export interface GoogleReview {
  name: string
  when: string
  where: string
  quote: string
  rating: number
}

export interface GoogleReviewsData extends GoogleRating {
  reviews: GoogleReview[]
}

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_ID

  const empty: GoogleReviewsData = { rating: null, userRatingsTotal: null, reviews: [] }
  if (!apiKey || !placeId) return empty

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.set('place_id', placeId)
    url.searchParams.set('fields', 'rating,user_ratings_total,reviews')
    // Legacy Place Details API supports reviews_sort; v1 does not. Newest first.
    url.searchParams.set('reviews_sort', 'newest')
    url.searchParams.set('key', apiKey)

    const res = await fetch(url.toString(), { next: { revalidate: 1800 } })
    if (!res.ok) return empty

    const data = await res.json()
    if (data.status !== 'OK') return empty

    const reviews: GoogleReview[] = (data.result?.reviews ?? [])
      // Only feature 5-star reviews that actually have written text.
      .filter((r: any) => r.rating === 5 && typeof r.text === 'string' && r.text.trim().length > 0)
      .map((r: any) => ({
        name: r.author_name ?? 'Google reviewer',
        when: r.relative_time_description ?? '',
        where: '',
        quote: r.text.trim(),
        rating: r.rating ?? 5,
      }))

    return {
      rating: data.result?.rating ?? null,
      userRatingsTotal: data.result?.user_ratings_total ?? null,
      reviews,
    }
  } catch {
    return empty
  }
}

// Rating-only convenience wrapper (used by the footer). Delegates to
// getGoogleReviews so both share the same cached fetch — no extra request.
export async function getGoogleRating(): Promise<GoogleRating> {
  const { rating, userRatingsTotal } = await getGoogleReviews()
  return { rating, userRatingsTotal }
}
