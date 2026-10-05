import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    const parsedUrl = new URL(targetUrl);
    const domain = parsedUrl.hostname.replace(/^www\./, '');

    // Attempt to fetch with a strict 3-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    let html = '';
    try {
      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 CardForge/1.0',
          'Accept': 'text/html,application/xhtml+xml',
        },
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        html = await response.text();
      }
    } catch {
      clearTimeout(timeoutId);
      // Timeout or network error - gracefully return domain-based fallback
      return NextResponse.json({
        domain,
        title: domain.charAt(0).toUpperCase() + domain.slice(1),
        description: `Link preview for ${domain}`,
      });
    }

    // Extract title
    let title = '';
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
    const titleTagMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);

    if (ogTitleMatch && ogTitleMatch[1]) {
      title = ogTitleMatch[1].trim();
    } else if (titleTagMatch && titleTagMatch[1]) {
      title = titleTagMatch[1].trim();
    } else {
      title = domain.charAt(0).toUpperCase() + domain.slice(1);
    }

    // Extract description
    let description = '';
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);

    if (ogDescMatch && ogDescMatch[1]) {
      description = ogDescMatch[1].trim();
    } else if (metaDescMatch && metaDescMatch[1]) {
      description = metaDescMatch[1].trim();
    } else {
      description = `Automate link previews for ${domain} with dynamic Open Graph cards.`;
    }

    return NextResponse.json({
      domain,
      title: title.slice(0, 120),
      description: description.slice(0, 240),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Scraping failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
