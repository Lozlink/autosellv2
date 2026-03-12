import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Sell My Kia | Fast Quotes & Same-Day Payment Australia-Wide",
  description: "Sell your Kia fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a smooth, stress-free sale.",
}

export default function SellKiaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sell My Kia
              <span className="block" style={{ color: '#000' }}>Quick, Reliable & Fair</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Kia has become one of Australia&apos;s fastest-growing brands, known for reliability, long warranties and strong resale value.
            </p>
            <Link
              href="/#sell-form"
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Get Your Kia Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Whether you drive a Rio, Sportage, Cerato or one of Kia&apos;s newer hybrid or electric models, selling your Kia shouldn&apos;t require weeks of advertising or dealing with unreliable private buyers. AutoSell gives you a fast, fair and stress-free way to sell your Kia, with a quote typically provided within 30 minutes and same-day OSKO payment when you choose to move forward.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &quot;I want a quick and simple way to sell my Kia,&quot; our process makes it easy from start to finish.
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
              Kia offers a wide range of practical and popular vehicles—we purchase all of them
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AutoSell for Your Kia?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Kia details and receive a quote usually within 30 minutes."
              },
              {
                icon: "💰",
                title: "Fair Market Pricing",
                description: "Based on verified Kia sales data, live buyer demand, and current market trends."
              },
              {
                icon: "🚗",
                title: "All Models & Conditions",
                description: "We buy every Kia model regardless of age, condition or kilometres."
              },
              {
                icon: "⏱️",
                title: "Same-Day OSKO Payment",
                description: "Get paid instantly via OSKO transfer once inspection is complete."
              },
              {
                icon: "🏠",
                title: "Free Pickup Service",
                description: "We come to you anywhere in Australia. No need to arrange transport."
              },
              {
                icon: "✅",
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

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">A Fast and Hassle-Free Selling Experience</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Private selling often means multiple inspections, message back-and-forth, cancellations and negotiation fatigue. AutoSell removes all that and replaces it with a clean, streamlined service designed around convenience.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">1</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Submit Your Details</h3>
                <p className="mt-2 text-gray-700">Start by submitting your Kia&apos;s details through our quick valuation form.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">2</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Get Your Quote</h3>
                <p className="mt-2 text-gray-700">Once we receive your information, we review everything and send you a quote—usually within 30 minutes.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">3</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">On-Site Inspection</h3>
                <p className="mt-2 text-gray-700">We arrange an on-site inspection at your home, workplace or another location that suits you.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">4</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Instant Payment</h3>
                <p className="mt-2 text-gray-700">After confirming the condition, we transfer payment instantly via OSKO. You get your funds immediately.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">5</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Paperwork & Pickup</h3>
                <p className="mt-2 text-gray-700">We take care of the paperwork and vehicle pickup on the same day.</p>
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
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Verified Kia sales data</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Live buyer demand</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Condition, kilometres and ownership history</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Model variants and option packages</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Current market pricing trends</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <p className="text-gray-800">
              This gives you a fair and realistic offer—not an automated lowball figure or a quote that drops later. If you&apos;ve already received a valuation elsewhere, we&apos;re happy to review it—our offers regularly beat like-for-like quotes.
            </p>
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

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">🇦🇺</div>
              <h3 className="font-semibold text-gray-900 mb-2">Full Australia Coverage</h3>
              <p className="text-gray-600 text-sm">Anywhere in Australia—we service the whole country.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Single Appointment</h3>
              <p className="text-gray-600 text-sm">Inspection, payment and pickup in one visit.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Easiest Way</h3>
              <p className="text-gray-600 text-sm">No disruption to your routine.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Kia?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get a fair valuation in 30 minutes and same-day OSKO payment.
          </p>
          <Link
            href="/#sell-form"
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
