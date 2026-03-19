import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sell My Nissan | Fast Quotes & Same-Day Payment Australia-Wide',
  description: 'Sell your Nissan fast with a fair valuation, 30-min quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a smooth, hassle-free sale.',
  alternates: {
    canonical: 'https://auto-sell.ai/sell-nissan',
  },
}

export default function SellNissanPage() {
  const models = [
    'Nissan X-Trail',
    'Nissan Qashqai',
    'Nissan Navara',
    'Nissan Pathfinder',
    'Nissan Patrol',
    'Nissan Juke',
    'Nissan Micra',
    'Nissan Leaf and hybrid/electric models',
  ]

  const valuationFactors = [
    'Verified market data',
    'Recent Nissan sales',
    'Condition and kilometres',
    'Live buyer demand',
    'Service history and optional features',
  ]

  const whyChoose = [
    { icon: '', title: '30-min Quote', desc: 'Fast valuation based on verified data' },
    { icon: '', title: 'Same-Day Payment', desc: 'OSKO transfer straight to your account' },
    { icon: '', title: 'All Nissan Models', desc: 'SUVs, utes, sedans, vans and electric models' },
    { icon: '', title: 'Australia-Wide', desc: 'We come to you for inspection, payment and collection' },
    { icon: '', title: 'Any Condition', desc: 'High-km, unregistered, damaged vehicles' },
    { icon: '', title: 'No Surprises', desc: 'No hidden fees and no pressure to sell' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell Your Nissan
              <span className="block" style={{ color: '#000' }}>Quick & Fair Valuation</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Get a quick, professional valuation and same-day OSKO payment for your Nissan. Australia-wide pickup with zero hassle.
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
                  <CarSellForm heading="Sell Your Nissan" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted Nissan Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nissan vehicles are popular across Australia for their reliability, versatility and strong resale demand. Whether you drive a compact Micra, a family-focused X-Trail or a powerful Navara, selling your Nissan shouldn&apos;t involve weeks of advertising, negotiating or dealing with tyre-kickers. Auto-Sell.aigives you a fast and straightforward way to sell your Nissan at a fair market price, with a quote in around 30 minutes and same-day OSKO payment once you&apos;re ready to proceed.
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
                  src="/images/cars/brands/nissan-cutout.png"
                  alt="Sell your Nissan"
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
          <p className="text-lg text-gray-700 leading-relaxed">
            Nissan vehicles are popular across Australia for their reliability, versatility and strong resale demand. Whether you drive a compact Micra, a family-focused X-Trail or a powerful Navara, selling your Nissan shouldn&apos;t involve weeks of advertising, negotiating or dealing with tyre-kickers. Auto-Sell.aigives you a fast and straightforward way to sell your Nissan at a fair market price, with a quote in around 30 minutes and same-day OSKO payment once you&apos;re ready to proceed. If you&apos;ve been thinking &ldquo;I want to sell my Nissan quickly and without hassle,&rdquo; you&apos;re in the right place.
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Buy All Nissan Models</h2>
            <p className="text-xl text-gray-600">The Nissan range covers everything from small hatches and sedans to SUVs, 4x4s and work-ready utes. No matter which model you own&mdash;or what condition it&apos;s in&mdash;you&apos;ll receive a data-backed valuation that reflects today&apos;s real market demand.</p>
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
            We also buy high-kilometre vehicles, unregistered cars, accident-damaged vehicles, repairable write-offs and non-running Nissans. If it&apos;s a Nissan, we&apos;ll give you an offer.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Smooth and Simple Selling Process</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling privately can take weeks&mdash;photos, listings, messages, inspections, cancellations and negotiations. Auto-Sell.airemoves all of that and replaces it with a clean, streamlined process that works on your terms.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your Nissan&apos;s details through our valuation form. Once received, our team reviews the information and sends you a quote—usually within 30 minutes during business hours.</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair Pricing Based on Real Market Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Nissan prices vary significantly across the range. Models like the Navara and Patrol often attract strong demand, while popular SUVs like the X-Trail and Qashqai maintain consistent resale value. Electric and hybrid models like the Leaf also require specialised pricing.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Our valuation approach ensures you receive a fair, realistic offer&mdash;not an automated estimate or a number that drops during inspection. If you already have another quote, share it with us&mdash;we often beat like-for-like offers, and we&apos;re transparent about how our pricing works.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">We Come to You Anywhere in Australia</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you&apos;re in a major city or a regional area, you don&apos;t need to travel or book multiple buyer appointments. We come to you for inspection, payment and collection. The entire process happens in one visit, so selling your Nissan is simple, fast and stress-free.
          </p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Easy Way to Sell My Nissan</h2>
            <p className="text-xl text-gray-600">Nissan owners choose Auto-Sell.aibecause our service removes the uncertainty from selling a car. Our team handles everything professionally, keeps the process transparent and ensures you walk away with a fair deal and your payment instantly.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get Your Nissan Valuation Now</h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your Nissan&mdash;or want an accurate idea of its current value&mdash;start with a fast, no-obligation valuation.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Nissan Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
