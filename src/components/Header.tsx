'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBrandsOpen, setIsBrandsOpen] = useState(false)
  const [isTypesOpen, setIsTypesOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [mBrandsOpen, setMBrandsOpen] = useState(false)
  const [mTypesOpen, setMTypesOpen] = useState(false)
  const [mContactOpen, setMContactOpen] = useState(false)

  // timers to avoid flicker on small gaps between trigger and panel
  const brandsTimer = useRef<NodeJS.Timeout | null>(null)
  const typesTimer = useRef<NodeJS.Timeout | null>(null)
  const contactTimer = useRef<NodeJS.Timeout | null>(null)

  const clearTimer = (ref: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (ref.current) {
      clearTimeout(ref.current)
      ref.current = null
    }
  }

  const scheduleClose = useCallback((setter: (v: boolean) => void, ref: React.MutableRefObject<NodeJS.Timeout | null>) => {
    clearTimer(ref)
    ref.current = setTimeout(() => setter(false), 100)
  }, [])

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 text-gray-700 border-b-2 border-brand-yellow" style={{ borderColor: '#FFC325' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-5 gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" >
              <Image
               src='/brand-guideline/autosell-logo/PNG/1 (1).png'
               alt='Auto-Sell.ai, The smart way to sell cars'
               width={260}
               height={130}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center space-x-5">
            <Link href="/#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">
              How It Works
            </Link>
            
            {/* Brands Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { clearTimer(brandsTimer); setIsBrandsOpen(true) }}
              onMouseLeave={() => scheduleClose(setIsBrandsOpen, brandsTimer)}
            >
              <button
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm flex items-center gap-1"
              >
                Brands
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isBrandsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-56 bg-white text-zinc-100 rounded-lg shadow-2xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => { clearTimer(brandsTimer); setIsBrandsOpen(true) }}
                  onMouseLeave={() => scheduleClose(setIsBrandsOpen, brandsTimer)}
                >
                  {/* Hover buffer to prevent gap-induced mouseleave */}
                  <div className="absolute -top-2 left-0 right-0 h-2"></div>
                  {['Toyota', 'Ford', 'Holden', 'Mazda', 'Honda', 'Nissan', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Hyundai', 'Kia'].map((brand) => (
                    <Link
                      key={brand}
                      href={`/sell-${brand.toLowerCase()}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {brand}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Types Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { clearTimer(typesTimer); setIsTypesOpen(true) }}
              onMouseLeave={() => scheduleClose(setIsTypesOpen, typesTimer)}
            >
              <button
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm flex items-center gap-1"
              >
                Types
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTypesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-56 bg-white text-zinc-100 rounded-lg shadow-2xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => { clearTimer(typesTimer); setIsTypesOpen(true) }}
                  onMouseLeave={() => scheduleClose(setIsTypesOpen, typesTimer)}
                >
                  <div className="absolute -top-2 left-0 right-0 h-2"></div>
                  {[
                    { type: 'Cars', href: '/sell-used-cars' },
                    { type: 'SUVs', href: '/sell-suvs' },
                    { type: 'Utes', href: '/sell-utes' },
                    { type: 'Trucks', href: '/sell-trucks' },
                    { type: 'Vans', href: '/sell-van' },
                    { type: 'Motorcycles', href: '/sell-motorcycle' },
                    { type: 'Damaged Cars', href: '/cash-for-damaged-cars' }
                  ].map((item) => (
                    <Link
                      key={item.type}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.type}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            <Link href='/how-to-sell-car-fast' className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">
              Sell Fast
            </Link>
            <Link href='/car-valuation-guide' className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm">
              Valuation Guide
            </Link>
            
            {/* Contact Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { clearTimer(contactTimer); setIsContactOpen(true) }}
              onMouseLeave={() => scheduleClose(setIsContactOpen, contactTimer)}
            >
              <button
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm flex items-center gap-1"
              >
                Contact
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isContactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-56 bg-white text-zinc-100 rounded-lg shadow-2xl border border-gray-200 py-2 z-50"
                  onMouseEnter={() => { clearTimer(contactTimer); setIsContactOpen(true) }}
                  onMouseLeave={() => scheduleClose(setIsContactOpen, contactTimer)}
                >
                  <div className="absolute -top-2 left-0 right-0 h-2"></div>
                  <Link href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Contact Us
                  </Link>
                  <Link href="/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Blog
                  </Link>
                  <Link href="/#reviews" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    Reviews
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                    FAQ
                  </Link>
                </motion.div>
              )}
            </div>

            <Link
              href="/#sell-form"
              className="ml-auto px-5 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 text-sm"
              style={{ backgroundColor: '#FFC325', color: '#ffffff' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6af1f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFC325'}
            >
              Get Free Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 cursor-pointer"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:hidden py-4 border-t border-gray-200 bg-white"
            >
              <div className="flex flex-col space-y-1 text-gray-700">
                <Link
                    href="/#how-it-works"
                    className="py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>

                {/* Brands accordion */}
                <div>
                  <button
                      type="button"
                      aria-expanded={mBrandsOpen}
                      aria-controls="m-brands-panel"
                      onClick={() => setMBrandsOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-700 hover:text-gray-900"
                  >
                    <span>Brands</span>
                    <svg className={`w-4 h-4 transition-transform ${mBrandsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <motion.div
                      id="m-brands-panel"
                      initial={false}
                      animate={{ height: mBrandsOpen ? 'auto' : 0, opacity: mBrandsOpen ? 1 : 0 }}
                      className="overflow-hidden"
                  >
                    <div className="ml-4 mt-2 grid grid-cols-2 gap-2">
                      {['Toyota', 'Ford', 'Holden', 'Mazda', 'Honda', 'Nissan', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Hyundai', 'Kia'].map((brand) => (
                          <Link
                              key={brand}
                              href={`/sell-${brand.toLowerCase()}`}
                              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                          >
                            {brand}
                          </Link>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Types accordion */}
                <div>
                  <button
                      type="button"
                      aria-expanded={mTypesOpen}
                      aria-controls="m-types-panel"
                      onClick={() => setMTypesOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-700 hover:text-gray-900"
                  >
                    <span>Types</span>
                    <svg className={`w-4 h-4 transition-transform ${mTypesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <motion.div
                      id="m-types-panel"
                      initial={false}
                      animate={{ height: mTypesOpen ? 'auto' : 0, opacity: mTypesOpen ? 1 : 0 }}
                      className="overflow-hidden"
                  >
                    <div className="ml-4 mt-2 grid grid-cols-2 gap-2">
                      {[
                        { type: 'Cars', href: '/sell-used-cars' },
                        { type: 'SUVs', href: '/sell-suvs' },
                        { type: 'Utes', href: '/sell-utes' },
                        { type: 'Trucks', href: '/sell-trucks' },
                        { type: 'Vans', href: '/sell-van' },
                        { type: 'Motorcycles', href: '/sell-motorcycle' },
                        { type: 'Damaged Cars', href: '/cash-for-damaged-cars' },
                      ].map((item) => (
                          <Link
                              key={item.type}
                              href={item.href}
                              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                          >
                            {item.type}
                          </Link>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Contact accordion (optional, to mirror desktop "Contact" dropdown) */}
                <div>
                  <button
                      type="button"
                      aria-expanded={mContactOpen}
                      aria-controls="m-contact-panel"
                      onClick={() => setMContactOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-2 text-left font-medium text-gray-700 hover:text-gray-900"
                  >
                    <span>Contact</span>
                    <svg className={`w-4 h-4 transition-transform ${mContactOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <motion.div
                      id="m-contact-panel"
                      initial={false}
                      animate={{ height: mContactOpen ? 'auto' : 0, opacity: mContactOpen ? 1 : 0 }}
                      className="overflow-hidden"
                  >
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                      <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                      <Link href="/#reviews" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Reviews</Link>
                      <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                    </div>
                  </motion.div>
                </div>

                {/* Standalone links */}
                <Link
                    href="/how-to-sell-car-fast"
                    className="py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                  Sell Fast
                </Link>
                <Link
                    href="/car-valuation-guide"
                    className="py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                  Valuation Guide
                </Link>

                <Link
                    href="/#sell-form"
                    className="px-6 py-3 rounded-lg font-bold transition-colors text-center"
                    style={{ backgroundColor: '#FFC325', color: '#ffffff' }}
                    onClick={() => setIsMenuOpen(false)}
                >
                  Get Free Quote
                </Link>
              </div>
            </motion.div>
        )}
      </div>
    </header>
  )
}