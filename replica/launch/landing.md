# Landing Page Blueprint: CardForge

---

## 1. Hero Section

- **Badge:** `⚡ DYNAMIC OPEN GRAPH ENGINE • ZERO SUBSCRIPTION LOCK-IN`
- **Headline:** Beautiful link previews. Automagically.
- **Subheadline:** Automate dynamic social share images for every page on your blog and changelog. Sub-50ms edge rendering, rich developer templates, and a visual studio.
- **Primary CTA:** `Get started for free`
- **Secondary CTA:** `View Pricing`
- **Visual:** Interactive live Before/After comparison demonstrating the difference between a plain link and a rich 1200×630 CardForge card.

---

## 2. The Problem: What Makes Other Tools Frustrating

1. **The $108/Year Recurring Tax on Static Pages:**
   Legacy tools demand $9 to $29 every single month just to generate Open Graph images for blog posts that rarely change. The moment your credit card expires, every link preview across your entire site breaks.
2. **Crawler Timeouts from Slow Headless Browsers:**
   Tools running headless Puppeteer take 2–4 seconds to boot. When Twitterbot, Discord, or Slack scrape your URL, they time out before receiving the image and display an empty box.
3. **Aggressive Free-Tier Watermarks:**
   Free users are punished with an intrusive watermark on every tweet card, devaluing their professional brand.

---

## 3. How It Works (Three Fast Steps)

```
[ Step 1: Open Studio ] ──➔ [ Step 2: Customize Card ] ──➔ [ Step 3: Copy 1 Line of Code ]
Open the visual editor and    Choose from 4 responsive      Drop the generated <meta> tag
enter your website URL to     themes, light/dark mode,      or dynamic /m URL into your
auto-extract meta tags.       and 9 SVG patterns.           Next.js or HTML template.
```

---

## 4. Key Features Built for Content Creators & Developers

- **Sub-50ms Edge Engine:** Powered by `@vercel/og` (Satori + Resvg) running on Vercel/Cloudflare edge nodes for instant Twitter card response.
- **Parametric Stateless URL API (`/m`):** Encode title, description, colors, and layout directly in the URL query string—no database lock-in or API keys to sync.
- **Live Metadata Auto-Scraper:** Enter your post URL and automatically extract page `<title>` and `<meta name="description">`.
- **4 Tailored Layout Themes:** Default, Bold, Two-Up, and E-Commerce cards designed specifically for link CTR.
- **SVG Pattern Backgrounds:** 9 clean geometric background patterns that elevate plain cards into branded graphics.
- **1-Click Snippet Generator:** Copy ready-to-use snippets for HTML `<head>`, Next.js App Router metadata, and Markdown.

---

## 5. Pricing: Predictable & Creator-Friendly

| Feature | Free Tier ($0) | Lifetime Pro ($49 One-Time) |
| :--- | :--- | :--- |
| **Price** | Free forever | **$49 once • Own forever** |
| **Web Visual Studio** | Included | Included |
| **Edge Dynamic API (`/m`)** | Included | Included |
| **Layout Themes** | Default theme | **All 4 Themes (Bold, Two-Up, E-Commerce)** |
| **Custom Brand Hex Color** | Standard 9 swatches | **Custom HEX Color Picker** |
| **Watermark** | CardForge badge | **ZERO Watermark** |
| **Impression Limits** | Unlimited | **Unlimited** |

---

## 6. Frequently Asked Questions

**Q: How does CardForge generate images so fast?**  
A: Unlike legacy tools that spin up heavy headless browsers, CardForge compiles JSX directly to vector SVGs and PNG buffers on the edge using Satori and Resvg, responding in under 50 milliseconds.

**Q: What happens if I update my blog post title?**  
A: Because CardForge is parametric, changing the `title` parameter in your `<meta>` tag immediately generates the new image upon the next crawl.

**Q: Do I need an account to use the visual studio?**  
A: No account or credit card is required to design cards and download PNGs.
