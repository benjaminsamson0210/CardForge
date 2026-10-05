'use client';

import React from 'react';
import { CardConfig, AccentColor } from '@/types/mugshot';
import { ACCENT_COLORS, getPatternSvg } from '@/lib/constants';
import { Sparkles, Package } from 'lucide-react';

interface CardPreviewProps {
  config: CardConfig;
  className?: string;
}

export default function CardPreview({ config, className = '' }: CardPreviewProps) {
  const {
    url,
    title,
    description,
    theme,
    mode,
    color,
    customHex,
    pattern,
    hideWatermark,
    price,
  } = config;

  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'yourwebsite.com';
  const isDark = mode === 'dark';

  // Accent Hex resolution
  let accentHex = '#6366f1';
  if (customHex && customHex.startsWith('#')) {
    accentHex = customHex;
  } else if (color && color in ACCENT_COLORS) {
    accentHex = ACCENT_COLORS[color].hex;
  }

  const patternSvg = getPatternSvg(pattern, accentHex);

  return (
    <div
      className={`relative w-full aspect-[1200/630] rounded-xl overflow-hidden shadow-xl border select-none transition-colors duration-200 ${
        isDark ? 'bg-gray-950 border-gray-800' : 'bg-gray-50 border-gray-200'
      } ${className}`}
      style={{
        boxShadow: isDark
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Background SVG Pattern overlay */}
      {patternSvg && (
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(patternSvg)}")`,
            backgroundRepeat: 'repeat',
          }}
        />
      )}

      {/* Internal Card Surface */}
      <div
        className={`relative w-full h-full flex flex-col overflow-hidden ${
          isDark ? 'bg-gray-900/90 text-gray-50' : 'bg-white/95 text-gray-900'
        }`}
      >
        {/* Top colored accent stripe */}
        <div
          className="w-full shrink-0 transition-all duration-200"
          style={{
            height: theme === 'bold' ? '12px' : '8px',
            backgroundColor: accentHex,
          }}
        />

        {/* Content Body by Theme */}
        {theme === 'bold' ? (
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-8">
            <p
              className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 truncate"
              style={{ color: accentHex }}
            >
              {displayUrl}
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 line-clamp-3">
              {title || 'Your Bold Headline Goes Here'}
            </h1>
            <p
              className={`text-sm sm:text-base lg:text-lg line-clamp-3 leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {description || 'Automate and elevate your content previews with instant high-converting graphics.'}
            </p>
          </div>
        ) : theme === 'two_up' ? (
          <div className="flex-1 flex items-center px-8 sm:px-12 py-6 gap-6 sm:gap-10">
            {/* Visual Icon / Avatar Box */}
            <div
              className="w-24 h-24 sm:w-36 sm:h-36 shrink-0 rounded-2xl flex items-center justify-center font-extrabold text-3xl sm:text-5xl shadow-inner border-2 transition-transform"
              style={{
                backgroundColor: `${accentHex}1a`,
                borderColor: accentHex,
                color: accentHex,
              }}
            >
              {displayUrl.charAt(0).toUpperCase()}
            </div>
            {/* Text details */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 truncate"
                style={{ color: accentHex }}
              >
                {displayUrl}
              </p>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-3 line-clamp-2">
                {title || 'Peer-to-peer appreciation made easy'}
              </h1>
              <p
                className={`text-xs sm:text-sm lg:text-base line-clamp-2 leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {description || 'Give your team members the recognition they deserve with automated dynamic share cards.'}
              </p>
            </div>
          </div>
        ) : theme === 'e_commerce' ? (
          <div className="flex-1 flex items-center px-8 sm:px-12 py-6 gap-6 sm:gap-10">
            {/* Product card showcase */}
            <div
              className={`w-32 h-36 sm:w-44 sm:h-48 shrink-0 rounded-xl flex flex-col items-center justify-center p-4 border shadow-sm ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <Package className="w-12 h-12 mb-2 text-gray-400" />
              <span
                className="text-xl sm:text-2xl font-black mt-2"
                style={{ color: accentHex }}
              >
                {price || '$29'}
              </span>
            </div>
            {/* Product text details */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 truncate"
                style={{ color: accentHex }}
              >
                {displayUrl}
              </p>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-3 line-clamp-2">
                {title || 'Limited Edition Developer Toolkit'}
              </h1>
              <p
                className={`text-xs sm:text-sm lg:text-base line-clamp-2 leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {description || 'Everything you need to launch, scale, and automate your online presence.'}
              </p>
            </div>
          </div>
        ) : (
          /* Default Theme */
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-8">
            <p
              className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 truncate"
              style={{ color: accentHex }}
            >
              {displayUrl}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug mb-4 line-clamp-2">
              {title || 'Peer-to-peer appreciation made easy'}
            </h1>
            <p
              className={`text-sm sm:text-base lg:text-lg line-clamp-3 leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {description ||
                'Give your team members the recognition they deserve and let them know how much you appreciate their efforts.'}
            </p>
          </div>
        )}

        {/* Watermark Branding (Pro Gated) */}
        {!hideWatermark && (
          <div
            className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md shadow-sm border text-[10px] sm:text-xs font-medium backdrop-blur-xs transition ${
              isDark
                ? 'bg-gray-800/95 text-gray-300 border-gray-700'
                : 'bg-white/95 text-gray-700 border-gray-200'
            }`}
          >
            <span>Image via CardForge.io</span>
            <div
              className="w-3.5 h-3.5 rounded-xs flex items-center justify-center text-white"
              style={{ backgroundColor: accentHex }}
            >
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
