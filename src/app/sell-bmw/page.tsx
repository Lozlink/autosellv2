import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sell My BMW | Fast Quotes & Same-Day Payment Australia-Wide',
  description: 'Sell your BMW quickly with a fair valuation, 30-min quote and same-day OSKO payment. Australia-wide pickup and a professional selling experience with AutoSell.',
}

export default function SellBmwPage() {
  const models = [
    '1 Series',
    '2 Series',
    '3 Series',
    '4 Series',
    '5 Series',
    '7 Series',
    'X1',
    'X3',
    'X5',
    'X7',
    'M Models',
    'i3',
    'i4',
    'iX',
    'Electric Models',
    'Hybrid Models',
  ]

  const valuationFactors = [
    'Model, trim and factory options',
    'Mileage and condition assessment',
    'Service history and maintenance records',
    'Current buyer demand',
    'Live market pricing data',
  ]

  const whyChoose = [
    { icon: '⚡', title: '30-min Quote', desc: 'Quick, professional valuation of your BMW' },
    { icon: '💰', title: 'Same-Day Payment', desc: 'OSKO transfer straight to your account' },
    { icon: '🚗', title: 'All BMW Models', desc: 'From 1 Series to X7, M and electric vehicles' },
    { icon: '🌏', title: 'Australia-Wide', desc: 'We arrange pickup anywhere across Australia' },
    { icon: '🔧', title: 'Any Condition', desc: 'High-km, unregistered, damaged, non-running' },
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
              Sell Your BMW
              <span className="block" style={{ color: '#000' }}>Fast & Fair Valuation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Get a quick, professional valuation and same-day OSKO payment for your BMW. Australia-wide pickup with zero hassle.
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
            BMW vehicles are celebrated for their exceptional performance, precise engineering and premium build quality. Whether you&apos;re selling a luxury sedan, versatile SUV, high-performance M model or innovative electric or hybrid BMW, AutoSell provides a professional selling experience. We specialise in valuing premium vehicles and offer competitive quotes based on current market data.
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Buy All BMW Models</h2>
            <p className="text-xl text-gray-600">From compact to luxury, performance to electric</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            Plus unregistered vehicles, high-mileage, accident-damaged, and non-running BMWs.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Selling Your BMW is Simple</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Tell us about your BMW—make, model, year, mileage and condition</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Value Your BMW</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Our valuations reflect the premium nature of BMW vehicles. We assess every detail to ensure you receive a competitive offer that reflects your BMW&apos;s true market value.
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
            Our service spans every state and territory across Australia. From Sydney to Perth, Melbourne to Brisbane and everywhere in between, AutoSell coordinates convenient pickup of your BMW. We manage the logistics so you can focus on what matters to you.
          </p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AutoSell</h2>
            <p className="text-xl text-gray-600">The smarter way to sell your BMW</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get Your BMW Valuation Now</h2>
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
