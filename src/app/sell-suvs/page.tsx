import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My SUV | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your SUV fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a simple, stress-free sale.",
  keywords: "sell suv, suv buyers, sell my suv, suv car buyers, cash for suvs, sell suv fast, compact suv, large suv",
}

export default function SellSUVsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My SUV
              <span className="block" style={{ color: '#000' }}>Get Your SUV Valuation Now</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              SUVs are the most in-demand vehicles in Australia. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
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
                  <CarSellForm heading="Sell Your SUV" subheading="Get Your Free Quote Now" />
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
                Sell Your SUV the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your suv, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/suvs-cutout.png"
                  alt="Sell your SUV"
                  width={600}
                  height={400}
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Popular SUV Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular SUV Types We Buy
            </h2>
            <p className="text-xl text-gray-600">
              We buy all SUV models in any condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Compact & City SUVs", description: "CX-5, RAV4, CR-V, Tiguan, Sportage" },
              { type: "Mid-Size Family SUVs", description: "Outback, Forester, Santa Fe, Territory" },
              { type: "Large SUVs & 7-Seaters", description: "LandCruiser, Prado, Kluger, Sorento" },
              { type: "Hybrid & Electric SUVs", description: "RAV4 Hybrid, Ioniq 5, Tesla Model Y" },
              { type: "AWD & 4x4 SUVs", description: "LandCruiser Prado, Patrol, Defender, Pajero" },
              { type: "Prestige & Performance SUVs", description: "BMW X5, Mercedes GLE, Porsche Cayenne" },
              { type: "Older SUVs", description: "High-km, unregistered, damaged vehicles welcome" },
              { type: "Damaged SUVs", description: "Accident-damaged, non-running SUVs" },
              { type: "Non-Running SUVs", description: "Mechanical issues, unregistered, parts value" }
            ].map((suvType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{suvType.type}</h3>
                <p className="text-gray-600">{suvType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for SUVs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your SUV?
            </h2>
            <p className="text-xl text-gray-600">
              We understand SUV values and offer competitive prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Verified Market Data",
                description: "We use live SUV market data and recent comparable sales for accurate valuations."
              },
              {
                icon: "",
                title: "Fair Valuation",
                description: "Assessed on kilometers, condition, service history, factory features & current demand."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once we complete the on-site inspection."
              },
              {
                icon: "",
                title: "Australia-Wide Pickup",
                description: "We collect your SUV from home, work, or anywhere across Australia—no hassle."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit details online and receive a fair valuation quickly—no pressure sales."
              },
              {
                icon: "",
                title: "Paperwork Handled",
                description: "We manage all registration transfers and legal documentation for you."
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
            Ready to Sell Your SUV?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Get a fair SUV valuation in ~30 minutes with same-day OSKO payment across Australia.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Get Your SUV Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}

