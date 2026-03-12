import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Sell My Truck | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your truck fast with a 30-min quote, fair valuation and same-day OSKO payment. AutoSell offers Australia-wide pickup for a smooth, stress-free sale.",
  keywords: "sell truck, truck buyers, sell my truck, truck car buyers, cash for trucks, sell truck fast, light truck, heavy truck, commercial truck",
}

export default function SellTrucksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sell My Truck
              <span className="block" style={{ color: '#000' }}>Get Your Truck Valuation Now</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Trucks are essential work assets—selling shouldn&apos;t slow your business. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
            </p>
            <Link
              href="/#sell-form"
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Get My Truck Quote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Truck Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Truck Types We Buy
            </h2>
            <p className="text-xl text-gray-600">
              We buy all truck models in any condition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Light Trucks", description: "Hilux, Ranger, Triton, BT-50, D-Max, LDV" },
              { type: "Medium & Heavy Rigid Trucks", description: "Isuzu, Hino, Fuso, Iveco, Volvo, Scania" },
              { type: "Commercial Delivery Trucks", description: "Box trucks, panel vans, enclosed bodies" },
              { type: "Tippers & Dump Trucks", description: "Tipper bodies, dump configurations" },
              { type: "Box & Refrigerated Trucks", description: "Cold storage units, freezer bodies" },
              { type: "Tray Trucks & Flatbeds", description: "Open trays, flatbed configurations" },
              { type: "Curtain-Siders & Custom Bodies", description: "Pantechs, specialist fit-outs" },
              { type: "Older & High-Km Trucks", description: "Any age, any kilometer reading" },
              { type: "Unregistered Trucks", description: "Damaged, non-running, mechanical issues" }
            ].map((truckType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{truckType.type}</h3>
                <p className="text-gray-600">{truckType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for Trucks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your Truck?
            </h2>
            <p className="text-xl text-gray-600">
              We understand truck values and offer competitive prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Verified Truck Market Data",
                description: "Live commercial buyer demand and recent comparable truck sales drive fair valuations."
              },
              {
                icon: "💰",
                title: "Commercial Fair Value",
                description: "Assessed on engine hours, maintenance, condition, usability & aftermarket equipment."
              },
              {
                icon: "⚡",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete at your location."
              },
              {
                icon: "🏢",
                title: "Depot, Worksite & Farm Pickup",
                description: "We collect from your depot, construction site, farm, workshop, or commercial yard."
              },
              {
                icon: "⏱️",
                title: "Quote in ~30 Minutes",
                description: "Submit truck details and get a fair valuation quickly—no sales pressure."
              },
              {
                icon: "✓",
                title: "All Paperwork Handled",
                description: "We manage title transfers and legal documentation so you can focus on business."
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
            Ready to Sell Your Truck?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Get a commercial truck valuation in ~30 minutes with same-day OSKO payment—Australia-wide.
          </p>
          <Link
            href="/#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Get Your Truck Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}

