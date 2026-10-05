# Architecture: Mugshot Bot Clone

Stack, database schema, API routes, and build order for the Mugshot Bot clone.

---

## Stack

| layer | technology | rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) + TypeScript | React 19 server/client components, Edge API routes |
| **Styling** | Tailwind CSS v4 | High-performance atomic styling, matches Mugshot Bot clean UI |
| **Image Generation** | `@vercel/og` (Satori + Resvg) | High-speed serverless 1200x630 PNG generation directly from JSX and SVGs |
| **Database** | Postgres (Supabase / Neon) or SQLite (Turso) | Clean relational model for user presets, accounts, and telemetry |
| **Payments** | Stripe Checkout + Webhooks | $9/mo Pro subscription with instant webhook activation |
| **Deployment** | Vercel | Instant global edge CDN caching for `/api/og` requests |

---

## Schema

See `replica/schema.sql` for complete SQL definitions with constraints and indexes.

- `users`: Tracks subscription status (`free` vs `pro`), Stripe customer/subscription IDs.
- `presets`: Saved user card designs with theme, colors, patterns, and watermark settings.
- `generation_logs`: Telemetry tracking dynamic requests, duration, and patterns.

---

## API & Route Inventory

| Method & Route | Purpose | Access | Input | Output | Flow |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `GET /` | Marketing homepage with live interactive comparison | Public | None | HTML | S01 |
| `GET /customize` | Interactive visual card studio & live preview | Public | URL query params (optional) | HTML | S02 |
| `GET /api/og` (or `/m`) | High-speed dynamic PNG Open Graph image generator | Public | `url`, `title`, `description`, `theme`, `mode`, `color`, `pattern`, `watermark` | `image/png` buffer (1200x630) | F03 |
| `POST /api/scrape` | Scrapes target URL metadata (<title>, <meta description>) | Public | `{ url: string }` | `{ title, description, domain }` | F01 |
| `POST /api/checkout` | Creates Stripe checkout session for $9/mo Pro | Public / Auth | `{ returnUrl: string }` | `{ url: string }` | F02 |
| `POST /api/webhooks/stripe` | Processes `checkout.session.completed` | Stripe | Webhook signature + event payload | `{ received: true }` | F02 |

---

## The Parts That Bite

1. **Text Truncation & Auto-Hyphenation:** Titles that are 10 words vs. 50 words must not overflow the 1200x630 canvas boundaries. Handled with responsive font-size clamping and line-clamp CSS.
2. **SVG Pattern Tiling in Satori:** Satori requires inline SVG strings or base64 data URIs for complex background patterns; standard CSS background-image SVGs must be rendered cleanly.
3. **Edge CDN Caching:** Dynamic OG images must return `Cache-Control: public, max-age=31536000, immutable` for static URLs to guarantee sub-50ms responses for social bots (Twitterbot, Discordbot, FacebookExternalHit).
4. **Scraper CORS & Timeout:** Scraping user-submitted blog URLs can time out or block bots; scraper requires a 3s timeout and graceful fallback to URL hostname parsing.

---

## Build Order

1. **Step 1 (Vertical Slice):** The 4 card layouts (Default, Bold, Two-Up, E-Commerce) with 9 patterns and 9 colors in `@vercel/og` (`/api/og`).
2. **Step 2:** The `/customize` studio screen with live interactive preview, reactive form controls, and instant card rendering.
3. **Step 3:** Step 2 integration modal (HTML `<meta>`, Next.js, Markdown code snippets + copy actions).
4. **Step 4:** Landing page (`/`) with Before/After comparison and marketing cards.
5. **Step 5:** Pro paywall modal & Stripe integration.
