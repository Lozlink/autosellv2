import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sell My Holden | Fast Quotes & Same-Day Payment Australia-Wide',
  description: 'Sell your Holden fast with a fair valuation, 30-min quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup and a hassle-free selling experience.',
  alternates: {
    canonical: 'https://auto-sell.ai/sell-holden',
  },
}

export default function SellHoldenPage() {
  const models = [
    'Commodore (all series)',
    'Colorado',
    'Astra',
    'Captiva',
    'Cruze',
    'Barina',
    'Trax',
    'Utes, wagons & performance models',
  ]

  const valuationFactors = [
    'Verified sales data',
    'Live buyer demand',
    'Trusted automotive sources',
    'Model, condition and demand',
    'Specialist valuation for performance models and limited editions',
  ]

  const whyChoose = [
    { icon: '', title: '30-min Quote', desc: 'Fair, data-driven quote usually within 30 minutes' },
    { icon: '', title: 'Same-Day Payment', desc: 'Instant OSKO transfer once inspection is complete' },
    { icon: '', title: 'All Holden Models', desc: 'From Commodore to Colorado, every model and condition' },
    { icon: '', title: 'Australia-Wide', desc: 'We come to you for inspection, payment and collection' },
    { icon: '', title: 'Any Condition', desc: 'High-km, unregistered, damaged, written-off or not running' },
    { icon: '', title: 'No Hidden Fees', desc: 'No unclear pricing or last-minute surprises' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell Your Holden
              <span className="block" style={{ color: '#000' }}>Quick & Fair Valuation</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Holden vehicles hold a special place in Australia, and even though the brand has finished up locally, demand for good-condition Holdens remains strong. At Auto-Sell, we make it easy to sell your Holden quickly and without the stress of private listings or drawn-out negotiations.
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
                  <CarSellForm heading="Sell Your Holden" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted Holden Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether your Holden is brand new or has seen better days, we&apos;ll make you a fair offer. No haggling, no hidden fees — just a straightforward process from quote to payment.
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
                  src="/images/cars/brands/holden-cutout.png"
                  alt="Sell your Holden"
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
            You get a fair valuation based on real market data, a quote in around 30 minutes, and same-day OSKO payment once you accept. We handle everything—from paperwork to pickup—so you can move on without the hassle.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been wondering &ldquo;what&apos;s the easiest way to sell my Holden?&rdquo;, our process is built for you.
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Buy Every Holden Model, Any Condition</h2>
            <p className="text-xl text-gray-600">Whether you own a late-model Commodore, a Colorado workhorse or a well-kept Astra, we&apos;ll give you a fair offer</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <p className="text-lg font-semibold text-gray-900">{model}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">
            We also buy Holdens that are high-km, unregistered, damaged, written-off (repairable) or not running. If it&apos;s a Holden, we&apos;ll make you an offer.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Simple Way to Sell Your Holden</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling privately can take weeks of messaging, organising inspections and dealing with tyre-kickers. Many Holden owners just want a straightforward sale with a respectable price and no runaround. Our process keeps everything simple and stress-free.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your Holden&apos;s details through our valuation form. Once received, our team reviews the information and sends you a quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you&apos;re happy to proceed, we arrange an on-site inspection at a time and place that suits you. After confirming the details, we transfer payment instantly via OSKO. You receive your funds immediately, and we take care of the paperwork and vehicle pickup. No dealership visits. No private buyer stress. No wasted time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair Prices Backed by Real Market Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Holden pricing varies widely depending on model, condition and demand, especially for popular nameplates like Commodore and Colorado. Performance models and limited editions often require specialist valuation, and we take all of this into account. Our team uses verified sales data, live buyer demand and trusted automotive sources to calculate your offer. That means no automated lowball figures and no pressure tactics—just a fair price for your Holden based on what it&apos;s truly worth today.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            If you&apos;ve received another quote, tell us. We regularly beat like-for-like offers, and we&apos;re transparent about how our valuation process works.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {valuationFactors.map((factor) => (
              <div key={factor} className="flex items-start">
                <span className="text-green-500 mr-3 font-bold"></span>
                <span className="text-gray-700">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">We Come to You Across Australia</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you&apos;re in a major city or a regional town, you don&apos;t need to travel or meet multiple buyers. We come to you for inspection, payment and collection. It&apos;s the easiest way to sell your Holden without losing time to dealership visits or private-sale appointments.
          </p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Trusted Way to Sell My Holden</h2>
            <p className="text-xl text-gray-600">Holden owners choose Auto-Sell.aibecause the process is quick, fair and handled professionally from start to finish. You stay in control the whole way and never deal with unclear pricing or last-minute surprises.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item) => (
              <div key={item.title} className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Sell Your Holden?</h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell—or just want to know what your Holden is worth—start with a fast, obligation-free valuation.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Holden Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
