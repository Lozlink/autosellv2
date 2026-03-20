import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'
import MapComponent from '@/components/MapComponent'

export const metadata: Metadata = {
  title: "Contact Us - Auto-Sell.ai",
  description: "Contact Auto-Sell.ai for your car valuation. Call, email, text, or chat with us. We're here to help you sell your car fast.",
  alternates: {
    canonical: 'https://auto-sell.ai/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero with Form */}
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get In Touch
                <span className="block" style={{ color: '#FFC325' }}>We&apos;re Here 7 Days a Week</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Whether you want a quick quote or have questions about selling your car, our team is ready to help.
              </p>

              <div className="space-y-5 hidden lg:block">
                <Link href="tel:0492 858 699" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.1)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFC325' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">Call Us</h3>
                    <p className="font-bold" style={{ color: '#FFC325' }}>0492 858 699</p>
                    <p className="text-sm text-gray-500">Open 7 days &middot; 8am-6pm AEST</p>
                  </div>
                </Link>

                <Link href="mailto:info@auto-sell.ai" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.1)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFC325' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">Email Us</h3>
                    <p className="font-bold" style={{ color: '#FFC325' }}>info@auto-sell.ai</p>
                    <p className="text-sm text-gray-500">Response within 2 hours</p>
                  </div>
                </Link>

                <Link href="sms:0492 858 699" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 195, 37, 0.1)' }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFC325' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">Text / SMS</h3>
                    <p className="font-bold" style={{ color: '#FFC325' }}>Send us a message</p>
                    <p className="text-sm text-gray-500">We respond within minutes</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="liquid-glass-form-container rounded-2xl shadow-xl">
                <Suspense fallback={<div className="rounded-2xl p-8 border bg-white/30 animate-pulse h-96" style={{ borderColor: '#FFC325' }}></div>}>
                  <CarSellForm heading="Contact Us" subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods - mobile visible */}
      <section className="py-12 bg-white lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="tel:0492 858 699" className="text-center p-6 rounded-xl border border-[#FFC325] hover:shadow-lg transition-shadow">
              <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFC325' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="font-semibold text-gray-800">Call Us</h3>
              <p className="font-bold text-sm" style={{ color: '#FFC325' }}>0492 858 699</p>
            </Link>
            <Link href="mailto:info@auto-sell.ai" className="text-center p-6 rounded-xl border border-[#FFC325] hover:shadow-lg transition-shadow">
              <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFC325' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="font-bold text-sm" style={{ color: '#FFC325' }}>info@auto-sell.ai</p>
            </Link>
            <Link href="sms:0492 858 699" className="text-center p-6 rounded-xl border border-[#FFC325] hover:shadow-lg transition-shadow">
              <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFC325' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="font-semibold text-gray-800">Text/SMS</h3>
              <p className="font-bold text-sm" style={{ color: '#FFC325' }}>Send a message</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Info + Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Business Information</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-semibold">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-semibold">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-semibold">8:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Service Areas</h3>
                  <p className="text-sm text-gray-600">
                    We service all of Australia including major cities, regional areas, and remote locations. We come to you for inspection and pickup.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Response Times</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Phone calls:</span>
                      <span className="font-semibold">Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SMS:</span>
                      <span className="font-semibold">Within 5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-semibold">Within 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quote requests:</span>
                      <span className="font-semibold" style={{ color: '#FFC325' }}>Within 30 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <MapComponent />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: '#FFC325' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ready to Get Your Free Valuation?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Don&apos;t wait - get your car valued in 30 minutes and receive same-day payment.
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            Get My Free Valuation Now
          </Link>
        </div>
      </section>
    </div>
  )
}
