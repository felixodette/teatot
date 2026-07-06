# The Hotel — Framer Project Local Export

**Project ID:** `hO7X5AAjj8iNds2U6WO0`
**Exported:** 2026-07-03
**Source:** https://framer.com/projects/The-Hotel-copy--hO7X5AAjj8iNds2U6WO0-cVDXY

## Structure

```
framer-local/
├── project-context.json          # Fonts, styles, color tokens, site metadata
├── components.json               # 21 reusable components (id + name)
├── pages/                        # Full serialized node trees per page
│   ├── home.json                 # /
│   ├── rooms.json                # /rooms
│   ├── services.json             # /services
│   ├── dining.json               # /dining
│   ├── gallery.json              # /gallery
│   ├── about.json                # /about
│   ├── contact.json              # /contact
│   ├── thank-you.json            # /thank-you
│   ├── 404.json                  # /404
│   ├── rooms--rooms.json         # /rooms/:Rooms  (CMS detail)
│   ├── blog-posts--blog-posts.json # /blog-posts/:Blog Posts (CMS detail)
│   ├── legal-page--legal-page.json # /legal-page/:Legal Page (CMS detail)
│   └── layout-template-template.json # Shared layout template (nav + footer)
├── cms/                          # All CMS collections with full field data
│   ├── rooms.json                # 6 items
│   ├── services.json             # 5 items
│   ├── gallery.json              # 6 items
│   ├── testimonials.json         # 4 items
│   ├── blog-posts.json           # 3 items
│   ├── faqs.json                 # 4 items
│   ├── team.json                 # 3 items
│   ├── dining-menu.json          # 6 items
│   └── legal-page.json           # 2 items
└── screenshots/                  # Full-page screenshots (7 main pages)
    ├── home.jpg
    ├── rooms.jpg
    ├── services.jpg
    ├── dining.jpg
    ├── gallery.jpg
    ├── about.jpg
    └── contact.jpg
```

## Live Session

The Framer agent session (`id: 1`) is still active. To run commands against it:

```bash
export PATH="/opt/homebrew/bin:$PATH"
npx @framer/agent@latest exec -s 1 -e "console.log('hello')"
```

## Re-exporting

To refresh the local data, re-run the export scripts in `/tmp/framer/1-*.js` with:

```bash
npx @framer/agent@latest exec -s 1 -f /path/to/script.js
```
