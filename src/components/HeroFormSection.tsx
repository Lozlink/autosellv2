'use client'

import { useState, Suspense } from 'react'
import CarSellForm from './CarSellForm'

function CarSellFormFallback() {
  return (
    <div className="rounded-2xl p-8 border border-gray-100 bg-white/30">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function HeroFormSection() {
  const [formStep, setFormStep] = useState(1)

  return (
    <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">
      {/* Desktop hero text — conditionally changes based on form step */}
      <div className="hidden lg:block">
        {formStep === 1 ? (
          <>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.05] text-white">
              The Smarter Way to
              <span className="block mt-2 text-[#FFC325]">Sell My Car Online</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mt-5 leading-relaxed max-w-xl">
              Instant AI valuation. <strong className="text-white">Same-day OSKO payment</strong>. No fees,
              no dealer lowballs, no tyre-kickers — just a fair, data-backed offer in minutes,
              Australia-wide.
            </p>
            {/* Micro-trust bar */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-200">
              {[
                'No obligation',
                'Instant AI valuation',
                'Paid same day via OSKO',
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#FFC325] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] text-white">
              Almost There!
              <span className="block mt-2 text-[#FFC325]">Confirm Your Vehicle</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mt-5 mb-6 max-w-xl leading-relaxed">
              Just confirm your vehicle details and we&apos;ll have your <strong className="text-white">free AI valuation</strong> ready in minutes.
            </p>
          </>
        )}
      </div>

      {/* Screen-reader-only h1 for mobile */}
      <h1 className="sr-only">
        Sell Your Car Today — Get The Best Price Guaranteed with Auto-Sell.ai
      </h1>

      {/* Hero Form */}
      <div className="liquid-glass-form-container rounded-2xl md:rounded-3xl overflow-hidden">
        <Suspense fallback={<CarSellFormFallback />}>
          <CarSellForm
            heading={formStep === 1 ? undefined : 'Almost There!'}
            subheading={formStep === 1 ? undefined : 'Confirm Your Vehicle'}
            onStepChange={setFormStep}
          />
        </Suspense>
      </div>
    </div>
  )
}
