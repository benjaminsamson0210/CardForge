# Recon map: Mugshot Bot (Web)

Scope: Dynamic Open Graph / Twitter Card Generator, visual template customizer (/customize), dynamic image generation API (/m or /api/og), embed code generator, and Pro monetization.
For: Bloggers, developers, makers, and content teams who need automated social preview cards for blog posts, changelogs, and docs.
Date: 2026-10-04

---

## Sources

| # | source | URL | notes |
| :--- | :--- | :--- | :--- |
| 1 | Mugshot Bot Homepage | https://mugshotbot.com | Value proposition, before/after Twitter card comparison, testimonials, feature list |
| 2 | Visual Customizer & Studio | https://mugshotbot.com/customize | Interactive builder: website input, title & description editor, themes, light/dark mode, accent colors, background patterns, watermark toggle, live card preview, "Use this code" CTA |
| 3 | Pricing & Plans | https://mugshotbot.com/pricing | Free ($0 with watermark, limited themes) vs. Pro ($9/mo, automated URL API, watermark removal, custom brand hex color, all themes) |
| 4 | Embed Integration Flow | https://mugshotbot.com/customize | Step 1 (Customize) -> Step 2 (Use image: meta tags, markdown, HTML, direct dynamic URL) |
| 5 | Public Dynamic Endpoint | https://mugshotbot.com/m?theme=...&color=...&pattern=...&url=... | Public dynamic image generation route accepting URL query parameters |

---

## Core loop

Users enter their blog or page details, customize layout themes, accent colors, and background patterns in a real-time visual card preview, and instantly copy the dynamic URL or `<meta property="og:image">` snippet to automate social share cards across their site.

---

## Screens

| ID | screen | route / how to reach | purpose | key components | states seen |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **S01** | Landing & Hero | `/` | Conversion homepage explaining link previews with live before/after interactive demonstration | HeroSection, BeforeAfterComparison, FeatureList, TestimonialCards, PricingCTA, FooterNav | Default |
| **S02** | Visual Customizer Studio | `/customize` | The core visual builder: 2-column layout with configuration controls on the left and sticky live preview on the right | SiteInput, TitleField, DescriptionTextarea, ThemeSelector, ColorSchemeToggle, ColorPaletteGrid, CustomHexInput, PatternPicker, WatermarkCheckbox, LiveCardViewport, UseCodeCTA | Default/Blank, Populated, Theme Switched, Dark Mode, Loading/Rendering |
| **S03** | Integration / Code Snippet Modal | Modal / Step 2 on `/customize` | Provides copyable integration code snippets and direct image URLs for blog engines | CodeSnippetTabs (HTML Meta, Next.js, Markdown, Direct URL), CopyButton, TestLinkPreview | Ready, Copied feedback |
| **S04** | Pricing & Upgrade Modal | `/pricing` or trigger via Pro features | Paywall converting free users to Pro tier ($9/mo) | PricingCards (Free vs Pro), FeatureChecklist, BillingToggle (Monthly/Annual), CheckoutButton | Default, Processing, Activated |

---

## Flows

```
F01 Instant Customization & Code Retrieval (Core Loop)
    S02 (enter page URL or title/description) -> S02 (choose theme, color, pattern) -> S02 (click "Use this code") -> S03 (copy HTML <meta> tag or URL)
    happy path clicks: 3
    edge: long titles overflowing, special characters in URL, custom hex without '#'

F02 Pro Feature Unlock & Watermark Removal
    S02 (toggle "Hide branding" or click custom hex) -> S04 (Pro paywall modal) -> Stripe Checkout -> S02 (unlocked branding & custom hex)
    happy path clicks: 3
    edge: checkout cancelled, webhook delay

F03 Direct Dynamic Image Generation (API Loop)
    External crawler or browser requests `/api/og?url=...&theme=...&color=...&pattern=...` -> Server generates 1200x630 PNG -> Response with image/png and CDN cache headers
    happy path clicks: 0 (automated API call)
    edge: missing parameters (falls back to defaults), invalid color format, rate limit
```

---

## Components

| component | variants | states | used on |
| :--- | :--- | :--- | :--- |
| **Navbar** | standard, sticky | default, mobile open | S01, S02, S04 |
| **PreviewCard** | Default, Bold, Two-Up, E-Commerce | Light, Dark, 9 accent colors, 9 SVG patterns, with/without watermark | S01, S02, S03 |
| **SegmentedControl** | Light / Dark mode, Monthly / Annual | active, inactive | S02, S04 |
| **ColorSwatchPicker** | 9 preset colors + custom hex | selected, hover, pro locked | S02 |
| **PatternGrid** | 9 SVG pattern options (none, hideout, bubbles, texture, diagonal_lines, charlie_brown, lines_in_motion, topography, bank_note) | selected, hover | S02 |
| **ThemeCardGrid** | Default, Bold, Two-Up, E-Commerce | selected, hover, pro badge | S02 |
| **CopyCodeBlock** | HTML Meta, Next.js, Markdown, Raw URL | default, copied | S03 |
| **PricingCard** | Free, Pro | default, popular, active | S04 |

---

## Inferred data model

```
User          id, email, stripe_customer_id, subscription_status (free | pro), created_at
              evidence: Pricing page, Sign in / Register routes, Pro watermark gating
              confidence: high

PresetConfig  id, user_id (optional), name, website_url, title, description, theme, mode (light | dark), color, pattern, hide_watermark
              evidence: /customize form fields, URL query params
              confidence: high

ApiGeneration request_url, ip_address, generated_at, cache_status
              evidence: /m dynamic URL endpoint, CDN caching requirements
              confidence: high
```

Relationships: `User 1-n PresetConfig`

---

## Feature matrix

See `replica/features.csv`. Must: 8, should: 5, could: 3, skip: 2.

---

## Out of scope (cannot or should not be cloned)

- Third-party Swiss Made Software badge or company-specific legal entities
- Proprietary customer support Zendesk/email routing

---

## Size

Screens: 4, flows: 3, entities: 3. Hard parts: Real-time SVG pattern rendering & Satori/ImageResponse 1200×630 serverless generation with 100% WYSIWYG parity. Size: S (straightforward vertical slice).
