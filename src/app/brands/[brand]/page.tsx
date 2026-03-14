import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

interface BrandPageProps {
  params: Promise<{ brand: string }>
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand } = await params
  const titleBrand = brand.charAt(0).toUpperCase() + brand.slice(1)
  return {
    title: `Sell Your ${titleBrand} - Auto-Sell.ai`,
    description: `We buy all ${titleBrand} models in any condition. Free quote in 30 minutes and same-day OSKO payment.`,
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params
  const titleBrand = brand.charAt(0).toUpperCase() + brand.slice(1)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Form (Toyota layout-inspired) */}
      <section className="text-gray-800 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell Your {titleBrand}
                <span className="block" style={{ color: '#FFC325' }}>Get Top Dollar Today</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                We buy all {titleBrand} models in any condition. Get your free quote in 30 minutes and same-day payment.
              </p>

              <div className="space-y-4 mb-8 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span style={{ color: '#FFC325' }}></span>
                  </div>
                  <span>All {titleBrand} models accepted</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span style={{ color: '#FFC325' }}></span>
                  </div>
                  <span>Any condition — running or not</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span style={{ color: '#FFC325' }}></span>
                  </div>
                  <span>Best price guarantee</span>
                </div>
              </div>
            </div>

            <div id="sell-form" className="order-1 lg:order-2">
              <Suspense fallback={<div className="rounded-2xl p-8 border bg-white/30 animate-pulse h-96" style={{ borderColor: '#FFC325' }}></div>}>
                <CarSellForm heading={`Sell Your ${titleBrand}`} subheading="Get Your Free Quote Now" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase with Car Cutout */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Australia&apos;s Trusted {titleBrand} Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether your {titleBrand} is brand new or has seen better days, we&apos;ll make you a fair offer. No haggling, no hidden fees — just a straightforward process from quote to payment.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl" style={{ color: '#FFC325' }}>✓</span>
                  <span className="text-gray-700">Free quote in 30 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl" style={{ color: '#FFC325' }}>✓</span>
                  <span className="text-gray-700">Same-day OSKO payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl" style={{ color: '#FFC325' }}>✓</span>
                  <span className="text-gray-700">We handle all paperwork</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <Image
                  src={`/images/cars/brands/${brand}-cutout.png`}
                  alt={`Sell your ${titleBrand}`}
                  width={600}
                  height={400}
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Models Section (dark theme) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Popular {titleBrand} Models We Buy
            </h2>
            <p className="text-lg text-gray-600">
              We buy all {titleBrand} vehicles regardless of age, condition, or mileage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { model: 'Popular Model A', year: '2015-2024', price: '$10,000-$50,000' },
              { model: 'Popular Model B', year: '2015-2024', price: '$10,000-$50,000' },
              { model: 'Popular Model C', year: '2015-2024', price: '$10,000-$50,000' },
              { model: 'Popular Model D', year: '2015-2024', price: '$10,000-$50,000' },
              { model: 'Popular Model E', year: '2015-2024', price: '$10,000-$50,000' },
              { model: 'Popular Model F', year: '2015-2024', price: '$10,000-$50,000' },
              { model: 'Popular Model G', year: '2015-2024', price: '$10,000-$50,000' },
              { model: 'Popular Model H', year: '2015-2024', price: '$10,000-$50,000' },
            ].map((vehicle) => (
              <div key={vehicle.model} className="text-center p-6 rounded-xl border bg-white/40 hover:bg-white/60 transition-all duration-300" style={{ borderColor: '#FFC325' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                  <span className="font-bold text-xl" style={{ color: '#FFC325' }}>{vehicle.model.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{vehicle.model}</h3>
                <p className="text-sm text-gray-600 mb-1">{vehicle.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Why Choose Auto-Sell.ai for Your {titleBrand}?
            </h2>
            <p className="text-lg text-gray-600">
              We understand {titleBrand} vehicles and offer the best prices in Australia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl border bg-white/40" style={{ borderColor: '#FFC325' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                <span className="text-2xl font-bold" style={{ color: '#FFC325' }}>$</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Prices</h3>
              <p className="text-gray-600">We use real-time market data to ensure you get the best price for your {titleBrand}.</p>
            </div>

            <div className="text-center p-6 rounded-xl border bg-white/40" style={{ borderColor: '#FFC325' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                <span className="text-2xl font-bold" style={{ color: '#FFC325' }}></span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Service</h3>
              <p className="text-gray-600">Get your quote in 30 minutes and receive payment the same day.</p>
            </div>

            <div className="text-center p-6 rounded-xl border bg-white/40" style={{ borderColor: '#FFC325' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                <span className="text-2xl font-bold" style={{ color: '#FFC325' }}></span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Any Condition</h3>
              <p className="text-gray-600">We buy {titleBrand}s in any condition — running, damaged, or not running.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Sell Your {titleBrand}?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get your free quote today and join thousands of satisfied owners who chose Auto-Sell.ai.
          </p>
          <a
            href="#sell-form"
            className="inline-block px-8 py-4 rounded-lg text-xl font-bold transition-colors"
            style={{ backgroundColor: '#FFC325', color: '#fff' }}
          >
            Get My {titleBrand} Quote Now
          </a>
        </div>
      </section>
    </div>
  )
}
