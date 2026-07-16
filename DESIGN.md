# Tea Tot Hotels — Design System

Calibrated from Framer export tokens (`app/globals.css`) and homepage section patterns.

## Typography

| Role | Font | Usage |
|------|------|--------|
| Body | `var(--font-inter)` | Paragraphs, UI labels, nav |
| Display | `var(--font-inter-display)` | Section headings, hero headline |

### Section text hierarchy

1. **Label** — `.section-label` — uppercase eyebrow (e.g. "Rooms & Suites")
2. **Heading** — `.section-heading` — primary section title; prefer one locality anchor (e.g. "Machakos", "Konza Road") over generic hotel copy
3. **Body** — `.section-body` — supporting copy, max-width ~36rem
4. **CTA** — `.btn-secondary` — outline pill button below section intro

## Color

| Token | Value | Use |
|-------|-------|-----|
| `--color-text-primary` | `#050505` | Body text |
| `--color-text-secondary` | `#666666` | Descriptions |
| `--color-text-subtle` | `#999999` | Labels, meta |
| `--color-bg-subtle` | `#f8f8f8` | Cards, panels |
| `--color-border` | `#e5e5e5` | Outlines |
| `--color-white` / `--color-black` | | Hero text, buttons |

## Layout

| Token | Value |
|-------|-------|
| `--container-max` | `1200px` |
| `--breakpoint-tablet` | `810px` |
| `--breakpoint-desktop` | `1200px` |

### Page section stack

- Wrapper: `.section-stack` inside `.container-page`
- Gap between sections: `128px` desktop, `64px` mobile
- Padding: `80px 24px` desktop, `64px 24px` mobile

## Components

### Hero (`HeroSection`)

- Full viewport: `fullViewport` → `h-dvh`, image `fill` + `object-cover`
- Content aligned bottom with `pb-16`
- Primary CTA: white pill; secondary: white outline on dark
- Rating: `starCount` SVG stars + text label (no ★ in string)

### Buttons

- **Primary (hero):** white bg, black text, `rounded-full`
- **Secondary (page):** `.btn-secondary` — border pill, hover `bg-subtle`

### Cards / grids

- Room grid: stack mobile, 3-col from `tablet:`
- Testimonials / journal: 1 → 2 → 3 col at `sm` / `desktop`
- Image cards: `rounded-lg`, hover scale on image

### Empty states (`EmptySection`)

- Background `--color-bg-subtle`, centered copy, optional CTA link
- Use when CMS array is empty — never show heading with blank grid

### Image fallback (`ImageWithFallback`)

- Loading: pulse on `--color-bg-subtle`
- Error: branded placeholder with hotel mark + "Image unavailable"

## Motion

- Entrance: Framer spring, `duration: 1`, `bounce: 0`
- Scroll reveal: `RevealSection` with `whileInView`
- Respect `prefers-reduced-motion` — skip JS animations when set
- CSS transitions disabled under reduced-motion in `globals.css`

## Accessibility

- One `<main id="main-content">` per page (layout)
- Skip link: `.skip-link` → `#main-content`
- Focus: `:focus-visible` 2px outline; white on `.hero-section`
- Touch targets: minimum `44px` height on buttons (`py-3` + text)
