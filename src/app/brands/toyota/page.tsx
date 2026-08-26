import type { Metadata } from 'next'
import BrandPage from '../[brand]/page'

export const metadata: Metadata = {
  title: 'Sell Your Toyota - Auto-Sell.ai',
  description: 'We buy all Toyota models in any condition. Free quote within 24 hours and same-day OSKO payment.',
}

export default function ToyotaPage() {
  // Delegate to the dynamic brand page to keep a single layout for all brands
  // and avoid duplicate implementations.
  // This ensures /brands/toyota renders identically to /sell-toyota.
  // Note: The visible URL preferred is /sell-toyota via rewrites.
  // Keeping this wrapper prevents route precedence issues if someone visits /brands/toyota directly.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = BrandPage as any
  return <Component params={{ brand: 'toyota' }} />
}
