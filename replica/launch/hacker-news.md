# Show HN Post: CardForge

---

## Post Title
**Show HN: CardForge – Edge-rendered dynamic Open Graph generator with zero subscriptions**

---

## Post Body

Hi HN,

I built CardForge (https://cardforge.io), an open utility and API for generating dynamic Open Graph (OG) and Twitter Card images for blog posts, changelogs, and static sites.

### The Problem
Most existing services charge $9 to $29/month to generate preview images for static markdown blogs. The worst part is what happens when a subscription lapses: every single link preview across your entire site breaks simultaneously because the images were hosted on an active subscription URL.

Furthermore, many older tools render cards by launching a headless Chromium instance (Puppeteer), taking 2–4 seconds per image. When social crawlers like Twitterbot or Discordbot visit your URL, they often time out before the image finishes rendering.

### How CardForge Works
1. **Satori + Resvg on Edge:** We compile JSX and CSS directly into vector SVGs and render PNG buffers on the edge using `@vercel/og` and Satori. Response times are sub-50ms with `Cache-Control: public, max-age=31536000, immutable`.
2. **Stateless URL Engine:** You don't need to save templates to a database. Every parameter (title, theme, accent color, background pattern) is encoded into the query parameters (`/m?title=...&theme=...`).
3. **Visual Studio:** An interactive builder with real-time metadata scraping so you can test before deploying.
4. **Anti-Subscription Pricing:** A functional free tier and a $49 one-time lifetime license.

I'd love your feedback on the rendering performance, template variety, and edge caching architecture.
