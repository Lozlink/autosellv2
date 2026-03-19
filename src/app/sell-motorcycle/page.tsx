import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Motorcycle | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your motorcycle fast with a 30-min quote, fair valuation and same-day OSKO payment. Auto-Sell.ai offers Australia-wide pickup for a smooth, stress-free sale.",
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
              <span className="block" style={{ color: '#000' }}>Get Your Motorcycle Valuation Now</span>
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


      {/* Popular Motorcycle Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Motorcycle Types We Buy
            </h2>
            <p className="text-xl text-gray-600">
              We buy all motorcycle models in any condition
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

      {/* Why Choose Us for Motorcycles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your Motorcycle?
            </h2>
            <p className="text-xl text-gray-600">
              We understand motorcycle values and offer fair market prices for all types
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Live Motorcycle Market Data",
                description: "Recent sales and current market trends ensure accurate motorcycle valuations."
              },
              {
                icon: "",
                title: "Fair Brand & Model Valuation",
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
                description: "Submit your motorcycle details and get a fair valuation quickly."
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

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              From motorcycle to payment in hours
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Submit Details',
                description: 'Tell us about your motorcycle via our quick online form.',
                icon: ''
              },
              {
                step: '02',
                title: 'Get Quote',
                description: 'Receive a fair valuation within ~30 minutes—no obligation.',
                icon: ''
              },
              {
                step: '03',
                title: 'On-Site Inspection',
                description: 'Our team visits and inspects your motorcycle at your location.',
                icon: ''
              },
              {
                step: '04',
                title: 'Instant OSKO Payment',
                description: 'Accept offer and get paid same-day via OSKO bank transfer.',
                icon: ''
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="text-3xl font-bold mb-4" style={{ color: '#FFC325' }}>{step.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation Factors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Affects Your Motorcycle Valuation
            </h2>
            <p className="text-xl text-gray-600">
              We assess motorcycles on multiple factors for a fair offer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Motorcycle Specifics",
                items: [
                  "Recent comparable motorcycle sales",
                  "Brand & model desirability & demand",
                  "Make, model, year and engine size",
                  "Kilometers and service history"
                ]
              },
              {
                title: "Condition & Modifications",
                items: [
                  "Mechanical and cosmetic condition",
                  "Modifications and aftermarket accessories",
                  "Maintenance records and service history",
                  "Roadworthy certification status"
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span style={{ color: '#FFC325' }} className="text-lg mt-1"></span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Motorcycle?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Get a fair motorcycle valuation in ~30 minutes with same-day OSKO payment—Australia-wide.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Get Your Motorcycle Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
