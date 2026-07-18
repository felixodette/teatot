# Phase rooms — UI Review

**Audited:** 2026-07-18  
**Baseline:** Abstract 6-pillar standards (no UI-SPEC.md)  
**Scope:** `/rooms` listing + `/rooms/[slug]` detail only  
**Screenshots:** Captured via Playwright MCP → `.planning/ui-reviews/rooms-20260718/`  
(desktop listing/detail, mobile listing/detail, detail with in-content Book Now scrolled into view)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 2/4 | Silent cards, unformatted prices (`Ksh 5297`), taxonomy noise (`Twin Bedroom` → Deluxe) |
| 2. Visuals | 2/4 | Nested `<main>`; detail CTA below fold; cards lack click affordance |
| 3. Color | 3/4 | Token-driven mono palette; accent reserved for Book Now — solid |
| 4. Typography | 2/4 | Category style diverges listing vs detail; 5 size steps on detail |
| 5. Spacing | 1/4 | Desktop/tablet grid `rowGap`/`columnGap` computed **8px** — cards nearly touch |
| 6. Experience Design | 3/4 | In-content `BookNowButton` landed; still nested landmarks + no empty state |

**Overall: 13/24**

---

## Top 3 Priority Fixes

1. **Desktop/tablet room grid gutters are 8px** — Photo cards visually merge; hospitality grid feels broken. — Change `app/rooms/page.tsx` grid from `gap-x-2 gap-y-12 tablet:gap-y-2` to something on the design scale (e.g. `gap-x-6 gap-y-12` or `gap-[var(--spacing-element)]`), and verify computed gap ≥ 24–48px at ≥810px.
2. **Nested `<main>` on both rooms routes** — Skip-link / landmark semantics break (two mains: layout `#main-content` + page `<main>`). — Remove page-level `<main>` in `app/rooms/page.tsx` and `app/rooms/[slug]/page.tsx`; use `<div>` / `<section>` instead. Leave the single landmark in `app/layout.tsx`.
3. **Conversion hierarchy still weak above the fold** — Listing cards have no short description or secondary CTA; detail in-content Book Now sits ~y=980 on mobile / below viewport on desktop until scroll. — Surface `shortDescription` (or a “View room” cue) on cards; keep detail Book Now sticky or move it under the price so it shares the first viewport with the title.

---

## Detailed Findings

### Pillar 1: Copywriting (2/4)

**WARNING** — Copy is on-brand in the hero but thin on conversion and scannability.

| Finding | Severity | Evidence |
|---------|----------|----------|
| Listing cards show only category + name + price — `shortDescription` from CMS is unused | WARNING | `app/rooms/page.tsx` L45–63; CMS has short copy e.g. classic-room |
| Prices render without thousands separators (`Ksh 5297`, `Ksh 13875`) | WARNING | Listing L56–57; detail L39–40 |
| `Twin Bedroom` categorized as **Deluxe** — confuses taxonomy vs Standard/Deluxe/Suite | WARNING | CMS `family-room` Category = Deluxe; listing shows uppercase DELUXE |
| Document title doubles brand: `Rooms — Tea Tot Hotels \| Tea Tot Hotels` | WARNING | Page `title` + layout `template: "%s \| Tea Tot Hotels"` |
| Hero copy “Four comfortable room types…” matches published count (drafts filtered) | OK | `normalizeRooms` + `published()` |
| Detail CTA label “Book Now” is specific (not “Submit” / “Click Here”) | OK | `[slug]/page.tsx` L70–72 |
| No empty-state copy if `getRooms()` returns `[]` | WARNING | Listing maps rooms with no branch |
| Invalid slug uses generic 404 (“Page not found” / “Return Home”) — no “Back to rooms” | WARNING | `app/not-found.tsx` (shared) |

### Pillar 2: Visuals (2/4)

**WARNING** — Hero listing focal point is clear; detail and landmarks are not.

| Finding | Severity | Evidence |
|---------|----------|----------|
| **Nested `<main>`** — layout wraps children in `<main id="main-content">`; both rooms pages wrap again in `<main>` | BLOCKER (a11y) | `layout.tsx` L55; `rooms/page.tsx` L18; `[slug]/page.tsx` L27; runtime HTML count = 2 |
| Detail hero image is inset with `rounded-lg` — weaker presence than listing full-bleed `HeroSection` | WARNING | `[slug]/page.tsx` L28–35 |
| In-content Book Now verified present (black full-width in specs column) but **not in first viewport** without scroll | WARNING | Screenshot `room-detail-desktop.png` (CTA absent); `room-detail-booknow.png` (CTA after scroll); mobile rect top ≈ 982px vs 812vh |
| Listing cards are full-card links with hover scale only — no chevron / “View room” affordance | WARNING | `rooms/page.tsx` L32–65 |
| Card chrome uses `bg-[var(--color-bg-subtle)]` blocks — acceptable as interactive containers | OK | L34 |

### Pillar 3: Color (3/4)

**WARNING** — Minor; tokens used correctly, distribution mostly sound.

| Finding | Severity | Evidence |
|---------|----------|----------|
| Rooms surfaces use CSS variables (`--color-bg-subtle`, `--color-text-subtle`, `--color-border`, `--color-text-primary`) — no hardcoded hex in rooms pages | OK | Grep on `app/rooms` |
| 60/30/10: white dominant, subtle gray cards/borders, black reserved for primary text + Book Now | OK | Screenshots + classes |
| Detail Book Now `bg-[var(--color-text-primary)] text-white` — accent on declared CTA only | OK | L70 |
| Category / meta use `--color-text-subtle` (#999) — low contrast on white for small caps labels | WARNING | Listing L47–49; detail L37 |

### Pillar 4: Typography (2/4)

**WARNING** — Hierarchy works at a glance; system is inconsistent across the two routes.

| Finding | Severity | Evidence |
|---------|----------|----------|
| Listing sizes: `text-xs`, `text-sm`, `text-base`, `text-lg` (4) | WARNING | `page.tsx` |
| Detail sizes: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-4xl` (5) | WARNING | `[slug]/page.tsx` |
| Weights: `font-medium`, `font-semibold` (2) — within abstract ≤2 weights | OK | Both pages |
| Category treatment mismatch: listing `uppercase tracking-[0.15em] text-xs font-medium` vs detail plain `text-sm text-subtle` (no uppercase) | WARNING | L47–49 vs L37 |
| Price on listing same `text-base` weight as “From” — price not emphasized | WARNING | L52–62 |

### Pillar 5: Spacing (1/4)

**BLOCKER** — Violates the project’s own spacing scale on the primary rooms grid.

| Finding | Severity | Evidence |
|---------|----------|----------|
| At 1440×900, computed grid **`rowGap: 8px`, `columnGap: 8px`** | BLOCKER | Playwright `getComputedStyle(.grid)`; classes `gap-x-2` + `tablet:gap-y-2` (tablet breakpoint 810px applies through desktop) |
| Mobile correctly gets `rowGap: 48px` (`gap-y-12`) | OK | Computed at 375px |
| Design tokens define `--spacing-element: 48px` / `--spacing-section: 96px` but listing ignores them for card gutters | WARNING | `globals.css` L26–30 vs `page.tsx` L28–29 |
| Listing after hero uses only `pt-6` (24px) — abrupt drop from 640px hero | WARNING | L28 |
| Arbitrary `gap-[5px]` between currency and price | WARNING | L54 |
| Detail section padding `py-[var(--spacing-section)]` aligns with tokens | OK | L27 |

### Pillar 6: Experience Design (3/4)

**WARNING** — Recent Book Now fix lands; remaining issues are structural / empty-path.

| Finding | Severity | Evidence |
|---------|----------|----------|
| **In-content `BookNowButton` on room detail — verified** | OK (fix landed) | `[slug]/page.tsx` L70–72; DOM: `w-full` black button inside content `main`; screenshot `room-detail-booknow.png` |
| `ImageWithFallback` provides pulse skeleton + branded “Image unavailable” fallback | OK | `ImageWithFallback.tsx` |
| Nested `<main>` breaks skip-to-content landmark contract | BLOCKER | See Visuals |
| `RevealSection` starts `opacity: 0` — 4th card can appear missing until scroll/IO; fine after reveal | WARNING | `RevealSection.tsx` L29–32; listing uses delay `i * 0.1` |
| No loading/empty branch on listing | WARNING | `page.tsx` L30–66 |
| Invalid slug → generic not-found (no rooms recovery path) | WARNING | `notFound()` + `app/not-found.tsx` |
| Book Now opens booking modal immediately (no disabled/pending) — acceptable for modal open | OK | `BookNowButton.tsx` |
| Listing has no per-card book path (nav Book Now only) — extra hop to detail | WARNING | Cards are detail links only |

**Registry audit:** Skipped — no project-root `components.json` / shadcn third-party registries for this surface.

---

## Files Audited

- `app/rooms/page.tsx`
- `app/rooms/[slug]/page.tsx`
- `components/BookNowButton.tsx`
- `components/ImageWithFallback.tsx`
- `components/HeroSection.tsx` (listing hero only)
- `components/RevealSection.tsx` (listing card reveal)
- `app/layout.tsx` (nested `<main>` context)
- `app/globals.css` (tokens / breakpoints)
- `app/not-found.tsx` (invalid slug empty path)
- `lib/data.ts` / `lib/normalize.ts` / `framer-local/cms/rooms.json` (copy, empty, draft filter)

### Screenshots

- `.planning/ui-reviews/rooms-20260718/rooms-listing-desktop.png`
- `.planning/ui-reviews/rooms-20260718/rooms-listing-full.png`
- `.planning/ui-reviews/rooms-20260718/rooms-listing-mobile.png`
- `.planning/ui-reviews/rooms-20260718/room-detail-desktop.png`
- `.planning/ui-reviews/rooms-20260718/room-detail-mobile.png`
- `.planning/ui-reviews/rooms-20260718/room-detail-booknow.png`
