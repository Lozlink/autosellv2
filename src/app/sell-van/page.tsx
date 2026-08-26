import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import OfferForm from '@/app/_home/OfferForm'
import { Suspense } from 'react'
import { getPageOverrides, text, list } from '@/lib/pageContent'
import { PAGE_COPY_DEFAULTS } from '@/lib/pageCopyDefaults'

const SLUG = 'sell-van'
const D = PAGE_COPY_DEFAULTS['sell-van']

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const b = await getPageOverrides(SLUG)
  return {
    title: text(b, 'meta_title', D.meta_title),
    description: text(b, 'meta_description', D.meta_description),
    keywords: text(b, 'meta_keywords', D.meta_keywords),
    alternates: {
      canonical: 'https://www.auto-sell.ai/sell-van',
    },
  }
}

export default async function SellVanPage() {
  const b = await getPageOverrides(SLUG)
  return (
    <div className="min-h-screen section-cream">
      <Header />

      <section id="sell-form" className="text-gray-800 py-12 md:py-20 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {text(b, 'hero_h1_line1', D.hero_h1_line1)}
              <span className="block" style={{ color: '#000' }}>{text(b, 'hero_h1_line2', D.hero_h1_line2)}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
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
                  <OfferForm heading="Sell Your Van" subheading="Get Your Free Quote Now" />
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
                {text(b, 'showcase_h2', D.showcase_h2)}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {text(b, 'showcase_body', D.showcase_body)}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl" style={{ color: '#FFC325' }}>✓</span>
                  <span className="text-gray-700">Free quote within 24 hours</span>
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
                  src="/images/cars/types/van-cutout.png"
                  alt="Sell your Van"
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
            {text(b, 'intro_para1', D.intro_para1)}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {text(b, 'intro_para2', D.intro_para2)}
          </p>
        </div>
      </section>

      {/* Popular Van Types We Buy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {text(b, 'types_h2', D.types_h2)}
            </h2>
            <p className="text-xl text-gray-600">
              {text(b, 'types_sub', D.types_sub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list(b, 'types', D.types).map((vanType, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{vanType.type}</h3>
                <p className="text-gray-600">{vanType.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{text(b, 'process_h2', D.process_h2)}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{text(b, 'process_intro', D.process_intro)}</p>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900">{text(b, 'process_step1_title', D.process_step1_title)}</h3>
                <p className="text-gray-700">{text(b, 'process_step1_body', D.process_step1_body)}</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400 text-white font-bold mr-4 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900">{text(b, 'process_step2_title', D.process_step2_title)}</h3>
                <p className="text-gray-700">{text(b, 'process_step2_body', D.process_step2_body)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section className="py-16 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{text(b, 'valuation_h2', D.valuation_h2)}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{text(b, 'valuation_para1', D.valuation_para1)}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {list(b, 'valuation_factors', D.valuation_factors).map((factor, i) => (
              <div key={i} className="flex items-start"><span className="text-green-500 mr-3 font-bold">✓</span><span className="text-gray-700">{factor}</span></div>
            ))}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mt-8">{text(b, 'valuation_closing', D.valuation_closing)}</p>
        </div>
      </section>

      {/* Australia-Wide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{text(b, 'aus_h2', D.aus_h2)}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{text(b, 'aus_body', D.aus_body)}</p>
        </div>
      </section>

      {/* Why Choose Us for Vans */}
      <section className="py-20 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {text(b, 'why_h2', D.why_h2)}
            </h2>
            <p className="text-xl text-gray-600">
              {text(b, 'why_sub', D.why_sub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list(b, 'benefits', D.benefits).map((benefit, index) => (
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
        </div>
      </section>
    </div>
  )
}
