'use client';

import React, { useState } from 'react';
import { X, Check, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ProModal({ isOpen, onClose, onSuccess }: ProModalProps) {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: period }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // If demo mode or keys not set, activate locally
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      // Graceful fallback activation
      if (onSuccess) onSuccess();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-purple-900 to-indigo-950 text-white p-8 overflow-hidden">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/30 text-purple-200 border border-purple-400/30">
            <Sparkles className="w-3.5 h-3.5" /> CardForge Pro
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight">
            Automate all your link previews
          </h2>
          <p className="text-purple-200 text-sm mt-1">
            Remove watermarks, unlock custom colors, and get unlimited dynamic generation.
          </p>

          {/* Billing Switch */}
          <div className="mt-6 inline-flex p-1 bg-purple-950/70 rounded-xl border border-purple-800">
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                period === 'monthly' ? 'bg-purple-600 text-white shadow' : 'text-purple-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                period === 'annual' ? 'bg-purple-600 text-white shadow' : 'text-purple-300 hover:text-white'
              }`}
            >
              Annual <span className="text-[10px] bg-green-500/30 text-green-300 px-1.5 py-0.5 rounded">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-baseline mb-6">
            <span className="text-5xl font-black text-gray-900">
              {period === 'monthly' ? '$9' : '$7'}
            </span>
            <span className="text-gray-500 ml-2 font-medium text-sm">
              / month {period === 'annual' && '(billed annually)'}
            </span>
          </div>

          <ul className="space-y-3.5 text-sm text-gray-700">
            {[
              'Images without CardForge branding watermark',
              'Automated URL-based dynamic image generator (/m)',
              'Custom branded HEX color picker',
              'All premium layout themes (Bold, Two-Up, E-Commerce)',
              'Unlimited image impressions & page views',
              'Sub-50ms global edge caching',
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full mt-8 py-3.5 px-4 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Unlock Pro Features</span>
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 text-center mt-3">
            <ShieldCheck className="w-4 h-4 text-green-600" /> 30-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
