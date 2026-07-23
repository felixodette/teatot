# Tea Tot Hotel — Digital Conversion Audit

**Date:** 18 July 2026  
**Scope:** Website (`https://dev.teatot.co.ke` + repo), WhatsApp, Facebook/Messenger, Instagram, X  
**Lens:** Chief Hospitality Content & Conversion Architect  

**Overall conversion potential: 66 / 100**

The site already outruns most regional hotel sites on proof and path-to-book. Revenue is leaking where pages stop selling, social is dormant, and nothing is measured.

---

## Executive verdict

| Layer | Score | One-line |
| --- | ---: | --- |
| Website storefront | 72 | Strong proof; uneven CTAs |
| Booking / WhatsApp close | 78 | Best asset — underused on Dining/Gallery |
| Social demand gen | 35 | Instagram ~80 followers; X 0 posts |
| Measurement | 15 | No GA4 / Meta Pixel in codebase |
| Local SEO readiness | 60 | Good basics; broken service slugs; FAQ orphaned |

**Default stack for sales (Kenya hospitality):**  
Website (trust) → WhatsApp (close) → Facebook + Messenger (local reach) → Instagram (proof) → Google Business Profile (intent search). Deprioritize X until the rest run weekly.

---

## Channel audit

### Website — `dev.teatot.co.ke`

**Strengths**

- Home hero answers who / what / where / why / next step in under 5 seconds: *“56 rooms. Gardens for thousands. Opposite Level 5.”*
- Room prices on cards (from **Ksh 5,297**).
- Site-wide **Book Now** modal + nav CTA.
- Intent-aware WhatsApp (`rooms` | `conference` | `events` | `general`) in `config/contact.ts`.
- About page segmented by real guest jobs (hospital, conference, weddings, families).
- Gallery grouped by story (Rooms → Conference → Dining → Gardens).
- Open Graph image set to hotel facade; Hotel JSON-LD present.

**Weaknesses**

- Dining, Gallery, and About heroes often have **no primary CTA**.
- Services deep links use leftover Framer slugs (`conference` → `#garage-parking`, catering → `#laundry-dry-cleaning`). Confuses SEO and trust.
- `framer-local/cms/faqs.json` has useful Q&A (check-in, parking, conference) but **FAQs are not loaded or rendered** anywhere after cleanup.
- No analytics / ad pixels in the app — cannot attribute bookings or ads.
- Residual AI/generic phrasing: “world-class coffee”, “Discover Ol Donyo Sabuk”, “breathtaking gardens”.
- Soft philosophy copy (“wellbeing and comfort… daily purpose”) underperforms the concrete hero.

### WhatsApp — `wa.me/254718009684`

**Health: Strong (highest-intent channel)**

Prefill messages exist. Contact hero leads with WhatsApp. Rooms and Services heroes offer WhatsApp. Footer links WhatsApp.

**Gaps:** No sticky mobile float; Dining / Gallery / room detail lack consistent WhatsApp secondary CTAs; no staff SLA or canned replies documented on-site.

### Facebook + Messenger — `facebook.com/teatothotelmachakos` / `m.me/teatothotelmachakos`

**Health: Unknown publicly (login wall)** — still the right #1 social for Machakos locals and corporates.

Messenger is correctly linked in footer (note: user listed the Facebook URL for Messenger; site correctly uses `m.me/...`).

**Best practice:** Treat FB + Messenger as the outbound + inbox pair. Same response-time standard as WhatsApp.

### Instagram — `@teatotmachakos`

**Health: Weak** — ~**80 followers**, sparse grid; bio links `www.teatot.co.ke` (good).

This channel should be the visual proof engine for rooms, pizza, gardens, and events — not a brochure archive.

### X — `@TeaTotHotel`

**Health: Dormant** — **0 posts**, **8 followers**, joined 2017. Bio still says “Hospitality and Service At Its Best” and links **`teatothotel.co.ke`** (wrong domain vs `teatot.co.ke`).

**Recommendation:** Fix bio link or hide the channel from footer until there is a reason to post. Do not invest in X content before WhatsApp + FB + IG + GBP.

---

## Page-by-page audit

Scores: Clarity / Trust / SEO / Emotion / Differentiation / Readability / CTA / **Overall**

### 1. Home — **78**

| Dimension | Score |
| --- | ---: |
| Clarity | 90 |
| Trust | 80 |
| SEO | 75 |
| Emotion | 70 |
| Differentiation | 85 |
| Readability | 85 |
| Call-to-action | 80 |
| **Overall** | **78** |

**Assessment**

- Strengths: Proof-led hero; prices; services teaser; reviews with stars; dining + local guides.
- Weaknesses: Philosophy block softens momentum; service card #2–4 use wrong hash slugs; blog titles lean cliché (“Discover”, “World-class recreation”).
- Missed: Mid-page WhatsApp for conference/events; FAQ strip; “Book direct” vs OTA line.

**Rewritten hero (optional sharpen)**

> **Opposite Level 5. 56 quiet rooms. Gardens that hold a wedding.**  
> Tea Tot Hotel on Konza Road — stay for hospital visits and business trips, meet in halls for up to 200, or host outdoors with catering that stays through service.  
> **Book a room** · **Ask on WhatsApp**

**Rationale:** Keeps concrete Machakos cues; splits stay vs event intents; WhatsApp as peer to Book.

### 2. Rooms index — **72**

| Dimension | Score |
| --- | ---: |
| Clarity | 80 |
| Trust | 75 |
| SEO | 70 |
| Emotion | 60 |
| Differentiation | 65 |
| Readability | 85 |
| Call-to-action | 85 |
| **Overall** | **72** |

**Assessment**

- Strengths: Dual CTA (Book + WhatsApp); prices; category labels.
- Weaknesses: Sells amenities list more than rest/productivity; metadata thin (“Four comfortable room types…”).
- Missed: Guest-type filters (solo business / couple / family); “Includes Wi-Fi · AC · parking” trust strip; check-in FAQ.

**Rewritten headline**

> **Sleep well in Machakos — four room types, clear rates.**  
> Quiet, sound-proofed rooms with AC, hot showers, satellite TV and free Wi-Fi. Opposite Level 5 on Konza Road.  
> **Book Now** · **Check availability on WhatsApp**

### 3. Room detail — **68**

**Assessment:** Price + Book Now sticky aside works. Missing WhatsApp, related rooms, FAQ, and “why book direct.” Descriptions are functional, not benefit-led.

**Add under Book Now**

> Prefer WhatsApp? [Ask about this room]  
> Check-in from 2:00 PM · Free guarded parking · Breakfast available at ANAM

### 4. Services — **62**

**Assessment:** Strong capacity facts in CMS copy (Baraza 200, gardens 4,000, catering use cases). Hero CTA is WhatsApp conference — good. Body sections have **no enquire CTA per service**. Slugs and categories are still Framer leftovers (`garage-parking`, `spa-wellness`, Category “Wellness” for gardens).

**Fix first:** Rename slugs to `conference-events`, `outside-catering`, `garden-venue`, `guest-services`. Add **Enquire on WhatsApp** under each block with matching intent.

### 5. Dining — **55**

**Assessment:** Hours + menu + parallax look good. Conversion fails: hero has **no buttons**; ANAM block has no reserve CTA; only catering has Contact Us. “Best pizza in Machakos” is a claim without proof.

**Rewritten bottom CTA block**

> **Table tonight, or catering for Saturday?**  
> Message us on WhatsApp for a table at ANAM / TeaTot Pizzeria, or a catering quote for your event.  
> **Reserve on WhatsApp** · **Catering enquiry**

### 6. About — **74**

**Assessment:** Audience segments are the strongest conversion structure on the site. Stats (56 / 3 / 4000 / 200) build authority. Hero still soft and CTA-less; gallery strip doesn’t push book/enquire.

### 7. Gallery — **58**

**Assessment:** Story order is right. No end CTA (“Like what you see? Book / Enquire”). Captions exist but should name use cases (“Baraza Hall set for 80 classroom”).

### 8. Contact — **80**

**Assessment:** Best conversion page — WhatsApp primary, call secondary, form, map, hours. Add FAQ accordion here from existing CMS content.

---

## Trust & SEO gaps

| Issue | Impact | Fix |
| --- | --- | --- |
| Service slug mismatch | Wrong anchors, weak local SEO | Rename CMS slugs |
| FAQ CMS orphaned | Missed objection handling + FAQ schema | Re-expose on Contact + Rooms |
| No GA4 / Meta Pixel | Blind paid spend | Install + events: `book_start`, `whatsapp_click`, `contact_submit` |
| AI cliché phrases | Trust erosion | Replace world-class / Discover / breathtaking |
| Thin room meta descriptions | SERP CTR | Per-room unique metas with Machakos + amenity |
| JSON-LD Hotel only | Missed rich results | Add FAQPage, Menu, MeetingRoom where accurate |
| Google Business not in site story | Local pack is often #1 booker | Link GBP; push reviews |

---

## Sales options (best practice)

Choose **one primary + one secondary** for 30 days.

### Option A — Direct room bookings (high volume, low effort)

1. Sticky WhatsApp on mobile sitewide.  
2. WhatsApp secondary on every room detail.  
3. Live FAQ (check-in, parking, dining).  
4. Line on rooms: “Book direct with us — same team who checks you in.”  
5. Ask every departing guest for a Google review (QR at reception).

### Option B — Conference / corporate (highest AOV)

1. Dedicated `/services#conference-events` (after slug fix) or `/conference` landing.  
2. Package card: *Hall + projector + lunch from X pax*.  
3. WhatsApp intent already exists — put it on every conference mention.  
4. Outreach list: hospitals, NGOs, county offices, training firms in Machakos/Nairobi.  
5. One-page PDF “Conference at Tea Tot” for email attachment.

### Option C — Weddings & garden events (highest AOV)

1. Event enquiry path (form or WhatsApp `events` intent) on Gardens + Gallery.  
2. Case-style captions + 2–3 real event photos with capacity callouts.  
3. Seasonal packages (garden + catering bands).  
4. Facebook boosts to engaged couples / event planners in radius.

### Option D — Dining & outside catering (steady local revenue)

1. Hero CTAs: Reserve table (WhatsApp) + Catering quote.  
2. Lunch specials posted on FB/IG 3× week with “Message to reserve.”  
3. Funeral/wedding catering as explicit WhatsApp intents (sensitive tone).

### Option E — Paid Meta (Facebook/Instagram) ads

Only after pixels + WhatsApp tracking.

| Ad | Audience | Creative | CTA |
| --- | --- | --- | --- |
| Rooms | Nairobi + Machakos, hospital/travel interest | Facade + room + price from | WhatsApp / Book |
| Conference | Business decision-makers 25km | Baraza Hall + “up to 200” | Enquire WhatsApp |
| Events | Engaged + event planners | Gardens + catering | Event WhatsApp |

Budget test: small daily caps; kill losers in 7 days; scale winners.

### Option F — Organic / SEO / Google Business (compounding)

1. Claim/optimize Google Business: photos weekly, products (rooms, halls), messaging.  
2. Target phrases naturally: hotel Machakos, conference venue Machakos, wedding garden Machakos, restaurant Konza Road.  
3. Fix slugs + publish FAQ.  
4. Keep blog local and useful — drop “Discover/World-class” titles.

### Option G — Partnerships (offline → digital)

- Level 5 Hospital visitor desk: card with WhatsApp + “Opposite the hospital.”  
- Corporate rate sheets via WhatsApp Business catalog or PDF.  
- Wedding planners / MCs / photographers affiliate WhatsApp intro.

---

## 30-day playbook

### Week 1 — Stop the leaks (site)

- [ ] Sticky WhatsApp button (mobile)  
- [ ] Dining + Gallery + About CTAs  
- [ ] Render FAQs on Contact (and Rooms)  
- [ ] Rename service slugs + categories  
- [ ] Strip AI clichés in CMS  
- [ ] Install GA4 + Meta Pixel + WhatsApp click events  

### Week 2–3 — Create demand

- [ ] 3 Meta ad sets (rooms / conference / events)  
- [ ] Google Business posts 5×/week  
- [ ] Review request process at checkout  
- [ ] IG Reels 3×/week (food, room tour, garden setup)  
- [ ] FB organic + Messenger reply within 1 hour business hours  

### Week 4 — Package & double down

- [ ] Conference day package published  
- [ ] Garden/wedding mini offer  
- [ ] Outside catering quote CTA  
- [ ] Read analytics; put budget on the winning intent  

---

## Quality checklist (current state)

| Check | Status |
| --- | --- |
| Sounds human | Mostly — soft philosophy + a few clichés |
| Differentiates | Yes on location + capacity facts |
| Builds trust | Prices, reviews, map, Level 5 — yes |
| Strong CTAs | Uneven by page |
| SEO | Partial — slug debt, FAQ unused |
| No AI clichés | Fail on a few CMS strings |
| Measurable | Fail — no pixels |

---

## Priority matrix

| Priority | Action | Expected sales effect |
| ---: | --- | --- |
| P0 | Sticky WhatsApp + Dining/Gallery CTAs | More enquiries this week |
| P0 | Analytics + WhatsApp events | Make ads accountable |
| P1 | FAQ live + service slug fix | Higher close rate + SEO |
| P1 | Conference package + outreach | Larger average booking value |
| P2 | Meta ads on winning creatives | Scalable demand |
| P2 | Instagram weekly system | Social proof for ads |
| P3 | X cleanup or remove from footer | Stop brand dilution |

---

*Interactive summary canvas: open beside chat in Cursor — `digital-conversion-audit.canvas.tsx`*
