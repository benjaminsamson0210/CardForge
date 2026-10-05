# Test Plan: Mugshot Bot Clone

Test cases mapped directly to the recon flows F01, F02, F03 from `replica/recon.md`.

---

## F01: Core Customization & Code Retrieval
- **F01-H1 (Happy Path - Navigation):** User lands on `/`, views Before/After comparison, clicks "Get started for free", and lands on `/customize`.
- **F01-H2 (Happy Path - Customization):** User inputs page title and URL, toggles dark mode, switches accent color, switches SVG pattern, and verifies preview updates.
- **F01-H3 (Happy Path - Embed Retrieval):** User clicks "Use this code on my site", modal appears displaying HTML `<meta>`, Next.js, and Markdown snippets, user copies code.
- **F01-E1 (Edge Case - Long Text):** 60+ character headline wraps gracefully without breaking card aspect ratio.
- **F01-E2 (Edge Case - Reset Actions):** Clicking "Reset" resets title and description back to defaults.

---

## F02: Pro Upgrade Flow
- **F02-H1 (Happy Path - Pro Paywall Trigger):** Clicking "Hide branding watermark" or selecting Pro theme opens ProModal with $9/mo pricing.
- **F02-H2 (Happy Path - Pro Activation):** Completing upgrade simulation activates Pro status and unlocks watermark toggle.

---

## F03: Dynamic Generation API
- **F03-H1 (Happy Path - Dynamic PNG Route):** Requesting `/m?title=Hello+World&url=blog.dev` returns HTTP 200 with `Content-Type: image/png`.
- **F03-H2 (Happy Path - Fallback Handling):** Requesting `/api/og` without query params returns default 1200x630 PNG card without errors.
- **F03-E1 (Edge Case - Special Characters):** Title with emojis and accents generates successfully.
