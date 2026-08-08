# Tea Tot Hotel — Social Media ↔ Web Alignment Audit

**Date:** 24 July 2026  
**Lens:** Chief Hospitality Content & Conversion Architect  
**Scope:** Live Facebook / Instagram / TikTok signals vs built web app (footer, FAB, WhatsApp intents, OG, analytics, schema)  
**Companion:** [DIGITAL-CONVERSION-AUDIT.md](./DIGITAL-CONVERSION-AUDIT.md) (overall social demand was 36)

**Overall social ↔ web alignment: 38 / 100**

The storefront closes. Social does not yet feed it reliably.

---

## Executive verdict

| Layer | Score | One-line |
| --- | ---: | --- |
| WhatsApp / Messenger close | 88 | FAB + intent prefills — best conversion asset |
| Facebook page | 58 | 1.7K followers, recent posts; soft CTAs; wrong category |
| Brand / handle consistency | 42 | IG split; naming drift (“Hotels” vs Hotel) |
| Measurement / ads readiness | 40 | GA4 wired; Meta Pixel empty |
| Website as social landing | 35 | Live domain in maintenance — breaks social CTR |
| Content → booking system | 32 | No weekly map to Rooms / Dining / Conference |
| Instagram | 22 | Canonical handle not on site footer |
| Google Business posts | 28 | Underused vs FB; address conflicts on aggregators |
| TikTok | 15 | Exists on FB Intro; absent from web |

**Sales stack (keep):** Facebook / Instagram / GBP → Website proof → WhatsApp / Booking modal → Review ask.  
**Skip:** X (already removed from footer).

---

## 1. Assessment

### Strengths

- Footer Facebook + Messenger (`m.me/teatothotelmachakos`) match the live page slug.
- WhatsApp (`254718009684`) is the real closer — rooms / dining / conference / events / general intents.
- Contact FAB surfaces WhatsApp, Messenger, Call, SMS under every page.
- Open Graph + large image card exist for shares.
- Facebook is alive (post within ~1 day; food/event carousel; modest engagement).
- Channel discipline: X removed from footer.

### Weaknesses

- **Instagram handle mismatch (critical):** site footer → `instagram.com/teatotmachakos`; Facebook Intro → `instagram.com/tea.tot.hotel`.
- **TikTok orphaned:** `@tea.tothotelmachakos` on Facebook Intro only — not in `lib/navigation.ts`.
- **Live website break:** `teatot.co.ke` serves maintenance — social “website” clicks fail.
- Captions sell atmosphere more than a next step (Book / Enquire / WhatsApp).
- FB page category: “Hotel services company” (should be Hotel).
- Only 5 Facebook recommends — thin for corporate/trust.
- No `sameAs` social URLs in Hotel JSON-LD.
- Meta Pixel env empty — cannot attribute social → enquire → book.
- Brand naming drift in FB copy (“Tea Tot Hotels”).

### Missed opportunities

- Pin + bio as permanent Book / WhatsApp conversion doors.
- Weekly content calendar mapped to pages already built (`/rooms`, `/dining`, `/services`, garden venue).
- Review harvest loop after checkout (Google + FB).
- Conference day package as the high-AOV social offer.
- Messenger click tracking parity with `whatsapp_click`.

### Business impact

Every wrong IG click and every maintenance-page landing wastes paid and organic attention. Until identity + live site + Pixel are fixed, social is brand wallpaper — not a booking tool.

---

## 2. Conversion score (social layer)

| Dimension | Score |
| --- | ---: |
| Clarity of next step | 34 |
| Trust | 52 |
| SEO / discovery | 40 |
| Emotion / proof | 45 |
| Differentiation | 38 |
| Readability / cadence | 48 |
| Call-to-action | 28 |
| **Overall conversion potential** | **38** |

---

## 3. Evidence lock (live vs code)

| Channel | Canonical (ops reality) | Web app | Status |
| --- | --- | --- | --- |
| Facebook | `facebook.com/teatothotelmachakos` · 1.7K followers | Footer link matches | Aligned |
| Instagram | `instagram.com/tea.tot.hotel` (on FB Intro) | Footer: `instagram.com/teatotmachakos` | **Misaligned** |
| TikTok | `tiktok.com/@tea.tothotelmachakos` | Not linked | **Gap** |
| WhatsApp | `wa.me/254718009684` | Intent URLs + FAB | Strong |
| Messenger | `m.me/teatothotelmachakos` | Footer + FAB | Strong |
| Website | `teatot.co.ke` | Linked from FB | **Maintenance (critical)** |
| Meta Pixel | — | `NEXT_PUBLIC_META_PIXEL_ID` empty | Blocked for ads |

Code refs: `lib/navigation.ts`, `config/contact.ts`, `components/ContactFab.tsx`, `components/Analytics.tsx`, `lib/structured-data.ts`.

---

## 4. Target operating model (rewritten system)

Treat social as the **front of house**; the web app as the **menu and proof**; WhatsApp as the **reservation desk**.

### Bio / Intro lock (all channels)

```
Tea Tot Hotel · Konza Road, Machakos (opp. Level 5 Hospital)
56 rooms · Conference for 200 · Gardens · ANAM Restaurant
Book: https://teatot.co.ke
Chat: WhatsApp 0718 009684
```

### Standing CTA line (end of every post)

```
Enquire on WhatsApp: https://wa.me/254718009684?text=...
Or book: https://teatot.co.ke/rooms
```

Use intent-matched WA links (rooms / dining / conference / events) — same as the site.

### Weekly content → product map

| Day | Theme | Asset | Destination |
| --- | --- | --- | --- |
| Mon | Rooms / stay | Reel or carousel + rate cue | WA rooms + `/rooms` |
| Tue | Dining | Food clip + hours | WA dining + `/dining` |
| Wed | Conference | Hall / AV / Wi-Fi proof | WA conference + `/services` |
| Thu | Gardens / events | Outdoor capacity | WA events |
| Fri | Proof | Review / arrival clip | Book / Contact |
| Sat–Sun | Weekend / family | Local convenience | WA rooms + GBP post |

### Caption formula (human, not hotel-brochure)

1. Concrete place or use case (Machakos business stay / family visit / AGM / wedding garden).  
2. One proof detail (56 rooms, hall for 200, gardens, ANAM).  
3. One CTA (WhatsApp or Book).  
Avoid: nestled, unforgettable, world-class, elevate, indulge.

---

## 5. Rationale

- Closing paths on the site already outperform competitors; demand gen is the leak.
- Local Kenyan buyers finish on WhatsApp/Messenger — social must push there, not into vague “DM us.”
- Handle and website integrity are trust tests; failing them before the guest sees rooms kills conversion.
- Pixel-before-ads prevents spending on vanity reach.

---

## 6. Actionable tasks

### P0 — this week (identity + live path)

| # | Owner | Task | Done when |
| --- | --- | --- | --- |
| 1 | Eng | Production site live (no maintenance wall) | Social → Home → Book/WA works |
| 2 | Eng | Footer IG → `https://instagram.com/tea.tot.hotel` | Wrong handle gone |
| 3 | Ops | Lock bios + pin Book/Enquire on FB (+ IG highlight) | Same phone, URL, WA everywhere |
| 4 | Ops | Confirm `@teatotmachakos` — claim, redirect, or abandon | One IG identity |

### P1 — next 2 weeks (measurement + channel hygiene)

| # | Owner | Task | Done when |
| --- | --- | --- | --- |
| 5 | Eng | Set Meta Pixel; verify `whatsapp_click` / `book_start` / `contact_submit` | Events Manager green |
| 6 | Eng | Add Hotel JSON-LD `sameAs` for FB + IG (+ TikTok if kept) | Rich results / Knowledge consistent |
| 7 | Eng | Track `messenger_click` like WhatsApp | FAB Messenger measurable |
| 8 | Ops | FB category → Hotel; enable Book Now / WhatsApp page CTA | Page button live |
| 9 | Ops+Eng | TikTok keep or kill — footer + bio or remove from FB | No orphan channel |
| 10 | Ops | Caption template mandatory on all posts | No post without CTA |

### P2 — 30 days (operate as conversion tool)

| # | Owner | Task | Done when |
| --- | --- | --- | --- |
| 11 | Ops | Run 6-slot weekly calendar for 30 days | ≥12 posts/month across FB/IG |
| 12 | Ops | Post-stay review ask (Google + FB) | +20 Google / +15 FB in 60 days |
| 13 | Ops | 2 GBP posts/week; fix address conflicts (Konza vs Wote) | GBP matches site |
| 14 | Product | Conference day package (hall + AV + lunch) | Priced offer for ads/organic |

### P3 — scale only after P0–P1

| # | Owner | Task | Done when |
| --- | --- | --- | --- |
| 15 | Ops | UGC permission + weekly guest repost; &lt;1h reply SLA | Response time tracked |
| 16 | Growth | Small Meta boosts on conference + weekend stay | Pixel live first; kill losers in 7 days |

---

## 7. Additional opportunities

- **Images:** Arrival facade, room daylight, ANAM plated dish, conference set, garden ceremony — one story per post, not dumps.
- **Highlights (IG):** Rooms · Dining · Conference · Gardens · Reviews · How to book.
- **FAQs on social:** Mirror site FAQs (“Do you have parking?”, “Conference capacity?”) as short Reels → Contact FAQ.
- **Cross-links:** Every dining post → ANAM; every event post → garden venue slug.
- **Analytics events:** Already defined for WA/book/contact — extend to Messenger; tag UTM `utm_source=facebook|instagram` on bio links.
- **Trust:** Staff names on replies; response-time promise in About.

---

## Quality checklist (social as conversion tool)

- [ ] One Instagram handle everywhere  
- [ ] Website loads from every bio  
- [ ] WhatsApp in bio + captions  
- [ ] Meta Pixel firing  
- [ ] Weekly calendar mapped to live pages  
- [ ] Review ask after stay/event  
- [ ] No soft posts without CTA  
- [ ] Paid spend only after Pixel + live site  

---

*Canvas: [social-media-alignment-audit.canvas.tsx](/Users/felixodette/.cursor/projects/Users-felixodette-Development-teatot/canvases/social-media-alignment-audit.canvas.tsx)*
