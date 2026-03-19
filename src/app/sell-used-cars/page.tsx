import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Car | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your car fast with a 30-min quote, fair valuation and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a smooth, stress-free sale.",
  keywords: "sell used car, used car buyers, sell my car, used vehicle buyers, cash for used cars, sell car fast",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-used-cars',
  },
}

export default function SellUsedCarsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Car
              <span className="block" style={{ color: '#000' }}>Get Your Car Valuation Now</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Selling your car shouldn&apos;t be a long or complicated process. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
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
                  <CarSellForm heading="Sell Your Used Car" subheading="Get Your Free Quote Now" />
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
                Sell Your Used Car the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your used car, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/used-cars-cutout.png"
                  alt="Sell your Used Car"
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
          <p className="text-lg text-gray-700 leading-relaxed mb-6">Selling your car shouldn&apos;t be a long or complicated process. Whether you&apos;re upgrading, downsizing or simply ready to move on, Auto-Sell.aimakes it easy to sell your car quickly and for a fair price. Instead of dealing with tyre-kickers, private messages, low trade-in offers or weeks of waiting around, you get a fast valuation, a quote in around 30 minutes and same-day OSKO payment once you accept.</p>
          <p className="text-lg text-gray-700 leading-relaxed">If you&apos;ve been thinking &#34;I want a simple and reliable way to sell my car,&#34; our process is designed to give you exactly that.</p>
        </div>
      </section>

      {/* Types of Used Cars We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy All Makes and Models
            </h2>
            <p className="text-xl text-gray-600">
              No matter what you drive, we&apos;ll give you an accurate valuation backed by real market data. From compact hatches and sedans to SUVs, utes and performance vehicles, we buy every type of car across Australia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Small Cars & City Runarounds", description: "Corolla, Civic, 308, Fiesta, Pug" },
              { type: "Family Sedans & Wagons", description: "Camry, Accord, Optima, Mondeo, Commodore" },
              { type: "SUVs & Crossovers", description: "CRV, RAV4, Outlander, Kluger, Territory" },
              { type: "Hybrid & Electric Vehicles", description: "Prius, Leaf, Ioniq, Niro, Tesla models" },
              { type: "Performance & Sports Models", description: "Mustang, Holden SS, WRX, Focus ST" },
              { type: "Older Cars with High Km", description: "Any age, any kilometer reading" },
              { type: "Damaged Cars", description: "Accident, hail or mechanical damage" },
              { type: "Unregistered Cars", description: "No current registration, no worries" },
              { type: "Non-Running Cars", description: "Won&apos;t start, mechanical issues, broken-down" }
            ].map((carType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{carType.type}</h3>
                <p className="text-gray-600">{carType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Fast and Hassle-Free Way to Sell Your Car</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Private selling can take weeks, and trade-in offers are often far below market value. Auto-Sell.airemoves the stress and gives you a clean, efficient way to sell your car with complete transparency.</p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your car&apos;s details through our quick online valuation form. Once we receive the information, our team reviews the details and sends you a quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you&apos;re happy to move forward, we arrange an on-site inspection at your home, workplace or anywhere convenient for you. After confirming the vehicle&apos;s condition, we transfer payment instantly via OSKO. You get paid on the spot, and we handle the paperwork and vehicle pickup the same day. No dealership appointments. No private inspections. No surprises.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair Car Valuation Backed by Real Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Your offer is calculated using trusted data sources, recent sales trends and live buyer demand. This ensures you receive an accurate and transparent valuation—not a generic automated estimate or a figure that changes at the last minute.</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Your valuation considers:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Make, model and year</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Kilometres and condition</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Service history</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Factory features and options</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Current market pricing and demand</span></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">If you&apos;ve already received another quote, let us know—we regularly beat like-for-like offers and we&apos;re open about how our pricing works.</p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Australia-Wide, We Come to You</h2>
          <p className="text-lg text-gray-700 leading-relaxed">Selling your car shouldn&apos;t interrupt your day. Whether you&apos;re based in a major metro area or a regional town, our team comes to you for inspection, payment and collection. Everything is handled in a single appointment, giving you the most convenient way to sell your car anywhere in Australia.</p>
        </div>
      </section>

      {/* Why Choose Us for Used Cars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Simple, Reliable Way to Sell My Car
            </h2>
            <p className="text-xl text-gray-600">
              People choose Auto-Sell.aibecause our service is fast, fair and completely transparent. You stay in control at every stage, and the entire process is designed to make selling your car easy and stress-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Current Market Pricing",
                description: "Valuations based on make, model, year, kilometers and service history."
              },
              {
                icon: "",
                title: "Fair Market Valuation",
                description: "Factory features, condition, market demand and current pricing all factor in."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete."
              },
              {
                icon: "",
                title: "Australia-Wide Pickup",
                description: "We collect your car from home, work or anywhere across Australia."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit your car details and get a fair valuation quickly and easily."
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
            Get Your Car Valuation Now
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your car—or simply want to know its current market value—start with a free, no-obligation valuation.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Car Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
