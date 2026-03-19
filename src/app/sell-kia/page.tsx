import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Kia | Fast Quotes & Same-Day Payment Australia-Wide",
  description: "Sell your Kia fast with a 30-min quote, fair valuation and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a smooth, stress-free sale.",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-kia',
  },
}

export default function SellKiaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Kia
              <span className="block" style={{ color: '#000' }}>Quick, Reliable & Fair</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Kia has become one of Australia&apos;s fastest-growing brands, known for reliability, long warranties and strong resale value.
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
                  <CarSellForm heading="Sell Your Kia" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted Kia Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether your Kia is brand new or has seen better days, we&apos;ll make you a fair offer. No haggling, no hidden fees — just a straightforward process from quote to payment.
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
                  src="/images/cars/brands/kia-cutout.png"
                  alt="Sell your Kia"
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
            Kia has become one of Australia&apos;s fastest-growing brands, known for reliability, long warranties and strong resale value. Whether you drive a Rio, Sportage, Cerato or one of Kia&apos;s newer hybrid or electric models, selling your Kia shouldn&apos;t require weeks of advertising or dealing with unreliable private buyers. Auto-Sell.aigives you a fast, fair and stress-free way to sell your Kia, with a quote typically provided within 30 minutes and same-day OSKO payment when you choose to move forward.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &ldquo;I want a quick and simple way to sell my Kia,&rdquo; our process makes it easy from start to finish.
          </p>
        </div>
      </section>

      {/* Kia Models We Buy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy All Kia Models
            </h2>
            <p className="text-xl text-gray-600">
              Kia offers a wide range of practical and popular vehicles&mdash;we purchase all of them
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Kia Rio",
              "Kia Cerato",
              "Kia Sportage",
              "Kia Seltos",
              "Kia Sorento",
              "Kia Stinger",
              "Kia Carnival",
              "Kia Picanto",
              "Kia Niro & EV Models"
            ].map((model, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{model}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              We also purchase high-kilometre Kias, older vehicles and cars with accident damage or mechanical faults. If it&apos;s a Kia, we&apos;ll make you an offer.
            </p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mt-8 text-center">
            Kia offers a wide range of practical and popular vehicles, and we purchase all of them&mdash;regardless of age, condition or kilometres. Whether your Kia is in excellent condition, needs mechanical work, is unregistered or no longer running, you&apos;ll receive an accurate, data-backed valuation.
          </p>
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
                <p className="text-gray-700">Start by submitting your Kia&apos;s details through our valuation form. Once received, our team reviews the information and sends you a quote—usually within 30 minutes during business hours.</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fair Kia Valuation Based on Real Market Data</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Kia vehicles hold value exceptionally well, especially popular models like the Sportage, Cerato and Carnival. Electric and hybrid models such as the Niro require accurate, up-to-date pricing based on fast-changing market demand.
          </p>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your valuation considers:</h3>
            <p className="text-gray-700 mb-4">This gives you a fair and realistic offer&mdash;not an automated lowball figure or a quote that drops later. If you&apos;ve already received a valuation elsewhere, we&apos;re happy to review it&mdash;our offers regularly beat like-for-like quotes.</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Verified Kia sales data</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Live buyer demand</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Condition, kilometres and ownership history</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Model variants and option packages</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Current market pricing trends</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Australia-Wide Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">We Come to You Australia-Wide</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            No matter where you&apos;re located in Australia, we come to you for the inspection, payment and pickup. There&apos;s no need to travel, take time off work or arrange transport. Everything is handled in a single appointment, making it the easiest way to sell your Kia without disruption.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Whether in a regional town or major metro area, our team brings the entire process to you.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">🇦🇺</div>
              <h3 className="font-semibold text-gray-900 mb-2">Full Australia Coverage</h3>
              <p className="text-gray-600 text-sm">Anywhere in Australia—we service the whole country.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Single Appointment</h3>
              <p className="text-gray-600 text-sm">Inspection, payment and pickup in one visit.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Easiest Way</h3>
              <p className="text-gray-600 text-sm">No disruption to your routine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.aifor Your Kia?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Kia details and receive a quote usually within 30 minutes."
              },
              {
                icon: "",
                title: "Fair Market Pricing",
                description: "Based on verified Kia sales data, live buyer demand, and current market trends."
              },
              {
                icon: "",
                title: "All Models & Conditions",
                description: "We buy every Kia model regardless of age, condition or kilometres."
              },
              {
                icon: "",
                title: "Same-Day OSKO Payment",
                description: "Get paid instantly via OSKO transfer once inspection is complete."
              },
              {
                icon: "",
                title: "Free Pickup Service",
                description: "We come to you anywhere in Australia. No need to arrange transport."
              },
              {
                icon: "",
                title: "Transparent Process",
                description: "What we quote is what you get paid. No hidden fees or surprises."
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

      {/* The Easy and Reliable Way to Sell My Kia */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Easy and Reliable Way to Sell My Kia</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Kia owners choose Auto-Sell.aibecause our process is fast, fair and transparent. You stay in control throughout the sale, and the experience is simple, professional and stress-free.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;re ready to sell your Kia—or want to know its current market value—start with a fast, no-obligation valuation.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get Your Kia Valuation Now
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Sell your car the easy way.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            If you&apos;re ready to sell your Kia&mdash;or want to know its current market value&mdash;start with a fast, no-obligation valuation.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Kia Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
