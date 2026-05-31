// Server-side helper to fetch the live Google rating + review count for
// Auto-Sell.AI's Google Places listing. Cached for 30 minutes via Next's
// fetch cache so a single fetch is shared across all server renders.

export interface GoogleRating {
  rating: number | null
  userRatingsTotal: number | null
}

export async function getGoogleRating(): Promise<GoogleRating> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_ID

  if (!apiKey || !placeId) {
    return { rating: null, userRatingsTotal: null }
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.set('place_id', placeId)
    url.searchParams.set('fields', 'rating,user_ratings_total')
    url.searchParams.set('key', apiKey)

    const res = await fetch(url.toString(), { next: { revalidate: 1800 } })
    if (!res.ok) return { rating: null, userRatingsTotal: null }

    const data = await res.json()
    if (data.status !== 'OK') return { rating: null, userRatingsTotal: null }

    return {
      rating: data.result?.rating ?? null,
      userRatingsTotal: data.result?.user_ratings_total ?? null,
    }
  } catch {
    return { rating: null, userRatingsTotal: null }
  }
}
