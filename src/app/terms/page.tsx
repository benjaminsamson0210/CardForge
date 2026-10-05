import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-lg text-purple-700">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>CardForge</span>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 prose prose-purple">
        <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
        <p className="text-sm text-gray-500">Last updated: October 2026</p>

        <section className="mt-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using CardForge (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Description of Service</h2>
            <p>
              CardForge provides dynamic Open Graph and Twitter Card generation tools, APIs, and customization studio interfaces for websites, blogs, and developers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Subscriptions & Billing</h2>
            <p>
              Subscriptions to CardForge Pro are billed on a recurring monthly or annual basis, or as a one-time lifetime license. Payments are handled securely via Stripe. You can cancel your subscription at any time.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Refund Policy</h2>
            <p>
              We provide a 30-day money-back guarantee for initial purchases. If you are unsatisfied with CardForge Pro within 30 days of your first payment, contact support for a full refund.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Acceptable Use</h2>
            <p>
              You agree not to use CardForge to generate or distribute illegal, abusive, infringing, or malicious content, or to intentionally overload our edge rendering infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. Limitation of Liability</h2>
            <p>
              CardForge is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We are not liable for any indirect, incidental, or consequential damages resulting from your use of the service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. Contact Information</h2>
            <p>
              If you have questions regarding these terms, contact <a href="mailto:support@cardforge.io" className="text-purple-600 underline">support@cardforge.io</a>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
