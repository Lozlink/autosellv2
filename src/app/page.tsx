import Image from 'next/image'
import Header from '@/components/Header'
import HeroFormSection from '@/components/HeroFormSection'
import BrandMarquee from '@/components/BrandMarquee'
import ReviewsComponent from '@/components/ReviewsComponent'
import Accordion from '@/components/Accordion'
import HowItWorks from '@/components/HowItWorks'
import WhyChoose from '@/components/WhyChoose'
import VehicleTypesGrid from '@/components/VehicleTypesGrid'
import type { Metadata } from 'next'
import { FAQPageJsonLd } from '@/components/JsonLd'


export const metadata: Metadata = {
  title: "Sell My Car Online in Sydney | Fast Cash | Auto-Sell.ai",
  description: "Looking to sell my car online? We make it easy to sell your car in Sydney. Get a free 30-minute quote, same-day OSKO payment, and we come to you!",
  keywords: "sell my car, sell my car online, cash for cars Sydney, sell car fast, instant car quote, same day payment, sell car online, we buy cars, car buying service",
  openGraph: {
    title: "Sell My Car Online in Sydney | Fast Cash | Auto-Sell.ai",
    description: "Looking to sell my car online? We make it easy to sell your car in Sydney. Get a free 30-minute quote, same-day OSKO payment, and we come to you!",
    type: "website",
    locale: "en_AU",
    url: "https://auto-sell.ai",
  },
  alternates: {
    canonical: "https://auto-sell.ai",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <FAQPageJsonLd
        items={[
          { question: "How can you value my car in seconds?", answer: "Our AI technology analyzes real-time market data, recent sales, and your car's specific details to generate an accurate quote instantly. What used to take days now happens in seconds." },
          { question: "How fast is the entire process?", answer: "Get your AI-powered quote in 30 minutes, book an on-site inspection at your convenience, and receive same-day OSKO payment. Most customers complete the entire process within 24 hours." },
          { question: "Do you really pay on the same day?", answer: "Yes! Once we inspect your vehicle and complete the paperwork, we transfer funds directly to your bank account via OSKO, which processes within seconds." },
          { question: "What if I don't like the offer?", answer: "There's absolutely no obligation. You can decline the offer at any point before signing — we never pressure you." },
          { question: "How do you calculate my car's value?", answer: "Our AI cross-references live market data, recent comparable sales, your car's make, model, year, condition, and odometer." },
          { question: "What makes this 'smarter' than traditional selling?", answer: "Traditional private sales take weeks of ads, time-wasters, and negotiations. Our AI instantly connects you with genuine buyers, eliminates haggling, and gets you paid the same day." },
          { question: "What if my car isn't running?", answer: "No problem! Our AI values cars in any condition. We'll arrange free towing if needed and still provide a fast, fair offer." },
          { question: "What areas do you service?", answer: "We operate Australia-wide! From major cities to remote areas, we come to you." },
        ]}
      />
      <Header />

      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section id="sell-form" className="relative text-gray-900 pt-6 pb-6 md:pt-6 md:pb-12 overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-car.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_54%] md:object-[center_54%]"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/72 to-white/62 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/85 lg:to-white/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
          <HeroFormSection />
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-5 md:py-7 bg-white">
        <div className="px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-4 md:mb-5">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-2">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-gray-600">Three simple steps to get cash for your car</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <HowItWorks />
            {/* Car cutout image — seamless on white bg */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/cars/sedan-cutout.png"
                  alt="Sell your sedan"
                  width={600}
                  height={400}
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose ───────────────────────────────────────────────── */}
      <section id="why-choose" className="py-5 md:py-8 bg-[#8B8987]/25">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-4 md:mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Choose The Smarter Way?
            </h2>
            <p className="text-base md:text-lg text-gray-600">AI-powered selling that gets you paid in seconds, not weeks</p>
          </div>
          <WhyChoose />
        </div>
      </section>

      {/* ─── Customer Reviews ─────────────────────────────────────────── */}
      <section id="reviews" className="py-5 md:py-8 bg-white">
        <div className="px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-4 md:mb-5">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3">
              Thousands of Happy Sellers
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Real Australians who chose the smarter way to sell their cars
            </p>
          </div>

          <ReviewsComponent />

          <div className="text-center mt-4">
            <a
              href="#sell-form"
              className="inline-block px-8 py-3.5 rounded-full font-bold text-base transition-all hover:scale-[1.02] bg-[#FFC325] text-white hover:bg-[#e6af1f] shadow-sm hover:shadow-md"
            >
              Get My Free Quote
            </a>
            <p className="text-sm text-gray-400 mt-2">Free quote. No obligation.</p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="py-5 md:py-8 bg-[#8B8987]/25">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-4 md:mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Everything you need to know about selling your car with us
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion
              items={[
                {
                  title: "How can you value my car in seconds?",
                  content: "Our AI technology analyzes real-time market data, recent sales, and your car's specific details to provide an accurate quote instantly. What used to take days now happens in seconds.",
                },
                {
                  title: "How fast is the entire process?",
                  content: "Get your AI-powered quote in 30 minutes, book an on-site inspection at your convenience, and receive same-day OSKO payment. Most customers complete the entire process within 24 hours.",
                },
                {
                  title: "Do you really pay on the same day?",
                  content: "Yes! Once we inspect your vehicle and complete the paperwork, we transfer funds directly to your bank account via OSKO, which processes within seconds. That's the smarter way — no waiting weeks for payment.",
                },
                {
                  title: "What if I don't like the offer?",
                  content: "There's absolutely no obligation. You can decline the offer at any point before signing — we never pressure you. If you accept, we honour the agreed price on the spot.",
                },
                {
                  title: "How do you calculate my car's value?",
                  content: "Our AI cross-references live market data, recent comparable sales, your car's make, model, year, condition, and odometer. You'll get a fair, data-backed figure — not a lowball dealer guess.",
                },
                {
                  title: "What makes this 'smarter' than traditional selling?",
                  content: "Traditional private sales take weeks of ads, time-wasters, and negotiations. Dealerships lowball offers. Our AI instantly connects you with genuine buyers, eliminates haggling, and gets you paid the same day.",
                },
                {
                  title: "What if my car isn't running?",
                  content: "No problem! Our AI values cars in any condition. We'll arrange free towing if needed and still provide a fast, fair offer based on your car's actual condition.",
                },
                {
                  title: "What areas do you service?",
                  content: "We operate Australia-wide! From major cities to remote areas, we come to you. Our AI-powered service works everywhere, ensuring fast quotes and payment no matter your location.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ─── Vehicle Types ────────────────────────────────────────────── */}
      <section className="py-5 md:py-8 bg-white">
        <div className="px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-4 md:mb-5">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3">
              We Buy All Types of Vehicles
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              From sedans to trucks, we buy everything — any condition
            </p>
          </div>
          <VehicleTypesGrid />
          <div className="text-center mt-4">
            <a
              href="#sell-form"
              className="inline-block px-8 py-3 rounded-full font-bold text-base transition-all hover:scale-[1.02] border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              What&apos;s My Car Worth?
            </a>
          </div>
        </div>
      </section>

      {/* ─── Brand Marquee ────────────────────────────────────────────── */}
      <section className="py-4 md:py-6 bg-[#8B8987]/25">
        <div className="px-4 sm:px-8 max-w-6xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Trusted across all makes and models
          </p>
          <BrandMarquee />
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────────── */}
      <section className="relative py-8 md:py-12 bg-white overflow-hidden">
        {/* Car cutout on the right */}
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
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-4">
            Ready to Sell Your Car?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-5 md:mb-6">
            Join thousands of Australians who chose the smarter way. Get your free quote now.
          </p>
          <div className="space-y-5">
            <a
              href="#sell-form"
              className="inline-block bg-[#FFC325] text-white px-10 py-4 rounded-full text-lg md:text-xl font-bold hover:bg-[#e6af1f] transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
            >
              Get My Free Quote
            </a>

            <p className="text-sm text-gray-400">— or —</p>

            <div>
              <p className="text-gray-600 text-base mb-2">Call us directly:</p>
              <a
                href="tel:0492 858 699"
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0492 858 699</span>
              </a>
              <p className="text-sm text-gray-500 mt-2">Open 7 days a week &bull; 8am–6pm AEST</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
