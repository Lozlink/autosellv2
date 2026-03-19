import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'


export const metadata: Metadata = {
  title: "Sell Damaged Car | Fast Quotes & Same-Day OSKO Payment Australia-Wide",
  description: "Sell your damaged car fast with a 30-min quote, fair valuation and same-day OSKO payment. Auto-Sell.ai buys accident-damaged, hail-damaged and non-running cars Australia-wide.",
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
                <span className="block" style={{ color: '#FFC325' }}>Get Your Valuation Now</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 drop-shadow-md">
                A damaged car can be stressful to deal with—especially when repairs cost more than the vehicle is worth. Get a fair quote in ~30 minutes with same-day OSKO payment.
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
                Sell Your Damaged Car the Easy Way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                No matter the age, mileage, or condition of your damaged car, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
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


      {/* Why Choose Us for Damaged Cars */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Auto-Sell.ai for Damaged Cars?
            </h2>
            <p className="text-xl text-gray-600">
              Fair valuations for accident, hail and mechanical damage—no repairs needed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                title: "Fair Damage Assessment",
                description: "Type & extent of damage, parts value & resale potential all considered fairly."
              },
              {
                icon: "",
                title: "Market Value Pricing",
                description: "Current market trends for damaged vehicles ensure you get a fair deal."
              },
              {
                icon: "",
                title: "Instant OSKO Payment",
                description: "Get paid same-day via OSKO transfer once on-site inspection is complete."
              },
              {
                icon: "",
                title: "Australia-Wide Collection",
                description: "We collect damaged cars from anywhere in Australia—running or not."
              },
              {
                icon: "",
                title: "Quote in ~30 Minutes",
                description: "Submit damage details and get a valuation quickly without obligation."
              },
              {
                icon: "",
                title: "Paperwork Handled",
                description: "We manage title transfers and all legal documentation for damaged vehicles."
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/40 hover:bg-white/60 transition-colors" style={{ borderColor: '#FFE9C0', borderWidth: '1px' }}>
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Damage We Accept */}
      <section className="py-20 text-gray-800 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Types of Damage We Buy
            </h2>
            <p className="text-xl text-gray-600">
              Accident-damaged, hail-damaged, mechanical failure & non-running cars
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/40 p-8 rounded-xl" style={{ borderColor: '#FFE9C0', borderWidth: '1px' }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Accident & Impact Damage</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Crash and collision damage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Hail damage and dents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Side impact and roll-over</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Frame and structural damage</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/40 p-8 rounded-xl" style={{ borderColor: '#FFE9C0', borderWidth: '1px' }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mechanical & Non-Running</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Major mechanical issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Engine and transmission failure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Non-running, broken-down cars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg" style={{ color: '#FFC325' }}></span>
                  <span>Unregistered & high-km vehicles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              From damaged car to payment in hours
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Submit Details',
                description: 'Tell us about your damaged car via our quick online form.',
                icon: ''
              },
              {
                step: '02',
                title: 'Get Quote',
                description: 'Receive a fair valuation within ~30 minutes—no obligation.',
                icon: ''
              },
              {
                step: '03',
                title: 'On-Site Inspection',
                description: 'Our team visits and inspects your damaged car at your location.',
                icon: ''
              },
              {
                step: '04',
                title: 'Instant OSKO Payment',
                description: 'Accept offer and get paid same-day via OSKO bank transfer.',
                icon: ''
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/40 p-8 rounded-xl hover:bg-white/60 transition-colors" style={{ borderColor: '#FFE9C0', borderWidth: '1px' }}>
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <div className="text-4xl font-bold mb-4" style={{ color: '#FFC325' }}>{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Turn Your Damaged Car Into Cash Today
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Don&apos;t waste money on repairs. Get a fair valuation in ~30 minutes with same-day OSKO payment.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#333', color: '#FFC325' }}
          >
            Get Your Damaged Car Valuation
          </Link>
        </div>
      </section>
    </div>
  )
}
