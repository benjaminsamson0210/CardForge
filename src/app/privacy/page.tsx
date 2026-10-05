import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: October 2026</p>

        <section className="mt-8 space-y-6 text-gray-700 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              When you use CardForge, we only collect necessary information required to provide our dynamic image generation services:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Public URLs and metadata (page titles, descriptions) submitted for Open Graph preview generation.</li>
              <li>Billing details processed securely through our payment provider, Stripe. We do not store raw credit card numbers on our servers.</li>
              <li>Standard technical logs (IP addresses, request headers, timestamps) strictly for rate-limiting, edge caching, and abuse prevention.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p>
              We use information collected exclusively to render social card previews, manage Pro accounts, prevent fraudulent traffic, and improve system performance.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Third-Party Service Providers</h2>
            <p>
              We integrate with trusted infrastructure providers:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Stripe:</strong> Payment processing and subscription management.</li>
              <li><strong>Vercel:</strong> Global CDN hosting and serverless Edge computing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Data Retention and Security</h2>
            <p>
              Edge-rendered image responses are cached on the CDN to ensure high-speed delivery. We employ industry-standard encryption protocols (HTTPS/TLS) across all endpoints.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Contact Us</h2>
            <p>
              For privacy-related questions, reach out to us at <a href="mailto:support@cardforge.io" className="text-purple-600 underline">support@cardforge.io</a>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
