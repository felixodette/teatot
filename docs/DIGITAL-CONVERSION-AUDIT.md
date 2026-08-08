# Tea Tot Hotel — Digital Conversion Audit

**Date:** 24 July 2026 (evening re-audit, post P0/P1)  
**Prior:** morning 70/100 · 18 Jul baseline 66/100  
**Scope:** Website + WhatsApp/Messenger/Call/SMS FAB + social + measurement  
**Lens:** Chief Hospitality Content & Conversion Architect  

**Overall conversion potential: 80 / 100** (↑ +10)

Storefront friction mostly gone. Every revenue hero has a next step. FAQs live. Service anchors clean. GA4 wired for next deploy. Gap now = demand gen + AOV packages, not “what do I click?”

---

## Executive verdict

| Layer | Score | One-line |
| --- | ---: | --- |
| Website storefront | 82 | CTAs on revenue heroes; rates; FAQ live |
| Booking / WhatsApp close | 90 | FAB + intent WA across Dining/Rooms/Services/Gallery |
| Social demand gen | 36 | IG weak; X removed from footer; FB still primary |
| Measurement | 55 | GA4 `G-9B8TV2N3WT` in workflows; Meta Pixel empty |
| Local SEO readiness | 76 | FAQPage JSON-LD; slugs fixed; blog clichés gone |

**Sales stack:** Website → WhatsApp → Facebook/Messenger → Instagram → Google Business. Skip X.

---

## Closed since morning audit

- Dining / Gallery / About hero CTAs (+ Dining ANAM / catering, Gallery end strip)
- `dining` WhatsApp intent
- FAQs on Contact + Rooms + FAQPage JSON-LD
- Service slugs: `conference-events`, `outside-catering`, `garden-venue`, `guest-services` + per-block enquire
- Room detail WhatsApp + trust line; rooms hero count copy
- Blog clichés stripped; X out of footer
- Analytics component + `book_start` / `whatsapp_click` / `contact_submit`; GA ID in deploy workflows + `.env.local`

---

## Page scores

| Page | Score | Strengths | Residual |
| --- | ---: | --- | --- |
| Contact | 88 | WA, form, FAQ, map | No staff SLA |
| Rooms | 84 | Book+WA, FAQ, rates | Amenity blurbs vs rest |
| Home | 82 | Proof hero, prices | Soft philosophy mid-page |
| About | 82 | Hero CTAs, audiences | Gallery strip weak closer |
| Room detail | 80 | Rates + WA + trust | No related rooms |
| Services | 78 | Slugs + enquire | No package prices |
| Dining | 78 | Hero WA pair | No lunch specials |
| Gallery | 74 | Hero + end CTA | Thin use-case captions |

---

## Still open (priority)

| Pri | Action | Why |
| ---: | --- | --- |
| P0 | Deploy + confirm GA Realtime | Prove `book_start` / `whatsapp_click` |
| P1 | Meta Pixel when ID ready | Ads accountable |
| P2 | Conference day package (hall + AV + lunch) | Highest AOV |
| P2 | GBP posts + checkout review asks | Local pack |
| P2 | IG Reels 3×/week | Proof for ads |
| P3 | Home philosophy rewrite | Keep scroll momentum |

---

## Channel notes

**WhatsApp** — strongest close path. Intent prefill: rooms / dining / conference / events / general.

**Measurement** — code ready; live only after rebuild with `NEXT_PUBLIC_GA_MEASUREMENT_ID`. No Meta Pixel yet — do not run paid Meta until Pixel set.

**Social** — Instagram still weak. Facebook + Messenger remain #1 local channel. X removed from footer (good).

---

## 30-day focus (remaining)

**Week 1:** Deploy GA; verify events; Meta Pixel if available.  
**Week 2–3:** GBP + reviews + IG Reels; conference package draft.  
**Week 4:** Publish conference offer; small Meta tests only after Pixel.

---

*Canvas: [digital-conversion-audit.canvas.tsx](/Users/felixodette/.cursor/projects/Users-felixodette-Development-teatot/canvases/digital-conversion-audit.canvas.tsx)*
