import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Terms and Conditions - Auto-Sell.ai",
  description: "Terms and conditions for Auto-Sell.ai car buying service. Read our service terms, payment conditions, and customer obligations.",
  alternates: {
    canonical: 'https://auto-sell.ai/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-AU')}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Service Overview</h2>
              <p className="mb-4">
                Auto-Sell.ai provides car buying services across Australia. We offer instant quotes, on-site inspections, 
                and same-day payment for vehicles in any condition.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Quote Process</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Quotes are provided within 30 minutes of form submission during business hours</li>
                <li>Quotes are valid for 24 hours from the time of issue</li>
                <li>Quotes are based on information provided and may be adjusted after inspection</li>
                <li>We reserve the right to decline any vehicle at our discretion</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Vehicle Requirements</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Vehicle must have clear title and no outstanding finance</li>
                <li>All keys and documentation must be provided</li>
                <li>Vehicle must be available for inspection at the agreed location</li>
                <li>Any modifications must be declared</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Inspection and Valuation</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Inspections are conducted by qualified assessors</li>
                <li>Final price may differ from initial quote based on actual condition</li>
                <li>Major undisclosed damage may result in price adjustment or offer withdrawal</li>
                <li>We use industry-standard valuation methods and market data</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Payment Terms</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Payment is made via OSKO transfer on the same day as inspection</li>
                <li>Payment is only made after all paperwork is completed</li>
                <li>No cash payments are offered for security reasons</li>
                <li>Payment is made to the registered owner of the vehicle</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Best Price Guarantee</h2>
              <p className="mb-4">
                Our Best Price Guarantee applies to like-for-like offers from licensed car dealers. 
                To claim, you must provide a written offer from a licensed dealer within 7 days of our quote. 
                We will beat that offer by $100 or match it if we cannot beat it.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Cancellation Policy</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You may cancel at any time before signing the sale agreement</li>
                <li>No fees are charged for cancellation</li>
                <li>We may cancel if vehicle condition differs significantly from description</li>
                <li>We may cancel if required documentation cannot be provided</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Service Areas</h2>
              <p className="mb-4">
                We service all of Australia including major cities, regional areas, and remote locations. 
                Travel fees may apply for locations more than 50km from our nearest office.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Business Hours</h2>
              <p className="mb-4">
                We are open 7 days a week from 8:00 AM to 6:00 PM AEST. 
                Emergency after-hours service may be available for urgent cases.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Privacy and Data</h2>
              <p className="mb-4">
                Your personal information is collected and used in accordance with our Privacy Policy. 
                We do not share your information with third parties without consent.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Complaints and Disputes</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We aim to resolve all complaints within 48 hours</li>
                <li>If you&apos;re not satisfied, you may escalate to our management team</li>
                <li>We are members of relevant industry associations and follow their codes of conduct</li>
                <li>Legal disputes will be resolved in accordance with Australian law</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Limitation of Liability</h2>
              <p className="mb-4">
                Our liability is limited to the amount paid for your vehicle. 
                We are not liable for indirect or consequential damages.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Changes to Terms</h2>
              <p className="mb-4">
                We may update these terms from time to time. 
                Continued use of our service constitutes acceptance of updated terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Contact Information</h2>
              <p className="mb-4">
                For questions about these terms, contact us at:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Phone: 1800 AUTO SELL</li>
                <li>Email: legal@Auto-Sell.ai</li>
                <li>Address: 1017 Canley Vale Rd, Wetherill Park NSW 2164</li>
                <li>ABN: 87 689 164 832</li>
              </ul>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> These terms are a general guide. Specific terms may apply to your transaction. 
                  Please read all documentation carefully before proceeding with any sale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
