import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Ford | Fast Quotes & Same-Day Payment Australia-Wide | Auto-Sell.ai",
  description: "Sell your Ford fast with a 30-min quote, fair valuation and same-day OSKO payment. Auto-Sell.ai offers Australia-wide pickup and a simple, hassle-free process.",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-ford',
  },
}

export default function SellFordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Ford
              <span className="block" style={{ color: '#000' }}>Fast, Fair & Hassle-Free</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              If you&apos;re ready to sell your Ford and want a fast, fair and hassle-free experience, Auto-Sell.ai gives you a simple way to get it done.
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
                  <CarSellForm heading="Sell Your Ford" subheading="Get Your Free Quote Now" />
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
                Australia&apos;s Trusted Ford Buyers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Whether your Ford is brand new or has seen better days, we&apos;ll make you a fair offer. No haggling, no hidden fees — just a straightforward process from quote to payment.
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
                  src="/images/cars/brands/ford-cutout.png"
                  alt="Sell your Ford"
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
            We make it easy to move on from your Ford without the delays and uncertainty of private selling, trade-ins or marketplace negotiations. You get a real valuation backed by current market data, a quote in around 30 minutes, and same-day OSKO payment once you accept.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ford vehicles hold strong appeal in Australia—whether it&apos;s the practicality of a Ranger, the comfort of an Escape, or the timeless pull of a Mustang. That demand means your Ford shouldn&apos;t take weeks to sell. Our team looks at accurate live data, recent sales, condition, kilometres, upgrades and service history to give you a fair offer that reflects today&apos;s real market.
          </p>
        </div>
      </section>

      {/* Ford Models We Buy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy Every Ford Model
            </h2>
            <p className="text-xl text-gray-600">
              All Fords across all ages, conditions and body types
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Ranger",
              "Everest",
              "Mustang",
              "Focus",
              "Fiesta",
              "Escape",
              "Territory",
              "Puma",
              "Transit & Transit Custom"
            ].map((model, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{model}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              We also buy older Fords, fleet vehicles and commercial vans. Even if your Ford has high kilometres, is unregistered, needs repairs or no longer runs, you&apos;ll still receive a valuation.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai for Your Ford?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Fast 30-Minute Quotes",
                description: "Submit your Ford details and receive a fair quote in around 30 minutes."
              },
              {
                icon: "",
                title: "Real Market Valuation",
                description: "Based on real-time buyer demand, verified sales data and trusted industry sources."
              },
              {
                icon: "",
                title: "All Models & Conditions",
                description: "We buy every Ford model in any condition, from high-km to commercial vans."
              },
              {
                icon: "",
                title: "Same-Day OSKO Payment",
                description: "Get paid instantly via OSKO transfer once inspection is complete."
              },
              {
                icon: "",
                title: "Free Pickup Service",
                description: "We come to you anywhere in Australia. No need to arrange transport."
              },
              {
                icon: "",
                title: "Transparent & Upfront",
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Easy Process From Valuation to Pickup</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling privately can take weeks of messages, inspections, last-minute cancellations and low offers. Auto-Sell.ai replaces that with one smooth process.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">1</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Submit Your Details</h3>
                <p className="mt-2 text-gray-700">Send your Ford&apos;s details through our simple valuation form.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">2</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Quote</h3>
                <p className="mt-2 text-gray-700">We&apos;ll review everything and send your quote quickly—usually within 30 minutes during business hours.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">3</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">On-Site Inspection</h3>
                <p className="mt-2 text-gray-700">We book an on-site inspection at a place that suits you—home, workplace, or another location.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">4</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Instant Payment & Paperwork</h3>
                <p className="mt-2 text-gray-700">Once confirmed, payment is made instantly via OSKO, and we take care of all the paperwork.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-yellow-400 text-white font-bold">5</div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Free Vehicle Pickup</h3>
                <p className="mt-2 text-gray-700">You don&apos;t need to organise transport, prepare listings or negotiate with multiple buyers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fair Offers Backed by Real Data</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Our valuations are based on real-time buyer demand, verified sales data and trusted industry sources. Ford pricing can vary significantly across models—Ranger and Everest often attract strong demand, while performance models like Mustang require specialist pricing. We consider all of it so you get a fair, transparent offer without the guesswork.
          </p>

          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-8">
            <p className="text-lg text-gray-800 font-semibold">
              If you&apos;ve received another quote, let us know. We frequently beat like-for-like offers and we&apos;re upfront about how our figures are calculated. Straightforward, clear and honest—that&apos;s how we operate.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Real-time buyer demand and verified sales data</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Trusted industry sources and specialist pricing for performance models</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Transparent methodology we&apos;re happy to explain</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 font-bold mr-4"></span>
              <span className="text-gray-700">Frequently beat like-for-like quotes from other buyers</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Australia-Wide Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Australia-Wide Service</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            You don&apos;t have to travel to get a fair deal for your Ford. We come to you whether you&apos;re in a major metro area or a regional town. From inspection to payment to collection, everything happens at your convenience. It&apos;s the easiest way to sell your Ford without spending your weekends meeting strangers or visiting dealerships.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">We Come to You</h3>
              <p className="text-gray-600 text-sm">Metro or regional—we service all of Australia.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Your Schedule</h3>
              <p className="text-gray-600 text-sm">Book inspection and pickup at times that work for you.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="text-3xl mb-3"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Service</h3>
              <p className="text-gray-600 text-sm">No dealership queues, no private buyer delays, no uncertainty.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Sell Your Ford?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get a fair valuation in 30 minutes and same-day OSKO payment.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get Your Ford Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
