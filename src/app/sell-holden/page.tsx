import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sell My Holden | Fast Quotes & Same-Day Payment Australia-Wide',
  description: 'Sell your Holden fast with a fair valuation, 30-min quote and same-day OSKO payment. AutoSell offers Australia-wide pickup and a hassle-free selling experience.',
}

export default function SellHoldenPage() {
  const models = [
    'Commodore',
    'Commodore VX',
    'Commodore VY',
    'Commodore VE',
    'Commodore VF',
    'Colorado',
    'Astra',
    'Captiva',
    'Cruze',
    'Barina',
    'Trax',
    'Utes',
    'Wagons',
    'Performance Models',
  ]

  const valuationFactors = [
    'Market demand and availability',
    'Recent Holden sales data',
    'Vehicle condition and mileage',
    'Service history',
    'Model and generation year',
  ]

  const whyChoose = [
    { icon: '⚡', title: '30-min Quote', desc: 'Fast valuation for your Holden' },
    { icon: '💰', title: 'Same-Day Payment', desc: 'OSKO transfer straight to your account' },
    { icon: '🚗', title: 'All Holden Models', desc: 'From Commodore to Barina, every generation' },
    { icon: '🌏', title: 'Australia-Wide', desc: 'We arrange pickup anywhere in Australia' },
    { icon: '🔧', title: 'Any Condition', desc: 'High-km, unregistered, damaged vehicles' },
    { icon: '📋', title: 'Hassle-Free', desc: 'We handle all paperwork and registration' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="text-gray-800 py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sell Your Holden
              <span className="block" style={{ color: '#000' }}>Quick & Fair Valuation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Get a quick, professional valuation and same-day OSKO payment for your Holden. Australia-wide pickup with zero hassle.
            </p>
            <Link
              href="/#sell-form"
              className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
              style={{ backgroundColor: '#FFC325', color: '#fff' }}
            >
              Get Your Valuation
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Holden vehicles hold a special place in Australian automotive history. Although the brand finished local manufacturing, strong demand for quality Holden vehicles remains throughout Australia. Whether you&apos;re selling an iconic Commodore, capable Colorado, practical Astra, or any other Holden model, AutoSell understands the market and offers fair valuations based on current buyer demand.
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Buy All Holden Models</h2>
            <p className="text-xl text-gray-600">Every generation and model from Holden&apos;s legacy</p>
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
            Plus unregistered vehicles, high-mileage, accident-damaged, and non-running Holdens.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Selling Your Holden is Simple</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Tell us about your Holden—make, model, year, mileage and condition</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">Receive a fair valuation based on market data and your vehicle&apos;s condition</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                3
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">On-Site Inspection</h3>
                <p className="text-gray-700">Our inspector verifies the vehicle&apos;s condition and finalises the offer</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                4
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Instant OSKO Payment</h3>
                <p className="text-gray-700">Get paid the same day via secure OSKO transfer</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                5
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Paperwork Handled</h3>
                <p className="text-gray-700">We manage all registration and documentation on your behalf</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Value Your Holden</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We value your Holden with expertise in the unique Australian market. We analyse current demand, review recent comparable sales, and assess your vehicle&apos;s condition to deliver a fair, competitive valuation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {valuationFactors.map((factor) => (
              <div key={factor} className="flex items-start">
                <span className="text-green-500 mr-3 font-bold">✓</span>
                <span className="text-gray-700">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Australia-Wide Convenience</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Selling your Holden is convenient across all of Australia. AutoSell arranges pickup from any location—city, suburb, regional town or remote area. Our Australia-wide network delivers professional, hassle-free service wherever you are.
          </p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AutoSell</h2>
            <p className="text-xl text-gray-600">The smarter way to sell your Holden</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get Your Holden Valuation Now</h2>
          <p className="text-xl mb-8 text-gray-700">
            It takes just a few minutes to submit your details and receive a quick quote.
          </p>
          <Link
            href="/#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#FFC325', color: '#fff' }}
          >
            Get Your Valuation
          </Link>
        </div>
      </section>
    </div>
  )
}
