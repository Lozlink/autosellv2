import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My Van | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your van fast with a 30-min quote, fair quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a smooth, stress-free sale.",
  keywords: "sell van, van buyers, sell my van, cash for vans, commercial van, sell van fast, cargo van",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-van',
  },
}

export default function SellVanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Van
              <span className="block" style={{ color: '#000' }}>Sell Your Van for Cash Today</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Vans are the backbone of countless Australian businesses. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
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
                  <CarSellForm heading="Sell Your Van" subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Showcase with Car Cutout */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sell Your Van the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your van, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/van-cutout.png"
                  alt="Sell your Van"
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

      {/* Intro Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Vans are the backbone of countless Australian businesses—from trades and deliveries to catering, transport services and specialist commercial work. When you&apos;re ready to sell your van, you shouldn&apos;t have to deal with unreliable buyers, trade-in pressure or long wait times. Auto-Sell.aioffers a fast, fair and hassle-free way to sell your van, with a quote typically provided within 30 minutes and same-day OSKO payment once you accept.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &#34;I want a simple, reliable way to sell my van,&#34; this is the easiest way to get it done.
          </p>
        </div>
      </section>

      {/* Popular Van Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy All Van Types
            </h2>
            <p className="text-xl text-gray-600">
              Every van is different, and we buy them all. Whether it&apos;s a compact city van, a long-wheelbase transporter, a high-roof cargo model or a passenger van, we&apos;ll give you a fair, data-backed offer. We purchase vans used for business, personal use, trades, logistics and specialist commercial services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Compact & Mid-Size Vans", description: "Ford Transit Connect, Mercedes Vito, VW Caddy" },
              { type: "Cargo & Delivery Vans", description: "Ford Transit, Isuzu NPR, Hino 300, Fuso Canter" },
              { type: "Long-Wheelbase & High-Roof Vans", description: "Sprinter 519, Hiace, MaxiCab extended bodies" },
              { type: "Passenger & Shuttle Vans", description: "Multi-seat configurations for teams and groups" },
              { type: "Refrigerated Vans", description: "Cold storage, freezer bodies, temperature controlled" },
              { type: "Tradesman Setups with Shelving", description: "Racks, fit-outs, tool storage, custom racking" },
              { type: "High-Km & Mechanical Wear Vans", description: "Older models, higher kilometers, still valuable" },
              { type: "Unregistered Vans", description: "Damaged, non-running, mechanical issues" },
              { type: "Commercial Fleet Vans", description: "Branded, company logos, commercial fit-outs" }
            ].map((vanType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{vanType.type}</h3>
                <p className="text-gray-600">{vanType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Fast and Straightforward Selling Experience</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Selling a van privately can be slow—buyers want inspections, mechanical checks, test drives and negotiation after negotiation. Trade-ins can also undervalue commercial vehicles. Auto-Sell.airemoves all the friction and gives you a clean, simple experience.</p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your van&apos;s details through our online quote form. Once received, we review the information and send your quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you decide to move forward, we book an on-site inspection at your home, depot, workshop, job site or anywhere convenient for you. After confirming your van&apos;s condition, we transfer payment instantly via OSKO. Funds arrive straight away, and we handle all paperwork and vehicle pickup the same day. No delays. No sales pressure. No wasted time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair Van Pricing Based on Real Market Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Vans vary widely by size, capacity, configuration, mechanical history and commercial demand. Our quotes take into account all the factors that influence pricing, including:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Verified van market data</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Recent sales of similar models</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Internal fit-outs and shelving</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Kilometres and service history</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Load capacity and vehicle configuration</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Aftermarket upgrades and commercial equipment</span></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">You&apos;ll receive an accurate and transparent offer—not an automated estimate or a number that changes later. If you have another offer, we&apos;re happy to review it—our quotes often beat like-for-like offers.</p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Australia-Wide Service, We Come to You</h2>
          <p className="text-lg text-gray-700 leading-relaxed">Whether your van is located at a business premises, warehouse, home driveway or job site, our team comes to you anywhere in Australia. Inspection, payment and pickup all happen in one appointment, making it the most convenient way to sell your van.</p>
        </div>
      </section>

      {/* Why Choose Us for Vans */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Reliable Way to Sell My Van
            </h2>
            <p className="text-xl text-gray-600">
              Van owners choose Auto-Sell.aibecause our process is built for speed, transparency and convenience. You stay in control, and the entire sale is handled by experienced professionals who understand commercial vehicles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Verified Van Market Data",
                description: "Recent comparable van sales and live commercial buyer demand drive our offers."
              },
              {
                icon: "",
                title: "Fair Commercial Pricing",
                description: "Assessed on internal fit-outs, shelving, km, service, load capacity & upgrades."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once inspection is complete at your site."
              },
              {
                icon: "",
                title: "Business Premises & Job Site Pickup",
                description: "We collect from your business, warehouse, home, or job site—anywhere in Australia."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit van details online and get a fair quote quickly without sales pressure."
              },
              {
                icon: "",
                title: "Paperwork Handled",
                description: "We manage registration transfers and all legal documentation for commercial vans."
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
            Sell Your Van for Cash Today
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your van—or want to check its market value—start with a fast, obligation-free quote.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your Van for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
