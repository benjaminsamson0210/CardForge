'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CardPreview from '@/components/CardPreview';
import { DEFAULT_CARD_CONFIG } from '@/lib/constants';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Share2,
  CheckCircle2,
  Check,
  MessageCircle,
  Repeat,
  Heart,
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dynamic Open Graph & Twitter Cards</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
          Beautiful link previews. <br className="hidden sm:inline" />
          <span className="text-purple-600">Automagically.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Automate dynamic social share images for every page on your blog and changelog. No
          fussing with design tools or wading through generic stock photos.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/customize"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25 transition gap-2"
          >
            <span>Get started for free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 shadow-xs transition"
          >
            View Pricing
          </Link>
        </div>
        <p className="mt-2.5 text-xs text-gray-400">No credit card or account needed to design.</p>
      </section>

      {/* Before / After Showcase Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              See the difference in your social feed
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Tweets and posts with rich custom cards receive up to 150% more clicks and retweets.
            </p>
          </div>

          {/* Toggle for mobile */}
          <div className="sm:hidden flex justify-center mb-6">
            <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                onClick={() => setActiveTab('without')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg ${
                  activeTab === 'without' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setActiveTab('with')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg ${
                  activeTab === 'with' ? 'bg-purple-600 text-white shadow' : 'text-gray-500'
                }`}
              >
                With CardForge
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Before (Without Image) */}
            <div
              className={`md:col-span-5 ${
                activeTab === 'without' ? 'block' : 'hidden md:block'
              }`}
            >
              <div className="text-center font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">
                Without CardForge (Plain)
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
                {/* Simulated Post Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    RI
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">Tech Insider</p>
                    <p className="text-[11px] text-gray-400">@techinsider</p>
                  </div>
                </div>
                <p className="text-xs text-gray-800 text-left">
                  Getting Started with Modern Social Meta in 2026. Tips and breakdown here:
                </p>
                {/* Broken/Empty small preview */}
                <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                    📄
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      Modern Social Meta Guide
                    </p>
                    <p className="text-[10px] text-gray-500">gifcoins.io</p>
                  </div>
                </div>
                {/* Stats */}
                <div className="flex items-center gap-6 pt-2 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> 4
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" /> 2
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> 18
                  </span>
                </div>
              </div>
            </div>

            {/* Right: With CardForge */}
            <div
              className={`md:col-span-7 ${
                activeTab === 'with' ? 'block' : 'hidden md:block'
              }`}
            >
              <div className="text-center font-bold text-xs uppercase tracking-wider text-purple-600 mb-3 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> With CardForge (Rich 1200x630 Card)
              </div>
              <div className="bg-white border-2 border-purple-500 rounded-2xl p-4 shadow-xl space-y-3">
                {/* Post Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    RI
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-gray-900">Tech Insider</p>
                    <p className="text-[11px] text-gray-400">@techinsider</p>
                  </div>
                </div>
                <p className="text-xs text-gray-800 text-left">
                  Getting Started with Modern Social Meta in 2026. Tips and breakdown here:
                </p>
                {/* Live Card Component rendered right here */}
                <div className="w-full">
                  <CardPreview config={DEFAULT_CARD_CONFIG} />
                </div>
                {/* Stats */}
                <div className="flex items-center gap-6 pt-2 text-[11px] text-purple-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> 48
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" /> 62
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> 312
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Process */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-extrabold text-gray-900">
            Generate link previews in three simple steps
          </h3>
          <p className="text-gray-500 mt-2">No design team or complex rendering pipelines required.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Open the visual studio',
              description: 'Customize layout, typography, colors, and background patterns with instant live preview.',
              icon: Globe,
            },
            {
              step: '2',
              title: 'Enter your page details',
              description: 'Enter your site URL to auto-extract titles, or freely customize fields directly in the editor.',
              icon: Zap,
            },
            {
              step: '3',
              title: 'Copy 1 line of embed code',
              description: 'Drop the generated <meta> tag or dynamic URL into your blog, Next.js, or CMS template.',
              icon: Share2,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs relative"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-xl mb-6">
                  {item.step}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                <Icon className="w-5 h-5 text-gray-300 absolute top-8 right-8" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-purple-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <p className="text-lg text-purple-100 italic leading-relaxed">
              &quot;I used to spend 5 hours designing every social image for my blog posts in Figma. CardForge gave me a professional, automated alternative that is 100x faster!&quot;
            </p>
            <div className="pt-2">
              <p className="font-bold text-white text-base">David M.</p>
              <p className="text-xs text-purple-300">Creator & Indie Hacker</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-purple-100 italic leading-relaxed">
              &quot;CardForge is a no-brainer to install on all of our client blogs. Now our marketing team never has to think about broken Open Graph cards again.&quot;
            </p>
            <div className="pt-2">
              <p className="font-bold text-white text-base">James M.</p>
              <p className="text-xs text-purple-300">Agency Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Ready to level up your social cards?
        </h2>
        <p className="text-gray-600 mt-3 text-base">
          Start creating dynamic, automated cards in seconds.
        </p>
        <div className="mt-8">
          <Link
            href="/customize"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25 transition gap-2"
          >
            <span>Open Customizer Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>CardForge</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/customize" className="hover:text-white transition">
              Studio
            </Link>
            <Link href="/pricing" className="hover:text-white transition">
              Pricing
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <a href="mailto:support@cardforge.io" className="hover:text-white transition">
              Contact
            </a>
          </div>
          <p>© 2026 CardForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
