import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sell My BMW | Fast Quotes & Same-Day Payment Australia-Wide | Auto-Sell',
  description: 'Sell your BMW quickly with a fair quote, 30-min quote and same-day OSKO payment. Australia-wide pickup and a professional selling experience with Auto-Sell.',
  alternates: {
    canonical: 'https://auto-sell.ai/sell-bmw',
  },
}

export default function SellBmwPage() {
  const models = [
    '1 Series',
    '2 Series',
    '3 Series',
    '4 Series',
    '5 Series',
    '7 Series',
    'X1',
    'X3',
    'X5',
    'X7',
    'M Models',
    'i3',
    'i4',
    'iX',
    'Electric Models',
    'Hybrid Models',
  ]

  const valuationFactors = [
    'Model, trim and factory options',
    'Kilometres and overall condition',
    'Service history',
    'Current buyer demand',
    'Live market pricing',
  ]

  const whyChoose = [
    { icon: '', title: '30-min Quote', desc: 'Quick, professional quote for your BMW' },
    { icon: '', title: 'Same-Day Payment', desc: 'OSKO transfer straight to your account' },
    { icon: '', title: 'All BMW Models', desc: 'From 1 Series to X7, M and electric vehicles' },
    { icon: '', title: 'Australia-Wide', desc: 'We arrange pickup anywhere across Australia' },
    { icon: '', title: 'Any Condition', desc: 'High-km, unregistered, damaged, non-running' },
    { icon: '', title: 'Hassle-Free', desc: 'We handle all paperwork and registration' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell Your BMW
              <span className="block" style={{ color: '#000' }}>Fast &amp; Fair Quote</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Get a quick, professional quote and same-day OSKO payment for your BMW. Australia-wide pickup with zero hassle.
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
                  <CarSellForm heading="Sell Your BMW" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted BMW Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether your BMW is brand new or has seen better days, we&apos;ll make you a fair offer. No haggling, no hidden fees — just a straightforward process from quote to payment.
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
                  src="/images/cars/brands/bmw-cutout.png"
                  alt="Sell your BMW"
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
            BMW vehicles are celebrated for their exceptional performance, precise engineering and premium build quality. Whether you&apos;re selling a luxury sedan, versatile SUV, high-performance M model or innovative electric or hybrid BMW, Auto-Sell.ai provides a professional selling experience. We specialise in pricing premium vehicles and offer competitive quotes based on current market data.
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Buy All BMW Models</h2>
            <p className="text-xl text-gray-600">BMW owners value precision and quality, and we treat each vehicle with the same level of respect. Whether you&apos;re selling a daily-driven 1 Series, a family-ready X5 or a performance-focused M model, we provide an accurate quote based on real market data and buyer demand.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            We also buy BMWs that are high-kilometre, unregistered, damaged or no longer running. If it&apos;s a BMW, we&apos;ll make you an offer.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Fast and Professional Selling Experience</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling a prestige vehicle privately can be time-consuming and often unpredictable. Buyers typically want multiple inspections, detailed condition checks and lengthy negotiation discussions. Auto-Sell.airemoves all of that by offering a smooth, straightforward process built around convenience and trust.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your BMW&apos;s details through our online form. Once received, our team reviews the information and sends you a quote—usually within 30 minutes during business hours.</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair BMW Pricing Driven by Real Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            BMW resale value varies significantly between models, trims and engine types. Performance models such as the M3, M4 and M5 require specialist pricing, and luxury SUVs like the X5 and X7 often carry strong demand. Our team uses verified market data, recent sales history and trusted automotive sources to determine your offer.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Your quote considers:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {valuationFactors.map((factor) => (
              <div key={factor} className="flex items-start">
                <span className="text-green-500 mr-3 font-bold">✓</span>
                <span className="text-gray-700">{factor}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">
            This ensures your quote is accurate and transparent—not an automated estimate or a figure that gets reduced later. If you&apos;ve received another quote, we can review it—our offers frequently beat like-for-like quotes.
          </p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">We Come to You Anywhere in Australia</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Selling a prestige vehicle shouldn&apos;t feel complicated. Whether you live in a major city or a regional area, our team comes to you for inspection, payment and pickup. Everything happens in one appointment, giving you a seamless and stress-free way to move on from your BMW.
          </p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Professional Way to Sell My BMW</h2>
            <p className="text-xl text-gray-600">BMW owners choose Auto-Sell.aibecause we offer a professional, convenient and transparent experience from start to finish. No pressure, no hidden fees, and no time wasted dealing with private buyers. Just a fair offer and a fast, reliable process.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sell Your BMW for Cash Today</h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your BMW—or want to understand its current market value—start with a free, no-obligation quote.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your BMW for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
