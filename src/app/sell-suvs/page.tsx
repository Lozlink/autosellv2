import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Sell My SUV | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your SUV fast with a 30-min quote, fair quote and same-day OSKO payment. Auto-Sell.aioffers Australia-wide pickup for a simple, stress-free sale.",
  keywords: "sell suv, suv buyers, sell my suv, suv car buyers, cash for suvs, sell suv fast, compact suv, large suv",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-suvs',
  },
}

export default function SellSUVsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My SUV
              <span className="block" style={{ color: '#000' }}>Sell Your SUV for Cash Today</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              SUVs are the most in-demand vehicles in Australia. Get a fair quote in ~30 minutes with instant OSKO payment and Australia-wide pickup.
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
                  <CarSellForm heading="Sell Your SUV" subheading="Get Your Free Quote Now" />
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
                Sell Your SUV the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your SUV, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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
                  src="/images/cars/types/suvs-cutout.png"
                  alt="Sell your SUV"
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
            SUVs are some of the most in-demand vehicles in Australia, offering space, comfort and versatility for families, commuters and adventurers alike. Whether you drive a compact city SUV, a hybrid crossover or a full-size 4WD, selling your SUV shouldn&apos;t take weeks or involve unreliable private buyers. Auto-Sell.aigives you a fast, fair and stress-free way to sell your SUV, with a quote usually delivered in around 30 minutes and same-day OSKO payment when you move forward.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;re thinking &#34;I need a simple and trusted way to sell my SUV,&#34; our process is built for exactly that.
          </p>
        </div>
      </section>

      {/* Popular SUV Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We Buy Every Type of SUV
            </h2>
            <p className="text-xl text-gray-600">
              Australia&apos;s SUV market is huge, and we buy all makes, models and sizes—from small runarounds to luxury SUVs and rugged off-roaders. Regardless of kilometres, age or condition, you&apos;ll receive a fair offer backed by real market pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { type: "Compact & City SUVs", description: "CX-5, RAV4, CR-V, Tiguan, Sportage" },
              { type: "Mid-Size Family SUVs", description: "Outback, Forester, Santa Fe, Territory" },
              { type: "Large SUVs & 7-Seaters", description: "LandCruiser, Prado, Kluger, Sorento" },
              { type: "Hybrid & Electric SUVs", description: "RAV4 Hybrid, Ioniq 5, Tesla Model Y" },
              { type: "AWD & 4x4 SUVs", description: "LandCruiser Prado, Patrol, Defender, Pajero" },
              { type: "Prestige & Performance SUVs", description: "BMW X5, Mercedes GLE, Porsche Cayenne" },
              { type: "Older SUVs", description: "High-km, unregistered, damaged vehicles welcome" },
              { type: "Damaged SUVs", description: "Accident-damaged, non-running SUVs" },
              { type: "Non-Running SUVs", description: "Mechanical issues, unregistered, parts value" }
            ].map((suvType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{suvType.type}</h3>
                <p className="text-gray-600">{suvType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Fast, Straightforward Way to Sell Your SUV</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Private selling can drag on—messages, inspections, test drives, cancellations and negotiation fatigue. Auto-Sell.aimakes the process quick, efficient and completely transparent.</p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your SUV&apos;s details through our short online form. Once received, our team reviews your information and sends you a quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you choose to move ahead, we arrange an on-site inspection at your home, workplace or another convenient location. After the inspection is completed, we transfer payment instantly via OSKO. You get paid on the spot, and we take care of all the paperwork and collect the vehicle the same day. No dealer appointments, no sales pressure and no unpredictable private-buyer interactions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair SUV Pricing Backed by Real Market Data</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">SUV pricing varies significantly across brands and segments. Popular family models, hybrids and late-model 7-seaters often attract strong demand, while off-road and towing-capable SUVs require specialised pricing.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Verified SUV market data</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Live buyer demand</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Comparable recent sales</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Kilometres and condition</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Service history and options</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Brand and model-specific trends</span></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">This ensures an accurate, transparent offer—not an automated estimate and not a figure that gets reduced later. If you&apos;ve already received another offer, we&apos;re happy to review it—our offers often beat like-for-like quotes.</p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">We Come to You Anywhere in Australia</h2>
          <p className="text-lg text-gray-700 leading-relaxed">Selling your SUV shouldn&apos;t disrupt your day. Whether you&apos;re in a metro area or a regional town, we come to you for the inspection, payment and pickup. Everything is completed in a single appointment, giving you the easiest and fastest way to sell your SUV.</p>
        </div>
      </section>

      {/* Why Choose Us for SUVs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Trusted Way to Sell My SUV
            </h2>
            <p className="text-xl text-gray-600">
              People choose Auto-Sell.aibecause we make selling straightforward, professional and stress-free. You stay in control of the entire process, and there are no hidden fees or last-minute surprises. Just a clean, fair sale handled by experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Verified Market Data",
                description: "We use live SUV market data and recent comparable sales for accurate offers."
              },
              {
                icon: "",
                title: "Fair Pricing",
                description: "Assessed on kilometers, condition, service history, factory features & current demand."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once we complete the on-site inspection."
              },
              {
                icon: "",
                title: "Australia-Wide Pickup",
                description: "We collect your SUV from home, work, or anywhere across Australia—no hassle."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit details online and receive a fair quote quickly—no pressure sales."
              },
              {
                icon: "",
                title: "Paperwork Handled",
                description: "We manage all registration transfers and legal documentation for you."
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
            Sell Your SUV for Cash Today
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your SUV—or want to find out what it&apos;s worth today—start with a free, no-obligation quote.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your SUV for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
