'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-sm group-hover:bg-purple-700 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-purple-950">
                CardForge
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/customize"
              className="text-sm font-medium text-purple-600 hover:text-purple-800 transition"
            >
              Studio
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Pricing
            </Link>
            <a
              href="mailto:hello@cardforge.io"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Contact us
            </a>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                href="/customize"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition"
              >
                Get started for free
              </Link>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-2">
            <Link
              href="/customize"
              className="block px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Studio
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/customize"
              className="block w-full text-center mt-2 px-4 py-2 rounded-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get started for free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
