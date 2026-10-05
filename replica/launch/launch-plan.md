# Launch Plan & Go-To-Market: CardForge

---

## 1. Target Communities (Where Unhappy Users Discuss Problems)
Based on public review research, users express frustration over recurring $9–$29/mo subscriptions and slow crawler timeouts in:
- **Hacker News (Show HN):**
  - Title: *"Show HN: CardForge – Dynamic Open Graph generator with sub-50ms edge rendering and zero monthly lock-in"*
  - Technical angle: Built with Satori + Resvg on Next.js Edge. Resolves Twitterbot/Discord crawler timeouts. Stateless URL parametric engine (`/m?title=...`).
- **Product Hunt:**
  - Tagline: *"CardForge — Automated social preview cards without recurring subscription fatigue"*
  - Offer: Launch special $39 lifetime license for the first 100 makers.
- **Reddit Communities:**
  - `r/webdev` & `r/nextjs`: Explain how edge parametric OG generation works and share free snippet generator.
  - `r/SideProject` & `r/IndieHackers`: The anti-subscription alternative for static blog link previews.

---

## 2. Launch Day Sequence

- [ ] **T-3 Days:** Deploy live on Vercel with custom domain (`cardforge.io` / `cardforge.dev`).
- [ ] **T-2 Days:** Verify dynamic endpoint `/m?title=Test` responds with HTTP 200 in <50ms from global edge nodes.
- [ ] **T-1 Day:** Test on Twitter Card Validator, Facebook Sharing Debugger, and opengraph.xyz.
- [ ] **Day 0 (00:01 PST):** Launch on Product Hunt.
- [ ] **Day 0 (07:00 PST):** Post Show HN thread.
- [ ] **Day 0 (09:00 PST):** Post interactive comparison video on X showing before/after click-through difference.
- [ ] **Day +1:** Engage with comments, ship requested templates, and monitor uptime.

---

## 3. First 10 User Outreach Strategy
1. Identify technical bloggers or open-source repo maintainers who currently have missing or generic Twitter cards on their latest posts.
2. Generate their custom CardForge card using their blog post's real title and domain.
3. Reply/DM with the live rendered preview and copy-paste `<meta>` snippet:
   *"Hey, loved your post on [Topic]! Generated a dynamic Twitter card preview for it using CardForge. Feel free to use this snippet in your head tag."*
4. Offer them a free lifetime pass in exchange for developer feedback.
