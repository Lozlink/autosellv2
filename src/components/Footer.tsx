import Link from 'next/link'
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t-2" style={{ borderColor: '#FFC325' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:py-8 md:pb-8">
        {/* Top grid: Company, Quick Links, Services (exactly like screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16 xl:gap-24">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-between items-center">
              {/* Logo */}
              <div className="flex items-center py-2">
                <Link href="/" >
                  <Image
                    src='/brand-guideline/autosell-logo/PNG/1 (1).png'
                    alt='Auto-Sell.ai, The smart way to sell cars'
                    width={250}
                    height={100}
                    className="w-[180px] md:w-[250px] h-auto"
                  />
                </Link>
              </div>
            </div>
            <p className="text-gray-400 mb-3 md:mb-4 max-w-md mx-auto md:mx-0 text-sm md:text-base">
              Get your FREE car valuation in 30 minutes. Same-day OSKO payment, 
              on-site inspections, and we come to you anywhere in Australia.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="tel:0492 858 699" className="text-brand-black hover:text-gray-900 font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0492 858 699
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#sell-form" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-gray-600 hover:text-gray-800 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-600 hover:text-gray-800 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-gray-800">Services</h4>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/#sell-form" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Free Car Valuation
                </Link>
              </li>
              <li>
                <Link href="/value-propositions/immediate-payment" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Same-Day Payment
                </Link>
              </li>
              <li>
                <Link href="/value-propositions/on-site-inspections" className="text-gray-600 hover:text-gray-800 transition-colors">
                  On-Site Inspections
                </Link>
              </li>
              <li>
                <Link href="/car-valuation-guide" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Car Valuation Guide
                </Link>
              </li>
              <li>
                <Link href="/value-propositions/smooth-sales-process" className="text-gray-600 hover:text-gray-800 transition-colors">
                  Smooth Sales Process
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-6 pt-4 md:mt-8 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-500 text-sm mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Auto-Sell.ai. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link href="/privacy" className="text-zinc-500 hover:text-gray-800 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-500 hover:text-gray-800 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/contact" className="text-zinc-500 hover:text-gray-800 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}