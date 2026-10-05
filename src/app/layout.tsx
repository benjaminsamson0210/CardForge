import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cardforge.io'),
  title: 'CardForge | Beautiful link previews. Automagically.',
  description:
    'Automate dynamic link preview images for every page on your blog and changelog. No fussing with design tools or wading through stock photos.',
  keywords: [
    'open graph generator',
    'twitter card generator',
    'dynamic og image',
    'link preview automation',
    'social share images',
    'cardforge',
  ],
  openGraph: {
    title: 'CardForge | Beautiful link previews. Automagically.',
    description:
      'Automate dynamic link preview images for every page on your blog. Sub-50ms Edge API generation.',
    type: 'website',
    images: [
      {
        url: '/m?title=Beautiful+link+previews.+Automagically.&url=cardforge.io',
        width: 1200,
        height: 630,
        alt: 'CardForge Link Preview Card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CardForge | Beautiful link previews. Automagically.',
    description:
      'Automate dynamic link preview images for every page on your blog. Sub-50ms Edge API generation.',
    images: ['/m?title=Beautiful+link+previews.+Automagically.&url=cardforge.io'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
