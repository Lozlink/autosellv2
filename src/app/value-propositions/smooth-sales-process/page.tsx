import Header from '@/components/Header'
import type { Metadata } from 'next'
import SmoothSalesProcess from "@/components/SmoothSalesProcess";

export const metadata: Metadata = {
  title: 'Smooth Sales Process - Auto-Sell.ai',
  description: 'From quote to cash, our process is streamlined for speed and simplicity.'
}

export default function SmoothSalesProcessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="text-gray-800 py-12 bg-gray-50">
        <div className="px-4 sm:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smooth Sales Process</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            We remove the friction from selling a car. Instant quotes, on-site inspections, and same-day OSKO payments mean you can sell your car in hours, not weeks.
          </p>
        </div>
      </section>
        <SmoothSalesProcess/>
    </div>
  )
}
