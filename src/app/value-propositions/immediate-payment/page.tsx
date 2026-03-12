import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Immediate Payment - Auto-Sell.ai',
  description: 'Get paid instantly via OSKO once the deal is done. No waiting, no delays.'
}

export default function ImmediatePaymentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="text-gray-800 py-12 bg-gray-50">
        <div className="px-4 sm:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Immediate Payment</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Once you accept our offer and the inspection is complete, we transfer the funds via OSKO immediately. Most customers see the money in their account within minutes.
          </p>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="px-4 sm:px-8 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: 'OSKO Fast Transfer', desc: 'Instant bank-to-bank payment the same day.' },
            { title: 'No Waiting', desc: 'No bank cheques or processing delays.' },
            { title: 'Secure & Verified', desc: 'Payments made to your nominated account, verified on-site.' },
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
