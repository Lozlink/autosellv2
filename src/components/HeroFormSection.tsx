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
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Desktop hero text — conditionally changes based on form step */}
      <div className="hidden lg:block">
        {formStep === 1 ? (
          <>
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">
              Powered By AI
              <span className="block mt-2 text-[#FFC325]">Sell Your Car Today</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4 mb-6 max-w-lg">
                <strong>SELL YOUR CAR </strong> in 30 minutes, same-day OSKO payment, and we come to you Australia-wide.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">
              Almost There!
              <span className="block mt-2 text-[#FFC325]">Confirm Your Vehicle</span>
            </h1>
            <p className="text-lg text-gray-600 mt-4 mb-6 max-w-lg">
              Just confirm your vehicle details and we&apos;ll have your <strong>FREE quote</strong> ready in 30 minutes.
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
