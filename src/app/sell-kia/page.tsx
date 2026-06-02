import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'
import OfferForm from '@/app/_home/OfferForm'
import { Suspense } from 'react'
import { getPageOverrides, text, list } from '@/lib/pageContent'
import { PAGE_COPY_DEFAULTS } from '@/lib/pageCopyDefaults'

const SLUG = 'sell-kia'
const D = PAGE_COPY_DEFAULTS['sell-kia']

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const b = await getPageOverrides(SLUG)
  return {
    title: text(b, 'meta_title', D.meta_title),
    description: text(b, 'meta_description', D.meta_description),
    alternates: {
      canonical: 'https://www.auto-sell.ai/sell-kia',
    },
  }
}

export default async function SellKiaPage() {
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
                  <OfferForm heading="Sell Your Kia" subheading="Get Your Free Quote Now" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase with Car Cutout */}
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
                  src="/images/cars/brands/kia-cutout.png"
                  alt="Sell your Kia"
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


      {/* Intro Content Section */}
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

      {/* Kia Models We Buy */}
      <section className="py-20 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {text(b, 'models_h2', D.models_h2)}
            </h2>
            <p className="text-xl text-gray-600">
              {text(b, 'models_sub', D.models_sub)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list(b, 'models', D.models).map((model, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{model}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 text-center">
              {text(b, 'models_footnote', D.models_footnote)}
            </p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mt-8 text-center">
            {text(b, 'models_closing', D.models_closing)}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{text(b, 'process_h2', D.process_h2)}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {text(b, 'process_intro', D.process_intro)}
          </p>
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

      {/* Fair Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{text(b, 'pricing_h2', D.pricing_h2)}</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {text(b, 'pricing_intro', D.pricing_intro)}
          </p>

          <div className="friendly-card p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{text(b, 'pricing_factors_title', D.pricing_factors_title)}</h3>
            <p className="text-gray-700 mb-4">{text(b, 'pricing_card_intro', D.pricing_card_intro)}</p>
            <ul className="space-y-3">
              {list(b, 'pricing_factors', D.pricing_factors).map((factor, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-400 font-bold mr-4"></span>
                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Australia-Wide Section */}
      <section className="py-16 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{text(b, 'aus_h2', D.aus_h2)}</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {text(b, 'aus_intro', D.aus_intro)}
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {text(b, 'aus_intro2', D.aus_intro2)}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {list(b, 'aus_cards', D.aus_cards).map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {text(b, 'why_h2', D.why_h2)}
            </h2>
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

      {/* The Easy and Reliable Way to Sell My Kia */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{text(b, 'trusted_h2', D.trusted_h2)}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {text(b, 'trusted_para1', D.trusted_para1)}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {text(b, 'trusted_para2', D.trusted_para2)}
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {text(b, 'cta_h2', D.cta_h2)}
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            {text(b, 'cta_para', D.cta_para)}
          </p>
          <p className="text-lg text-gray-700 mb-8">
            {text(b, 'cta_para2', D.cta_para2)}
          </p>
          <Link
            href="#sell-form"
            className="btn-pill-gold px-12 py-4 text-xl"
          >
            {text(b, 'cta_button', D.cta_button)}
          </Link>
        </div>
      </section>
    </div>
  )
}
