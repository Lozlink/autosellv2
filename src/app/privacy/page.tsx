import type { Metadata } from 'next'
import Header from '@/components/Header'


export const metadata: Metadata = {
  title: "Privacy Policy - Auto-Sell.ai",
  description: "Privacy policy for Auto-Sell.ai. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: 'https://auto-sell.ai/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-AU')}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Auto-Sell.ai (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our car buying service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name and contact details (email, phone number)</li>
                <li>Vehicle information (make, model, year, VIN, registration)</li>
                <li>Location information (postcode, address)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Technical Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide car quoting and buying services</li>
                <li>Communicate with you about your quote and transaction</li>
                <li>Process payments and complete transactions</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With your explicit consent</li>
                <li>To complete your vehicle transaction (e.g., PPSR checks, finance companies)</li>
                <li>With service providers who assist our operations (under strict confidentiality agreements)</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
              <p className="mb-4">
                We retain your personal information only as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our services</li>
              </ul>
              <p className="mb-4">
                Transaction records are typically retained for 7 years for tax and legal compliance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
              <p className="mb-4">
                Under Australian privacy law, you have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge a complaint with the Privacy Commissioner</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage</li>
                <li>Improve website functionality</li>
                <li>Provide personalized content</li>
              </ul>
              <p className="mb-4">
                You can control cookie settings through your browser preferences.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Third-Party Services</h2>
              <p className="mb-4">
                Our website may contain links to third-party services. We are not responsible for their privacy practices. 
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>EmailJS for email communications</li>
                <li>Supabase for data storage</li>
                <li>Vercel for hosting and performance monitoring</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. International Transfers</h2>
              <p className="mb-4">
                Your personal information is primarily stored and processed in Australia. 
                If we need to transfer data internationally, we ensure appropriate safeguards are in place.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Children&apos;s Privacy</h2>
              <p className="mb-4">
                Our services are not intended for individuals under 18 years of age. 
                We do not knowingly collect personal information from children.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on our website and updating the &quot;Last updated&quot; date.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy or our privacy practices, contact us at:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Email: privacy@Auto-Sell.ai</li>
                <li>Phone: 0492 858 699</li>
                <li>Address: 1017 Canley Vale Rd, Wetherill Park NSW 2164</li>
                <li>Privacy Officer: The Privacy Officer</li>
              </ul>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This Privacy Policy is designed to comply with the Australian Privacy Principles 
                  and relevant privacy legislation. If you believe we have not handled your personal information 
                  appropriately, please contact us first, and we will work to resolve your concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}
