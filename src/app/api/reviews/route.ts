import { NextResponse } from 'next/server'
/* eslint-disable */

// Fetch Google Reviews via Places Details API (legacy REST for broader availability)
// Required env vars: GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID
// Optionally set GOOGLE_PLACES_CACHE_SECONDS to control CDN caching.
export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_ID

  // If not configured, return graceful empty payload so UI can fall back.
  if (!apiKey || !placeId) {
    return NextResponse.json(
      { reviews: [], rating: null, userRatingsTotal: null, configured: false },
      { status: 200, headers: { 'Cache-Control': 'public, max-age=60' } }
    )
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.set('place_id', placeId)
    url.searchParams.set('fields', 'rating,user_ratings_total,reviews')
    url.searchParams.set('key', apiKey)

    const res = await fetch(url.toString(), { next: { revalidate: 60 } })
    const data = await res.json()

    if (data.status !== 'OK') {
      // Pass through non-sensitive error info
      return NextResponse.json(
        { reviews: [], rating: null, userRatingsTotal: null, configured: true, error: data.status },
        { status: 200, headers: { 'Cache-Control': 'public, max-age=60' } }
      )
    }

    const details = data.result || {}
    const mapped = (details.reviews || []).map((r: any, idx: number) => ({
      id: idx,
      name: r.author_name,
      location: r.relative_time_description,
      rating: r.rating,
      review: r.text,
      // YYYY-MM-DD so clients can safely parse with a fixed-time suffix.
      date: r.time
        ? new Date(r.time * 1000).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      profilePhotoUrl: r.profile_photo_url,
      verified: true,
      url: r.author_url,
    }))

    return NextResponse.json(
      {
        reviews: mapped,
        rating: details.rating ?? null,
        userRatingsTotal: details.user_ratings_total ?? null,
        configured: true,
      },
      {
        status: 200,
        headers: {
          // Allow edge/CDN caching
          'Cache-Control': `public, max-age=${process.env.GOOGLE_PLACES_CACHE_SECONDS || '300'}`,
        },
      }
    )
  } catch (e) {
    return NextResponse.json(
      { reviews: [], rating: null, userRatingsTotal: null, configured: true, error: 'FETCH_ERROR' },
      { status: 200, headers: { 'Cache-Control': 'public, max-age=60' } }
    )
  }
}
