import type { Metadata } from 'next'
import BrandPage from '../brands/[brand]/page'

export const metadata: Metadata = {
  title: 'Sell Your Subaru - Auto-Sell.ai',
  description: 'We buy all Subaru models in any condition. Free quote in 30 minutes and same-day OSKO payment.',
  alternates: {
    canonical: 'https://auto-sell.ai/sell-subaru',
  },
}

export default function SellSubaruPage() {
  // Delegate to the shared dynamic BrandPage template to avoid duplicate layouts
  // and keep styling consistent.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = BrandPage as any
  return <Component params={{ brand: 'subaru' }} />
}

