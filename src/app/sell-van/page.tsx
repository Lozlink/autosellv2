import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Van | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your van fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a smooth, stress-free sale.",
  keywords: "sell van, van buyers, sell my van, cash for vans, commercial van, sell van fast, cargo van",
}

export default function SellVanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Van
              <span className="block" style={{ color: '#000' }}>Get Your Van Valuation Now</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Vans are the backbone of countless Australian businesses. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
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
                  <CarSellForm heading="Sell Your Van" subheading="Get Your Free Quote Now" />
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
                Sell Your Van the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your van, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/van-cutout.png"
                  alt="Sell your Van"
                  width={600}
                  height={400}
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Popular Van Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Van Types We Buy
            </h2>
            <p className="text-xl text-gray-600">
              We buy all van models in any condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Compact & Mid-Size Vans", description: "Ford Transit Connect, Mercedes Vito, VW Caddy" },
              { type: "Cargo & Delivery Vans", description: "Ford Transit, Isuzu NPR, Hino 300, Fuso Canter" },
              { type: "Long-Wheelbase & High-Roof Vans", description: "Sprinter 519, Hiace, MaxiCab extended bodies" },
              { type: "Passenger & Shuttle Vans", description: "Multi-seat configurations for teams and groups" },
              { type: "Refrigerated Vans", description: "Cold storage, freezer bodies, temperature controlled" },
              { type: "Tradesman Setups with Shelving", description: "Racks, fit-outs, tool storage, custom racking" },
              { type: "High-Km & Mechanical Wear Vans", description: "Older models, higher kilometers, still valuable" },
              { type: "Unregistered Vans", description: "Damaged, non-running, mechanical issues" },
              { type: "Commercial Fleet Vans", description: "Branded, company logos, commercial fit-outs" }
            ].map((vanType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{vanType.type}</h3>
                <p className="text-gray-600">{vanType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Vans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AutoSell for Your Van?
            </h2>
            <p className="text-xl text-gray-600">
              We understand van values and commercial vehicle needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Verified Van Market Data",
                description: "Recent comparable van sales and live commercial buyer demand drive valuations."
              },
              {
                icon: "",
                title: "Fair Commercial Valuation",
                description: "Assessed on internal fit-outs, shelving, km, service, load capacity & upgrades."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete at your site."
              },
              {
                icon: "",
                title: "Business Premises & Job Site Pickup",
                description: "We collect from your business, warehouse, home, or job site—anywhere in Australia."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit van details online and get a fair valuation quickly without sales pressure."
              },
              {
                icon: "",
                title: "Paperwork Handled",
                description: "We manage registration transfers and all legal documentation for commercial vans."
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
              From van to payment in hours
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Submit Details',
                description: 'Tell us about your van via our quick online form.',
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
                description: 'Our team visits and inspects your van at your location.',
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
              What Affects Your Van Valuation
            </h2>
            <p className="text-xl text-gray-600">
              We assess vans on multiple factors for a fair commercial offer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Van & Commercial Factors",
                items: [
                  "Verified van market data & recent sales",
                  "Internal fit-outs, shelving and racking",
                  "Load capacity and cargo configuration",
                  "Kilometers and service history"
                ]
              },
              {
                title: "Equipment & Condition",
                items: [
                  "Commercial equipment and upgrades",
                  "Aftermarket modifications and add-ons",
                  "Mechanical condition and usability",
                  "Make, model, year and engine type"
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
            Ready to Sell Your Van?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Get a fair van valuation in ~30 minutes with same-day OSKO payment—Australia-wide.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Get Your Van Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
