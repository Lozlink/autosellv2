import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Sell My Volkswagen | Fast Quotes & Same-Day Payment Australia-Wide",
  description: "Sell your Volkswagen fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a simple, stress-free sale.",
}

export default function SellVolkswagenPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sell My Volkswagen
              <span className="block" style={{ color: '#000' }}>Reliable & Trusted Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Volkswagen vehicles are known for their solid engineering, German build quality and long-lasting reliability.
            </p>
            <Link
              href="/#sell-form"
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Get Your VW Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Whether you own a Polo, a Golf, a Passat or one of VW&apos;s popular SUV models, selling your Volkswagen shouldn&apos;t take weeks or involve constant back-and-forth with private buyers. AutoSell gives you a fast, simple and transparent way to sell your Volkswagen, with a quote delivered in around 30 minutes and same-day OSKO payment once you accept.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &quot;I want a stress-free way to sell my Volkswagen,&quot; you&apos;re in the right place.
          </p>
        </div>
      </section>

      {/* Volkswagen Models We Buy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy All Volkswagen Models
            </h2>
            <p className="text-xl text-gray-600">
              Volkswagen&apos;s range is wide and varied—we buy every model regardless of age or condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Volkswagen Polo",
              "Volkswagen Golf",
              "Volkswagen Tiguan",
              "Volkswagen Touareg",
              "Volkswagen Passat",
              "Volkswagen Amarok",
              "Transporter & Multivan",
              "Volkswagen Jetta & Arteon",
              "GTI & R Performance Variants"
            ].map((model, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{model}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              We also buy diesel models, performance variants, and older Volkswagens that still run reliably or need work. If it&apos;s a Volkswagen, we&apos;ll make you an offer.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AutoSell for Your Volkswagen?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Volkswagen details and receive a quote usually within 30 minutes."
              },
              {
                icon: "💰",
                title: "Fair Market Valuation",
                description: "Based on verified market data, recent sales, and specialist pricing for performance models."
              },
              {
                icon: "🚗",
                title: "All Models & Conditions",
                description: "We buy every Volkswagen model in any condition, including high-km and damaged vehicles."
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
                title: "Transparent & Honest",
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">A Smooth and Simple Selling Process</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling privately can drag on, especially with popular brands like Volkswagen—buyers often want multiple inspections, detailed condition checks and slow negotiations. AutoSell removes all of that, giving you a straightforward process that fits your schedule.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">1</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Submit Your Details</h3>
                <p className="mt-2 text-gray-700">Start by submitting your car&apos;s details through our short valuation form.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">2</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Get Your Quote</h3>
                <p className="mt-2 text-gray-700">After reviewing the information, we send you a quote—usually within 30 minutes.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">3</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">On-Site Inspection</h3>
                <p className="mt-2 text-gray-700">We organise an on-site inspection at a location and time that suits you.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">4</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Instant Payment</h3>
                <p className="mt-2 text-gray-700">Once everything is confirmed, we transfer payment instantly via OSKO. You get your funds straight away.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">5</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Paperwork & Pickup</h3>
                <p className="mt-2 text-gray-700">We take care of the paperwork and vehicle collection. No dealership pressure or delays.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fair Volkswagen Pricing Based on Real Market Data</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Volkswagen resale values vary across models. The Tiguan and Amarok often draw strong interest, while the Golf and Polo consistently maintain solid market demand. Performance variants like the Golf GTI and Golf R may require specialised valuation.
          </p>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your offer is based on:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Verified market data and recent Volkswagen sales</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Current buyer demand</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Condition, kilometres and service history</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Factory options and model-specific features</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 font-bold mr-4">✓</span>
                <span className="text-gray-700">Specialist pricing for performance variants</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <p className="text-gray-800">
              This ensures your valuation is accurate and transparent—not an automated estimate or an inflated number that drops later. If you&apos;ve already received a quote elsewhere, share it with us—we regularly beat like-for-like offers and we&apos;re upfront about how we price each vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Australia-Wide Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Australia-Wide Service</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Whether you&apos;re in a capital city or a regional area, we come to you for inspection, payment and pickup. There&apos;s no need to take time off work, travel to a dealership or arrange transport. Everything happens in one appointment, making it the easiest way to sell your Volkswagen anywhere in Australia.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">🇦🇺</div>
              <h3 className="font-semibold text-gray-900 mb-2">Full Coverage</h3>
              <p className="text-gray-600 text-sm">Capital city or regional—we service all of Australia.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-semibold text-gray-900 mb-2">One Appointment</h3>
              <p className="text-gray-600 text-sm">Inspection, payment and pickup in a single visit.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-900 mb-2">No Dealership Visits</h3>
              <p className="text-gray-600 text-sm">Easiest way to sell your Volkswagen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Volkswagen?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get a fair valuation in 30 minutes and same-day OSKO payment.
          </p>
          <Link
            href="/#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your VW Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
