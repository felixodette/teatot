# Tea Tot Hotel — Digital Conversion Audit

**Date:** 24 July 2026 (refresh) · prior baseline 18 July 2026  
**Scope:** Website storefront + WhatsApp / Messenger / Call / SMS FAB, Facebook, Instagram, X  
**Lens:** Chief Hospitality Content & Conversion Architect  

**Overall conversion potential: 70 / 100** (↑ from 66)

The storefront already outruns most regional hotel sites on proof and path-to-book. Contact FAB and occupancy pricing closed two major leaks. Revenue still leaks where heroes have no next step, FAQs sit unused in CMS, and nothing is measured.

---

## Executive verdict

| Layer | Score | One-line |
| --- | ---: | --- |
| Website storefront | 74 | Strong proof + rates; CTA gaps on Dining/Gallery/About |
| Booking / WhatsApp close | 86 | Book modal + Contact FAB — underused on page heroes |
| Social demand gen | 35 | Instagram ~80 followers; X dormant |
| Measurement | 15 | No GA4 / Meta Pixel in codebase |
| Local SEO readiness | 62 | Hotel JSON-LD; FAQ orphaned; service slug debt |

**Default stack for sales (Kenya hospitality):**  
Website (trust) → WhatsApp (close) → Facebook + Messenger (local reach) → Instagram (proof) → Google Business Profile (intent search). Deprioritize X until the rest run weekly.

---

## What changed since 18 Jul

**Shipped (helps conversion)**

- Contact FAB sitewide — WhatsApp, Messenger, Call, SMS
- Occupancy-aware B&B rates (`priceSingle` / `priceDouble`) on room cards and detail
- Dining pizza/coffee teasers + link to full Anam menu
- Home Anam service card → `https://anam.teatot.co.ke/`
- Favicon / web manifest

**Still open**

- Dining, Gallery, About heroes often have **no primary CTA**
- `framer-local/cms/faqs.json` (4 Q&As) is **never loaded or rendered**
- Service slugs still Framer leftovers (`garage-parking` = Conference, `laundry-dry-cleaning` = Outside Catering, `spa-wellness` = Garden Venue)
- No analytics / ad pixels
- Blog CMS: “Discover Ol Donyo Sabuk”, “World-class recreation…”
- Rooms metadata still says “four” types; CMS has **six** rooms

---

## Channel audit

### Website

**Strengths:** Home hero answers who / what / where / why / next step in under 5 seconds; B&B rates from **Ksh 4,700** single; site-wide Book Now modal + nav CTA; intent-aware WhatsApp; About audience segments; gallery story order; Hotel JSON-LD; Contact FAB.

**Weaknesses:** Soft philosophy copy; CTA-less heroes; orphaned FAQs; slug debt; unmeasured traffic; residual AI phrasing in blog.

### WhatsApp — `wa.me/254718009684`

**Health: Strongest sales line.** Prefill intents (`rooms` | `conference` | `events` | `general`). Contact hero leads with WhatsApp. FAB makes it available on every page.

**Gaps:** Dining / Gallery / About / room detail still lack **in-page** WhatsApp secondary CTAs with the right intent; no documented staff SLA or canned replies.

### Facebook + Messenger

Still the right #1 social for Machakos locals and corporates. Messenger linked in footer + FAB.

### Instagram — `@teatotmachakos`

**Weak** — sparse grid; should be the visual proof engine for rooms, pizza, gardens, events.

### X — `@TeaTotHotel`

**Dormant.** Fix bio domain or remove from footer until there is a reason to post.

---

## Page-by-page audit

Scores: Clarity / Trust / SEO / Emotion / Differentiation / Readability / CTA → **Overall**

### 1. Home — **80**

| Dimension | Score |
| --- | ---: |
| Clarity | 92 |
| Trust | 82 |
| SEO | 76 |
| Emotion | 72 |
| Differentiation | 86 |
| Readability | 86 |
| Call-to-action | 82 |
| **Overall** | **80** |

**Assessment**

- Strengths: Proof-led hero; featured room prices; services; reviews; dining + local guides.
- Weaknesses: Philosophy block softens momentum; service deep links use wrong slugs; blog titles lean cliché.
- Missed: Mid-page WhatsApp for conference/events; FAQ strip; “Book direct” vs OTA line.

**Rewritten hero**

> **Opposite Level 5. 56 quiet rooms. Gardens that hold a wedding.**  
> Tea Tot Hotel on Konza Road — stay for hospital visits and business trips, meet in halls for up to 200, or host outdoors with catering that stays through service.  
> **Book a room** · **Ask on WhatsApp**

**Rationale:** Keeps concrete Machakos cues; splits stay vs event intents; WhatsApp as peer to Book.

### 2. Rooms index — **76**

**Assessment:** Dual CTA (Book + WhatsApp) and clear B&B rates. Still sells amenity lists more than rest/productivity. Metadata says four types while CMS lists six (including Garden Villa and Penthouse Suite).

**Rewritten headline**

> **Sleep well in Machakos — clear B&B rates, six room types.**  
> Quiet, sound-proofed rooms with AC, hot showers, satellite TV and free Wi-Fi. Opposite Level 5 on Konza Road. From Ksh 4,700 single B&B.  
> **Book Now** · **Check availability on WhatsApp**

### 3. Room detail — **70**

**Assessment:** Single/double B&B + sticky Book Now works. Missing WhatsApp, related rooms, FAQ, and “why book direct.” Descriptions are functional, not benefit-led.

**Add under Book Now**

> Prefer WhatsApp? [Ask about this room]  
> Check-in from 2:00 PM · Free guarded parking · Breakfast included (B&B)

### 4. Services — **64**

**Assessment:** Strong capacity facts (Baraza 200, gardens 4,000). Hero WhatsApp for conference is good. Body sections have **no enquire CTA per service**. Slugs and categories remain Framer leftovers.

**Fix first:** Rename slugs to `conference-events`, `outside-catering`, `garden-venue`, `guest-services`. Add **Enquire on WhatsApp** under each block with matching intent.

### 5. Dining — **62** (↑ from 55)

**Assessment:** Hours + featured pizza/coffee + Anam full-menu link improved trust. Conversion still fails: hero has **no buttons**; ANAM block has no reserve CTA; only catering has Contact Us. “Best pizza in Machakos” is a claim without proof.

**Rewritten bottom / hero CTA block**

> **Table tonight, or catering for Saturday?**  
> Message us on WhatsApp for a table at ANAM / TeaTot Pizzeria, or a catering quote for your event.  
> **Reserve on WhatsApp** · **Catering enquiry**

### 6. About — **76**

**Assessment:** Audience segments remain the strongest conversion structure on the site. Stats (56 / 3 / 4000 / 200) build authority. Hero still soft and CTA-less.

### 7. Gallery — **58**

**Assessment:** Story order is right. No end CTA. Captions should name use cases (“Baraza Hall set for 80 classroom”).

### 8. Contact — **82**

**Assessment:** Best conversion page — WhatsApp primary, call secondary, form, map, hours, plus FAB. Add FAQ accordion from existing CMS.

---

## Trust & SEO gaps

| Issue | Impact | Fix |
| --- | --- | --- |
| Service slug mismatch | Wrong anchors, weak local SEO | Rename CMS slugs |
| FAQ CMS orphaned | Missed objection handling + FAQ schema | Re-expose on Contact + Rooms |
| No GA4 / Meta Pixel | Blind paid spend | Install + `book_start`, `whatsapp_click`, `contact_submit` |
| AI cliché phrases | Trust erosion | Replace world-class / Discover |
| Room count meta drift | Confusion / SERP mismatch | Update to six types + per-room metas |
| JSON-LD Hotel only | Missed rich results | Add FAQPage, Menu, MeetingRoom where accurate |
| Google Business not in story | Local pack is often #1 booker | Link GBP; push reviews |

---

## Sales options (best practice)

Choose **one primary + one secondary** for 30 days.

### Option A — Direct room bookings (high volume, low effort)

1. Room-detail WhatsApp secondary (FAB already covers sticky).  
2. Live FAQ (check-in, parking, dining).  
3. Line on rooms: “Book direct with us — same team who checks you in.”  
4. Ask every departing guest for a Google review (QR at reception).

### Option B — Conference / corporate (highest AOV)

1. Dedicated `/services#conference-events` (after slug fix) or `/conference` landing.  
2. Package card: *Hall + projector + lunch from X pax*.  
3. WhatsApp intent on every conference mention.  
4. Outreach: hospitals, NGOs, county offices, training firms.  
5. One-page PDF “Conference at Tea Tot.”

### Option C — Weddings & garden events (highest AOV)

1. Event WhatsApp on Gardens + Gallery.  
2. Case-style captions + real event photos with capacity callouts.  
3. Seasonal packages (garden + catering bands).  
4. Facebook boosts to engaged couples / planners in radius.

### Option D — Dining & outside catering

1. Hero CTAs: Reserve table (WhatsApp) + Catering quote.  
2. Lunch specials on FB/IG 3× week.  
3. Funeral/wedding catering as explicit WhatsApp intents (sensitive tone).

### Option E — Paid Meta

Only after pixels + WhatsApp tracking. Test rooms / conference / events with small daily caps.

### Option F — Organic / SEO / Google Business

Claim/optimize GBP; fix slugs; publish FAQ; keep blog local — drop Discover/World-class titles.

### Option G — Partnerships

Level 5 visitor desk cards; corporate rate sheets; wedding planner intros via WhatsApp.

---

## 30-day playbook

### Week 1 — Stop the leaks

- [x] Sticky contact FAB (WhatsApp / Messenger / Call / SMS)  
- [ ] Dining + Gallery + About CTAs  
- [ ] Render FAQs on Contact (and Rooms)  
- [ ] Rename service slugs + categories  
- [ ] Strip AI clichés in CMS; fix “four rooms” meta  
- [ ] Install GA4 + Meta Pixel + WhatsApp click events  

### Week 2–3 — Create demand

- [ ] 3 Meta ad sets (rooms / conference / events) — after pixels  
- [ ] Google Business posts 5×/week  
- [ ] Review request process at checkout  
- [ ] IG Reels 3×/week (food, room tour, garden setup)  
- [ ] FB organic + Messenger reply within 1 hour business hours  

### Week 4 — Package & double down

- [ ] Conference day package published  
- [ ] Garden/wedding mini offer  
- [ ] Outside catering quote CTA on Dining  
- [ ] Read analytics; put budget on the winning intent  

---

## Quality checklist (current state)

| Check | Status |
| --- | --- |
| Sounds human | Mostly — soft philosophy + a few blog clichés |
| Differentiates | Yes on location + capacity + rates |
| Builds trust | Prices, reviews, map, Level 5, FAB — yes |
| Strong CTAs | Uneven by page; FAB helps globally |
| SEO | Partial — slug debt, FAQ unused |
| No AI clichés | Fail on a few CMS strings |
| Measurable | Fail — no pixels |

---

## Priority matrix

| Priority | Action | Expected sales effect |
| ---: | --- | --- |
| P0 | Dining/Gallery/About CTAs | More enquiries this week |
| P0 | Analytics + WhatsApp events | Make ads accountable |
| P1 | FAQ live + service slug fix | Higher close rate + SEO |
| P1 | Room-detail WhatsApp + meta fix | Higher room close |
| P2 | Conference package + outreach | Larger average booking value |
| P2 | Meta ads on winning creatives | Scalable demand |
| P3 | X cleanup or remove from footer | Stop brand dilution |

---

*Interactive summary: [digital-conversion-audit.canvas.tsx](/Users/felixodette/.cursor/projects/Users-felixodette-Development-teatot/canvases/digital-conversion-audit.canvas.tsx)*
