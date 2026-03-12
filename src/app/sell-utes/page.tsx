import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Sell My Ute | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your ute fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a simple, stress-free sale.",
  keywords: "sell ute, ute buyers, sell my ute, ute car buyers, cash for utes, sell ute fast, work ute, dual cab ute",
}

export default function SellUtesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sell My Ute
              <span className="block" style={{ color: '#000' }}>Get Your Ute Valuation Now</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Australia&apos;s most sought-after vehicles for towing power, reliability & versatility. Get a fair quote in ~30 minutes with instant OSKO payment.
            </p>
            <Link
              href="/#sell-form"
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Get My Ute Quote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Ute Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Ute Types We Buy
            </h2>
            <p className="text-xl text-gray-600">
              We buy all ute models in any condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Dual-Cab 4x4 Utes", description: "From Hilux and Ranger to Navara, BT-50, Triton" },
              { type: "Work Utes & Trade Vehicles", description: "Amarok, Colorado, D-Max, LDV utes" },
              { type: "Heavy-Duty Towing Utes", description: "Maximum payload & towing capacity" },
              { type: "Diesel & Turbo-Diesel Models", description: "Fuel-efficient work horses" },
              { type: "Older Utes", description: "Any age welcome—classic to recent models" },
              { type: "High-Km Utes", description: "Still valuable regardless of kilometers" },
              { type: "Accident-Damaged Utes", description: "Non-running, major damage welcome" },
              { type: "Unregistered Utes", description: "Mechanical issues, parts value recognized" },
              { type: "Utes with Accessories", description: "Canopies, bullbars, toolboxes, tow kits included" }
            ].map((uteType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{uteType.type}</h3>
                <p className="text-gray-600">{uteType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Utes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your Ute?
            </h2>
            <p className="text-xl text-gray-600">
              We understand ute values and offer competitive prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Live Ute Market Data",
                description: "Real-time market trends and recent comparable sales—you get current value."
              },
              {
                icon: "💰",
                title: "Fair Ute Valuation",
                description: "Assessed on kilometers, mechanical condition, service history, accessories & demand."
              },
              {
                icon: "⚡",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete."
              },
              {
                icon: "🌍",
                title: "Australia-Wide Pickup",
                description: "From worksite to rural property to metro driveway—we collect anywhere."
              },
              {
                icon: "⏱️",
                title: "Quote in ~30 Minutes",
                description: "Submit ute details online and get a fair valuation without pressure."
              },
              {
                icon: "✓",
                title: "Paperwork Handled",
                description: "We manage registration transfers and all legal documentation for you."
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

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Ute?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Get a fair ute valuation in ~30 minutes with same-day OSKO payment across Australia.
          </p>
          <Link
            href="/#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Get Your Ute Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}

