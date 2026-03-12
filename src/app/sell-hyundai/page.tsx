import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Sell My Hyundai | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your Hyundai fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a smooth, stress-free sale.",
}

export default function SellHyundaiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sell My Hyundai
              <span className="block" style={{ color: '#000' }}>Quick, Fair & Stress-Free</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Hyundai has become one of Australia&apos;s most trusted and popular car brands. Selling yours shouldn&apos;t be a drawn-out process.
            </p>
            <Link
              href="/#sell-form"
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Get Your Hyundai Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            AutoSell gives you a fast and transparent way to sell your Hyundai, with a quote usually sent within 30 minutes and same-day OSKO payment as soon as you accept. Whether you drive an i30, Tucson, Santa Fe or one of Hyundai&apos;s growing hybrid and electric options, we make the process simple.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &quot;I want a simple, hassle-free way to sell my Hyundai,&quot; our process is built for exactly that.
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AutoSell for Your Hyundai?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Hyundai details and receive a quote typically within 30 minutes."
              },
              {
                icon: "💰",
                title: "Fair Market Pricing",
                description: "Based on verified Hyundai market data, live buyer demand, and recent sales."
              },
              {
                icon: "🚗",
                title: "All Models Accepted",
                description: "We buy every Hyundai model in any condition, including high-km and damaged vehicles."
              },
              {
                icon: "⏱️",
                title: "Same-Day OSKO Payment",
                description: "Get paid instantly via OSKO transfer once inspection is complete."
              },
              {
                icon: "🏠",
                title: "Free Pickup Service",
                description: "We come to you anywhere in Australia. No need to drop your car off."
              },
              {
                icon: "✅",
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

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">A Simple and Stress-Free Selling Experience</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling privately can become a slow and unpredictable process—photos, listings, messages, cancellations and negotiating with buyers. AutoSell removes all of that, giving you a clean, no-stress experience from start to finish.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">1</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Submit Your Details</h3>
                <p className="mt-2 text-gray-700">Start by submitting your Hyundai&apos;s details through our quick valuation form.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">2</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Get Your Quote</h3>
                <p className="mt-2 text-gray-700">Our team reviews everything and sends your quote—typically within 30 minutes during business hours.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">3</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">On-Site Inspection</h3>
                <p className="mt-2 text-gray-700">We schedule an on-site inspection at your home, workplace or another location that works for you.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">4</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Instant Payment</h3>
                <p className="mt-2 text-gray-700">After confirming the details, we transfer payment instantly via OSKO. You get your funds immediately.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">5</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Paperwork & Pickup</h3>
                <p className="mt-2 text-gray-700">We handle the paperwork and pickup on the same day. No dealership appointments or private sellers.</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your valuation is based on:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Verified Hyundai market data</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Live buyer demand</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Recent sales comparisons</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Kilometres, condition and service history</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Features, trim levels and model variants</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <p className="text-gray-800">
              This ensures an accurate and transparent offer—not an automated estimate or a figure that changes later. If you&apos;ve received another valuation, we&apos;re happy to review it—our offers often beat like-for-like quotes.
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
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-semibold text-gray-900 mb-2">One Appointment</h3>
              <p className="text-gray-600 text-sm">Inspection, payment and pickup all in a single visit.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Most Convenient Way</h3>
              <p className="text-gray-600 text-sm">No dealership visits needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Hyundai?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get a fair valuation in 30 minutes and same-day OSKO payment.
          </p>
          <Link
            href="/#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Hyundai Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
