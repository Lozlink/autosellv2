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
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] text-white">
              Powered By AI
              <span className="block mt-2 text-[#FFC325]">Sell Your Car Today</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mt-5 mb-6 max-w-xl leading-relaxed">
                <strong className="text-white">SELL YOUR CAR </strong> — get a no-obligation offer in 30 minutes, same-day OSKO payment, and we come to you Australia-wide.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] text-white">
              Almost There!
              <span className="block mt-2 text-[#FFC325]">Confirm Your Vehicle</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mt-5 mb-6 max-w-xl leading-relaxed">
              Just confirm your vehicle details and we&apos;ll have your <strong className="text-white">FREE quote</strong> ready in 30 minutes.
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
