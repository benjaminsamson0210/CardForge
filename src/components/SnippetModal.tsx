'use client';

import React, { useState } from 'react';
import { CardConfig } from '@/types/mugshot';
import { X, Check, Copy, Code2, Link as LinkIcon, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CardConfig;
}

export default function SnippetModal({ isOpen, onClose, config }: SnippetModalProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'nextjs' | 'markdown' | 'url'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Construct dynamic URL based on current origin
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://cardforge.io';
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

  const dynamicUrl = `${baseUrl}/m?${params.toString()}`;

  const snippets = {
    html: `<!-- Open Graph / Twitter Preview Image -->
<meta property="og:image" content="${dynamicUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${dynamicUrl}" />`,

    nextjs: `// Next.js App Router (app/layout.tsx or page.tsx)
export const metadata = {
  openGraph: {
    images: [
      {
        url: '${dynamicUrl}',
        width: 1200,
        height: 630,
        alt: '${config.title}',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['${dynamicUrl}'],
  },
};`,

    markdown: `![${config.title}](${dynamicUrl})`,

    url: dynamicUrl,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Step 2: Use image on your website</h2>
              <p className="text-xs text-gray-500">Copy this code snippet directly into your head tag or template.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-6 gap-2">
          {[
            { id: 'html', label: 'HTML <head>' },
            { id: 'nextjs', label: 'Next.js Metadata' },
            { id: 'markdown', label: 'Markdown' },
            { id: 'url', label: 'Direct Dynamic URL' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-700 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="p-6">
          <div className="relative rounded-xl bg-gray-900 text-gray-100 p-4 font-mono text-xs overflow-x-auto shadow-inner border border-gray-800">
            <pre className="whitespace-pre-wrap break-all leading-relaxed">
              {snippets[activeTab]}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-medium shadow transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <LinkIcon className="w-3.5 h-3.5 text-purple-600" />
              Dynamic URLs are cached at the edge for sub-50ms delivery.
            </span>
            <a
              href={dynamicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium hover:underline"
            >
              Test Live URL <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/60 rounded-lg transition"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition"
          >
            {copied ? 'Copied to Clipboard' : 'Copy Snippet'}
          </button>
        </div>
      </div>
    </div>
  );
}
