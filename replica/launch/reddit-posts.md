# Reddit Distribution Launch Kit for Shotsmith

Reddit has zero tolerance for spammy self-promotion, but actively upvotes transparent builders who share useful tools, technical breakdowns, or relatable pain points.

Below are 3 distinct, battle-tested launch angles tailored for specific communities.

---

## 1. r/SideProject (Transparent Builder & Anti-Subscription Angle)

**Target Subreddit:** `r/SideProject`  
**Best Posting Time:** Tuesday or Wednesday, 7:00 AM – 9:00 AM EST  
**Flair:** Project / Showcase

### Title Options:
1. `I got tired of $12/month subscriptions just to frame screenshots, so I built Shotsmith (100% in-browser, no account needed)`
2. `Built an in-browser screenshot studio with device mockups & film grain — free to use, no signup`

### Body Copy:
```markdown
Hey r/SideProject,

Every time I launched a product or shared a feature update on X/LinkedIn, I used the same 2-3 screenshot beautifier apps. But lately, almost every single one gated basic features behind a recurring $9-$15/month subscription:
- Want high-res exports? Subscribe.
- Want device frames? Subscribe.
- Want to remove the watermark? Subscribe.

I just wanted to drop a screenshot, wrap it in a sleek MacBook or iPhone frame, pick a clean gradient, and download a retina image.

So I built **Shotsmith** (https://shotsmith.app).

### What it does:
- **Zero server uploads:** Everything renders client-side on an HTML5 2D canvas. Your internal dashboard screenshots, private customer data, or staging URLs never leave your browser.
- **Realistic Frames:** Clean macOS dark/light windows, iPhone 16 Pro (with Dynamic Island), MacBook Pro notch chassis, and iPad frames.
- **Studio Polish:** Multi-layer soft elevation shadows, procedural 35mm film grain/noise overlay, custom blur, and 4K/retina 2x/4x export.
- **Completely free core tier:** No forced watermark on basic exports. For advanced presets and unlimited 4K exports, there's an optional one-time \$39 lifetime pass (no recurring charges).

Check it out live: https://shotsmith.app (or check our landing page at https://shotsmith.app/landing).

The app is built with Next.js 16, Tailwind CSS v4, and native Canvas 2D. 

I’d love your brutal feedback on performance, rendering glitches, or features you’d like to see next!
```

---

## 2. r/webdev (Technical Deep-Dive Angle: Client-Side Canvas Rendering)

**Target Subreddit:** `r/webdev`  
**Flair:** Showoff Saturday (only post on Saturdays if enforcing showcase rules, otherwise use Discussion / Project)

### Title:
`Showoff Saturday: Built an offline-first screenshot studio using Next.js 16 and Canvas 2D (zero server rendering, zero telemetry)`

### Body Copy:
```markdown
Hey everyone,

Wanted to share a technical walkthrough of a tool I just finished building: **Shotsmith** (https://shotsmith.app).

A lot of screenshot tools run headless Chromium (Puppeteer/Playwright) on serverless workers to render DOM nodes to PNG. That gets expensive fast, adds cold-start latency, and poses privacy concerns when users capture sensitive admin panels.

Instead, I implemented the entire rendering engine directly in the browser using an offscreen HTML5 2D Canvas pipeline.

### Interesting technical hurdles & solutions:
1. **Device Mockup Vector Math:** Rather than overlaying heavy PNG frames that blur at high resolutions, device frames (iPhone 16 Dynamic Island, MacBook aluminum bezel, macOS titlebars) are rendered procedurally as vector paths directly onto the canvas context.
2. **Procedural Film Grain:** Simulated analog film texture by generating a seeded per-pixel alpha noise buffer on an offscreen canvas and compositing it using `ctx.globalCompositeOperation = 'overlay'`.
3. **Retina 2x/4x Offscreen Upscaling:** Standard canvas exports can look blurry on high-DPI screens. We scale the rendering dimensions by the desired export multiplier (e.g., 3840x2160 for 4K), recalculate bezier radii and drop-shadow blurs proportionally, and serialize via `toBlob('image/png')`.

Live demo: https://shotsmith.app

Feedback on canvas performance or architecture is warmly appreciated!
```

---

## 3. r/SaaS (Bootstrapper / Launch Strategy Angle)

**Target Subreddit:** `r/SaaS`  
**Flair:** Case Study / Feedback

### Title:
`Launching Shotsmith: Why we chose a $39 Lifetime Deal over MRR for a micro-utility`

### Body Copy:
```markdown
Hey founders,

The conventional playbook for micro-SaaS is simple: stick a $9/mo Stripe subscription on everything.

When building **Shotsmith** (https://shotsmith.app) — a screenshot beautifier and device mockup tool for founders and marketers — I made the deliberate decision to sell a **\$39 Lifetime Deal** instead of monthly recurring subscriptions.

### Why LTD makes sense here:
1. **Zero Marginal Server Cost:** The engine runs 100% in-browser on HTML5 canvas. A user exporting 1,000 images costs me \$0.00 in compute or serverless function calls.
2. **Subscription Fatigue:** Founders and indie hackers already pay for Vercel, Supabase, GitHub, Claude/OpenAI, and domain renewals. Paying monthly for a screenshot tool creates immediate churn when the project launch finishes.
3. **High Upfront Conversion:** People are happy to pay a one-time fair price for a tool they keep forever in their utility belt.

Curious to hear how other micro-SaaS builders are approaching utility pricing in 2026!
```
