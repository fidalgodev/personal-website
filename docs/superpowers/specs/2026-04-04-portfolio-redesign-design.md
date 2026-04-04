# Portfolio Redesign — fidalgo.dev

## Overview

A complete redesign of Pedro Fidalgo's personal portfolio website. Minimal, modern, Clean Swiss aesthetic with a warm personal tone. Statically built for maximum SEO performance.

## Positioning

**Senior Product Engineer** — emphasizes product thinking, business impact, and technical breadth. Not just a "full-stack developer" portfolio.

## Tone & Voice

Personal and warm. First-person, conversational. Shows personality — a developer who's also a real person. The site should feel like *Pedro*, not a template.

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | TanStack Start (React) | Modern, Vite-based, type-safe routing, static prerendering, built-in sitemap |
| Styling | Tailwind CSS | Utility-first, fast to build, pairs well with Swiss aesthetic |
| Blog Content | content-collections + MDX | Type-safe frontmatter, build-time processing, supports code + narrative posts |
| Hosting | Netlify | Domain (fidalgo.dev) already pointed there, existing subdomain projects stay untouched |
| Domain | fidalgo.dev | DNS managed at Netlify via Namecheap nameservers. No changes needed. |

## Pages & Routing

```
/                    → Home (hero + about + projects + latest posts + contact)
/blog                → Blog listing (all posts, sorted by date)
/blog/[slug]         → Individual article (MDX)
/uses                → Tools, gear, tech stack
404                  → Custom not-found page (same nav, "Page not found", link home)
```

**Trailing slashes**: no trailing slashes (configure in Netlify and TanStack Start for consistency).

**Static prerendering**: all routes prerendered at build time. Blog post routes (`/blog/[slug]`) are discovered via `crawlLinks` starting from `/blog`, which renders links to all published posts at build time via content-collections. Alternatively, slugs can be enumerated explicitly in the prerender config.

## Visual Design

### Style: Clean Swiss

- Strong typography hierarchy
- Geometric accents (thin lines, small dots)
- Generous whitespace between sections
- Thin 1px borders as section dividers
- No shadows, no gradients, no rounded cards — flat and precise
- Subtle hover animations (underline slide-in, opacity shifts)
- External links get the ↗ arrow indicator
- **Focus states**: visible focus ring (2px offset outline) on all interactive elements for keyboard navigation (WCAG 2.4.7)
- **Skip link**: hidden "Skip to content" link visible on focus, jumps past nav
- `<html lang="en">` attribute for accessibility and SEO

### Typography

- Headings & body: **Inter** (geometric sans-serif), fallback: `system-ui, -apple-system, sans-serif`
- Code blocks: **JetBrains Mono** (monospace with ligatures), fallback: `ui-monospace, 'Cascadia Code', 'Fira Code', monospace`
- Fonts: self-hosted WOFF2 files with `font-display: swap` for performance (no Google Fonts CDN)
- Syntax highlighting: **Shiki** at build time, themes: `github-light` / `github-dark` paired with site theme
- Content container width: ~720px (homepage, about, projects, blog listing)
- Blog prose width: ~65ch within the container (narrower for optimal readability)

### Color Palette

No pure white or pure black — softer values for reduced eye strain and better accessibility.

**Light mode:**
- Background: `#fafafa`
- Text: `#1a1a1a`
- Secondary text: `#555555`
- Muted: `#737373` (passes WCAG AA on #fafafa — 4.85:1)
- Accent/link: `#2563eb` (underlined when inline)
- Borders: `#e5e5e5`

**Dark mode:**
- Background: `#141414`
- Text: `#e5e5e5`
- Secondary text: `#999999`
- Muted: `#8a8a8a` (passes WCAG AA on #141414 — 4.68:1)
- Accent/link: `#60a5fa` (underlined when inline)
- Borders: `#2a2a2a`

All color combinations must pass WCAG AA (4.5:1 for normal text, 3:1 for large text). Links in body text are always underlined to meet WCAG 1.4.1.

### Theme Switching

- Three options: Light / Dark / System
- Toggle in the nav (sun/moon icon or minimal switcher)
- Respects `prefers-color-scheme` for System mode
- Persisted in `localStorage`
- Tailwind `darkMode: 'class'` strategy — `.dark` class on `<html>`
- **Flash prevention**: inline `<script>` in `<head>` reads `localStorage` and applies `.dark` class before first paint to prevent flash of incorrect theme

## Page Designs

### Homepage (`/`)

Linear narrative layout, single-column flow:

1. **Nav** — small circular avatar (dog photo) + "pedro fidalgo" on left. Links (projects → `/#projects` which navigates home and scrolls on any page, blog → /blog, uses → /uses) + theme toggle on right.
2. **Hero** — text only. Geometric accent line, headline, subtitle, status dot. No photo here — let the words land.
3. **Full-width working photo** — edge-to-edge, cinematic break. The desk setup shot (dual monitors, mech keyboard, coding).
4. **About** — 2-3 paragraphs, personal story in first person. Section label: uppercase "ABOUT" with letter-spacing.
5. **Projects** — list style. Each project: name, one-liner, tech tags, external link arrow (↗). Zerosum gets the most prominence. Section label: "PROJECTS".
6. **Latest Posts** — 2-3 most recent blog posts (title, date, description). Empty state: "No posts yet" message. Links to /blog. Section label: "LATEST POSTS".
7. **Footer** — all social links (GitHub, LinkedIn, Twitter/X, YouTube, Instagram) + email (hello@fidalgo.dev).

### Blog Listing (`/blog`)

- Same nav as homepage
- Page title: "Blog" or "Writing"
- List of posts: title, date, short description, tags
- Clean, no thumbnails — titles do the work
- Simple layout, no filtering for v1

### Blog Post (`/blog/[slug]`)

- Same nav
- Article header: title, date, reading time, tags
- MDX content with good typography:
  - ~65ch max-width for readability
  - Proper line-height
  - Syntax-highlighted code blocks (JetBrains Mono)
  - Support for images, blockquotes, lists, headings
- Back link to /blog at top or bottom

### Blog Post Frontmatter Schema

```
title: string (required)
date: string ISO date (required)
description: string (required)
tags: string[] (optional)
draft: boolean (optional, default false)
slug: derived from filename
readingTime: computed at build time
```

### Uses (`/uses`)

- Same nav
- Organized by category (Hardware, Software, Development, etc.)
- Simple list: item name + short note about why
- Optional: desk photo at top

## SEO Strategy

- **Static prerendering**: all pages rendered to HTML at build time via TanStack Start's prerender config
- **Meta tags**: unique title, description, Twitter Cards per page via route `head` config
- **OG image**: single default OG image for v1 (working photo cropped to 1200x630), shared across all pages. Per-post OG images are a future enhancement.
- **Canonical URLs**: `<link rel="canonical">` on every page to prevent duplicate content issues
- **JSON-LD**: Person schema on homepage, Article schema on blog posts
- **Sitemap**: auto-generated via TanStack Start's prerender sitemap option
- **robots.txt**: static file in public directory
- **Semantic HTML**: proper heading hierarchy, landmarks, alt text on images
- **RSS feed**: generated at build time from content-collections posts (trivial to implement, good for discoverability)

## Images

Two personal photos:

1. **Avatar** — Pedro with dog, outdoor setting. Used as small circular image in nav. Warm, personal.
2. **Working photo** — Pedro at desk, dual monitors, coding. Used as full-width cinematic break on homepage between hero and about. Conveys credibility.

**Image optimization strategy**: since there are only 2 images, use a build-time script with `sharp` to generate WebP at 3 breakpoints (640w, 1280w, 1920w). Store optimized images in `public/images/`. Use `<img srcset>` with `sizes` attribute for responsive loading. Avatar gets 2 sizes (48px, 96px for retina).

## Copy

### Hero

> **Senior Product Engineer building end-to-end.**
>
> Currently at Prolific working with Python and Vue. My personal stack is React, TypeScript, Node, and Tailwind — I ship full products from database to UI. Self-taught, endlessly curious, and always building something on the side.

Status line: "Open to interesting conversations"

### About

> I'm Pedro — a self-taught software engineer based in Aveiro, Portugal.
>
> In 2018, I decided it was time for a change. I started teaching myself JavaScript before work, fell in love with it, and in January 2019 I quit my job to go all in. Six months later I landed my first engineering role at Mindera in the UK, where I grew into a full-stack developer working on large-scale e-commerce.
>
> Today I'm a Senior Product Engineer at Prolific, building with Python and Vue. But my heart is in the React and Node ecosystem — TypeScript, Tailwind, Hono, tRPC, and Postgres are what I reach for when I'm building for myself.
>
> Outside of work, I build my own things. Zerosum is a budgeting app I built from scratch with React, Hono, tRPC, and Postgres — a real SaaS product with real users. I like solving problems that I personally have, and turning them into something others can use too.

### Projects

> **Zerosum** — Zero-based budgeting made simple. A full-stack SaaS I built and run with React, Tailwind, Hono, tRPC, and Postgres. Real users, real product.
> URL: https://zerosum.so/
>
> **Liga do Tinto** — A custom fantasy league dashboard for my friend group. Replaced a clunky official website and messy spreadsheets with proper stats, split-season tracking, and dinner bet standings.
> URL: https://ligarecord.fidalgo.dev/
>
> **Movie Library** — A React app for browsing and discovering movies. One of my earlier projects that helped me learn React and working with external APIs.
> URL: https://movies.fidalgo.dev/

### Blog (empty state)

> No posts yet — but they're coming. I'll be writing about building products, technical deep dives, and lessons from shipping side projects.

## Social Links

- GitHub: https://github.com/fidalgodev/
- LinkedIn: https://www.linkedin.com/in/fidalgodev/
- Twitter/X: https://x.com/fidalgodev
- YouTube: https://youtube.com/c/fidalgodev
- Instagram: https://instagram.com/fidalgo.dev
- Email: hello@fidalgo.dev

## Out of Scope for v1

- CV/Resume PDF generation (link to LinkedIn for now)
- Blog post filtering/search
- Page transition animations
- Analytics (can add later)
- Contact form (email link is sufficient)
- Per-post OG image generation (use default OG image for v1)
- Comments on blog posts
