'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProModal from '@/components/ProModal';
import { Check, Minus, Sparkles, ShieldCheck } from 'lucide-react';

export default function PricingPage() {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [showProModal, setShowProModal] = useState(false);
  const [isPro, setIsPro] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gray-900 text-white pt-16 pb-28 px-4 text-center">
        <span className="text-xs font-bold tracking-widest uppercase text-purple-400">
          CardForge Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mt-2 tracking-tight">
          Level up your link preview images
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto mt-3 text-base">
          Create dynamic, automated social share preview images for your blog. Automatically.
        </p>

        {/* Billing Switch */}
        <div className="mt-8 inline-flex p-1 bg-gray-800 rounded-xl border border-gray-700">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
              period === 'monthly' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('annual')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              period === 'annual' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            Annual <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="-mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                Free
              </span>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-black text-gray-900">$0</span>
                <span className="text-gray-500 ml-2 text-sm">forever</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Great for manually creating individual cards on our web studio.
              </p>

              <hr className="my-6 border-gray-100" />

              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Web-based visual studio generator</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Minus className="w-5 h-5 text-gray-300 shrink-0" />
                  <span>No automated URL generation (/m)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Minus className="w-5 h-5 text-gray-300 shrink-0" />
                  <span>CardForge watermark on all images</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Minus className="w-5 h-5 text-gray-300 shrink-0" />
                  <span>Limited themes (Default only)</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/customize"
                className="w-full block py-3 text-center rounded-xl font-bold text-gray-900 bg-gray-100 hover:bg-gray-200 transition"
              >
                Get started for free
              </Link>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-purple-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-xs">
              Popular
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                Pro
              </span>
              <div className="mt-4 flex items-baseline">
                <span className="text-5xl font-black text-gray-900">
                  {period === 'monthly' ? '$9' : '$7'}
                </span>
                <span className="text-gray-500 ml-2 text-sm">/ month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Perfect for blogs, changelogs, and content sites needing dynamic automated generation.
              </p>

              <hr className="my-6 border-gray-100" />

              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Web-based visual studio generator</span>
                </li>
                <li className="flex items-center gap-3 font-semibold text-purple-900">
                  <Check className="w-5 h-5 text-purple-600 shrink-0" />
                  <span>Automated URL-based image generator (/m)</span>
                </li>
                <li className="flex items-center gap-3 font-semibold text-purple-900">
                  <Check className="w-5 h-5 text-purple-600 shrink-0" />
                  <span>Images without CardForge branding</span>
                </li>
                <li className="flex items-center gap-3 font-semibold text-purple-900">
                  <Check className="w-5 h-5 text-purple-600 shrink-0" />
                  <span>All premium themes (Bold, Two-Up, E-Commerce)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Unlimited image impressions / requests</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Custom brand Hex color picker</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowProModal(true)}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/25 transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Unlock Pro features</span>
              </button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 text-center mt-3">
                <ShieldCheck className="w-4 h-4 text-green-600" /> 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white text-gray-500 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 text-center text-xs mt-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>CardForge</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <Link href="/customize" className="hover:text-gray-900 transition">
              Studio
            </Link>
            <Link href="/privacy" className="hover:text-gray-900 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 transition">
              Terms
            </Link>
            <a href="mailto:support@cardforge.io" className="hover:text-gray-900 transition">
              Contact
            </a>
          </div>
          <p>© 2026 CardForge. All rights reserved.</p>
        </div>
      </footer>

      <ProModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        onSuccess={() => setIsPro(true)}
      />
    </div>
  );
}
