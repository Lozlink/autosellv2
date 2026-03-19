import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "How to Sell Your Car Fast - Auto-Sell.ai | Expert Tips & Guide",
  description: "Learn how to sell your car fast with our expert guide. Get tips on preparation, pricing, and choosing the best selling method for maximum speed and value.",
  alternates: {
    canonical: 'https://auto-sell.ai/how-to-sell-car-fast',
  },
}

export default function HowToSellCarFastPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Form */}
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                How to Sell Your Car Fast
                <span className="block" style={{ color: '#FFC325' }}>Expert Tips & Complete Guide</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-8">
                Want to sell your car quickly? Learn the best strategies, avoid common mistakes,
                and discover the fastest way to get cash for your vehicle.
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
                  <CarSellForm heading="Sell Your Car Fast" subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Auto-Sell.ai Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sell Your Car in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              No listings, no strangers, no waiting around. Here&apos;s how Auto-Sell.ai gets you paid fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Your Rego",
                description: "Pop your registration number into our form and we'll pull up your vehicle details instantly. No photos, no ads, no listing descriptions to write."
              },
              {
                step: "2",
                title: "Get Your Quote in 30 Minutes",
                description: "Our team uses real-time market data, recent sold prices and condition factors to give you a fair, competitive offer. No lowballing, no pressure."
              },
              {
                step: "3",
                title: "Get Paid Same Day",
                description: "Happy with the quote? We come to you for a quick inspection, handle all the paperwork, and pay you via OSKO on the spot. Done."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 rounded-xl border border-[#FFC325] bg-white hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#FFC325', color: '#fff' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Private Sales Are Slow */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Selling Privately Takes So Long
            </h2>
            <p className="text-xl text-gray-600">
              The &quot;traditional&quot; route sounds simple until you actually do it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">The Private Sale Reality</h3>
              <div className="space-y-4">
                {[
                  { problem: "Writing ads, taking photos, creating listings", time: "2-3 hours" },
                  { problem: "Fielding lowball offers and no-shows", time: "Days to weeks" },
                  { problem: "Strangers coming to your home for test drives", time: "Ongoing risk" },
                  { problem: "Negotiating back and forth on price", time: "Stressful" },
                  { problem: "Handling paperwork, transfer and rego", time: "Half a day" },
                  { problem: "Waiting for payment to clear", time: "1-3 business days" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
                    <span className="text-gray-600">{item.problem}</span>
                    <span className="text-red-500 font-medium text-sm whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2" style={{ borderColor: '#FFC325' }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">The Auto-Sell.ai Way</h3>
              <div className="space-y-4">
                {[
                  { step: "Enter your rego or car details", time: "2 minutes" },
                  { step: "Receive a fair, data-backed quote", time: "~30 minutes" },
                  { step: "We come to you for inspection", time: "At your convenience" },
                  { step: "We handle all the paperwork", time: "Included" },
                  { step: "Same-day OSKO payment to your account", time: "Instant" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
                    <span className="text-gray-600">{item.step}</span>
                    <span className="font-medium text-sm whitespace-nowrap" style={{ color: '#FFC325' }}>{item.time}</span>
                  </div>
                ))}
              </div>
              <Link
                href="#sell-form"
                className="block mt-6 text-center px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#FFC325', color: '#fff' }}
              >
                Get My Quote Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Buy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              We Buy Cars Others Won&apos;t
            </h2>
            <p className="text-xl text-gray-600">
              Don&apos;t waste time wondering if your car qualifies. It does.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "High Kilometre Cars", description: "200k+ on the clock? No problem. We value every vehicle based on real market demand." },
              { title: "Unregistered Vehicles", description: "Rego expired? We still buy it. No need to re-register just to sell." },
              { title: "Damaged or Written-Off", description: "Accident damage, hail damage, mechanical issues - we make offers on all conditions." },
              { title: "Old or Outdated Models", description: "That 2005 Commodore still has value. We buy cars of any age." },
              { title: "Fleet & Commercial", description: "Selling multiple vehicles or a work ute? We handle fleet disposals too." },
              { title: "Any Make & Model", description: "Toyota, Ford, BMW, Kia, Hyundai, Mercedes - every brand, every model." },
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-xl border border-[#FFC325] bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Australians Choose Auto-Sell.ai
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "30 min", label: "Average quote time" },
              { stat: "Same day", label: "Payment guaranteed" },
              { stat: "$0", label: "Fees or commissions" },
              { stat: "Australia-wide", label: "Free pickup service" },
            ].map((item, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2" style={{ color: '#FFC325' }}>{item.stat}</div>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Stop Wasting Time. Sell Your Car Today.
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            No ads to write. No strangers at your door. No weeks of waiting.
            Just a fair quote, fast payment, and zero hassle.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get My Fast Quote Now
          </Link>
          <p className="text-gray-700 text-sm mt-4">
            Same-day payment · We come to you · No fees or commissions
          </p>
        </div>
      </section>
    </div>
  )
}
