# Phase home — UI Review

**Audited:** 2026-07-18  
**Baseline:** Abstract 6-pillar standards + ui-ux-pro-max homepage hints (adapted to existing monochrome Framer brand — no navy/gold redesign)  
**Scope:** `/` only — `app/page.tsx` + composed home components + layout landmark context + `globals.css` tokens used on home  
**Screenshots:** Captured via Playwright MCP → `.planning/ui-reviews/home-20260718-151004/`  
(desktop hero/full/rooms/services/reviews; mobile hero + late load)

**Verified already fixed on home (from `fix/ui-audit-top3`):** single `<main>` landmark; skip-link → `#main-content`; hero Book Now opens BookingModal; hero stars decorative with `aria-hidden` + text label (not ★ glyphs); hero CTA `rounded-none`; `:focus-visible` on hero (white outline).

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Testimonials hardcode “5 out of 5 stars”; home prices still `Ksh 5297` (rooms pages use `formatMoney`) |
| 2. Visuals | 2/4 | First viewport packs rating+stars under dual CTAs; sticky header clips section H2s; services cards have no affordance |
| 3. Color | 2/4 | `--color-text-subtle` `#999` on white ≈ **2.85:1** (fails 4.5:1); white hero type over bright facade |
| 4. Typography | 3/4 | Clear `section-label` / `section-heading` / `section-body` hierarchy; responsive hero sizes coherent |
| 5. Spacing | 3/4 | Strong single-column whitespace; Framer section scale respected; minor arbitrary image heights |
| 6. Experience Design | 2/4 | Booking path works; services cards are dead ends; no `scroll-padding` under fixed header |

**Overall: 14/24**

---

## Top 3 Priority Fixes

1. **Testimonials always announce 5/5 stars** — Screen readers and sighted users get a fabricated rating; CMS `Star Rating` is unsupported and not on `Testimonial`. — Remove `FiveStars` (or render stars only when a real rating exists). Prefer quote + guest name only until rating data is wired.
2. **Featured room prices skip `formatMoney`** — Home shows `Ksh 5297` / `Ksh 13875` while `/rooms` already formats `Ksh 5,297`. — Import `formatMoney` in `app/page.tsx` and use `{formatMoney(room.pricePerNight, room.currency)}` (same as rooms routes).
3. **Hotel Services cards are non-interactive dead ends** — Four service tiles (ANAM, Conference, Catering, Garden) have no link, no “Explore services,” no booking hook — silent conversion path. — Wrap each card in a `Link` to `/services` (or per-service slug) and/or add a section CTA (`btn-secondary` → `/services`).

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**WARNING** — Hero and section headlines are specific and on-brand; conversion-adjacent copy still lies or under-formats.

| Finding | Severity | Evidence |
|---------|----------|----------|
| `FiveStars` always exposes `aria-label="5 out of 5 stars"` for every review | **BLOCKER** (misleading rating) | `app/page.tsx` L17–34, L186; CMS Star Rating field type `unsupported`; `Testimonial` type has no rating (`types/cms.ts` L52–59) |
| Featured room prices unformatted (`Ksh 5297`) | WARNING | `app/page.tsx` L96–98; runtime probe `Ksh  5297`; `lib/format.ts` `formatMoney` used on rooms pages only |
| Hero `imageAlt="Tea Tot Hotel"` is brand-only, not descriptive | WARNING | `app/page.tsx` L54; services parallax `alt="Hotel services"` equally vague (L120) |
| Hero dual CTAs use specific labels (“Book Now”, “View Rooms”) — not generic Submit/Click Here | OK | `app/page.tsx` L56–57; `lib/navigation.ts` `ctaLink.label` |
| Empty CMS branches have purposeful copy + CTA (`EmptySection`) | OK | Rooms / reviews / journal empty states L104–108, L200–204, L283–287 |
| Section body copy is concrete (amenities, location, dining outlets) | OK | L68–70, L151–153, L224–228 |

### Pillar 2: Visuals (2/4)

**WARNING** — Full-bleed hero + Brand in nav pass the brand test; first viewport and mid-page hierarchy still slip.

| Finding | Severity | Evidence |
|---------|----------|----------|
| Hero first viewport includes label + H1 + support + **two** CTAs + **3 stars + “Machakos Premier”** — exceeds “headline + short support + CTA” budget | WARNING | `app/page.tsx` L49–59; `HeroSection.tsx` L134–158; mobile screenshot shows stars under CTAs |
| Fixed header (≈67px) clips section H2s on `scrollIntoView({ block: 'start' })` — no `scroll-padding-top` | WARNING | Runtime: `h2Top ≈ 0`, `headerBottom = 67`, `clipped: true`; `layout`/`globals` lack scroll-padding |
| Services cards look interactive (numbered tiles) but have zero click target | WARNING | `app/page.tsx` L132–138; probe `hasLink: false` for all four |
| Primary hero CTAs are square (`rounded-none`); mid-page secondary CTAs are pills (`btn-secondary` → `border-radius: 9999px`) — inconsistent within one scroll | WARNING | `HeroSection.tsx` L41–42; `globals.css` L255–257 |
| Nested `<main>` **fixed** on home — layout owns single landmark | OK | `app/layout.tsx` L55; probe `mainCount: 1` |
| Hero uses `fill` + `object-cover` + `priority` — correct Next.js pattern | OK | `HeroSection.tsx` L84–90 |
| No emoji icons; SVG stars only | OK | Hero + FiveStars |

### Pillar 3: Color (2/4)

**WARNING** — Monochrome Framer tokens are consistent; contrast fails on subtle text and risk zones on the hero photo.

| Finding | Severity | Evidence |
|---------|----------|----------|
| `--color-text-subtle: #999999` on white ≈ **2.85:1** — fails WCAG AA 4.5:1 for section labels / meta | **BLOCKER** (contrast) | `globals.css` L13; computed `rgb(153,153,153)`; used by `.section-label` L223–228 |
| Hero support / label use `text-white/80` and `text-white/70` over a bright cream/white facade — gradient `via-black/30` is thin mid-frame | WARNING | `HeroSection.tsx` L92, L100, L117; mobile-hero-late.png |
| `--color-text-secondary: #666` on white ≈ **5.74:1** — passes for body | OK | Probe `secondaryOnWhite` |
| Accent discipline: Book Now = white-on-black / black-on-white; no purple/gold drift | OK | Nav + hero CTAs; token palette in `@theme` |
| Services intro forces label to primary black | OK | `globals.css` L160–162 |

### Pillar 4: Typography (3/4)

**Good** — Hierarchy holds; size count is higher than abstract “≤4” because of responsive hero steps, but roles are clear.

| Finding | Severity | Evidence |
|---------|----------|----------|
| Shared section system: label (12px/500/0.2em) → heading (Display 600) → body (16px secondary) | OK | `globals.css` L222–252 |
| Hero H1 steps `text-4xl` → `md:text-5xl` → `lg:text-6xl` with Inter Display | OK | `HeroSection.tsx` L108–109 |
| Weights mostly `medium` + `semibold` (+ rare `normal` on “/ night”) — slight over abstract 2-weight ideal | WARNING (minor) | Home path greps |
| Journal tag chips use `rounded-full` pill chrome — visual noise vs square Framer CTAs | WARNING (minor) | `app/page.tsx` L269 |

### Pillar 5: Spacing (3/4)

**Good** — Mobile-first single column with generous `section-stack` whitespace matches the pattern hint.

| Finding | Severity | Evidence |
|---------|----------|----------|
| `.section-stack` gap 8rem / 4rem mobile; padding 5rem / 4rem — reads as intentional Framer scale | OK | `globals.css` L84–96 |
| Services sticky/overlap (`margin-top: -174px`) is Framer port, not random drift | OK | `globals.css` L129–141 |
| Arbitrary image heights (`h-[280px]`, `h-[528px]`, `h-[640px]`) — Framer-faithful but outside named spacing tokens | WARNING (minor) | `app/page.tsx` L89, L162, L212 |
| Room card row uses `tablet:gap-2` (8px) between photos — tight vs section whitespace | WARNING | `app/page.tsx` L80 |

### Pillar 6: Experience Design (2/4)

**WARNING** — Primary conversion path works; secondary paths and scroll UX still fail the anti-pattern checklist.

| Finding | Severity | Evidence |
|---------|----------|----------|
| Misleading star ratings on guest reviews (always 5) | **BLOCKER** | See Copywriting; anti-pattern flagged in brief |
| Services section: four informational cards, no navigation / booking | WARNING | Silent conversion path; probe confirms no anchors |
| Fixed nav without `scroll-padding-top` / `scroll-margin` on sections — headings hide under header | WARNING | Clip probe; header height 65.5–67px |
| Room/blog image hover `duration-500` exceeds 150–300ms interaction guidance | WARNING (minor) | `app/page.tsx` L89, L265 |
| Book Now → modal (not silent external URL); focus-visible on hero | OK | `openBooking: true`; `globals.css` L50–57 |
| `EmptySection` for empty rooms/reviews/blog; image pulse fallback | OK | `EmptySection.tsx`; `ImageWithFallback.tsx` L68 |
| `prefers-reduced-motion` honored in Hero / Reveal / globals | OK | `HeroSection` `useReducedMotion`; `globals.css` L270–278 |
| Skip link + single main + one nav (desktop) | OK | `layout.tsx` L51–55; probe `navCount: 1` |

---

## UX hint checklist (home)

| Hint | Status |
|------|--------|
| Minimal single-column / strong hero CTA | Partial — dual CTAs + rating row clutter first viewport |
| cursor-pointer on clickables | Mostly OK (links default; hero/nav CTAs explicit) |
| 150–300ms transitions | Partial — buttons 200ms; card hover 500ms |
| Focus states | OK — global + hero white outline |
| Alt text | Weak on hero / services parallax |
| 4.5:1 contrast | **Fail** on `#999` labels; hero white-on-bright risk |
| No emoji icons | Pass |
| Hero: headline + support + CTA | Partial — extra stars/rating |
| Next.js fill + object-cover heroes | Pass |
| Anti-pattern: weak CTA | Primary CTA strong; mid-page services weak |
| Anti-pattern: silent conversion | Services cards |
| Anti-pattern: nested landmarks | Pass on home (fixed) |
| Anti-pattern: placeholder-only forms | N/A on home surface |
| Anti-pattern: misleading star ratings | **Fail** on testimonials |

---

## Registry Safety

Skipped — no `components.json` (NO_SHADCN).

---

## Files Audited

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/HeroSection.tsx`
- `components/EmptySection.tsx`
- `components/Navigation.tsx`
- `components/Footer.tsx`
- `components/BookNowButton.tsx`
- `components/ImageWithFallback.tsx`
- `components/ParallaxImage.tsx`
- `components/RevealSection.tsx`
- `lib/navigation.ts`
- `lib/format.ts` (presence vs home usage)
- `types/cms.ts` (Testimonial shape)
- `framer-local/cms/testimonials.json` (Star Rating unsupported)

**Screenshot dir:** `.planning/ui-reviews/home-20260718-151004/`
