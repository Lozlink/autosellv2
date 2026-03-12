import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'On-Site Inspections - Auto-Sell.ai',
  description: 'We come to you anywhere in Australia for convenient on-site inspections.'
}

export default function OnSiteInspectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="text-gray-800 py-12 bg-gray-50">
        <div className="px-4 sm:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">On-Site Inspections</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            We make it easy by coming to you—home or workplace—anywhere in Australia. Our assessor verifies your car, and we complete the paperwork on the spot.
          </p>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="px-4 sm:px-8 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: 'We Come To You', desc: 'Nationwide coverage for maximum convenience.' },
            { title: 'Fast Appointment', desc: 'Inspections scheduled at a time that suits you.' },
            { title: 'Paperwork Sorted', desc: 'We handle all documents—no stress, no surprises.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
