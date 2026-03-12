import type { Metadata } from 'next'
import Header from '@/components/Header'
import Accordion from '@/components/Accordion'

export const metadata: Metadata = {
  title: "FAQ - Auto-Sell.ai",
  description: "Frequently asked questions about selling your car with Auto-Sell.ai. Get answers to common questions about our car buying service.",
}

const faqs = [
  {
    question: "How quickly can I get a quote?",
    answer: "Our AI-powered system typically provides quotes within 30 minutes of submitting your car details. During business hours, many quotes are available in just 10-15 minutes."
  },
  {
    question: "Do you really pay on the same day?",
    answer: "Yes! Once we inspect your vehicle and complete the paperwork, we transfer the money directly to your bank account via OSKO, which typically processes within minutes."
  },
  {
    question: "What if my car isn't running?",
    answer: "No problem! We buy cars in all conditions - running or not, damaged or perfect. We'll arrange towing if needed and still provide competitive offers."
  },
  {
    question: "Are there any hidden fees?",
    answer: "Absolutely not. Our quote is what you get paid. We don't charge any fees, commissions, or deduct costs for paperwork, towing, or processing."
  },
  {
    question: "How do you determine the price?",
    answer: "We use real-time market data, RedBook valuations, and our extensive network of buyers to ensure you get the best possible price for your vehicle."
  },
  {
    question: "What areas do you service?",
    answer: "We operate Australia-wide! From major cities to remote areas, we can arrange pickup and payment anywhere in Australia."
  },
  {
    question: "What documents do I need?",
    answer: "You'll need your vehicle registration, driver's license, and proof of ownership. We'll help you with all the paperwork during the inspection."
  },
  {
    question: "Can I change my mind after accepting an offer?",
    answer: "Yes, you can change your mind up until we complete the final paperwork and payment. However, once payment is made, the sale is final."
  },
  {
    question: "Do you buy all car brands?",
    answer: "Yes! We buy all makes and models - Toyota, Ford, Holden, BMW, Mercedes, and everything in between. No car is too old or too new."
  },
  {
    question: "What if I still owe money on my car?",
    answer: "We can still buy your car even if you have a loan. We'll work with your lender to pay off the loan and give you any remaining equity."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      {/* Hero Section */}
      <section className="text-gray-800 py-12" style={{ backgroundColor: '#FFC325' }}>
        <div className="px-4 sm:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get answers to common questions about selling your car with Auto-Sell.ai.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">

        <div className="px-4 sm:px-8 max-w-4xl mx-auto text-center">
          <Accordion
            items={faqs.map((f) => ({ title: f.question, content: f.answer }))}
          />

          {/* Contact CTA */}
          <div className="mt-16 bg-[#FFC325] border border-gray-200/30 rounded-xl p-8 text-gray-800 text-center">
            <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Our team is here to help. Contact us for personalised assistance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1800Auto-Sell" className="inline-flex items-center justify-center gap-2 bg-[#FFC325] hover:bg-[#e6af1f] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Call 1800 AUTO SELL
              </a>
              <a href="/contact" className="bg-white text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
