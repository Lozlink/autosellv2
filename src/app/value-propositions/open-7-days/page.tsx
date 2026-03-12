import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open 7 Days - Auto-Sell.ai',
  description: 'We operate 7 days a week so you can sell your car on your schedule.'
}

export default function OpenSevenDaysPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="text-gray-800 py-12 bg-gray-50">
        <div className="px-4 sm:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Open 7 Days</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            We know life gets busy. That’s why our team is available 7 days a week, including weekends and public holidays. Get your quote, book an inspection, and get paid when it suits you.
          </p>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="px-4 sm:px-8 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Weekend Availability</h2>
            <p className="text-gray-600">Schedule inspections and payments on Saturdays and Sundays—same fast service, same-day OSKO payment.</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">Flexible Times</h2>
            <p className="text-gray-600">Choose the time that suits you. We come to you anywhere in Australia.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
