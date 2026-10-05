'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CardPreview from '@/components/CardPreview';
import SnippetModal from '@/components/SnippetModal';
import ProModal from '@/components/ProModal';
import { ACCENT_COLORS, DEFAULT_CARD_CONFIG, PATTERNS, THEMES } from '@/lib/constants';
import { AccentColor, CardConfig, ColorMode, PatternType, ThemeType } from '@/types/mugshot';
import {
  Sparkles,
  RotateCcw,
  Code2,
  Download,
  Share2,
  Lock,
  Sun,
  Moon,
  Check,
  Globe,
  Loader2,
} from 'lucide-react';

export default function CustomizePage() {
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CARD_CONFIG);
  const [isPro, setIsPro] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showSnippetModal, setShowSnippetModal] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);

  // Field change handlers
  const handleUrlBlur = async () => {
    if (!config.url || config.url.trim().length === 0) return;
    setIsFetchingUrl(true);
    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: config.url }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.title || data.description) {
          setConfig((prev) => ({
            ...prev,
            title: data.title || prev.title,
            description: data.description || prev.description,
            url: data.domain || prev.url,
          }));
        }
      }
    } catch {
      // Ignore network errors, user can enter manually
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const resetTitle = () => {
    setConfig((prev) => ({ ...prev, title: DEFAULT_CARD_CONFIG.title }));
  };

  const resetDescription = () => {
    setConfig((prev) => ({ ...prev, description: DEFAULT_CARD_CONFIG.description }));
  };

  const selectTheme = (theme: ThemeType, isThemePro?: boolean) => {
    if (isThemePro && !isPro) {
      setShowProModal(true);
      return;
    }
    setConfig((prev) => ({ ...prev, theme }));
  };

  const selectColor = (color: AccentColor) => {
    setConfig((prev) => ({ ...prev, color, customHex: undefined }));
  };

  const selectPattern = (pattern: PatternType) => {
    setConfig((prev) => ({ ...prev, pattern }));
  };

  const toggleWatermark = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPro) {
      setShowProModal(true);
      return;
    }
    setConfig((prev) => ({ ...prev, hideWatermark: e.target.checked }));
  };

  const handleDownloadPng = async () => {
    const params = new URLSearchParams();
    if (config.url) params.set('url', config.url);
    if (config.title) params.set('title', config.title);
    if (config.description) params.set('description', config.description);
    if (config.theme !== 'default') params.set('theme', config.theme);
    if (config.mode !== 'light') params.set('mode', config.mode);
    if (config.color !== 'indigo') params.set('color', config.color);
    if (config.customHex) params.set('color', config.customHex);
    if (config.pattern !== 'none') params.set('pattern', config.pattern);
    if (config.hideWatermark) params.set('hide_watermark', '1');

    const downloadUrl = `/m?${params.toString()}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${config.url || 'card'}-preview.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Customizer Controls */}
          <div className="lg:col-span-5 space-y-8 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200">
            {/* Step Indicators */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-6">
              <div className="border-l-4 border-purple-600 pl-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block">
                  Step 1
                </span>
                <span className="text-sm font-semibold text-gray-900">Customize</span>
              </div>
              <button
                onClick={() => setShowSnippetModal(true)}
                className="border-l-4 border-gray-200 pl-3 text-left hover:border-purple-300 transition"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                  Step 2
                </span>
                <span className="text-sm font-semibold text-gray-500 hover:text-gray-900">
                  Use image
                </span>
              </button>
            </div>

            {/* Website Section */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="url-input" className="block text-base font-bold text-gray-900">
                  Website
                </label>
                {isFetchingUrl && (
                  <span className="flex items-center gap-1.5 text-xs text-purple-600">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Fetching meta...
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                What page are you creating a link preview for?
              </p>
              <div className="mt-3 relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Globe className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-sm text-gray-500">https://</span>
                </div>
                <input
                  id="url-input"
                  type="text"
                  value={config.url}
                  onChange={(e) => setConfig({ ...config, url: e.target.value })}
                  onBlur={handleUrlBlur}
                  placeholder="gifcoins.io"
                  className="block w-full pl-24 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition"
                />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="title-input" className="text-sm font-semibold text-gray-800">
                    Title
                  </label>
                  <button
                    onClick={resetTitle}
                    type="button"
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
                <input
                  id="title-input"
                  type="text"
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  className="mt-1.5 block w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="desc-input" className="text-sm font-semibold text-gray-800">
                    Description
                  </label>
                  <button
                    onClick={resetDescription}
                    type="button"
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
                <textarea
                  id="desc-input"
                  rows={3}
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  className="mt-1.5 block w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition"
                />
              </div>
            </div>

            {/* Theme Selector */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-base font-bold text-gray-900">Theme</label>
              <p className="text-xs text-gray-500 mt-0.5">The overall appearance and layout of your card.</p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {THEMES.map((themeOption) => {
                  const isSelected = config.theme === themeOption.id;
                  return (
                    <button
                      key={themeOption.id}
                      type="button"
                      onClick={() => selectTheme(themeOption.id, themeOption.isPro)}
                      className={`relative p-3 rounded-xl border-2 text-left transition ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/40 shadow-xs'
                          : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                          {themeOption.label}
                        </span>
                        {themeOption.isPro && !isPro && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">
                            <Lock className="w-2.5 h-2.5" /> PRO
                          </span>
                        )}
                        {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                        {themeOption.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Scheme Switch */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-base font-bold text-gray-900">Color scheme</label>
              <p className="text-xs text-gray-500 mt-0.5">Dark mode inverts the background and surface contrast.</p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                ].map((modeOption) => {
                  const isSelected = config.mode === modeOption.id;
                  const Icon = modeOption.icon;
                  return (
                    <button
                      key={modeOption.id}
                      type="button"
                      onClick={() => setConfig({ ...config, mode: modeOption.id as ColorMode })}
                      className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 font-semibold text-xs uppercase tracking-wide transition ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/40 text-purple-900 shadow-xs'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{modeOption.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Swatches */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-base font-bold text-gray-900">Accent Color</label>
              <p className="text-xs text-gray-500 mt-0.5">Accent border, domain stamp, and pattern tint.</p>
              <div className="flex flex-wrap gap-2.5 mt-3">
                {(Object.keys(ACCENT_COLORS) as AccentColor[]).map((cKey) => {
                  const isSelected = config.color === cKey && !config.customHex;
                  const colorObj = ACCENT_COLORS[cKey];
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => selectColor(cKey)}
                      title={colorObj.label}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition hover:scale-105 ${
                        colorObj.bgClass
                      } ${isSelected ? 'ring-2 ring-offset-2 ring-purple-600' : ''}`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Hex Color (Pro Gated) */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700">Custom Hex:</span>
                <div className="relative flex items-center">
                  <span className="absolute left-2.5 text-xs text-gray-400">#</span>
                  <input
                    type="text"
                    placeholder="7c3aed"
                    disabled={!isPro}
                    value={config.customHex ? config.customHex.replace('#', '') : ''}
                    onChange={(e) =>
                      setConfig({ ...config, customHex: `#${e.target.value.replace('#', '')}` })
                    }
                    className="pl-6 pr-2 py-1 text-xs border border-gray-300 rounded-md w-28 disabled:bg-gray-100 outline-none focus:ring-1 focus:ring-purple-600"
                  />
                </div>
                {!isPro && (
                  <button
                    onClick={() => setShowProModal(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-800"
                  >
                    <Lock className="w-3 h-3" /> Unlock with Pro
                  </button>
                )}
              </div>
            </div>

            {/* Background Pattern */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-base font-bold text-gray-900">Background pattern</label>
              <p className="text-xs text-gray-500 mt-0.5">Tinted subtly with the selected accent color.</p>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {PATTERNS.map((p) => {
                  const isSelected = config.pattern === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => selectPattern(p.id)}
                      className={`p-2 rounded-lg border text-center text-xs font-medium transition ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/50 text-purple-900 font-bold shadow-xs'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Branding Watermark */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-base font-bold text-gray-900">CardForge branding</label>
              <div className="mt-3 flex items-start gap-3">
                <input
                  id="watermark-toggle"
                  type="checkbox"
                  checked={config.hideWatermark}
                  onChange={toggleWatermark}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                />
                <label htmlFor="watermark-toggle" className="text-xs text-gray-600 cursor-pointer">
                  <span className="font-semibold text-gray-900 block">Hide branding watermark</span>
                  Removes the &quot;Image via CardForge.io&quot; badge from the bottom right corner.
                  {!isPro && (
                    <span className="inline-flex items-center gap-1 text-purple-600 font-bold ml-1">
                      (Requires Pro)
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Live Preview */}
          <div className="lg:col-span-7 mt-8 lg:mt-0 sticky top-24 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Your Link Preview Image
                </span>
                <span className="text-xs text-gray-400 font-mono">1200 × 630 px</span>
              </div>

              {/* Real-time Card Viewport */}
              <div className="w-full">
                <CardPreview config={config} />
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowSnippetModal(true)}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Use this code on my site</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 transition"
                  title="Download 1200x630 PNG"
                >
                  <Download className="w-4 h-4" />
                  <span>PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSnippetModal(true)}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 transition"
                  title="Share or embed"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pro Callout Banner */}
            {!isPro && (
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-300" /> Need dynamic URLs for all your blog posts?
                  </h4>
                  <p className="text-xs text-purple-200 mt-1">
                    Upgrade to Pro for $9/mo to unlock unlimited URL generation, custom hex colors, and remove the watermark.
                  </p>
                </div>
                <button
                  onClick={() => setShowProModal(true)}
                  className="shrink-0 px-4 py-2 bg-white text-purple-900 font-bold text-xs rounded-lg hover:bg-purple-50 shadow transition"
                >
                  Unlock Pro
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <SnippetModal
        isOpen={showSnippetModal}
        onClose={() => setShowSnippetModal(false)}
        config={config}
      />
      <ProModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        onSuccess={() => setIsPro(true)}
      />
    </div>
  );
}
