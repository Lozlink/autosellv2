import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'
import { LocalBusinessJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: "Sell My Car Canberra - Auto-Sell.ai | Get Cash for Your Car in Canberra",
  description: "Sell your car fast in Canberra with Auto-Sell.ai. We buy all cars in Canberra and surrounding areas. Get instant quotes and same-day payment. Free pickup service.",
  keywords: "sell my car canberra, car buyers canberra, sell car canberra, cash for cars canberra, sell car fast canberra, canberra car buyers",
  alternates: {
    canonical: 'https://auto-sell.ai/sell-my-car-canberra',
  },
}

export default function SellMyCarCanberraPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LocalBusinessJsonLd city="Canberra" />
      <Header />
      
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell My Car Canberra
              <span className="block" style={{ color: '#000' }}>Get Cash for Your Car in Canberra</span>
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8" style={{ color: '#1f2937' }}>
              We buy all cars in Canberra and surrounding areas. Get an instant quote and same-day payment.
              Free pickup service across the ACT and surrounding regions.
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
                  <CarSellForm heading="Sell Your Car in Canberra" subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Showcase with Car Cutout */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sell Your Car in Canberra
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Canberra&apos;s top-rated car buying service. We come to you, handle all the paperwork, and pay you the same day. It&apos;s that simple.
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
                  <span className="text-gray-700">Free pickup across Canberra</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/cars/locations/canberra-cutout.png"
                  alt="Sell your car in Canberra"
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


      {/* Canberra Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Canberra Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              We service all of Canberra and surrounding areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { area: "Canberra CBD", description: "Civic, Parliamentary Triangle, City Centre" },
              { area: "North Canberra", description: "Braddon, Ainslie, Dickson, Lyneham" },
              { area: "South Canberra", description: "Kingston, Manuka, Griffith, Red Hill" },
              { area: "West Canberra", description: "Belconnen, Weston Creek, Molonglo Valley" },
              { area: "East Canberra", description: "Gungahlin, Majura, Mitchell, Fyshwick" },
              { area: "Inner South", description: "Narrabundah, Forrest, Deakin, Yarralumla" },
              { area: "Queanbeyan", description: "Queanbeyan, Jerrabomberra, Googong" },
              { area: "Yass Valley", description: "Yass, Bowning, Binalong, Gundaroo" },
              { area: "Snowy Mountains", description: "Cooma, Jindabyne, Thredbo, Perisher" }
            ].map((area, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.area}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us in Canberra */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Auto-Sell.ai in Canberra?
            </h2>
            <p className="text-xl text-gray-600">
              We understand Canberra&apos;s car market and offer competitive prices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Competitive Canberra Prices",
                description: "We know Canberra's car market and offer competitive prices for all vehicles."
              },
              {
                icon: "",
                title: "Same-Day Payment",
                description: "Get paid instantly via OSKO transfer once we complete the inspection."
              },
              {
                icon: "",
                title: "Free Canberra Pickup",
                description: "We come to you anywhere in Canberra and surrounding areas at no extra cost."
              },
              {
                icon: "",
                title: "Canberra Market Expertise",
                description: "Our team understands Canberra's unique car market and values."
              },
              {
                icon: "",
                title: "No Hidden Fees",
                description: "What we quote is what you get paid. No deductions or hidden costs."
              },
              {
                icon: "",
                title: "All Canberra Areas",
                description: "We service from the CBD to the Snowy Mountains and everywhere in between."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#000' }}>
            Ready to Sell Your Car in Canberra?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#1f2937' }}>
            Get your free Canberra car valuation in 30 minutes and receive same-day payment.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#FFC325', color: '#fff' }}
          >
            Get My Canberra Car Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}

