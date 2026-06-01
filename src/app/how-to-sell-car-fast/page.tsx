import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Header from '@/components/Header'
import CarSellForm from '@/components/CarSellForm'
import Accordion from '@/components/Accordion'
import { FAQPageJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Instant Car Offer — Sell My Car Fast & Get Paid Today | Auto-Sell.ai',
  description:
    'Want to sell your car fast? Get an instant car offer powered by AI — no tyre-kickers, no dealer lowballs. Sell my car quick, get paid same day. Australia-wide.',
  keywords:
    'instant car offer, sell my car fast, sell my car quick, sell my car now, sell auto fast Sydney, sell my car instant quote, best place to sell my car',
  alternates: {
    canonical: 'https://www.auto-sell.ai/how-to-sell-car-fast',
  },
  openGraph: {
    title: 'Instant Car Offer — Sell My Car Fast & Get Paid Today | Auto-Sell.ai',
    description:
      'Want to sell your car fast? Get an instant car offer powered by AI — no tyre-kickers, no dealer lowballs. Sell my car quick, get paid same day. Australia-wide.',
    url: 'https://www.auto-sell.ai/how-to-sell-car-fast',
    type: 'website',
    locale: 'en_AU',
  },
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
] as const

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

export default function HowToSellCarFastPage() {
  return (
    <div className="min-h-screen bg-white">
      <HowToSchema />
      <FAQPageJsonLd items={FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer }))} />
      <Header />

      {/* ─── Section 1 — Hero ─────────────────────────────────────────── */}
      <section id="sell-form" className="text-gray-800 py-12 md:py-20 section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.05] text-gray-900 mb-6">
                Want to Sell My Car Fast?{' '}
                <span className="block mt-2" style={{ color: '#FFC325' }}>
                  Get Your Instant Car Offer in Minutes
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                Still refreshing your inbox waiting for a private buyer who said they were &ldquo;definitely
                interested&rdquo;? Still wincing at the dealer trade-in figure they slid across the desk like
                it was doing you a favour?
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                There&apos;s a better way to sell your car fast — and it doesn&apos;t involve either of those
                things.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                Auto-Sell.ai gives you a genuine instant car offer in minutes, powered by AI and live
                Australian market data. Not a ballpark. A real, data-backed offer you can act on right now —
                with same-day payment and zero fees attached.
              </p>

              <a
                href="#sell-form-card"
                className="btn-pill-gold px-8 py-3.5 text-base inline-block"
              >
                Get My Instant Car Offer Now →
              </a>

              {/* Micro-trust bar */}
              <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-700">
                {[
                  { icon: '⚡', label: 'Offers in Minutes' },
                  { icon: '💰', label: 'Same-Day Payment' },
                  { icon: '🤖', label: 'AI-Powered Accuracy' },
                  { icon: '🇦🇺', label: 'Australia-Wide' },
                ].map((item) => (
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
                  <CarSellForm heading="Get Your Instant Car Offer" subheading="Takes 2 minutes — no obligation" />
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
              Why Selling Your Car the Old Way Costs You Time, Money and Patience
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Look, most people don&apos;t enjoy selling their car. And it&apos;s not because the car
              isn&apos;t worth selling — it&apos;s because every traditional method comes with its own
              particular flavour of frustration. Here&apos;s what Aussie sellers deal with every single day.
            </p>
          </div>

          <div className="space-y-10">
            {[
              {
                title: 'Private Sale: The Tyre-Kickers, the No-Shows, the Lowballers',
                body:
                  'You write the listing, take twenty photos, post it on Carsales and Facebook Marketplace, and wait. Then come the messages — the ones who ask fifteen questions and vanish, the bloke who shows up forty minutes late, kicks the tyres and offers you $2,000 under your asking price because he "saw one cheaper in Dubbo." Weeks go by. The car sits on the driveway. Your asking price quietly drops.',
              },
              {
                title: "Dealer Trade-Ins: Convenient, But You're Leaving Thousands on the Table",
                body:
                  "Dealers aren't in the business of giving you top dollar — they're in the business of making margin. That trade-in offer is calculated to leave enough room for their profit, their reconditioning costs, and their salesperson's commission. Convenient? Yes. Fair? Rarely.",
              },
              {
                title: "Online Listings: You're Competing With 300,000 Other Sellers Right Now",
                body:
                  "At any given moment, there are hundreds of thousands of vehicles listed across Australia's major platforms. You're not just selling a car — you're competing in a crowded marketplace where your listing gets buried within 24 hours, and the buyers who do find it are often comparing you against ten similar cars with lower asking prices.",
              },
            ].map((item) => (
              <article key={item.title}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-base md:text-lg text-gray-700 leading-relaxed text-center font-semibold">
            There&apos;s a better way — and it takes less time than making a coffee.
          </p>
        </div>
      </section>

      {/* ─── Section 3 — The Solution (HowTo schema content) ───────────── */}
      <section className="py-12 md:py-20 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              The Best Way to Sell Your Car Fast — Without the Hassle
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Auto-Sell.ai was built specifically for sellers who want a fair price without the drawn-out
              process. Our AI-powered platform analyses the live Australian market and puts a real offer in
              your hands within minutes — so you can stop waiting and start deciding.
            </p>
            <p className="mt-3 text-base md:text-lg text-gray-700 font-semibold">Here&apos;s exactly how it works:</p>
          </div>

          <ol className="space-y-8">
            {[
              {
                n: 1,
                title: 'Tell Us About Your Car (2 Minutes)',
                body:
                  'Enter your rego plate, make, model, year, and a few quick details about the condition — odometer reading, any known damage, service history. The whole thing takes about two minutes. No phone calls required, no appointment needed, no awkward waiting room small talk.',
              },
              {
                n: 2,
                title: 'Our AI Generates Your Instant Car Offer Using Live Market Data',
                body:
                  "This is where Auto-Sell.ai is genuinely different. Our AI doesn't pull a number from thin air or rely on last quarter's RedBook figures. It analyses thousands of current comparable listings, recent private and dealer sale prices, live auction results, and real-time regional demand across Australia — all adjusted for your vehicle's specific make, model, condition, and location. What you get back isn't a range or a rough estimate. It's a precise, data-backed offer that reflects what buyers are actually paying for a car like yours, right now.",
              },
              {
                n: 3,
                title: 'Accept Your Offer and Get Paid — Same Day',
                body:
                  'Happy with the number? Accept online in one click. We handle all the paperwork digitally — no printing, no trips to Service NSW or VicRoads, no stress. Payment is made via OSKO, which means the money is in your bank account the same day — usually within minutes of us confirming the pickup.',
              },
              {
                n: 4,
                title: "We Arrange Collection — You Don't Lift a Finger",
                body:
                  "Once you're paid, we organise a pickup time that suits you — your home, your workplace, wherever. Our team comes to you. You hand over the keys, we handle the transfer of ownership, and that's it. You're done. No driving to a depot, no waiting around, no last-minute renegotiation at the door.",
              },
            ].map((s) => (
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
              Get My Offer — It Takes 2 Minutes →
            </a>
          </div>
        </div>
      </section>

      {/* ─── Section 4 — The AI Difference ────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              Why Our AI Gets You a More Accurate Offer — Every Single Time
            </h2>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "It's Not a Guesstimate. It's Data.",
                body:
                  "Every other valuation method — whether it's a dealer eyeballing your car or an online tool pulling from a static price guide — ultimately comes down to one person's opinion, or a database that was last updated weeks ago. Neither of those things tells you what a buyer is willing to pay for your specific car in your specific city today.",
              },
              {
                title: "Real-Time Market Analysis, Not Last Month's RedBook",
                body:
                  "Our AI is continuously processing live data from across the Australian market — current listings on major platforms, recent comparable sales, regional supply-and-demand patterns, and seasonal price shifts. It's not working from a price guide. It's working from what's actually happening in the market right now.",
              },
              {
                title: 'Your Offer Reflects What Buyers Are Actually Paying Right Now',
                body:
                  "When you request your sell my car instant quote through Auto-Sell.ai, the figure you receive is calculated from thousands of real data points, adjusted specifically for your vehicle's make, model, year, condition, odometer reading, and your location. The result is an offer that's grounded in reality — not optimism, not pessimism, just an accurate reflection of what the market is doing today.",
              },
            ].map((item) => (
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
                Traditional Valuation
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Based on one person&apos;s opinion, one visit, one moment in time.
              </p>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: '#92560A' }}>
                Auto-Sell.ai
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-semibold">
                Based on thousands of live data points across the Australian market, updated continuously.
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
              How Does Auto-Sell.ai Compare to Other Ways to Sell Your Car?
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              If you&apos;re weighing up the best place to sell your car, here&apos;s an honest look at how the
              main options stack up:
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
              We&apos;ll be straight with you — if you have the time, patience, and nerves for a private sale,
              you might squeeze a higher final figure out of it. But for most sellers, the weeks of effort, the
              uncertainty, and the very real risk of a deal falling through on the day aren&apos;t worth the
              difference.
            </p>
            <p>
              For sellers who want to sell their car quick, get a fair price, and get on with their life —
              Auto-Sell.ai is the sweet spot. Fast, fair, and completely hassle-free.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 6 — Who This Is For ───────────────────────────────── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              Sell My Car Fast — Who Is Auto-Sell.ai Perfect For?
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              We work with all kinds of sellers, but a few situations come up again and again. If any of these
              sound familiar, you&apos;re in exactly the right place.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "You Need the Money Quickly and Can't Wait Weeks",
                body:
                  "Whether it's a surprise expense, a new car deposit, or you just want the cash in hand, waiting six weeks for a private buyer isn't an option. We can have an offer ready today and the money in your account before the day is out.",
              },
              {
                title: "You're Relocating, Upgrading or Downsizing",
                body:
                  "You've got two weeks until you leave for Perth and the last thing you need is a private buyer pulling out on settlement day. Or you've already bought the new car and the old one is sitting on the driveway burning registration. We handle both situations cleanly and quickly.",
              },
              {
                title: 'Your Car Is on Finance and You Need a Clean Exit',
                body:
                  'Still paying off the car but ready to move on? Not a problem. We manage the finance payout directly with your lender and transfer any remaining balance to you — the whole thing handled in a single transaction.',
              },
              {
                title: "You've Tried Private Sale and It Went Nowhere",
                body:
                  "You listed it three weeks ago, had a handful of enquiries that came to nothing, and you're done. We get it. Hand it to us and we'll close it out today. No more listing fees, no more tyre-kickers.",
              },
              {
                title: 'You Just Want It Done — Fair Price, Zero Hassle',
                body:
                  "Some people simply value their time more than they value squeezing every last dollar out of a private sale. If you want a genuinely fair price, a fast process, and zero stress — that's exactly what we're built for.",
              },
            ].map((item) => (
              <article key={item.title}>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-base md:text-lg text-gray-700 leading-relaxed text-center font-semibold mb-5">
            Whichever situation you&apos;re in, we can have an offer in your inbox today.
          </p>
          <div className="text-center">
            <a href="#sell-form" className="btn-pill-gold px-8 py-3.5 text-base inline-block">
              Get Started →
            </a>
          </div>
        </div>
      </section>

      {/* ─── Section 7 — Local Trust ───────────────────────────────────── */}
      <section className="py-12 md:py-20 section-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 text-center">
            Sell Your Auto Fast in Sydney — and Everywhere Else in Australia
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10">
            Sydney sellers, we see you. Between the busy schedules, the apartment buildings with no room to
            store a car long-term, and the cost of living that makes getting that sale done sooner rather than
            later very attractive — we know time matters here more than most. If you want to sell your auto
            fast in Sydney without taking time off work or dealing with buyers who cancel the morning of,
            Auto-Sell.ai is built for exactly that situation.
          </p>

          <div className="space-y-8">
            <article>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Fast Car Offers for Sydney Sellers
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Whether you&apos;re in Parramatta or Penrith, Bondi or Blacktown, Chatswood or Campbelltown —
                our buyers operate across the entire Sydney metro area, and we can typically arrange same-day
                or next-day pickup across most suburbs. Get your offer online and we&apos;ll take care of the
                rest.
              </p>
            </article>
            <article>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Melbourne, Brisbane, Perth and Beyond — We&apos;re Everywhere
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Our buyers operate across every major Australian city and most regional areas. Melbourne&apos;s
                inner suburbs and outer east, Brisbane&apos;s northside and southside, the Perth metro corridor
                — wherever you are, we&apos;ll have an offer ready when you are. No matter the postcode, the
                service is the same: fast, fair, and completely on your terms.
              </p>
            </article>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Sell My Car Sydney', href: '/sell-my-car-sydney' },
              { label: 'Sell My Car Melbourne', href: '/sell-my-car-melbourne' },
              { label: 'Sell My Car Brisbane', href: '/sell-my-car-brisbane' },
              { label: 'Sell My Car Perth', href: '/sell-my-car-perth' },
              { label: 'Sell My Car Adelaide', href: '/sell-my-car-adelaide' },
            ].map((city) => (
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
              Before You Go — Let&apos;s Answer the Questions You&apos;re Thinking
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                q: '"Will I actually get a fair price, or is this a lowball service?"',
                a: "Fair question — and we'd rather you ask it than wonder. Our offers are generated by AI using live market data, not by a buyer who's incentivised to pay as little as possible. We're not a cash-for-cars wrecker. We're a market-priced buyer, and the number we give you reflects what your car is actually worth to a real buyer right now. You're always free to compare it against other offers — we're confident it'll hold up.",
              },
              {
                q: '"What if my car is old, high-km or has minor damage?"',
                a: 'We buy it. Age, kilometres, a few scratches, a dent, a cracked bumper — none of that disqualifies your car from getting an offer. Our AI accounts for condition in the valuation, so the price you receive is adjusted accordingly rather than us simply turning you away. Unregistered vehicles are also fine.',
              },
              {
                q: '"How quickly can I actually get my money?"',
                a: "Same day in most cases. Once you accept your offer and we complete the pickup, payment is processed via OSKO — which means it clears in your account in under a minute, 24 hours a day, seven days a week. We don't release the vehicle until payment is confirmed, so you're never waiting and wondering.",
              },
              {
                q: '"Is this safe? I\'m not handing my car over to just anyone."',
                a: "Completely understood. We're a licensed automotive trader operating under Australian consumer law. Our team arrives at your location in a branded vehicle, carries ID, and completes all paperwork digitally with you present. Payment is made before the car leaves your possession. Every step of the process is documented, traceable, and backed by our full service guarantee.",
              },
              {
                q: '"My car is still on finance — can you still buy it?"',
                a: "Yes. If your vehicle is under finance, we'll simply need a current payout letter from your lender showing the settlement figure. We handle the payout directly with the finance company and transfer any amount above that balance straight to you. It's a common situation and one we handle every day without any issues.",
              },
            ].map((item) => (
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
              Frequently Asked Questions — Sell My Car Fast with Auto-Sell.ai
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
            Stop Waiting — Sell My Car Fast and Get Your Instant Offer Today
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed mb-8">
            <p>
              Every day your car sits unsold, it&apos;s losing value. Depreciation doesn&apos;t wait for a
              private buyer to make up their mind, and neither should you. Whether you&apos;ve already been
              through the private sale grind and got nowhere, or you&apos;re simply looking for the best place
              to sell your car without the hassle — this is it.
            </p>
            <p>
              Auto-Sell.ai gives you a real instant car offer based on what the Australian market is actually
              doing right now. No lowballing, no pressure, no fees. Accept it and you&apos;ll have the money
              in your account the same day. It&apos;s the fastest, fairest way to sell your car in Australia
              — and it starts with a two-minute form.
            </p>
            <p className="font-semibold text-gray-900">
              Get your free instant car offer now — our team is available seven days a week across Sydney,
              Melbourne, Brisbane, Perth and everywhere in between. Takes 2 minutes. No obligation.
            </p>
          </div>

          <div className="space-y-5">
            <a href="#sell-form" className="btn-pill-gold px-10 py-4 text-lg md:text-xl">
              Get My Instant Offer Now →
            </a>

            <div>
              <p className="text-gray-600 text-base mb-2">Or call us directly:</p>
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
              No hidden fees. No pressure. Just a fair, fast offer backed by real market data.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
