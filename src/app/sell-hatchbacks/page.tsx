import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Hatchback - Auto-Sell.ai | Get Cash for Your Hatchback Car",
  description: "Sell your hatchback fast with Auto-Sell.ai. We buy all hatchback models including small, mid-size, and large hatchbacks. Get instant quotes and same-day payment.",
  keywords: "sell hatchback, hatchback buyers, sell my hatchback, hatchback car buyers, cash for hatchbacks, sell hatchback fast, small hatchback, large hatchback",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-hatchbacks',
  },
}

export default function SellHatchbacksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Hatchback
              <span className="block" style={{ color: '#000' }}>Get Cash for Your Hatchback Car</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              We buy all hatchback models including small, mid-size, and large hatchbacks.
              Get an instant quote and same-day payment for your hatchback.
            </p>

              <div className="space-y-4 mt-8 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                    <span style={{ color: '#FFC325' }}>&#10003;</span>
                  </div>
                  <span>30-minute quote turnaround</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                    <span style={{ color: '#FFC325' }}>&#10003;</span>
                  </div>
                  <span>Same-day OSKO payment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.3)' }}>
                    <span style={{ color: '#FFC325' }}>&#10003;</span>
                  </div>
                  <span>Free Australia-wide pickup</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="liquid-glass-form-container rounded-2xl shadow-xl">
                <Suspense fallback={<div className="rounded-2xl p-8 border bg-white/30 animate-pulse h-96" style={{ borderColor: '#FFC325' }}></div>}>
                  <CarSellForm heading="Sell Your Hatchback" subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Showcase with Car Cutout */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sell Your Hatchback the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your hatchback, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/hatchbacks-cutout.png"
                  alt="Sell your Hatchback"
                  width={600}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Popular Hatchback Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Hatchback Types We Buy
            </h2>
            <p className="text-xl text-gray-600">
              We buy all hatchback models in any condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Small Hatchbacks", description: "Yaris, Polo, Fiesta, Picanto, Mirage" },
              { type: "Mid-Size Hatchbacks", description: "Golf, i30, Mazda3, Corolla, Focus" },
              { type: "Large Hatchbacks", description: "Astra, Megane, Leon, Octavia" },
              { type: "Hot Hatches", description: "Golf GTI, Focus ST, i30N, Megane RS" },
              { type: "Luxury Hatchbacks", description: "A3, A-Class, 1 Series, A1" },
              { type: "Hybrid Hatchbacks", description: "Prius, Ioniq, Insight, Clarity" },
              { type: "Electric Hatchbacks", description: "Leaf, e-Golf, i3, Zoe" },
              { type: "Performance Hatches", description: "Civic Type R, WRX, RS3, M135i" },
              { type: "Wagons", description: "Golf Wagon, Octavia Wagon, Focus Wagon" }
            ].map((hatchType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{hatchType.type}</h3>
                <p className="text-gray-600">{hatchType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Hatchbacks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your Hatchback?
            </h2>
            <p className="text-xl text-gray-600">
              We understand hatchback values and offer competitive prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Competitive Hatchback Prices",
                description: "We know hatchback values and offer market-competitive prices for all models."
              },
              {
                icon: "",
                title: "Same-Day Payment",
                description: "Get paid instantly via OSKO transfer once we complete the inspection."
              },
              {
                icon: "",
                title: "All Hatchback Types Accepted",
                description: "From small to large hatchbacks, we buy every type in any condition."
              },
              {
                icon: "",
                title: "Hatchback Expertise",
                description: "Our team understands hatchback vehicles and their market values."
              },
              {
                icon: "",
                title: "No Hidden Fees",
                description: "What we quote is what you get paid. No deductions or hidden costs."
              },
              {
                icon: "",
                title: "Australia-Wide Service",
                description: "We come to you anywhere in Australia to inspect and buy your hatchback."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Hatchback?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Get your free hatchback quote in 30 minutes and receive same-day payment.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#FFC325', color: '#fff' }}
          >
            Get My Hatchback Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}

