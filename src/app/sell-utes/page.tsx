import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Ute | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your ute fast with a 30-min quote, fair quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a simple, stress-free sale.",
  keywords: "sell ute, ute buyers, sell my ute, ute car buyers, cash for utes, sell ute fast, work ute, dual cab ute",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-utes',
  },
}

export default function SellUtesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Ute
              <span className="block" style={{ color: '#000' }}>Sell Your Ute for Cash Today</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Australia&apos;s most sought-after vehicles for towing power, reliability & versatility. Get a fair quote in ~30 minutes with instant OSKO payment.
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
                  <CarSellForm heading="Sell Your Ute" subheading="Get Your Free Quote Now" />
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
                Sell Your Ute the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your ute, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/utes-cutout.png"
                  alt="Sell your Ute"
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
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Utes are some of the most sought-after vehicles in Australia, prized for their towing power, reliability and versatility—whether for work, family or weekend adventures. When you&apos;re ready to sell your ute, the process shouldn&apos;t involve time-wasters, lowball offers or weeks of back-and-forth. Auto-Sell.aigives you a fast and transparent way to sell your ute, with a quote typically delivered within 30 minutes and same-day OSKO payment once you accept.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &#34;I need a quick, fair and simple way to sell my ute,&#34; our process is built to make it easy.
          </p>
        </div>
      </section>

      {/* Popular Ute Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy All Ute Makes and Models
            </h2>
            <p className="text-xl text-gray-600">
              Utes hold their value exceptionally well, and we buy every type—diesel, petrol, 4x2, 4x4, single cab, dual cab and everything in between. No matter the condition, kilometres or age, you&apos;ll receive a fair, data-backed offer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Dual-Cab 4x4 Utes", description: "From Hilux and Ranger to Navara, BT-50, Triton" },
              { type: "Work Utes & Trade Vehicles", description: "Amarok, Colorado, D-Max, LDV utes" },
              { type: "Heavy-Duty Towing Utes", description: "Maximum payload & towing capacity" },
              { type: "Diesel & Turbo-Diesel Models", description: "Fuel-efficient work horses" },
              { type: "Older Utes", description: "Any age welcome—classic to recent models" },
              { type: "High-Km Utes", description: "Still valuable regardless of kilometers" },
              { type: "Accident-Damaged Utes", description: "Non-running, major damage welcome" },
              { type: "Unregistered Utes", description: "Mechanical issues, parts value recognized" },
              { type: "Utes with Accessories", description: "Canopies, bullbars, toolboxes, tow kits included" }
            ].map((uteType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{uteType.type}</h3>
                <p className="text-gray-600">{uteType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Fast and Hassle-Free Selling Experience</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Selling privately can bring endless messages, missed appointments and unrealistic offers. Dealerships may undervalue work vehicles or apply trade-in pressure. Auto-Sell.airemoves the stress by giving you a professional, straightforward process from start to finish.</p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your ute&apos;s details through our quick online form. Once received, we review everything and send your quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you choose to proceed, we organise an on-site inspection at your home, job site, workplace or any location that suits you. After confirming the condition, we transfer payment instantly via OSKO. You get your money immediately, and we take care of the paperwork and collection on the same day. No trade-in pressure. No private-buyer hassles. No waiting around.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair Ute Pricing Backed by Real Market Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Utes require specific expertise to value correctly—towing capacity, tray setup, accessories, suspension upgrades and service history can influence pricing significantly. Our offers are based on:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Live ute market data</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Recent sales of comparable models</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Kilometres and mechanical condition</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Service history and ownership</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Accessories like canopies, bullbars, toolboxes and tow kits</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Brand- and model-specific demand trends</span></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">You get a fair, accurate figure—not an automated estimate or a quote that&apos;s reduced later. If you have another offer, we&apos;re happy to review it—our offers often beat like-for-like quotes.</p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Australia-Wide Service, We Come to You</h2>
          <p className="text-lg text-gray-700 leading-relaxed">Whether your ute is based on a worksite, rural property, metro driveway or commercial yard, our team comes to you for inspection, payment and pickup. Everything is handled in a single appointment, making it the simplest way to sell your ute anywhere in Australia.</p>
        </div>
      </section>

      {/* Why Choose Us for Utes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Trusted and Easy Way to Sell My Ute
            </h2>
            <p className="text-xl text-gray-600">
              Ute owners choose Auto-Sell.aibecause we understand the value of work vehicles and treat the process with speed, clarity and professionalism. You stay in control throughout, and there are no hidden fees or surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Live Ute Market Data",
                description: "Real-time market trends and recent comparable sales—you get current value."
              },
              {
                icon: "",
                title: "Fair Ute Pricing",
                description: "Assessed on kilometers, mechanical condition, service history, accessories & demand."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete."
              },
              {
                icon: "",
                title: "Australia-Wide Pickup",
                description: "From worksite to rural property to metro driveway—we collect anywhere."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit ute details online and get a fair quote without pressure."
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
            Sell Your Ute for Cash Today
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your ute—or want to check its current market value—start with a fast, obligation-free quote.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your Ute for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
