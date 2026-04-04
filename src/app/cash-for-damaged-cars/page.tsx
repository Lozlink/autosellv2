import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'


export const metadata: Metadata = {
  title: "Sell Damaged Car | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your damaged car fast with a 30-min quote, fair offer and same-day OSKO payment. Auto-Sell buys accident-damaged, hail-damaged and non-running cars Australia-wide.",
  alternates: {
    canonical: 'https://auto-sell.ai/cash-for-damaged-cars',
  },
}

export default function CashForDamagedCarsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Sell Damaged Car
                <span className="block" style={{ color: '#FFC325' }}>Get Your Offer Now</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
                A damaged car can be stressful to deal with—especially when repairs cost more than the vehicle is worth or you simply don&apos;t want the hassle of fixing it. Whether your car has accident damage, mechanical faults, hail damage or is no longer drivable, Auto-Sell gives you a fast and straightforward way to sell your damaged car.
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
                  <CarSellForm heading="Sell Your Damaged Car" subheading="Get Your Free Quote Now" />
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
                We Buy Damaged Cars of All Types
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Damage doesn&apos;t stop us from making an offer. We buy cars in all conditions—from lightly damaged vehicles to non-running write-offs. Whether the car has been in a collision, suffered mechanical failure or shows signs of wear and tear, we provide a fair offer based on real market data.
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
                  src="/images/cars/types/damaged-cutout.png"
                  alt="Sell your Damaged Car"
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
            A damaged car can be stressful to deal with—especially when repairs cost more than the vehicle is worth or you simply don&apos;t want the hassle of fixing it. Whether your car has accident damage, mechanical faults, hail damage or is no longer drivable, Auto-Sell gives you a fast and straightforward way to sell your damaged car. You&apos;ll receive a quote within around 30 minutes and same-day OSKO payment once you choose to accept.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            If you&apos;ve been thinking &ldquo;I want a simple, fair way to sell my damaged car,&rdquo; this is the easiest place to start.
          </p>
        </div>
      </section>

      {/* Types of Damage We Accept */}
      <section className="py-20 text-gray-800 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              We Purchase All Damage Types
            </h2>
            <p className="text-xl text-gray-600">
              You don&apos;t need to repair anything or get the car ready for sale—we buy vehicles exactly as they are
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/40 p-8 rounded-xl" style={{ borderColor: '#FFE9C0', borderWidth: '1px' }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Accident & External Damage</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Accident-damaged cars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Hail-damaged vehicles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Cars with major mechanical issues</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/40 p-8 rounded-xl" style={{ borderColor: '#FFE9C0', borderWidth: '1px' }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mechanical & Non-Running</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Non-running or broken-down cars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Cars with engine or transmission failure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Unregistered, older or high-kilometre vehicles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A Quick and Hassle-Free Way to Sell Your Damaged Car</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Selling a damaged car privately can be extremely difficult. Most buyers expect detailed reports, roadside inspections and repair quotes. Dealerships often decline damaged vehicles entirely. Auto-Sell removes the complexity and gives you a clean, transparent process.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Submit Your Details</h3>
                <p className="text-gray-700">Start by submitting your car&apos;s details through our online form. Once we receive the information, we review everything and send your quote—usually within 30 minutes during business hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">Get a Quote in ~30 Minutes</h3>
                <p className="text-gray-700">If you go ahead, we organise an on-site inspection at your home, workplace or wherever the vehicle is located. After confirming its condition, we transfer payment instantly via OSKO. You get your funds immediately, and we handle all paperwork and vehicle collection the same day. No towing fees. No repair obligations. No wasted time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fair Pricing for Damaged Vehicles</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">Even damaged cars have value, and our team uses verified market data and industry pricing tools to determine a fair offer. We consider:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">The type and extent of damage</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Make, model and year</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Kilometres and service history</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Drivability and mechanical condition</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Demand for parts or resale</span></div>
            <div className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">Current market trends for your vehicle type</span></div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">You receive a realistic offer—not an automated guess and not a figure that drops dramatically later. If you already have another quote, we&apos;re happy to compare—our offers often beat like-for-like quotes.</p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Australia-Wide Collection, We Come to You</h2>
          <p className="text-lg text-gray-700 leading-relaxed">Damaged cars aren&apos;t always easy to move, so we handle the logistics. Whether the car is at home, on a driveway, at a mechanic&apos;s shop or sitting in a carpark, our team comes to you anywhere in Australia. Inspection, payment and pickup all happen in a single appointment.</p>
        </div>
      </section>

      {/* Why Choose Us for Damaged Cars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Fastest Way to Sell My Damaged Car
            </h2>
            <p className="text-xl text-gray-600">
              Owners choose Auto-Sell because the process is simple, transparent and fast. We remove the stress and uncertainty of selling a damaged vehicle and replace it with a professional, reliable service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Type & Extent of Damage",
                description: "We assess the full scope of damage to determine a fair offer."
              },
              {
                icon: "",
                title: "Make, Model & Year",
                description: "Your vehicle's details are factored into every offer we make."
              },
              {
                icon: "",
                title: "Kilometres & Service History",
                description: "We consider your car's full history for an accurate offer."
              },
              {
                icon: "",
                title: "Drivability & Condition",
                description: "Running or not, we assess mechanical condition fairly."
              },
              {
                icon: "",
                title: "Demand for Parts or Resale",
                description: "Even non-running vehicles have parts value we factor into your offer."
              },
              {
                icon: "",
                title: "Current Market Trends",
                description: "Real-time data for your vehicle type ensures a realistic offer."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
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
            Sell Your Damaged Car for Cash Today
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            If you&apos;re ready to sell your damaged car—or want to know what it&apos;s worth—start with a free, no-obligation quote.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Sell Your Damaged Car for Cash Today
          </Link>
        </div>
      </section>
    </div>
  )
}
