import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Toyota | Fast 30-Min Quotes & Same-Day Payment | Auto-Sell.ai",
  description: "Sell your Toyota fast with a 30-min quote, same-day OSKO payment and free pickup Australia-wide. Get a fair, transparent valuation with Auto-Sell.ai.",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-toyota',
  },
}

export default function SellToyotaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Toyota
              <span className="block" style={{ color: '#000' }}>Get Top Dollar Today</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Selling your Toyota should be quick, simple and fair. At Auto-Sell.ai, we make it easy to turn your Toyota into cash without the back-and-forth of private buyers or the lowball offers that come with trade-ins.
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
                  <CarSellForm heading="Sell Your Toyota" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted Toyota Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether your Toyota is brand new or has seen better days, we&apos;ll make you a fair offer. No haggling, no hidden fees — just a straightforward process from quote to payment.
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
                  src="/images/cars/brands/toyota-cutout.png"
                  alt="Sell your Toyota"
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
            Whether you&apos;re upgrading, clearing space or just ready to move on, we provide a fast, transparent way to sell your Toyota anywhere in Australia. Toyota holds its value well, but that doesn&apos;t mean you should wait weeks to get a decent offer.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our team looks at real market demand, recent Toyota sales, condition, service history and extras to give you a fair, data-backed valuation. You get a quote in around 30 minutes, and if you&apos;re happy, we come to you for pickup and same-day OSKO payment. No fees, no fuss, no pressure.
          </p>
        </div>
      </section>

      {/* Popular Toyota Models We Buy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A Fast Way to Sell Any Toyota Model
            </h2>
            <p className="text-xl text-gray-600">
              We buy every Toyota model, from reliable daily drivers to family SUVs, hybrids, commercial utes and even older vehicles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Corolla",
              "Camry",
              "RAV4",
              "Hilux",
              "LandCruiser & Prado",
              "Yaris & Yaris Cross",
              "Kluger",
              "HiAce",
              "CH-R, Fortuner & Granvia"
            ].map((model, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{model}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              We also buy Toyotas that are high-km, unregistered, damaged, written-off (repairable), or not running. If it&apos;s a Toyota, we&apos;ll give you an offer.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your Toyota?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Toyota details and receive a quote in around 30 minutes."
              },
              {
                icon: "",
                title: "Fair Market Pricing",
                description: "Based on current market conditions, live buyer demand, and recent comparable sales."
              },
              {
                icon: "",
                title: "All Models Accepted",
                description: "We buy every Toyota model in any condition, including high-km and damaged vehicles."
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
                description: "What we quote is what you get paid. Complete transparency from start to finish."
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

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">A Simple Process From Quote to Payment</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">1</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Send Your Details</h3>
                <p className="mt-2 text-gray-700">Submit your Toyota&apos;s details through our short free valuation form.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">2</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Get Your Quote in 30 Minutes</h3>
                <p className="mt-2 text-gray-700">We review the information and send your quote—usually inside 30 minutes.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">3</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">On-Site Inspection</h3>
                <p className="mt-2 text-gray-700">We organise an on-site inspection at your home or workplace. Everything happens in one visit.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">4</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Instant OSKO Payment</h3>
                <p className="mt-2 text-gray-700">Once everything checks out, we transfer payment instantly via OSKO and take care of the paperwork.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">5</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Free Pickup</h3>
                <p className="mt-2 text-gray-700">Pickup is arranged at a time that suits you. You stay in control the whole way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fair Pricing Based on Real Market Data</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Toyota vehicles are in strong demand, especially hybrids and popular models like Hilux, RAV4 and LandCruiser. Our valuations are based on current market conditions, live buyer demand, recent comparable sales and trusted data sources. The result is a fair, realistic offer that reflects what your Toyota is actually worth today—not an automated estimate or low trade-in figure.
          </p>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
            <p className="text-lg text-gray-800 font-semibold">
              If you&apos;ve received another offer, tell us. We regularly beat like-for-like quotes and we&apos;re upfront about how our pricing works. Transparency is what sets us apart.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Current market conditions and live buyer demand</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Recent comparable sales data</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Kilometres, condition and service history</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Trusted data sources and industry standards</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Australia-Wide Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">We Come to You Anywhere in Australia</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Whether you&apos;re in a major city or a regional area, our team can come to you. There&apos;s no need to drop your car off, organise transport or take time out of your day to meet multiple buyers. From inspection to payment to pickup, the entire process happens at your convenience. Long drives and dealership queues are a thing of the past.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">No Drop-Off Required</h3>
              <p className="text-gray-600 text-sm">We come directly to your location for inspection and pickup.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Convenience</h3>
              <p className="text-gray-600 text-sm">Schedule inspection and pickup at a time that works for you.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">🇦🇺</div>
              <h3 className="font-semibold text-gray-900 mb-2">Australia-Wide</h3>
              <p className="text-gray-600 text-sm">Regional or metro—we service the entire country.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Toyota?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get your fair valuation in 30 minutes and receive same-day OSKO payment.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Toyota Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
