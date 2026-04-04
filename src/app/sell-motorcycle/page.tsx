import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Motorcycle | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your motorcycle fast with a 30-min quote, fair quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a smooth, stress-free sale.",
  keywords: "sell motorcycle, motorcycle buyers, sell my bike, cash for motorcycles, sell motorcycle fast, sports bike, cruiser, adventure bike",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-motorcycle',
  },
}

export default function SellMotorcyclePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Motorcycle
              <span className="block" style={{ color: '#000' }}>Sell Your Motorcycle for Cash Today</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Motorcycles offer freedom, convenience and pure riding enjoyment. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
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
                  <CarSellForm heading="Sell Your Motorcycle" subheading="Get Your Free Quote Now" />
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
                Sell Your Motorcycle the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your motorcycle, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/motorcycle-cutout.png"
                  alt="Sell your Motorcycle"
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

      {/* Intro Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">Motorcycles offer freedom, convenience and pure riding enjoyment—but when it&apos;s time to sell yours, the process shouldn&apos;t involve low offers, time-wasters or dealership pressure. Whether you ride a daily commuter bike, a weekend cruiser or a high-performance sports bike, Auto-Sell.aigives you a fast and reliable way to sell your motorcycle. You&apos;ll receive an offer within around 30 minutes and same-day OSKO payment once you accept.</p>
          <p className="text-lg text-gray-700 leading-relaxed">If you&apos;ve been thinking &#34;I need a simple and trusted way to sell my motorcycle,&#34; this is the easiest place to start.</p>
        </div>
      </section>

      {/* Popular Motorcycle Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy All Motorcycle Types
            </h2>
            <p className="text-xl text-gray-600">
              Australia&apos;s motorcycle market is broad, and we purchase all makes, models and conditions. Whether you own a learner-approved bike, adventure tourer, dirt bike or something high-powered, we&apos;ll give you a fair quote backed by real market data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Sports Bikes & Superbikes", description: "Honda CBR, Yamaha YZF, Kawasaki Ninja, Ducati" },
              { type: "Learner & Commuter Bikes", description: "CB125, CB500, Ninja 400, MT-07" },
              { type: "Cruiser Motorcycles", description: "Harley-Davidson, Suzuki Boulevard, Indian Chief" },
              { type: "Adventure & Touring", description: "BMW GS, Kawasaki Versys, Honda CB500X" },
              { type: "Dirt, Enduro & Motocross", description: "Honda CRF, Yamaha YZ, KTM, Suzuki RM-Z" },
              { type: "Scooters & Urban Bikes", description: "Vespa, Yamaha NMAX, Honda Activa, maxi-scooters" },
              { type: "High-Km & Older Motorcycles", description: "Any age, any kilometer reading welcome" },
              { type: "Non-Running Bikes", description: "Damaged, mechanical issues, mechanical issues" },
              { type: "Modified & Custom Bikes", description: "Custom paint, engine mods, accessories" }
            ].map((bikeType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{bikeType.type}</h3>
                <p className="text-gray-600">{bikeType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Fast and Stress-Free Selling Experience</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Selling a motorcycle privately can bring endless messages, time-wasting inspections and attempts to negotiate the price down. Dealership offers often fall well below true market value. Auto-Sell.airemoves all that friction and gives you a clean, straightforward experience.</p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your motorcycle&apos;s details using our quick online form. After reviewing the information, we send your quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you choose to proceed, we arrange an inspection at your home, workplace or another location that suits you. Once we confirm the bike&apos;s condition, we transfer payment instantly via OSKO. You receive your funds on the spot, and we handle the paperwork and organise collection the same day. No haggling. No pressure. No wasted time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair Motorcycle Pricing Backed by Real Market Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Motorcycles vary significantly in value depending on the engine, brand, kilometres, modification history, condition and market demand. Our quotes take all of this into account, ensuring a realistic, accurate offer.</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Your offer is based on:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Recent motorcycle sales</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Live market trends</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Brand and model desirability</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Kilometres and service history</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Mechanical and cosmetic condition</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Modifications and accessories</span></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">You receive a fair figure—not an automated number and not a quote that drops dramatically at inspection. If you already have another offer, we&apos;re happy to review it—our offers often beat like-for-like quotes.</p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Australia-Wide, We Come to You</h2>
          <p className="text-lg text-gray-700 leading-relaxed">Motorcycles aren&apos;t always convenient to transport, so our team comes to you anywhere in Australia. Whether the bike is at home, in storage, at your workplace or in a garage, inspection and pickup are handled in a single appointment.</p>
        </div>
      </section>

      {/* Why Choose Us for Motorcycles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Easy Way to Sell My Motorcycle
            </h2>
            <p className="text-xl text-gray-600">
              Motorcycle owners choose Auto-Sell.aibecause our process is fast, transparent and built around convenience. You stay in control, and every step is handled professionally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Live Motorcycle Market Data",
                description: "Recent sales and current market trends ensure accurate motorcycle offers."
              },
              {
                icon: "",
                title: "Fair Brand & Model Pricing",
                description: "Assessed on kilometers, service history, mechanical condition & desirability."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete."
              },
              {
                icon: "",
                title: "Australia-Wide Pickup",
                description: "We collect your motorcycle from anywhere in Australia—even non-running bikes."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit your motorcycle details and get a fair quote quickly."
              },
              {
                icon: "",
                title: "Paperwork Handled",
                description: "We manage registration transfers and all legal documentation for you."
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
            Sell Your Motorcycle for Cash Today
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your motorcycle—or want to find out its current market value—get started with a free, no-obligation quote.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your Motorcycle for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
