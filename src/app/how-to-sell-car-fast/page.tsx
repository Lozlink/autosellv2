import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Header from '@/components/Header'
import OfferForm from '@/app/_home/OfferForm'
import Accordion from '@/components/Accordion'
import { FAQPageJsonLd } from '@/components/JsonLd'
import { getPageOverrides, text, list } from '@/lib/pageContent'
import { PAGE_COPY_DEFAULTS } from '@/lib/pageCopyDefaults'

const SLUG = 'how-to-sell-car-fast'
const D = PAGE_COPY_DEFAULTS['how-to-sell-car-fast']

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const b = await getPageOverrides(SLUG)
  const title = text(b, 'meta_title', D.meta_title)
  const description = text(b, 'meta_description', D.meta_description)
  return {
    title,
    description,
    keywords: text(b, 'meta_keywords', D.meta_keywords),
    alternates: {
      canonical: 'https://www.auto-sell.ai/how-to-sell-car-fast',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.auto-sell.ai/how-to-sell-car-fast',
      type: 'website',
      locale: 'en_AU',
    },
  }
}

// ─── HowTo + FAQ data (mirrored to schema and the on-page content) ────────

const HOWTO_STEPS = [
  {
    name: 'Tell Us About Your Car',
    text: 'Enter your rego plate, make, model, year, and a few quick details about the condition. The whole thing takes about two minutes.',
  },
  {
    name: 'Our AI Generates Your Instant Car Offer',
    text: 'Our AI analyses thousands of current comparable listings, recent private and dealer sale prices, live auction results, and real-time regional demand across Australia.',
  },
  {
    name: 'Accept Your Offer and Get Paid Same Day',
    text: 'Happy with the number? Accept online in one click. Payment is made via OSKO — money in your bank account the same day.',
  },
  {
    name: 'We Arrange Collection',
    text: 'We organise pickup at a time and place that suits you. Hand over the keys. Done.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'How do I get an instant car offer from Auto-Sell.ai?',
    answer:
      'Enter your rego, make, model, year, odometer reading, and a brief condition summary into our online valuation form. Our AI processes your details against live market data and returns a data-backed offer within minutes. The whole process takes about two minutes, requires no phone call, and carries zero obligation.',
  },
  {
    question: 'How fast is the payment once I accept my offer?',
    answer:
      'Payment is made on the same day as pickup via OSKO — a real-time bank transfer backed by BPAY. The funds typically clear in your account within seconds of us initiating the transfer. You receive payment before we drive the car away. There are no delays, no cheques, and no "allow three to five business days."',
  },
  {
    question: "What's the best place to sell my car quickly in Australia?",
    answer:
      'For sellers who want a fair market price without the time investment of a private sale, Auto-Sell.ai is the best place to sell your car quickly in Australia. You get an AI-generated offer based on live data, same-day payment, free pickup, and zero fees — all without leaving the house.',
  },
  {
    question: 'Is an online instant car offer as accurate as a physical inspection?',
    answer:
      'For the vast majority of vehicles, yes. Our AI accounts for all key valuation variables — make, model, year, condition, odometer reading, and location — and cross-references them against thousands of current market data points. For unusual vehicles or significant undisclosed damage, we may refine the figure slightly at pickup, but our offers are designed to be accurate from the start, not lowballed and then revised upward.',
  },
  {
    question: "Can I sell my car fast if it's not registered?",
    answer:
      "Yes. An expired or absent registration doesn't stop us from making an offer or completing the purchase. We deal with unregistered vehicles regularly and have the processes in place to handle the transfer correctly under each state's regulations.",
  },
  {
    question: 'What documents do I need to sell my car quickly?',
    answer:
      "You'll need: proof of identity (driver's licence or passport), your current certificate of registration, proof of ownership (purchase receipt or transfer document), and your bank account details for the OSKO payment. If the car is under finance, add a current payout letter from your lender. That's everything — no stack of paperwork, no trips to the post office.",
  },
  {
    question: 'Do you buy cars in all Australian states and territories?',
    answer:
      "Yes. We operate Australia-wide — NSW, VIC, QLD, WA, SA, TAS, ACT, and NT. Service availability in remote areas may vary, but all major cities, regional centres, and most suburban areas across every state are covered. If you're unsure whether we service your area, get a valuation and we'll confirm immediately.",
  },
  {
    question: 'How does Auto-Sell.ai compare to Carsales Instant Offer?',
    answer:
      "Carsales Instant Offer is a legitimate option, but it's worth knowing what you're comparing. Their instant offers are generated within their own platform ecosystem and can sit below market value because they factor in their resale margin. Auto-Sell.ai's AI analyses live comparable sales data from across multiple platforms and channels — not just one marketplace — which typically results in a more competitive offer. We'd always encourage you to check both and go with the number that works best for you.",
  },
]

// ─── HowTo schema (Section 3 — The Solution) ──────────────────────────────

function HowToSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to sell your car fast online with Auto-Sell.ai',
    description:
      'Get a data-backed instant car offer powered by AI, accept online, get paid the same day via OSKO, and have your car collected for free.',
    totalTime: 'PT10M',
    step: HOWTO_STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default async function HowToSellCarFastPage() {
  const b = await getPageOverrides(SLUG)
  const faqItems = list(b, 'faq_items', FAQ_ITEMS)
  return (
    <div className="min-h-screen bg-white">
      <HowToSchema />
      <FAQPageJsonLd items={faqItems.map((f) => ({ question: f.question, answer: f.answer }))} />
      <Header />

      {/* ─── Section 1 — Hero ─────────────────────────────────────────── */}
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.05] text-gray-900 mb-6">
                {text(b, 'hero_h1_line1', D.hero_h1_line1)}{' '}
                <span className="block mt-2" style={{ color: '#FFC325' }}>
                  {text(b, 'hero_h1_line2', D.hero_h1_line2)}
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                {text(b, 'hero_p1', D.hero_p1)}
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                {text(b, 'hero_p2', D.hero_p2)}
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {text(b, 'hero_p3', D.hero_p3)}
              </p>

              <a
                href="#sell-form-card"
                className="btn-pill-gold px-8 py-3.5 text-base inline-block"
              >
                {text(b, 'hero_cta', D.hero_cta)}
              </a>

              {/* Micro-trust bar */}
              <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-700">
                {list(b, 'micro_trust', D.micro_trust).map((item) => (
                  <li key={item.label} className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true">{item.icon}</span>
                    <span className="font-semibold">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="sell-form-card" className="order-1 lg:order-2">
              <div className="liquid-glass-form-container rounded-2xl shadow-xl">
                <Suspense
                  fallback={
                    <div
                      className="rounded-2xl p-8 border bg-white/30 animate-pulse h-96"
                      style={{ borderColor: '#FFC325' }}
                    ></div>
                  }
                >
                  <OfferForm heading="Get Your Instant Car Offer" subheading="Takes 2 minutes — no obligation" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2 — The Problem ──────────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {text(b, 'problem_h2', D.problem_h2)}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {text(b, 'problem_sub', D.problem_sub)}
            </p>
          </div>

          <div className="space-y-10">
            {list(b, 'problems', D.problems).map((item) => (
              <article key={item.title}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-base md:text-lg text-gray-700 leading-relaxed text-center font-semibold">
            {text(b, 'problem_outro', D.problem_outro)}
          </p>
        </div>
      </section>

      {/* ─── Section 3 — The Solution (HowTo schema content) ───────────── */}
      <section className="py-12 md:py-20 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {text(b, 'solution_h2', D.solution_h2)}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {text(b, 'solution_sub', D.solution_sub)}
            </p>
            <p className="mt-3 text-base md:text-lg text-gray-700 font-semibold">{text(b, 'solution_lead', D.solution_lead)}</p>
          </div>

          <ol className="space-y-8">
            {list(b, 'solution_steps', D.solution_steps).map((s) => (
              <li key={s.n} className="flex items-start gap-4 md:gap-6">
                <span
                  className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400 text-white font-black text-lg flex-shrink-0"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="text-center mt-10">
            <a href="#sell-form" className="btn-pill-gold px-8 py-3.5 text-base inline-block">
              {text(b, 'solution_cta', D.solution_cta)}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Section 4 — The AI Difference ────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {text(b, 'ai_h2', D.ai_h2)}
            </h2>
          </div>

          <div className="space-y-10">
            {list(b, 'ai_items', D.ai_items).map((item) => (
              <article key={item.title}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          {/* Comparison callout box */}
          <div
            className="mt-12 rounded-2xl border-2 p-6 md:p-8 grid md:grid-cols-2 gap-6"
            style={{ borderColor: '#FFC325', backgroundColor: 'rgba(255, 195, 37, 0.05)' }}
          >
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                {text(b, 'callout_trad_label', D.callout_trad_label)}
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {text(b, 'callout_trad_text', D.callout_trad_text)}
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#92560A' }}>
                {text(b, 'callout_us_label', D.callout_us_label)}
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                {text(b, 'callout_us_text', D.callout_us_text)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 5 — Comparison Table ──────────────────────────────── */}
      <section className="py-12 md:py-20 section-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {text(b, 'compare_h2', D.compare_h2)}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {text(b, 'compare_sub', D.compare_sub)}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Selling Method</th>
                  <th className="text-left px-4 py-3 font-bold">Speed</th>
                  <th className="text-left px-4 py-3 font-bold">Price You Get</th>
                  <th className="text-left px-4 py-3 font-bold">Effort Required</th>
                  <th className="text-left px-4 py-3 font-bold">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr style={{ backgroundColor: 'rgba(255, 195, 37, 0.06)' }}>
                  <td className="px-4 py-3 font-bold text-gray-900">Auto-Sell.ai</td>
                  <td className="px-4 py-3">Minutes to days</td>
                  <td className="px-4 py-3">Fair market value</td>
                  <td className="px-4 py-3">Very low</td>
                  <td className="px-4 py-3">Very low</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-900">Private Sale (Carsales / Facebook)</td>
                  <td className="px-4 py-3">Weeks to months</td>
                  <td className="px-4 py-3">Potentially highest</td>
                  <td className="px-4 py-3">Very high</td>
                  <td className="px-4 py-3">High (scams, no-shows, safety)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-900">Dealer Trade-In</td>
                  <td className="px-4 py-3">Same day</td>
                  <td className="px-4 py-3">Below market</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-900">Car Auction</td>
                  <td className="px-4 py-3">1–2 weeks</td>
                  <td className="px-4 py-3">Variable</td>
                  <td className="px-4 py-3">Medium</td>
                  <td className="px-4 py-3">Medium</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-gray-900">Cash-for-Cars / Wrecker</td>
                  <td className="px-4 py-3">Same day</td>
                  <td className="px-4 py-3">Lowest</td>
                  <td className="px-4 py-3">Low</td>
                  <td className="px-4 py-3">Low</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4 max-w-3xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              {text(b, 'compare_p1', D.compare_p1)}
            </p>
            <p>
              {text(b, 'compare_p2', D.compare_p2)}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 6 — Who This Is For ───────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {text(b, 'whofor_h2', D.whofor_h2)}
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {text(b, 'whofor_sub', D.whofor_sub)}
            </p>
          </div>

          <div className="space-y-8">
            {list(b, 'whofor', D.whofor).map((item) => (
              <article key={item.title}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-base md:text-lg text-gray-700 leading-relaxed text-center font-semibold mb-5">
            {text(b, 'whofor_outro', D.whofor_outro)}
          </p>
          <div className="text-center">
            <a href="#sell-form" className="btn-pill-gold px-8 py-3.5 text-base inline-block">
              {text(b, 'whofor_cta', D.whofor_cta)}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Section 7 — Local Trust ───────────────────────────────────── */}
      <section className="py-12 md:py-20 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 text-center">
            {text(b, 'local_h2', D.local_h2)}
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10">
            {text(b, 'local_intro', D.local_intro)}
          </p>

          <div className="space-y-8">
            <article>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {text(b, 'local_sydney_title', D.local_sydney_title)}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {text(b, 'local_sydney_body', D.local_sydney_body)}
              </p>
            </article>
            <article>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {text(b, 'local_beyond_title', D.local_beyond_title)}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {text(b, 'local_beyond_body', D.local_beyond_body)}
              </p>
            </article>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {list(b, 'local_cities', D.local_cities).map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:border-[#FFC325] hover:text-[#92560A] transition-colors"
              >
                {city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/*
        ─── Section 8 — Social Proof ──────────────────────────────────
        Per Mark's brief: skip the placeholder reviews from the copy.
        Real Google reviews live on the home page and individual location pages.
      */}

      {/* ─── Section 9 — Objection Handling ────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {text(b, 'objections_h2', D.objections_h2)}
            </h2>
          </div>

          <div className="space-y-8">
            {list(b, 'objections', D.objections).map((item) => (
              <article key={item.q}>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{item.q}</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 10 — FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="py-12 md:py-20 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {text(b, 'faq_h2', D.faq_h2)}
            </h2>
          </div>
          <div className="faq-group">
            <Accordion items={FAQ_ITEMS.map((f) => ({ title: f.question, content: f.answer }))} />
          </div>
        </div>
      </section>

      {/* ─── Section 11 — Final CTA ────────────────────────────────────── */}
      <section className="relative py-12 md:py-16 bg-white overflow-hidden">
        <div className="hidden lg:block absolute bottom-0 opacity-90 lg:-right-[30px] lg:w-[250px] xl:right-[2%] xl:w-[350px] 2xl:right-[8%] 2xl:w-[450px]">
          <Image
            src="/images/cars/suv-cutout.png"
            alt="Sell your SUV"
            width={480}
            height={320}
            className="object-contain drop-shadow-lg w-full h-auto"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-5">
            {text(b, 'final_h2', D.final_h2)}
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed mb-8">
            <p>
              {text(b, 'final_p1', D.final_p1)}
            </p>
            <p>
              {text(b, 'final_p2', D.final_p2)}
            </p>
            <p className="font-semibold text-gray-900">
              {text(b, 'final_p3', D.final_p3)}
            </p>
          </div>

          <div className="space-y-5">
            <a href="#sell-form" className="btn-pill-gold px-10 py-4 text-lg md:text-xl">
              {text(b, 'final_cta', D.final_cta)}
            </a>

            <div>
              <p className="text-gray-600 text-base mb-2">{text(b, 'final_call_label', D.final_call_label)}</p>
              <a
                href="tel:0492858699"
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0492 858 699</span>
              </a>
            </div>

            <p className="text-sm md:text-base text-gray-500 italic max-w-md mx-auto pt-2">
              {text(b, 'final_disclaimer', D.final_disclaimer)}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
