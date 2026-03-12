import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Sell My Car | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your car fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a smooth, stress-free sale.",
  keywords: "sell used car, used car buyers, sell my car, used vehicle buyers, cash for used cars, sell car fast",
}

export default function SellUsedCarsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sell My Car
              <span className="block" style={{ color: '#000' }}>Get Your Car Valuation Now</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Selling your car shouldn&apos;t be a long or complicated process. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
            </p>
            <Link
              href="/#sell-form"
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Get My Used Car Quote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Types of Used Cars We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Used Cars We Buy
            </h2>
            <p className="text-xl text-gray-600">
              We buy all used cars regardless of age, condition, or mileage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Small Cars & City Runarounds", description: "Corolla, Civic, 308, Fiesta, Pug" },
              { type: "Family Sedans & Wagons", description: "Camry, Accord, Optima, Mondeo, Commodore" },
              { type: "SUVs & Crossovers", description: "CRV, RAV4, Outlander, Kluger, Territory" },
              { type: "Hybrid & Electric Vehicles", description: "Prius, Leaf, Ioniq, Niro, Tesla models" },
              { type: "Performance & Sports Models", description: "Mustang, Holden SS, WRX, Focus ST" },
              { type: "Older Cars with High Km", description: "Any age, any kilometer reading" },
              { type: "Damaged Cars", description: "Accident, hail or mechanical damage" },
              { type: "Unregistered Cars", description: "No current registration, no worries" },
              { type: "Non-Running Cars", description: "Won&apos;t start, mechanical issues, broken-down" }
            ].map((carType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{carType.type}</h3>
                <p className="text-gray-600">{carType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Used Cars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your Used Car?
            </h2>
            <p className="text-xl text-gray-600">
              We understand used car values and offer competitive prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Current Market Pricing",
                description: "Valuations based on make, model, year, kilometers and service history."
              },
              {
                icon: "💰",
                title: "Fair Market Valuation",
                description: "Factory features, condition, market demand and current pricing all factor in."
              },
              {
                icon: "⚡",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete."
              },
              {
                icon: "🌍",
                title: "Australia-Wide Pickup",
                description: "We collect your car from home, work or anywhere across Australia."
              },
              {
                icon: "⏱️",
                title: "Quote in ~30 Minutes",
                description: "Submit your car details and get a fair valuation quickly and easily."
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
            Ready to Sell Your Used Car?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Get a fair car valuation in ~30 minutes with same-day OSKO payment across Australia.
          </p>
          <Link
            href="/#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Get Your Car Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}

