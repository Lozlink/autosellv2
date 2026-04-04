import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Hyundai | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your Hyundai fast with a 30-min quote, fair quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a smooth, stress-free sale.",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-hyundai',
  },
}

export default function SellHyundaiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Hyundai
              <span className="block" style={{ color: '#000' }}>Quick, Fair & Stress-Free</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Hyundai has become one of Australia&apos;s most trusted and popular car brands. Selling yours shouldn&apos;t be a drawn-out process.
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
                  <CarSellForm heading="Sell Your Hyundai" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted Hyundai Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether your Hyundai is brand new or has seen better days, we&apos;ll make you a fair offer. No haggling, no hidden fees — just a straightforward process from quote to payment.
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
                  src="/images/cars/brands/hyundai-cutout.png"
                  alt="Sell your Hyundai"
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
            Hyundai has become one of Australia&apos;s most trusted and popular car brands, known for value, reliability and technology. Whether you drive an i30, Tucson, Santa Fe or one of Hyundai&apos;s growing hybrid and electric options, selling your Hyundai shouldn&apos;t be a drawn-out process. Auto-Sell.aigives you a fast and transparent way to sell your Hyundai, with a quote usually sent within 30 minutes and same-day OSKO payment as soon as you accept.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &ldquo;I want a simple, hassle-free way to sell my Hyundai,&rdquo; our process is built for exactly that.
          </p>
        </div>
      </section>

      {/* Hyundai Models We Buy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy All Hyundai Models
            </h2>
            <p className="text-xl text-gray-600">
              Hyundai&apos;s range covers everything from small city cars to large SUVs, utes and EVs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Hyundai i30",
              "Hyundai i20 / Accent",
              "Hyundai Tucson",
              "Hyundai Kona",
              "Hyundai Santa Fe",
              "Hyundai Palisade",
              "Hyundai Elantra",
              "Hyundai iLoad & iMax",
              "Hyundai Ioniq & EV Models"
            ].map((model, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{model}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              We also buy older Hyundais, high-kilometre vehicles, unregistered cars, damaged vehicles and cars that no longer run. If it&apos;s a Hyundai, we&apos;ll make you an offer.
            </p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mt-8 text-center">
            No matter the model, age, kilometres or condition, we provide a fair offer backed by real market data.
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
                <p className="text-gray-700">Start by submitting your Hyundai&apos;s details through our online form. Once received, our team reviews the information and sends you a quote—usually within 30 minutes during business hours.</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fair Pricing Backed by Real Market Data</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Hyundai vehicles hold strong resale value across much of the range, especially popular models like the i30, Tucson and Santa Fe. Hybrid and electric models also require up-to-date pricing based on fast-changing demand.
          </p>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your quote is based on:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Verified Hyundai market data</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Live buyer demand</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Recent sales comparisons</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Kilometres, condition and service history</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4"></span>
                <span className="text-gray-700">Features, trim levels and model variants</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <p className="text-gray-800">
              This ensures an accurate and transparent offer—not an automated estimate or a figure that changes later. If you&apos;ve received another quote, we&apos;re happy to review it—our offers often beat like-for-like quotes.
            </p>
          </div>
        </div>
      </section>

      {/* Australia-Wide Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">We Come to You, Anywhere in Australia</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Whether you&apos;re in a regional town or a major metro area, our team comes to you for inspection, payment and collection. Everything happens in one appointment, giving you the most convenient way to sell your Hyundai without stepping foot in a dealership.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">🇦🇺</div>
              <h3 className="font-semibold text-gray-900 mb-2">Australia-Wide Coverage</h3>
              <p className="text-gray-600 text-sm">Regional or metro—we service all of Australia.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">One Appointment</h3>
              <p className="text-gray-600 text-sm">Inspection, payment and pickup all in a single visit.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Most Convenient Way</h3>
              <p className="text-gray-600 text-sm">No dealership visits needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.aifor Your Hyundai?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Hyundai details and receive a quote typically within 30 minutes."
              },
              {
                icon: "",
                title: "Fair Market Pricing",
                description: "Based on verified Hyundai market data, live buyer demand, and recent sales."
              },
              {
                icon: "",
                title: "All Models Accepted",
                description: "We buy every Hyundai model in any condition, including high-km and damaged vehicles."
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

      {/* The Easy Way to Sell My Hyundai */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Easy Way to Sell My Hyundai</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Hyundai owners choose Auto-Sell.aibecause the process is quick, fair and completely transparent. You stay in control throughout, and there are no hidden fees or last-minute surprises. Just a clean, fast sale handled by professionals.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;re ready to sell your Hyundai—or want to know what it&apos;s worth today—start with a free, no-obligation quote.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sell Your Hyundai for Cash Today
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Sell your car the easy way.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your Hyundai for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
