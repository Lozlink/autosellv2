import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import OfferForm from '@/app/_home/OfferForm'
import { Suspense } from 'react'
import { getPageOverrides, text, list } from '@/lib/pageContent'
import { PAGE_COPY_DEFAULTS } from '@/lib/pageCopyDefaults'

const SLUG = 'car-valuation-guide'
const D = PAGE_COPY_DEFAULTS['car-valuation-guide']

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const b = await getPageOverrides(SLUG)
  return {
    title: text(b, 'meta_title', D.meta_title),
    description: text(b, 'meta_description', D.meta_description),
    alternates: {
      canonical: 'https://www.auto-sell.ai/car-valuation-guide',
    },
  }
}

export default async function CarValuationGuidePage() {
  const b = await getPageOverrides(SLUG)
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Form */}
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {text(b, 'hero_h1_line1', D.hero_h1_line1)}
                <span className="block" style={{ color: '#FFC325' }}>{text(b, 'hero_h1_line2', D.hero_h1_line2)}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-8">
                {text(b, 'hero_intro', D.hero_intro)}
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
                  <OfferForm heading="Get Your Car Valuation" subheading="Free, Accurate, No Obligation" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Factors Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {text(b, 'factors_h2', D.factors_h2)}
            </h2>
            <p className="text-xl text-gray-600">
              {text(b, 'factors_sub', D.factors_sub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list(b, 'factors', D.factors).map((factor, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-[#FFC325] bg-white hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{factor.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{factor.title}</h3>
                <p className="text-gray-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation Methods */}
      <section className="py-16 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {text(b, 'methods_h2', D.methods_h2)}
            </h2>
            <p className="text-xl text-gray-600">
              {text(b, 'methods_sub', D.methods_sub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {list(b, 'methods', D.methods).map((method, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-[#FFC325]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{method.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{method.method}</h3>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-[#FFC325]"> Pros</h4>
                    <ul className="space-y-1 text-sm">
                      {method.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#FFC325]">•</span>
                          <span className="text-gray-600">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600"> Cons</h4>
                    <ul className="space-y-1 text-sm">
                      {method.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500">•</span>
                          <span className="text-gray-600">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips for Better Value */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {text(b, 'tips_h2', D.tips_h2)}
            </h2>
            <p className="text-xl text-gray-600">
              {text(b, 'tips_sub', D.tips_sub)}
            </p>
          </div>

          <div className="space-y-6">
            {list(b, 'tips', D.tips).map((tip, index) => (
              <div key={index} className="flex items-start gap-4 p-6 friendly-card">
                <div className="text-3xl">{tip.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{tip.tip}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Valuation Mistakes */}
      <section className="py-16 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {text(b, 'mistakes_h2', D.mistakes_h2)}
            </h2>
            <p className="text-xl text-gray-600">
              {text(b, 'mistakes_sub', D.mistakes_sub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-[#FFC325]">
              <h3 className="text-xl font-semibold mb-4 text-red-600">{text(b, 'donts_title', D.donts_title)}</h3>
              <ul className="space-y-3 text-gray-600">
                {list(b, 'donts', D.donts).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-green-600">{text(b, 'dos_title', D.dos_title)}</h3>
              <ul className="space-y-3 text-gray-600">
                {list(b, 'dos', D.dos).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {text(b, 'cta_h2', D.cta_h2)}
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            {text(b, 'cta_para', D.cta_para)}
          </p>
          <Link
            href="#sell-form"
            className="inline-block px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#000', color: '#FFC325' }}
          >
            {text(b, 'cta_button', D.cta_button)}
          </Link>
          <p className="text-gray-700 text-sm mt-4">
            {text(b, 'cta_subtext', D.cta_subtext)}
          </p>
        </div>
      </section>
    </div>
  )
}
