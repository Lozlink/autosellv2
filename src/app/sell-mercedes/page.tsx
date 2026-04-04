import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Sell My Mercedes | Fast Quotes & Same-Day Payment Australia-Wide',
  description: 'Sell your Mercedes fast with a fair quote, 30-min quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a smooth, professional sale.',
  alternates: {
    canonical: 'https://auto-sell.ai/sell-mercedes',
  },
}

export default function SellMercedesPage() {
  const models = [
    'A-Class, B-Class and CLA',
    'C-Class, E-Class and S-Class',
    'GLA, GLB, GLC, GLE and GLS',
    'G-Class and AMG models',
    'EQ electric and hybrid models',
  ]

  const valuationFactors = [
    'Model, trim and factory options',
    'Kilometres and overall condition',
    'Service history and ownership',
    'Market demand for your specific variant',
    'Comparable current listings and recent sales',
  ]

  const whyChoose = [
    { icon: '', title: '30-min Quote', desc: 'Fast, professional quote based on market data' },
    { icon: '', title: 'Same-Day Payment', desc: 'OSKO transfer straight to your account' },
    { icon: '', title: 'All Mercedes Models', desc: 'From compact cars to luxury SUVs and performance variants' },
    { icon: '', title: 'Australia-Wide', desc: 'We come to you for inspection, payment and collection' },
    { icon: '', title: 'Any Condition', desc: 'High-km, unregistered, damaged vehicles' },
    { icon: '', title: 'Professional Service', desc: 'Specialist appraisal respecting your vehicle&apos;s value' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell Your Mercedes
              <span className="block" style={{ color: '#000' }}>Fast & Fair Quote</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Get a quick, professional quote and same-day OSKO payment for your Mercedes. Australia-wide pickup with zero hassle.
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
                  <CarSellForm heading="Sell Your Mercedes" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted Mercedes Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Mercedes-Benz vehicles are known for refinement, engineering excellence and long-term value. When you&apos;re ready to move on from yours, you should receive a fair, transparent offer without the stress of private selling. Auto-Sell.aioffers a simple, fast and professional way to sell your Mercedes, with a quote sent in around 30 minutes and same-day OSKO payment once you accept.
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
                  src="/images/cars/brands/mercedes-cutout.png"
                  alt="Sell your Mercedes"
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
            Mercedes-Benz vehicles are known for refinement, engineering excellence and long-term value. When you&apos;re ready to move on from yours, you should receive a fair, transparent offer without the stress of private selling. Auto-Sell.aioffers a simple, fast and professional way to sell your Mercedes, with a quote sent in around 30 minutes and same-day OSKO payment once you accept. If you&apos;ve been thinking &ldquo;I want to sell my Mercedes quickly and easily,&rdquo; this is exactly what our process is built for.
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Buy All Mercedes-Benz Models</h2>
            <p className="text-xl text-gray-600">From compact sedans to luxury SUVs and high-performance AMG models</p>
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
            Prestige vehicles require specialist appraisal, and our quotes reflect real buyer demand, live pricing insights and the specific features that influence Mercedes resale value.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Streamlined Way to Sell Your Mercedes</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling a prestige vehicle privately often involves cautious buyers, lengthy inspections and uncertain negotiations. Auto-Sell.airemoves those hurdles by giving you a smooth, professional and convenient experience from start to finish.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your Mercedes&apos;s details through our online form. Once received, our team reviews the information and sends you a quote—usually within 30 minutes during business hours.</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair, Transparent Mercedes Pricing</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Mercedes pricing varies widely between body types, model years, trim levels and engine options. Performance AMG variants and luxury SUVs often require specialist pricing, while newer EQ electric models rely on fast-moving market data. Our team uses verified sales history, live pricing tools and trusted automotive sources to determine your offer.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Your quote considers the factors below, ensuring your offer is accurate and honest&mdash;not an automated number and not a figure that decreases during inspection. If you&apos;ve received another quote, let us know&mdash;we often beat like-for-like quotes and we&apos;re upfront about how we calculate pricing.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">We Come to You, Australia-Wide</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Selling a prestige vehicle should be convenient. Whether you&apos;re in a capital city or a regional area, we come to you for inspection, payment and vehicle collection. The entire process happens in one appointment, making it the easiest way to sell your Mercedes without disruption.
          </p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Professional Way to Sell My Mercedes</h2>
            <p className="text-xl text-gray-600">Mercedes owners choose Auto-Sell.aibecause our process is quick, reliable and respectful of your vehicle&apos;s value. You stay in control at every stage and enjoy a seamless, trustworthy experience.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sell Your Mercedes for Cash Today</h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell&mdash;or simply want to understand your Mercedes&apos; current market value&mdash;start with a free, no-obligation quote.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your Mercedes for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
