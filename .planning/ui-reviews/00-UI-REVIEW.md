# Phase 0 — UI Review

**Audited:** 2026-07-18 (re-audit)  
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md)  
**Screenshots:** captured via Playwright MCP (desktop 1440×900 home/contact; mobile 375×812 home). CLI `npx playwright screenshot` failed (Chromium binary missing in sandbox). Live DOM evaluation used for color/a11y proof.  
**Registry audit:** skipped (`components.json` absent — no shadcn)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Contact form is placeholder-only; hero “3 of 5 stars” reads as a hotel star rating |
| 2. Visuals | 2/4 | Nested `<main>` sitewide; CTA radius system split; room detail visually stripped |
| 3. Color | 1/4 | Dining “Contact Us” uses undefined `--color-text` — live `backgroundColor: rgba(0,0,0,0)` + white text |
| 4. Typography | 1/4 | 12+ size steps + 4 weights + arbitrary `text-[Npx]` values |
| 5. Spacing | 2/4 | Declared spacing tokens unused; dual max-widths (1200 / 1284 / 1412) and Framer pixel leftovers |
| 6. Experience Design | 2/4 | Booking modal has no focus trap; room detail content has zero Book CTA |

**Overall: 10/24**

---

## Top 3 Priority Fixes

1. **Dining catering CTA is invisible** — White label on transparent background (`bg: rgba(0,0,0,0)` measured live); users cannot see “Contact Us” on the Outside Catering panel — Change `app/dining/page.tsx:227` from `bg-[var(--color-text)]` to `bg-[var(--color-text-primary)]` (or reuse `.btn-secondary` / a shared primary button class).
2. **Booking modal + ContactForm accessibility gaps** — Keyboard users can tab behind the dialog; contact fields have no `id`/`htmlFor` labels (live: all four fields `hasLabel: false`) — Add focus trap + initial focus on open in `BookingModal.tsx`; add real `<label>` elements in `ContactForm.tsx`.
3. **Room detail is a conversion dead-end** — Live check on `/rooms/classic-room`: `bookInMainContent: []` (Book Now exists only in fixed nav) — Add a primary `BookNowButton` in the sidebar/meta column of `app/rooms/[slug]/page.tsx`.

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

Marketing copy is mostly hospitality-specific. CTAs like “Request booking”, “View All Rooms”, and “See Our Menu” are contextual. Homepage `EmptySection` strings are Machakos-specific, not generic “No data”.

**Findings:**

- **WARNING** `components/ContactForm.tsx:27-55` — Fields are placeholder-only (`Name`, `Email`, `Subject`, `Message`) with no visible labels and no `id`. Live DOM on `/contact`: each field has `hasLabel: false`, `id: ""`. BookingModal does labels correctly; ContactForm does not.
- **WARNING** `components/HeroSection.tsx:140` + `app/page.tsx:58-59` — `aria-label={`${starCount} out of 5 stars — ${rating}`}` with `starCount={3}` and “Machakos Premier” presents as a **3-star hotel rating**. Same pattern on About/Gallery heroes. Screenshot evidence: three filled stars beside the label on the home hero.
- **WARNING** `app/dining/page.tsx:12-24` — `MEAL_HOURS` ships with `TODO: Client content required — restaurant… hours not on client website` — unverified operational copy in production UI.
- **WARNING** `lib/navigation.ts:42` — Footer social entry labeled “Telegram” hrefs `https://twitter.com/teatothotel` (wrong platform / misleading label).
- **WARNING** `lib/navigation.ts:1-7` — Primary nav omits Contact (only in footer `navigate`). High-intent path buried.
- **Positive** — Homepage empty states (`app/page.tsx:104-108`, `200-204`, `283-287`); modal success “Request sent”; booking helper line to `info@teatot.co.ke`.

### Pillar 2: Visuals (2/4)

**Findings:**

- **BLOCKER (markup)** `app/layout.tsx:55` wraps children in `<main id="main-content">`. Page routes (`dining`, `gallery`, `about`, `services`, `rooms`, `rooms/[slug]`, `contact`, `thank-you`, `not-found`, `legal-page`) each render another `<main>`. Live: `nestedMains: 2` on dining, contact, and room detail. Invalid landmarks; skip-link target ambiguous.
- **WARNING** CTA geometry is three systems: Hero `rounded-full` (`HeroSection.tsx:41-42`); nav Book Now `rounded-none` (`Navigation.tsx:35`); booking submit `rounded-none` (`BookingModal.tsx:300`); dining Contact Us is a sharp unstyled rectangle. Reads as unfinished design-system merge.
- **WARNING** `app/gallery/page.tsx:30-42` — Image grid only; CMS `caption` used as alt fallback, never shown. No lightbox / filters — weak vs hero “visual tour” promise.
- **WARNING** `app/rooms/[slug]/page.tsx:25-71` — Thumbnail + prose + amenity HTML dump; no gallery strip, no sticky book panel. Visually underbuilt vs listing/hero pages.
- **WARNING** First viewport brand signal: desktop/mobile screenshots show brand only in the fixed nav bar; hero H1 (“A Premier Machakos Stay”) dominates. If nav is scrolled/covered, page could belong to any Machakos hotel.
- **Positive** — Hero gradient + staggered motion; icon-only controls generally have `aria-label`; `ImageWithFallback` pulse + empty state.

### Pillar 3: Color (1/4)

Token set in `app/globals.css` is coherent monochrome (`#ffffff` / `#050505` / `#f8f8f8` / `#666` / `#999` / `#e5e5e5`). No brand accent in the live theme.

**Findings:**

- **BLOCKER** `app/dining/page.tsx:227` — `bg-[var(--color-text)]`. Live evaluation:
  - `--color-text` → `""` (undefined)
  - `--color-text-primary` → `#050505`
  - Contact Us computed `backgroundColor: "rgba(0, 0, 0, 0)"`, `color: "rgb(255, 255, 255)"` on a `#f8f8f8` panel  
  White text on transparent = invisible / unusable CTA. Primary conversion control for Outside Catering fails.
- **WARNING** Error chrome uses Tailwind `bg-red-50` / `text-red-700` (`BookingModal.tsx:182`, `ContactForm.tsx:23`) outside semantic tokens. Harvested Framer tokens (`#f24`, `#1a73e8`) never map into the live theme.
- **WARNING** Hardcoded `bg-white` / `text-black` / `from-black/70` on heroes and CTAs alongside `var(--color-*)` — dual vocabulary.
- **WARNING** 60/30/10 accent role is empty (~0% brand accent). Acceptable for stark luxury only if intentional; combined with the broken dining button it reads incomplete.
- **Positive** — No purple/glow default AI palette; body/section text largely tokenized.

### Pillar 4: Typography (1/4)

Abstract standard: flag **>4 font sizes** or **>2 font weights**. Both fail hard.

**Size inventory (app + components):**  
`text-xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `8xl`, `9xl`, plus `text-[13px]`, `text-[22px]`, `text-[32px]`, `text-[40px]`, `text-[72px]`.  
Parallel CSS: `.section-heading` (1.875rem / 2.25rem), `.service-number` (3rem).

**Weight inventory:** `font-normal`, `medium`, `semibold`, `bold` (4) — e.g. About stats `font-bold` + `text-[72px]` (`app/about/page.tsx:81`).

**Findings:**

- **BLOCKER (scale discipline)** — No constrained type ramp; pages invent sizes independently (dining hours `desktop:text-[32px]`, services `tablet:text-[40px]`, 404 `text-8xl`/`text-9xl`).
- **WARNING** Display font applied via inline `style={{ fontFamily: "var(--font-inter-display)" }}` in many pages instead of a shared utility — easy to miss / drift.
- **WARNING** Inter / Inter Display is the Framer harvest choice; functional, but the ramp sprawl is the real failure, not the face itself.
- **Positive** — Clear label / heading / body roles via `.section-label` / `.section-heading` / `.section-body` when those classes are used (homepage).

### Pillar 5: Spacing (2/4)

`globals.css` declares `--spacing-section: 96px`, `--spacing-element: 48px` (and mobile variants). Almost nothing consumes them except room detail `py-[var(--spacing-section)]`.

**Findings:**

- **WARNING** Arbitrary heights/margins dominate: `h-[65.5px]`, `h-[528px]`, `-mt-[174px]`, `h-[320px]`×6+, `max-w-[1284px]`×5, `max-w-[1412px]`, `gap-[5px]`. Framer pixel leftovers, not a scale.
- **WARNING** Three content widths compete: `--container-max` (1200), dining/about `1284`, catering panel `1412`. Horizontal rhythm breaks across routes.
- **WARNING** Homepage uses `.container-page` + `.section-stack`; interior pages reinvent `px-6 py-24` / `gap-24` / `gap-32` independently.
- **Positive** — Responsive gap reduction exists for `.section-stack` and services panel; mobile stack is not collapsed into a single cramped column on audited heroes.

### Pillar 6: Experience Design (2/4)

**Findings:**

- **WARNING** `components/BookingModal.tsx` — `role="dialog"` + Escape + body scroll lock, but **no focus trap**, no autofocus into the panel, no focus restore on close. Backdrop is a full-screen button (good for click-away) but Tab escapes the modal.
- **WARNING** `app/rooms/[slug]/page.tsx` — Live `/rooms/classic-room`: Book Now only in nav (`bookInMainContent: []`). Highest-intent page has no in-content reservation path.
- **WARNING** `components/ContactForm.tsx` — Pending/disabled + error + success states exist, but placeholder-only fields hurt keyboard/AT users (paired with Copy pillar).
- **WARNING** No app-level `ErrorBoundary`; image failures handled locally via `ImageWithFallback` only.
- **WARNING** Nested `<main>` (live count 2) breaks skip-link / landmark UX.
- **Positive** — `useReducedMotion` in Hero/BookingModal; Lenis respects `prefers-reduced-motion`; form pending states (“Sending…” / “Sending…”); BookingProvider remounts modal via `session` key to reset form state; 404 / thank-you pages are intentional full-bleed recovery screens.

---

## Files Audited

- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `app/dining/page.tsx`, `app/gallery/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`
- `app/rooms/page.tsx`, `app/rooms/[slug]/page.tsx`
- `app/contact/page.tsx`, `app/thank-you/page.tsx`, `app/not-found.tsx`
- `components/BookingModal.tsx`, `HeroSection.tsx`, `Navigation.tsx`, `Footer.tsx`, `BookNowButton.tsx`, `ContactForm.tsx`, `EmptySection.tsx`
- `providers/BookingProvider.tsx`, `providers/LenisProvider.tsx`
- `lib/navigation.ts`
- Live DOM: `/`, `/dining`, `/contact`, `/rooms`, `/rooms/classic-room`

**Screenshot notes:** Playwright MCP viewport captures observed for home (desktop + mobile) and contact. Dining CTA verified by `getComputedStyle` (transparent bg). CLI screenshot path unavailable in this environment.
