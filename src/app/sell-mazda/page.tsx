import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Mazda | Fast Quotes & Same-Day Payment Australia-Wide",
  description: "Sell your Mazda fast with a 30-min quote, fair valuation and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a quick, hassle-free sale.",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-mazda',
  },
}

export default function SellMazdaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Mazda
              <span className="block" style={{ color: '#000' }}>Simple & Fast Payment</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Mazda vehicles are some of the most popular and reliable cars on Australian roads, which means they hold value well and are always in demand.
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
                  <CarSellForm heading="Sell Your Mazda" subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
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
                Australia&apos;s Trusted Mazda Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Mazda vehicles are some of the most popular and reliable cars on Australian roads, which means they hold value well and are always in demand. Whether you&apos;re looking to sell your Mazda and want a simple, fair and fast way to do it, Auto-Sell.aigives you a hassle-free process from valuation to payment. Instead of weeks of messages, private inspections and uncertain offers, we give you a clear valuation, a quote in around 30 minutes, and same-day OSKO payment once you&apos;re ready to proceed.
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
                  src="/images/cars/brands/mazda-cutout.png"
                  alt="Sell your Mazda"
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


      {/* Intro Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Mazda vehicles are some of the most popular and reliable cars on Australian roads, which means they hold value well and are always in demand. If you&apos;re looking to sell your Mazda and want a simple, fair and fast way to do it, Auto-Sell.aigives you a hassle-free process from valuation to payment. Instead of weeks of messages, private inspections and uncertain offers, we give you a clear valuation, a quote in around 30 minutes, and same-day OSKO payment once you&apos;re ready to proceed.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you&apos;re upgrading, downsizing, or simply ready to part with your Mazda, we make sure the process is quick, transparent and convenient.
          </p>
        </div>
      </section>

      {/* Mazda Models We Buy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy Every Mazda Model
            </h2>
            <p className="text-xl text-gray-600">
              Mazda has a strong line-up&mdash;from small city hatchbacks to family SUVs and performance-driven models
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Mazda 3",
              "Mazda 2",
              "Mazda 6",
              "CX-3",
              "CX-5",
              "CX-8",
              "CX-9",
              "Mazda BT-50",
              "MX-5 & Sports Models"
            ].map((model, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{model}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              We also buy high-kilometre Mazdas, unregistered vehicles, accident-damaged cars, repairable write-offs and non-running vehicles. If it&apos;s a Mazda, we&apos;ll give you an offer.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Fast and Professional Selling Experience</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling a prestige vehicle privately can be time-consuming and often unpredictable. Auto-Sell.airemoves the hassle and gives you a streamlined, transparent process from start to finish.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your Mazda&apos;s details through our valuation form. Once received, our team reviews the information and sends you a quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you&apos;re happy to proceed, we arrange an on-site inspection at a time and place that suits you. After confirming the details, we transfer payment instantly via OSKO. You receive your funds immediately, and we take care of the paperwork and vehicle pickup. No dealership visits. No private buyer stress. No wasted time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fair Mazda Pricing Backed By Real Market Data</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            The Mazda range has strong resale patterns, but values can vary significantly depending on model and demand. The CX-5 often attracts strong interest, while models like the MX-5 or late-model Mazda 3 may require more specialised valuation. Our team uses verified sales data, real-time pricing tools and industry-trusted sources to determine your offer.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            No matter which Mazda you own, you&apos;ll receive a fair valuation based on today&apos;s real market data, live buyer demand, kilometres, condition and service history.
          </p>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
            <p className="text-lg text-gray-800 font-semibold mb-4">
              That means no automated guesswork and no inflated numbers that get reduced later. Just an honest, data-driven valuation that reflects what your Mazda is worth today.
            </p>
            <p className="text-gray-700">
              If you have another offer, share it with us—we commonly beat like-for-like quotes and we&apos;re upfront about how our pricing works.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Verified sales data and real-time pricing tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Industry-trusted sources for accurate valuation</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Model-specific demand analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">No automated guesswork—honest, data-driven offers</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Australia-Wide Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">We Come to You Across Australia</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling your Mazda shouldn&apos;t take weeks or require multiple appointments. Whether you&apos;re in a major city or a regional area, our team can come to you for inspection, payment and pickup. It&apos;s the fastest and most convenient way to sell your Mazda without stepping foot in a dealership.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Mazda owners choose Auto-Sell.aibecause our process is fast, fair and straightforward. You stay in control at every step and never deal with hidden fees or unclear pricing. It&apos;s the easiest way to sell your Mazda with confidence.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">🇦🇺</div>
              <h3 className="font-semibold text-gray-900 mb-2">Australia-Wide</h3>
              <p className="text-gray-600 text-sm">Major city or regional area—we service all of Australia.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Fastest Way</h3>
              <p className="text-gray-600 text-sm">Quick process without dealership visits.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Most Convenient</h3>
              <p className="text-gray-600 text-sm">Inspection, payment and pickup all in one visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.aifor Your Mazda?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Mazda details and receive a quote usually within 30 minutes."
              },
              {
                icon: "",
                title: "Fair Market Pricing",
                description: "Based on verified sales data, real-time pricing tools and industry-trusted sources."
              },
              {
                icon: "",
                title: "All Models Accepted",
                description: "We buy every Mazda model in any condition, including high-km and damaged vehicles."
              },
              {
                icon: "",
                title: "Same-Day OSKO Payment",
                description: "Get paid instantly via OSKO transfer once inspection is complete."
              },
              {
                icon: "",
                title: "Free Pickup Service",
                description: "We come to you anywhere in Australia. No need to drop your car off."
              },
              {
                icon: "",
                title: "No Hidden Fees",
                description: "What we quote is what you get paid. Complete transparency throughout."
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

      {/* The Trusted Way to Sell My Mazda */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Trusted Way to Sell My Mazda</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Mazda owners choose Auto-Sell.aibecause our process is fast, fair and straightforward. You stay in control at every step and never deal with hidden fees or unclear pricing. It&apos;s the easiest way to sell your Mazda with confidence.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;re ready to sell—or just want to know what your Mazda is worth—start with a free, no-obligation valuation.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get Your Mazda Valuation Now
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Sell your car the easy way.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Mazda Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
