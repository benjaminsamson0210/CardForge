# Component Specifications: Mugshot Bot Clone

Design specifications for components across S01 (Landing), S02 (Customizer Studio), S03 (Snippet Modal), and S04 (Pro Modal).

---

## 1. Navbar
- **variants:** standard, sticky
- **sizes:** height 64px, container max-w-7xl
- **states:** default, mobile menu toggled
- **tokens:** bg surface, border border, text text, font sm/600
- **a11y:** semantic `<nav>`, aria-expanded on mobile menu button, keyboard focusable links
- **used on:** S01, S02, S04

---

## 2. PreviewCard
- **variants:**
  - `default`: Top colored accent bar, uppercase site domain, bold H1 title, muted description, Mugshot watermark badge.
  - `bold`: Clean high-contrast card with oversized typography and vibrant accent strip.
  - `two_up`: Split layout with thumbnail/avatar square on left and typography on right.
  - `e_commerce`: Product showcase with product image container, title, price badge, and site stamp.
- **sizes:** 1200x630 (aspect ratio 1.905:1), responsive scale for viewport preview (600x315)
- **states:** light mode, dark mode, 9 accent colors, 9 background SVG patterns, with/without watermark
- **tokens:** bg surface or gray-900, text text, font display/800 and base/400
- **a11y:** container `role="img"`, aria-label matching active page title
- **used on:** S01, S02, S03

---

## 3. ThemeSelector
- **variants:** 2x2 grid of selectable miniature card wireframes
- **states:** default, hovered, checked/selected (purple radio border + check icon), pro badge indicator
- **tokens:** bg surface, border border, ring accent
- **a11y:** `role="radiogroup"`, `aria-checked`, keyboard arrow navigation
- **used on:** S02

---

## 4. ColorSwatchPicker
- **variants:** 9 circle swatches (Red, Orange, Yellow, Green, Teal, Blue, Indigo, Purple, Pink) + Custom Hex input
- **states:** default, hover, checked (inner checkmark icon), pro gated for custom hex
- **tokens:** radius pill, ring-offset-2 ring-accent
- **a11y:** `role="radiogroup"`, `aria-label="Accent color"`
- **used on:** S02

---

## 5. PatternPicker
- **variants:** 9 SVG pattern thumbnails (None, Hideout, Bubbles, Texture, Diagonal Lines, Charlie Brown, Lines in Motion, Topography, Bank Note)
- **states:** default, hover, selected (accent border + checkmark)
- **tokens:** radius md, border border
- **a11y:** `role="radiogroup"`
- **used on:** S02

---

## 6. CodeSnippetModal
- **variants:** Tabs for HTML `<meta>`, Next.js Metadata, Markdown, Direct Dynamic URL
- **states:** default, copying, copied toast
- **tokens:** bg gray-900, font mono/sm, text gray-100, accent button
- **a11y:** `role="dialog"`, `aria-modal="true"`, focus trap, Esc key dismiss
- **used on:** S03

---

## 7. ProModal
- **variants:** Monthly ($9/mo) and Annual ($89/yr) plans
- **states:** default, loading checkout, success
- **tokens:** bg surface, radius lg, shadow pop
- **a11y:** `role="dialog"`, `aria-modal="true"`, accessible close button
- **used on:** S04
