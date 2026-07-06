---

# Product Requirements Document (PRD)

## Project Name

**The Hotel — Framer to Next.js Migration & Replication** | https://thehotel.framer.website/

---

## Project Vision

Build a production-grade Next.js application that is **visually, behaviorally, and functionally indistinguishable** from the original Framer website while transforming the exported Framer project into a maintainable, scalable software architecture.

This is **not** a static clone.

It is a full migration from Framer into an enterprise-grade Next.js codebase capable of supporting future growth without dependence on Framer.

---

# Core Architectural Principle

## Framer Abstraction Layer (Mandatory)

The application **must never render directly from Framer-exported JSON structures**.

Instead, a dedicated transformation layer shall normalize all Framer exports into clean domain models before they reach the UI.

This creates a strict separation between:

```
Framer Export
      │
      ▼
Import Layer
      │
      ▼
Transformation Layer
      │
      ▼
Domain Models
      │
      ▼
UI Components
```

The UI must be completely unaware that the original content originated from Framer.

---

# Data Pipeline

The application shall implement the following pipeline.

```
cms/*.json
pages/*.json
components.json
project-context.json

        │
        ▼

Framer Importers

        │
        ▼

Normalization Engine

        │
        ▼

Typed Domain Models

        │
        ▼

Application Components

        │
        ▼

Rendered Website
```

---

# Import Layer

Create a dedicated import system.

Example:

```
lib/

    framer/

        importCMS.ts

        importPages.ts

        importComponents.ts

        importProjectContext.ts

        parser.ts

        validator.ts
```

Responsibilities:

* Parse Framer JSON
* Handle malformed data
* Validate schemas
* Detect missing assets
* Resolve image references
* Resolve component references
* Build navigation
* Build routing
* Build page hierarchy

---

# Normalization Layer

The Framer schema should **never** be used directly inside React components.

Instead, transform every content type into a strongly typed domain object.

Example:

```
Room

Service

GalleryImage

DiningMenu

FAQ

Testimonial

BlogPost

LegalPage

TeamMember

NavigationItem

FooterSection

ContactInformation
```

Every object should expose only application-specific fields.

Example:

Instead of:

```
node.children[4].props.image.asset.url
```

Components should receive:

```
room.heroImage
```

---

# Domain Model Layer

Create:

```
types/

    room.ts

    service.ts

    gallery.ts

    testimonial.ts

    faq.ts

    blog.ts

    navigation.ts

    footer.ts

    legal.ts
```

Every model must include:

* TypeScript interface
* Validation
* Defaults
* Optional fields
* Image metadata
* SEO metadata where appropriate

---

# Repository Layer

The UI must consume repositories instead of JSON.

Example:

```
repositories/

    roomRepository.ts

    serviceRepository.ts

    galleryRepository.ts

    faqRepository.ts

    blogRepository.ts

    teamRepository.ts
```

Example usage:

```ts
const rooms = await RoomRepository.getAll()

const featured = await RoomRepository.getFeatured()

const room = await RoomRepository.getBySlug(slug)
```

No component should ever load JSON directly.

---

# Content Provider

Introduce a Content Provider abstraction.

```
Content Provider

        ▲

Framer Provider

Sanity Provider

Contentful Provider

Strapi Provider

Database Provider

API Provider
```

The application should be able to swap content providers without modifying UI components.

---

# Image Pipeline

Create a centralized image manager.

Responsibilities:

* Asset resolution
* Responsive sizing
* next/image optimization
* Placeholder generation
* Blur hashes
* Lazy loading
* Cache management
* Fallback images

---

# Motion System

Create reusable motion primitives.

```
animations/

    fade.ts

    slide.ts

    stagger.ts

    hero.ts

    cards.ts

    gallery.ts

    navigation.ts

    modal.ts

    pageTransition.ts
```

Every animation should reference these primitives instead of embedding animation objects inside components.

---

# Design Tokens

Create a centralized design token system.

```
design/

    colors.ts

    spacing.ts

    typography.ts

    radius.ts

    elevation.ts

    breakpoints.ts

    transitions.ts

    shadows.ts

    zIndex.ts
```

These should mirror the Framer design language while remaining framework-independent.

---

# Component Architecture

Components must remain completely presentation-focused.

```
Page

↓

Feature

↓

Section

↓

Component

↓

Primitive
```

Example:

```
HomePage

↓

HeroFeature

↓

HeroSection

↓

HeroCard

↓

Button
```

Business logic must never live inside presentation components.

---

# Future CMS Compatibility

The architecture must support replacing the Framer JSON with:

* Sanity
* Contentful
* Strapi
* Direct PostgreSQL
* REST API
* GraphQL
* Headless WordPress
* Supabase
* Firebase

with minimal changes confined to the repository/provider layer.

---

# Maintainability Goals

The resulting application should:

* Remove all runtime dependence on Framer.
* Isolate Framer-specific parsing to a single module.
* Provide clean, typed interfaces for every domain object.
* Enable future CMS migration without UI rewrites.
* Allow content updates without altering presentation code.
* Support testing of parsing, repositories, and UI independently.

---

# Acceptance Criteria (Updated)

In addition to visual and behavioral parity:

* No React component imports raw Framer JSON.
* All Framer exports pass through the import and normalization pipeline.
* All UI components consume typed domain models only.
* Repository layer abstracts content retrieval.
* Swapping the content provider requires no changes to page or component code.
* Design tokens are centralized and reusable.
* Motion definitions are reusable and consistent.
* The application is fully decoupled from the original Framer export format.

---

I would also add one final requirement that is common in enterprise migrations:

### Migration Verification Matrix

Create a `/docs/migration` folder containing:

* **Asset Mapping** (`asset-map.md`) — Original Framer asset → Next.js asset.
* **Component Mapping** (`component-map.md`) — Framer component → React component.
* **Animation Mapping** (`motion-map.md`) — Every Framer animation translated to Framer Motion.
* **Page Mapping** (`page-map.md`) — Framer page → Next.js route.
* **CMS Mapping** (`cms-map.md`) — Framer JSON fields → normalized domain models.
* **Design Token Mapping** (`design-token-map.md`) — Framer styles → CSS variables and Tailwind tokens.
* **Parity Checklist** (`parity-checklist.md`) — A comprehensive checklist ensuring every page, component, animation, interaction, responsive breakpoint, and asset has been verified against the original.

This documentation transforms the project from a one-time clone into a well-governed migration with traceability, making future maintenance and audits significantly easier.
