# Deployment & Preflight Report: CardForge

Date: 2026-10-04  
Target: Production Edge Deployment (Vercel)  
Custom Domain: `cardforge.io` / `cardforge.dev`

---

## 1. Preflight Gates Checklist

| Gate | Check Command | Result | Status |
| :--- | :--- | :--- | :--- |
| **End-to-End Tests** | `npx playwright test` | 6 passed (12.9s) | **PASS** |
| **Feature Parity** | `python parity.py replica/features.csv` | 100.0 / 100 (8/8 must-haves done) | **PASS** |
| **Rebrand Sweep** | `python sweep.py . --config replica/brand.json` | Clean (0 hits of original name/domain/color) | **PASS** |
| **Listing Linter** | `python listing.py replica/launch/listing.json` | 0 errors, 0 warnings | **PASS** |
| **Production Build** | `npm run build` | Compiled successfully in 1.9s | **PASS** |
| **WCAG AA Contrast** | `python contrast.py replica/design/tokens.json` | 8 pairs checked, 0 failures | **PASS** |

---

## 2. Environment Variables & Production Secrets

Ensure the following variables are configured in Vercel project settings:

```env
# Base Application URL
NEXT_PUBLIC_APP_URL=https://cardforge.io

# Stripe Payments (Live Mode)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_LIFETIME_PRICE_ID=price_...

# Database (Optional for user preset persistence)
DATABASE_URL=postgresql://...
```

---

## 3. DNS Configuration

Once your domain is registered, point DNS records to Vercel:

| Type | Name | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Apex domain routing |
| **CNAME** | `www` | `cname.vercel-dns.com` | Subdomain alias |
| **TXT** | `@` | `v=spf1 include:_spf.google.com ~all` | Email SPF record |
| **TXT** | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@cardforge.io` | Email DMARC deliverability |

---

## 4. Verification Post-Deploy

1. Visit `https://cardforge.io` and test the Before/After comparison.
2. Open `https://cardforge.io/customize` and customize a card.
3. Call the live edge endpoint: `https://cardforge.io/m?title=Test&url=cardforge.io` and verify HTTP 200 `image/png` response with `Cache-Control: public, max-age=31536000, immutable`.
4. Test link rendering on [Twitter Card Validator](https://cards-dev.twitter.com/validator) and [OpenGraph.xyz](https://www.opengraph.xyz).
