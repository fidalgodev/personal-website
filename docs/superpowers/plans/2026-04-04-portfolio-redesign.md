# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Pedro Fidalgo's portfolio site (fidalgo.dev) — a minimal, Clean Swiss design with blog, uses page, dark mode, and excellent SEO, statically prerendered on Netlify.

**Architecture:** TanStack Start (React) with static prerendering. Content-collections processes MDX blog posts at build time. Tailwind CSS v4 with CSS-first config and class-based dark mode. All pages prerendered to static HTML with sitemap generation.

**Tech Stack:** TanStack Start, React, TypeScript, Tailwind CSS v4, content-collections, MDX, Shiki (via rehype-pretty-code), Biome, Lefthook, Netlify

**Design Spec:** `docs/superpowers/specs/2026-04-04-portfolio-redesign-design.md`

---

## File Structure

```
fidalgo-website/
├── content/
│   └── posts/                    # MDX blog posts
│       └── hello-world.mdx       # Sample post (for build verification)
├── public/
│   ├── images/
│   │   ├── avatar.webp           # Dog photo (48px, 96px sizes)
│   │   ├── working.webp          # Desk photo (640w, 1280w, 1920w)
│   │   └── og-image.jpg          # Default OG image (1200x630)
│   ├── fonts/
│   │   ├── inter-variable.woff2
│   │   └── jetbrains-mono-variable.woff2
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── nav.tsx               # Site navigation with avatar + theme toggle
│   │   ├── footer.tsx            # Social links footer
│   │   ├── theme-toggle.tsx      # Light/Dark/System switcher
│   │   ├── section-label.tsx     # Uppercase section heading ("ABOUT", "PROJECTS")
│   │   ├── project-item.tsx      # Single project row in project list
│   │   ├── post-item.tsx         # Single post row in blog listing
│   │   └── mdx-components.tsx    # Custom MDX component overrides
│   ├── lib/
│   │   ├── constants.ts          # Site config, social links, project data
│   │   ├── theme.ts              # Theme read/write/apply logic
│   │   └── reading-time.ts       # Word count → reading time
│   ├── routes/
│   │   ├── __root.tsx            # Root layout, global head, theme flash script
│   │   ├── index.tsx             # Homepage
│   │   ├── uses.tsx              # /uses page
│   │   └── blog/
│   │       ├── index.tsx         # /blog listing
│   │       └── $slug.tsx         # /blog/[slug] article
│   ├── styles/
│   │   └── app.css               # Tailwind imports, theme tokens, font-face, prose styles
│   └── router.tsx                # TanStack Router config
├── scripts/
│   └── optimize-images.ts        # Sharp-based image optimization
├── biome.json
├── content-collections.ts
├── lefthook.yml
├── netlify.toml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Task 1: Repository Bootstrap

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git repository**

```bash
cd /Users/fidalgo/projects/fidalgo-website
git init
```

- [ ] **Step 2: Create package.json**

```json
{
	"name": "fidalgo-website",
	"version": "1.0.0",
	"type": "module",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "biome check .",
		"check:fix": "biome check --write .",
		"format": "biome format --write .",
		"prepare": "lefthook install"
	},
	"dependencies": {
		"@tanstack/react-router": "^1.120.0",
		"@tanstack/react-start": "^1.120.0",
		"react": "^19.1.0",
		"react-dom": "^19.1.0"
	},
	"devDependencies": {
		"@biomejs/biome": "2.4.10",
		"@netlify/vite-plugin-tanstack-start": "^0.1.0",
		"@tailwindcss/vite": "^4.1.0",
		"@types/node": "^22.0.0",
		"@types/react": "^19.1.0",
		"@types/react-dom": "^19.1.0",
		"@vitejs/plugin-react": "^4.5.0",
		"lefthook": "^1.11.0",
		"tailwindcss": "^4.1.0",
		"typescript": "^5.8.0",
		"vite": "^6.3.0"
	}
}
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
	"compilerOptions": {
		"jsx": "react-jsx",
		"moduleResolution": "Bundler",
		"module": "ESNext",
		"target": "ES2022",
		"skipLibCheck": true,
		"strictNullChecks": true,
		"paths": {
			"~/*": ["./src/*"],
			"content-collections": ["./.content-collections/generated"]
		}
	}
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules
dist
.content-collections
.netlify
.vinxi
*.local
.superpowers
```

- [ ] **Step 5: Install dependencies**

```bash
cd /Users/fidalgo/projects/fidalgo-website
pnpm install
```

- [ ] **Step 6: Commit**

```bash
git add package.json tsconfig.json .gitignore pnpm-lock.yaml
git commit -m "chore: initialize project with TanStack Start + Tailwind + Biome"
```

---

## Task 2: Biome + Lefthook Setup

**Files:**
- Create: `biome.json`
- Create: `lefthook.yml`

- [ ] **Step 1: Initialize Biome config**

Create `biome.json`:

```json
{
	"$schema": "https://biomejs.dev/schemas/2.4.10/schema.json",
	"vcs": {
		"enabled": true,
		"clientKind": "git",
		"useIgnoreFile": true
	},
	"files": {
		"ignoreUnknown": true,
		"ignore": [
			"dist",
			".content-collections",
			".vinxi",
			"src/routeTree.gen.ts"
		]
	},
	"formatter": {
		"enabled": true,
		"indentStyle": "tab",
		"lineWidth": 100
	},
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"style": {
				"useImportType": "error",
				"useExportType": "error"
			}
		}
	},
	"javascript": {
		"formatter": {
			"quoteStyle": "double",
			"semicolons": "asNeeded"
		}
	},
	"assist": {
		"enabled": true,
		"actions": {
			"source": {
				"organizeImports": "on"
			}
		}
	}
}
```

- [ ] **Step 2: Verify Biome works**

Run: `pnpm check`
Expected: No errors (no source files to lint yet)

- [ ] **Step 3: Create lefthook.yml**

```yaml
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
      stage_fixed: true
```

- [ ] **Step 4: Install git hooks**

```bash
cd /Users/fidalgo/projects/fidalgo-website
pnpm lefthook install
```

Expected: "lefthook is installed" or similar success message.

- [ ] **Step 5: Commit**

```bash
git add biome.json lefthook.yml
git commit -m "chore: add Biome linter/formatter and Lefthook pre-commit hooks"
```

---

## Task 3: Vite + TanStack Start + Netlify Config

**Files:**
- Create: `vite.config.ts`
- Create: `netlify.toml`
- Create: `src/router.tsx`
- Create: `src/routes/__root.tsx`
- Create: `src/routes/index.tsx`

- [ ] **Step 1: Create vite.config.ts**

```typescript
import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import netlify from "@netlify/vite-plugin-tanstack-start"

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [tailwindcss(), tanstackStart(), netlify(), viteReact()],
})
```

- [ ] **Step 2: Create netlify.toml**

```toml
[build]
  command = "vite build"
  publish = "dist/client"

[dev]
  command = "vite dev"
  port = 3000
```

- [ ] **Step 3: Create src/router.tsx**

```tsx
import { createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
	})
	return router
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>
	}
}
```

- [ ] **Step 4: Create src/routes/__root.tsx**

A minimal root to verify the app boots. We'll add styling, nav, and meta in later tasks.

```tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react"
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "fidalgo.dev" },
		],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
```

- [ ] **Step 5: Create src/routes/index.tsx**

```tsx
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: HomePage,
})

function HomePage() {
	return (
		<main>
			<h1>fidalgo.dev</h1>
			<p>Coming soon.</p>
		</main>
	)
}
```

- [ ] **Step 6: Verify the app boots**

```bash
cd /Users/fidalgo/projects/fidalgo-website
pnpm dev
```

Expected: Dev server starts at http://localhost:3000, shows "fidalgo.dev / Coming soon." Stop the server after verifying.

- [ ] **Step 7: Commit**

```bash
git add vite.config.ts netlify.toml src/
git commit -m "chore: add Vite config, TanStack Start router, Netlify adapter, and root layout"
```

---

## Task 4: Tailwind CSS + Design Tokens + Fonts

**Files:**
- Create: `src/styles/app.css`
- Create: `public/fonts/` (font files)
- Modify: `src/routes/__root.tsx` (add CSS link)

- [ ] **Step 1: Download self-hosted fonts**

```bash
cd /Users/fidalgo/projects/fidalgo-website
mkdir -p public/fonts

# Download Inter variable font (WOFF2)
curl -L -o public/fonts/inter-variable.woff2 \
  "https://github.com/rsms/inter/raw/master/docs/font-files/InterVariable.woff2"

# Download JetBrains Mono variable font (WOFF2)
curl -L -o public/fonts/jetbrains-mono-variable.woff2 \
  "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/variable/JetBrainsMono%5Bwght%5D.woff2"
```

If the exact URLs have changed, find the latest WOFF2 variable font files from the Inter and JetBrains Mono GitHub releases.

- [ ] **Step 2: Create src/styles/app.css**

```css
@import "tailwindcss";

/* Class-based dark mode instead of prefers-color-scheme */
@custom-variant dark (&:where(.dark, .dark *));

/* ── Fonts ── */

@font-face {
	font-family: "Inter";
	font-style: normal;
	font-weight: 100 900;
	font-display: swap;
	src: url("/fonts/inter-variable.woff2") format("woff2");
}

@font-face {
	font-family: "JetBrains Mono";
	font-style: normal;
	font-weight: 100 800;
	font-display: swap;
	src: url("/fonts/jetbrains-mono-variable.woff2") format("woff2");
}

/* ── Theme Tokens ── */

@theme {
	--font-sans: "Inter", system-ui, -apple-system, sans-serif;
	--font-mono: "JetBrains Mono", ui-monospace, "Cascadia Code", "Fira Code", monospace;

	/* Light mode (default) */
	--color-bg: #fafafa;
	--color-text: #1a1a1a;
	--color-text-secondary: #555555;
	--color-text-muted: #737373;
	--color-accent: #2563eb;
	--color-border: #e5e5e5;
	--color-surface: #ffffff;
	--color-green-dot: #22c55e;
}

/* Dark mode overrides */
.dark {
	--color-bg: #141414;
	--color-text: #e5e5e5;
	--color-text-secondary: #999999;
	--color-text-muted: #8a8a8a;
	--color-accent: #60a5fa;
	--color-border: #2a2a2a;
	--color-surface: #1a1a1a;
	--color-green-dot: #22c55e;
}

/* ── Base Styles ── */

body {
	font-family: var(--font-sans);
	background-color: var(--color-bg);
	color: var(--color-text);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

/* ── Focus States (a11y) ── */

:focus-visible {
	outline: 2px solid var(--color-accent);
	outline-offset: 2px;
}

/* ── Skip Link ── */

.skip-link {
	position: absolute;
	top: -100%;
	left: 16px;
	z-index: 100;
	padding: 8px 16px;
	background: var(--color-bg);
	color: var(--color-text);
	border: 1px solid var(--color-border);
	font-size: 14px;
	text-decoration: none;
}

.skip-link:focus {
	top: 16px;
}

/* ── Prose (blog articles) ── */

.prose {
	max-width: 65ch;
	line-height: 1.75;
	color: var(--color-text);
}

.prose h2 {
	font-size: 1.5rem;
	font-weight: 600;
	margin-top: 2.5rem;
	margin-bottom: 1rem;
	color: var(--color-text);
}

.prose h3 {
	font-size: 1.25rem;
	font-weight: 600;
	margin-top: 2rem;
	margin-bottom: 0.75rem;
	color: var(--color-text);
}

.prose p {
	margin-bottom: 1.25rem;
}

.prose a {
	color: var(--color-accent);
	text-decoration: underline;
	text-underline-offset: 2px;
}

.prose a:hover {
	text-decoration-thickness: 2px;
}

.prose ul,
.prose ol {
	margin-bottom: 1.25rem;
	padding-left: 1.5rem;
}

.prose li {
	margin-bottom: 0.5rem;
}

.prose blockquote {
	border-left: 2px solid var(--color-border);
	padding-left: 1rem;
	color: var(--color-text-secondary);
	font-style: italic;
	margin-bottom: 1.25rem;
}

.prose code {
	font-family: var(--font-mono);
	font-size: 0.875em;
	background: var(--color-surface);
	padding: 0.125rem 0.375rem;
	border-radius: 4px;
	border: 1px solid var(--color-border);
}

.prose pre {
	font-family: var(--font-mono);
	font-size: 0.875rem;
	line-height: 1.6;
	margin-bottom: 1.5rem;
	padding: 1rem;
	border-radius: 8px;
	overflow-x: auto;
	border: 1px solid var(--color-border);
}

.prose pre code {
	background: none;
	padding: 0;
	border: none;
	border-radius: 0;
	font-size: inherit;
}

.prose img {
	border-radius: 8px;
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
}

.prose hr {
	border: none;
	border-top: 1px solid var(--color-border);
	margin: 2rem 0;
}
```

- [ ] **Step 3: Update __root.tsx to include CSS**

Replace the full content of `src/routes/__root.tsx`:

```tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react"
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import appCss from "~/styles/app.css?url"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "fidalgo.dev" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
```

- [ ] **Step 4: Verify Tailwind + fonts work**

```bash
pnpm dev
```

Open http://localhost:3000 — text should render in Inter font on the off-white (#fafafa) background. Inspect with devtools to confirm font-family is "Inter". Stop after verifying.

- [ ] **Step 5: Commit**

```bash
git add src/styles/app.css src/routes/__root.tsx public/fonts/
git commit -m "feat: add Tailwind CSS v4 with design tokens, dark mode, Inter + JetBrains Mono fonts"
```

---

## Task 5: Theme System

**Files:**
- Create: `src/lib/theme.ts`
- Create: `src/components/theme-toggle.tsx`
- Modify: `src/routes/__root.tsx` (add theme flash prevention script)

- [ ] **Step 1: Create src/lib/theme.ts**

```typescript
export type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

export function getStoredTheme(): Theme {
	if (typeof window === "undefined") return "system"
	return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "system"
}

export function storeTheme(theme: Theme): void {
	localStorage.setItem(STORAGE_KEY, theme)
}

export function applyTheme(theme: Theme): void {
	const isDark =
		theme === "dark" ||
		(theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

	document.documentElement.classList.toggle("dark", isDark)
}

/** Inline script string injected into <head> to prevent theme flash */
export const themeFlashScript = `
(function() {
	var t = localStorage.getItem("${STORAGE_KEY}") || "system";
	var d = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
	if (d) document.documentElement.classList.add("dark");
})();
`
```

- [ ] **Step 2: Create src/components/theme-toggle.tsx**

```tsx
import { useCallback, useEffect, useState } from "react"
import { type Theme, applyTheme, getStoredTheme, storeTheme } from "~/lib/theme"

const CYCLE: Theme[] = ["light", "dark", "system"]

const ICONS: Record<Theme, string> = {
	light: "☀️",
	dark: "🌙",
	system: "💻",
}

const LABELS: Record<Theme, string> = {
	light: "Switch to dark mode",
	dark: "Switch to system mode",
	system: "Switch to light mode",
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("system")
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setTheme(getStoredTheme())
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return
		applyTheme(theme)

		const mq = window.matchMedia("(prefers-color-scheme: dark)")
		const handler = () => {
			if (theme === "system") applyTheme("system")
		}
		mq.addEventListener("change", handler)
		return () => mq.removeEventListener("change", handler)
	}, [theme, mounted])

	const cycle = useCallback(() => {
		const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]
		setTheme(next)
		storeTheme(next)
	}, [theme])

	if (!mounted) {
		return (
			<button type="button" className="w-8 h-8" aria-label="Toggle theme">
				<span className="opacity-0">☀️</span>
			</button>
		)
	}

	return (
		<button
			type="button"
			onClick={cycle}
			className="w-8 h-8 flex items-center justify-center text-sm transition-opacity hover:opacity-70"
			aria-label={LABELS[theme]}
			title={LABELS[theme]}
		>
			{ICONS[theme]}
		</button>
	)
}
```

- [ ] **Step 3: Add theme flash prevention to __root.tsx**

Replace the full content of `src/routes/__root.tsx`:

```tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react"
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import appCss from "~/styles/app.css?url"
import { themeFlashScript } from "~/lib/theme"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "fidalgo.dev" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
		scripts: [
			{
				children: themeFlashScript,
			},
		],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-(--color-bg) text-(--color-text) transition-colors">
				{children}
				<Scripts />
			</body>
		</html>
	)
}
```

- [ ] **Step 4: Verify theme toggle works**

```bash
pnpm dev
```

Temporarily add `<ThemeToggle />` to the index page to test. Click through Light → Dark → System. Verify:
- Background switches between `#fafafa` and `#141414`
- No flash on page reload
- System mode follows OS preference

Remove the temporary toggle after verifying. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/lib/theme.ts src/components/theme-toggle.tsx src/routes/__root.tsx
git commit -m "feat: add theme system with light/dark/system toggle and flash prevention"
```

---

## Task 6: Constants + Site Data

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/reading-time.ts`

- [ ] **Step 1: Create src/lib/constants.ts**

```typescript
export const SITE = {
	name: "fidalgo.dev",
	title: "Pedro Fidalgo — Senior Product Engineer",
	description:
		"Senior Product Engineer building end-to-end. Currently at Prolific with Python and Vue. Personal stack: React, TypeScript, Node, Tailwind.",
	url: "https://fidalgo.dev",
	email: "hello@fidalgo.dev",
	ogImage: "/images/og-image.jpg",
} as const

export const SOCIALS = [
	{ name: "GitHub", url: "https://github.com/fidalgodev/", label: "GitHub profile" },
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/fidalgodev/",
		label: "LinkedIn profile",
	},
	{ name: "X", url: "https://x.com/fidalgodev", label: "X (Twitter) profile" },
	{ name: "YouTube", url: "https://youtube.com/c/fidalgodev", label: "YouTube channel" },
	{ name: "Instagram", url: "https://instagram.com/fidalgo.dev", label: "Instagram profile" },
] as const

export type Project = {
	name: string
	description: string
	url: string
	tech: string[]
}

export const PROJECTS: Project[] = [
	{
		name: "Zerosum",
		description:
			"Zero-based budgeting made simple. A full-stack SaaS I built and run with real users.",
		url: "https://zerosum.so/",
		tech: ["React", "Tailwind", "Hono", "tRPC", "Postgres"],
	},
	{
		name: "Liga do Tinto",
		description:
			"A custom fantasy league dashboard for my friend group. Replaced a clunky website and messy spreadsheets with proper stats and split-season tracking.",
		url: "https://ligarecord.fidalgo.dev/",
		tech: ["React", "Node"],
	},
	{
		name: "Movie Library",
		description:
			"A React app for browsing and discovering movies. One of my earlier projects that helped me learn React and working with external APIs.",
		url: "https://movies.fidalgo.dev/",
		tech: ["React"],
	},
]
```

- [ ] **Step 2: Create src/lib/reading-time.ts**

```typescript
const WORDS_PER_MINUTE = 200

export function calculateReadingTime(content: string): string {
	const words = content.trim().split(/\s+/).length
	const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
	return `${minutes} min read`
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts src/lib/reading-time.ts
git commit -m "feat: add site constants, project data, and reading time utility"
```

---

## Task 7: Navigation + Footer Components

**Files:**
- Create: `src/components/nav.tsx`
- Create: `src/components/footer.tsx`
- Create: `src/components/section-label.tsx`
- Modify: `src/routes/__root.tsx` (add nav, footer, skip link)

- [ ] **Step 1: Create src/components/section-label.tsx**

```tsx
export function SectionLabel({ children }: { children: string }) {
	return (
		<h2 className="text-xs uppercase tracking-[0.2em] text-(--color-text-muted) mb-6">
			{children}
		</h2>
	)
}
```

- [ ] **Step 2: Create src/components/nav.tsx**

```tsx
import { Link } from "@tanstack/react-router"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
	return (
		<nav className="flex items-center justify-between py-5 px-6 max-w-3xl mx-auto">
			<Link to="/" className="flex items-center gap-2.5 group" aria-label="Home">
				<img
					src="/images/avatar.webp"
					alt="Pedro Fidalgo"
					width={32}
					height={32}
					className="rounded-full"
				/>
				<span className="text-sm font-semibold text-(--color-text) group-hover:opacity-70 transition-opacity">
					pedro fidalgo
				</span>
			</Link>
			<div className="flex items-center gap-6">
				<a
					href="/#projects"
					className="text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
				>
					projects
				</a>
				<Link
					to="/blog"
					className="text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					blog
				</Link>
				<Link
					to="/uses"
					className="text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					uses
				</Link>
				<ThemeToggle />
			</div>
		</nav>
	)
}
```

- [ ] **Step 3: Create src/components/footer.tsx**

```tsx
import { SITE, SOCIALS } from "~/lib/constants"

export function Footer() {
	return (
		<footer className="border-t border-(--color-border) mt-20">
			<div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-5">
					{SOCIALS.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
							aria-label={social.label}
						>
							{social.name}
						</a>
					))}
				</div>
				<a
					href={`mailto:${SITE.email}`}
					className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
				>
					{SITE.email}
				</a>
			</div>
		</footer>
	)
}
```

- [ ] **Step 4: Update __root.tsx with nav, footer, and skip link**

Replace the full content of `src/routes/__root.tsx`:

```tsx
/// <reference types="vite/client" />
import type { ReactNode } from "react"
import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router"
import appCss from "~/styles/app.css?url"
import { themeFlashScript } from "~/lib/theme"
import { SITE } from "~/lib/constants"
import { Nav } from "~/components/nav"
import { Footer } from "~/components/footer"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: SITE.title },
			{ name: "description", content: SITE.description },
		],
		links: [{ rel: "stylesheet", href: appCss }],
		scripts: [
			{
				children: themeFlashScript,
			},
		],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-(--color-bg) text-(--color-text) transition-colors">
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<Nav />
				<main id="main">{children}</main>
				<Footer />
				<Scripts />
			</body>
		</html>
	)
}
```

- [ ] **Step 5: Verify nav and footer render**

```bash
pnpm dev
```

Open http://localhost:3000. Verify:
- Nav shows "pedro fidalgo" + links + theme toggle
- Footer shows social links + email
- Theme toggle cycles through modes
- Skip link appears when pressing Tab
- Avatar image will be broken (expected — we add images later)

Stop after verifying.

- [ ] **Step 6: Commit**

```bash
git add src/components/nav.tsx src/components/footer.tsx src/components/section-label.tsx src/routes/__root.tsx
git commit -m "feat: add navigation, footer, section label, and skip-to-content link"
```

---

## Task 8: Homepage — All Sections

**Files:**
- Create: `src/components/project-item.tsx`
- Create: `src/components/post-item.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Create src/components/project-item.tsx**

```tsx
import type { Project } from "~/lib/constants"

export function ProjectItem({ project }: { project: Project }) {
	return (
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-start justify-between gap-4 py-4 border-b border-(--color-border) last:border-b-0 transition-colors"
		>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<h3 className="text-base font-medium text-(--color-text) group-hover:text-(--color-accent) transition-colors">
						{project.name}
					</h3>
					<span className="text-(--color-text-muted) text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
						↗
					</span>
				</div>
				<p className="text-sm text-(--color-text-secondary) mt-1">{project.description}</p>
				<div className="flex flex-wrap gap-2 mt-2">
					{project.tech.map((t) => (
						<span
							key={t}
							className="text-xs text-(--color-text-muted) border border-(--color-border) px-2 py-0.5 rounded"
						>
							{t}
						</span>
					))}
				</div>
			</div>
		</a>
	)
}
```

- [ ] **Step 2: Create src/components/post-item.tsx**

```tsx
import { Link } from "@tanstack/react-router"

type PostItemProps = {
	title: string
	date: string
	description: string
	slug: string
	tags?: string[]
}

export function PostItem({ title, date, description, slug, tags }: PostItemProps) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug }}
			className="group block py-4 border-b border-(--color-border) last:border-b-0"
		>
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="text-base font-medium text-(--color-text) group-hover:text-(--color-accent) transition-colors">
					{title}
				</h3>
				<time className="text-sm text-(--color-text-muted) shrink-0">{date}</time>
			</div>
			<p className="text-sm text-(--color-text-secondary) mt-1">{description}</p>
			{tags && tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="text-xs text-(--color-text-muted) border border-(--color-border) px-2 py-0.5 rounded"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</Link>
	)
}
```

- [ ] **Step 3: Build the full homepage in src/routes/index.tsx**

```tsx
import { createFileRoute } from "@tanstack/react-router"
import { PROJECTS, SITE } from "~/lib/constants"
import { SectionLabel } from "~/components/section-label"
import { ProjectItem } from "~/components/project-item"

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: SITE.title },
			{ name: "description", content: SITE.description },
			{ property: "og:title", content: SITE.title },
			{ property: "og:description", content: SITE.description },
			{ property: "og:image", content: `${SITE.url}${SITE.ogImage}` },
			{ property: "og:url", content: SITE.url },
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE.title },
			{ name: "twitter:description", content: SITE.description },
			{ name: "twitter:image", content: `${SITE.url}${SITE.ogImage}` },
		],
		links: [{ rel: "canonical", href: SITE.url }],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Person",
					name: "Pedro Fidalgo",
					url: SITE.url,
					jobTitle: "Senior Product Engineer",
					worksFor: { "@type": "Organization", name: "Prolific" },
					sameAs: [
						"https://github.com/fidalgodev/",
						"https://www.linkedin.com/in/fidalgodev/",
						"https://x.com/fidalgodev",
					],
				}),
			},
		],
	}),
	component: HomePage,
})

function HomePage() {
	return (
		<div>
			{/* Hero */}
			<section className="max-w-3xl mx-auto px-6 pt-16 pb-12 border-b border-(--color-border)">
				<div className="w-9 h-0.5 bg-(--color-text) mb-5" />
				<h1 className="text-2xl sm:text-3xl font-medium leading-snug mb-3">
					Senior Product Engineer
					<br />
					building end-to-end.
				</h1>
				<p className="text-(--color-text-secondary) leading-relaxed max-w-lg">
					Currently at Prolific working with Python and Vue. My personal stack is React,
					TypeScript, Node, and Tailwind — I ship full products from database to UI.
					Self-taught, endlessly curious, and always building something on the side.
				</p>
				<div className="flex items-center gap-2 mt-5">
					<div className="w-1.5 h-1.5 rounded-full bg-(--color-green-dot)" />
					<span className="text-sm text-(--color-text-muted)">
						Open to interesting conversations
					</span>
				</div>
			</section>

			{/* Full-width working photo */}
			<section className="w-full">
				<img
					src="/images/working.webp"
					alt="Pedro Fidalgo working at his desk with dual monitors"
					className="w-full h-64 sm:h-80 md:h-96 object-cover"
					loading="eager"
				/>
			</section>

			{/* About */}
			<section className="max-w-3xl mx-auto px-6 py-16 border-b border-(--color-border)">
				<SectionLabel>About</SectionLabel>
				<div className="space-y-4 text-(--color-text-secondary) leading-relaxed max-w-2xl">
					<p>
						I'm Pedro — a self-taught software engineer based in Aveiro, Portugal.
					</p>
					<p>
						In 2018, I decided it was time for a change. I started teaching myself
						JavaScript before work, fell in love with it, and in January 2019 I quit my
						job to go all in. Six months later I landed my first engineering role at
						Mindera in the UK, where I grew into a full-stack developer working on
						large-scale e-commerce.
					</p>
					<p>
						Today I'm a Senior Product Engineer at Prolific, building with Python and
						Vue. But my heart is in the React and Node ecosystem — TypeScript, Tailwind,
						Hono, tRPC, and Postgres are what I reach for when I'm building for myself.
					</p>
					<p>
						Outside of work, I build my own things. Zerosum is a budgeting app I built
						from scratch with React, Hono, tRPC, and Postgres — a real SaaS product with
						real users. I like solving problems that I personally have, and turning them
						into something others can use too.
					</p>
				</div>
			</section>

			{/* Projects */}
			<section
				id="projects"
				className="max-w-3xl mx-auto px-6 py-16 border-b border-(--color-border)"
			>
				<SectionLabel>Projects</SectionLabel>
				<div>
					{PROJECTS.map((project) => (
						<ProjectItem key={project.name} project={project} />
					))}
				</div>
			</section>

			{/* Latest Posts */}
			<section className="max-w-3xl mx-auto px-6 py-16">
				<SectionLabel>Latest Posts</SectionLabel>
				<p className="text-sm text-(--color-text-muted) italic">
					No posts yet — but they're coming. I'll be writing about building products,
					technical deep dives, and lessons from shipping side projects.
				</p>
			</section>
		</div>
	)
}
```

- [ ] **Step 4: Verify the full homepage**

```bash
pnpm dev
```

Open http://localhost:3000. Verify:
- Hero with headline, subtitle, green dot
- Working photo section (broken image expected — we add images later)
- About section with personal story
- Projects section with 3 items, tech tags, hover effects
- Latest Posts section with empty state message
- All sections have proper spacing and border dividers
- Dark mode toggle works across all sections

Stop after verifying.

- [ ] **Step 5: Commit**

```bash
git add src/components/project-item.tsx src/components/post-item.tsx src/routes/index.tsx
git commit -m "feat: build complete homepage with hero, about, projects, and latest posts sections"
```

---

## Task 9: Blog Infrastructure — content-collections + MDX

**Files:**
- Create: `content-collections.ts`
- Create: `content/posts/hello-world.mdx`
- Modify: `vite.config.ts` (add content-collections plugin)

- [ ] **Step 1: Install content-collections and MDX dependencies**

```bash
cd /Users/fidalgo/projects/fidalgo-website
pnpm add -D @content-collections/core @content-collections/vite @content-collections/mdx rehype-pretty-code shiki
```

- [ ] **Step 2: Create content-collections.ts**

```typescript
import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import rehypePrettyCode from "rehype-pretty-code"
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code"

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
	theme: {
		dark: "github-dark-dimmed",
		light: "github-light",
	},
	keepBackground: true,
}

const posts = defineCollection({
	name: "posts",
	directory: "content/posts",
	include: "**/*.mdx",
	schema: (z) => ({
		title: z.string(),
		description: z.string(),
		date: z.string(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
	transform: async (document, context) => {
		const mdx = await context.cache(document.content, async () =>
			compileMDX(context, document, {
				rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
			}),
		)
		return {
			...document,
			mdx,
			slug: document._meta.path,
		}
	},
})

export default defineConfig({
	collections: [posts],
})
```

- [ ] **Step 3: Add content-collections plugin to vite.config.ts**

Replace the full content of `vite.config.ts`:

```typescript
import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import netlify from "@netlify/vite-plugin-tanstack-start"
import contentCollections from "@content-collections/vite"

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [tailwindcss(), contentCollections(), tanstackStart(), netlify(), viteReact()],
})
```

- [ ] **Step 4: Create sample blog post**

Create `content/posts/hello-world.mdx`:

```mdx
---
title: "Hello World"
description: "First post on the new blog. Testing the waters."
date: "2026-04-04"
tags: ["meta"]
draft: true
---

# Hello World

This is a test post to verify the blog infrastructure works.

Here's some **bold** and *italic* text, plus a [link](https://fidalgo.dev).

## Code Example

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`
}
```

And an inline `code` snippet.

> This is a blockquote for testing prose styles.

- List item one
- List item two
- List item three
```

- [ ] **Step 5: Verify content-collections processes the post**

```bash
pnpm dev
```

Check that `.content-collections/generated/` is created and contains the posts collection. You can verify by checking the terminal output for content-collections logs. Stop after verifying.

- [ ] **Step 6: Commit**

```bash
git add content-collections.ts content/posts/hello-world.mdx vite.config.ts pnpm-lock.yaml
git commit -m "feat: add content-collections with MDX processing and Shiki syntax highlighting"
```

---

## Task 10: Blog Pages

**Files:**
- Create: `src/routes/blog/index.tsx`
- Create: `src/routes/blog/$slug.tsx`
- Create: `src/components/mdx-components.tsx`
- Modify: `src/routes/index.tsx` (wire up latest posts)

- [ ] **Step 1: Create src/components/mdx-components.tsx**

```tsx
import type { ComponentProps } from "react"

export const mdxComponents = {
	a: (props: ComponentProps<"a">) => {
		const isExternal = props.href?.startsWith("http")
		return (
			<a
				{...props}
				{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			/>
		)
	},
}
```

- [ ] **Step 2: Create src/routes/blog/index.tsx**

```tsx
import { createFileRoute } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { SITE } from "~/lib/constants"
import { SectionLabel } from "~/components/section-label"
import { PostItem } from "~/components/post-item"

const publishedPosts = allPosts
	.filter((p) => !p.draft)
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const Route = createFileRoute("/blog/")({
	head: () => ({
		meta: [
			{ title: `Blog — ${SITE.name}` },
			{
				name: "description",
				content:
					"Writing about building products, technical deep dives, and lessons from shipping side projects.",
			},
			{ property: "og:title", content: `Blog — ${SITE.name}` },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: `${SITE.url}/blog` },
		],
		links: [{ rel: "canonical", href: `${SITE.url}/blog` }],
	}),
	component: BlogPage,
})

function BlogPage() {
	return (
		<div className="max-w-3xl mx-auto px-6 py-16">
			<SectionLabel>Blog</SectionLabel>
			<h1 className="text-2xl font-medium mb-8">Writing</h1>
			{publishedPosts.length === 0 ? (
				<p className="text-sm text-(--color-text-muted) italic">
					No posts yet — but they're coming. I'll be writing about building products,
					technical deep dives, and lessons from shipping side projects.
				</p>
			) : (
				<div>
					{publishedPosts.map((post) => (
						<PostItem
							key={post.slug}
							title={post.title}
							date={new Date(post.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
							description={post.description}
							slug={post.slug}
							tags={post.tags}
						/>
					))}
				</div>
			)}
		</div>
	)
}
```

- [ ] **Step 3: Create src/routes/blog/$slug.tsx**

```tsx
import { createFileRoute, notFound } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { MDXContent } from "@content-collections/mdx/react"
import { SITE } from "~/lib/constants"
import { calculateReadingTime } from "~/lib/reading-time"
import { mdxComponents } from "~/components/mdx-components"

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		const post = allPosts.find((p) => p.slug === params.slug && !p.draft)
		if (!post) throw notFound()
		return { post }
	},
	head: ({ loaderData }) => {
		const { post } = loaderData
		return {
			meta: [
				{ title: `${post.title} — ${SITE.name}` },
				{ name: "description", content: post.description },
				{ property: "og:title", content: post.title },
				{ property: "og:description", content: post.description },
				{ property: "og:type", content: "article" },
				{ property: "og:url", content: `${SITE.url}/blog/${post.slug}` },
				{ property: "og:image", content: `${SITE.url}${SITE.ogImage}` },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: post.title },
				{ name: "twitter:description", content: post.description },
			],
			links: [{ rel: "canonical", href: `${SITE.url}/blog/${post.slug}` }],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Article",
						headline: post.title,
						description: post.description,
						datePublished: post.date,
						author: {
							"@type": "Person",
							name: "Pedro Fidalgo",
							url: SITE.url,
						},
					}),
				},
			],
		}
	},
	component: BlogPost,
	notFoundComponent: () => (
		<div className="max-w-3xl mx-auto px-6 py-16 text-center">
			<h1 className="text-2xl font-medium mb-4">Post not found</h1>
			<p className="text-(--color-text-secondary)">
				This post doesn't exist or hasn't been published yet.
			</p>
		</div>
	),
})

function BlogPost() {
	const { post } = Route.useLoaderData()
	const readingTime = calculateReadingTime(post.content)
	const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})

	return (
		<article className="max-w-3xl mx-auto px-6 py-16">
			<a
				href="/blog"
				className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors mb-8 inline-block"
			>
				← Back to blog
			</a>
			<header className="mb-10">
				<h1 className="text-2xl sm:text-3xl font-medium leading-snug mb-3">
					{post.title}
				</h1>
				<div className="flex items-center gap-3 text-sm text-(--color-text-muted)">
					<time>{formattedDate}</time>
					<span>·</span>
					<span>{readingTime}</span>
				</div>
				{post.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-3">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="text-xs text-(--color-text-muted) border border-(--color-border) px-2 py-0.5 rounded"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</header>
			<div className="prose">
				<MDXContent code={post.mdx} components={mdxComponents} />
			</div>
		</article>
	)
}
```

- [ ] **Step 4: Update homepage to show latest published posts**

In `src/routes/index.tsx`, add the import at the top:

```tsx
import { allPosts } from "content-collections"
```

Replace the Latest Posts section in the `HomePage` component with:

```tsx
			{/* Latest Posts */}
			<section className="max-w-3xl mx-auto px-6 py-16">
				<SectionLabel>Latest Posts</SectionLabel>
				{(() => {
					const published = allPosts
						.filter((p) => !p.draft)
						.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
						.slice(0, 3)

					if (published.length === 0) {
						return (
							<p className="text-sm text-(--color-text-muted) italic">
								No posts yet — but they're coming. I'll be writing about building
								products, technical deep dives, and lessons from shipping side
								projects.
							</p>
						)
					}

					return (
						<div>
							{published.map((post) => (
								<PostItem
									key={post.slug}
									title={post.title}
									date={new Date(post.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
									description={post.description}
									slug={post.slug}
								/>
							))}
						</div>
					)
				})()}
			</section>
```

Also add the `PostItem` import at the top:

```tsx
import { PostItem } from "~/components/post-item"
```

- [ ] **Step 5: Verify blog pages**

```bash
pnpm dev
```

Open http://localhost:3000/blog — should show empty state (the hello-world post is draft: true).

Temporarily change `draft: true` to `draft: false` in `content/posts/hello-world.mdx`, then:
- Verify the post appears in the blog listing
- Click through to `/blog/hello-world` — verify article renders with title, date, reading time, tags, prose content, and syntax-highlighted code
- Verify the homepage "Latest Posts" section also shows the post
- Change it back to `draft: true` after verifying

Stop the server.

- [ ] **Step 6: Commit**

```bash
git add src/routes/blog/ src/components/mdx-components.tsx src/routes/index.tsx
git commit -m "feat: add blog listing and article pages with MDX rendering and syntax highlighting"
```

---

## Task 11: Uses Page

**Files:**
- Create: `src/routes/uses.tsx`

- [ ] **Step 1: Create src/routes/uses.tsx**

```tsx
import { createFileRoute } from "@tanstack/react-router"
import { SITE } from "~/lib/constants"
import { SectionLabel } from "~/components/section-label"

export const Route = createFileRoute("/uses")({
	head: () => ({
		meta: [
			{ title: `Uses — ${SITE.name}` },
			{
				name: "description",
				content: "Tools, software, and hardware I use for development and everyday work.",
			},
			{ property: "og:title", content: `Uses — ${SITE.name}` },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: `${SITE.url}/uses` },
		],
		links: [{ rel: "canonical", href: `${SITE.url}/uses` }],
	}),
	component: UsesPage,
})

type UsesCategory = {
	name: string
	items: { name: string; note: string }[]
}

const USES: UsesCategory[] = [
	{
		name: "Hardware",
		items: [
			{ name: "Dual Monitor Setup", note: "For coding on one, docs/preview on the other" },
			{ name: "Mechanical Keyboard", note: "Can't go back to membrane" },
		],
	},
	{
		name: "Development",
		items: [
			{ name: "VS Code", note: "Primary editor" },
			{ name: "Warp", note: "Terminal" },
			{ name: "Git", note: "Version control, obviously" },
		],
	},
	{
		name: "Stack",
		items: [
			{ name: "React + TypeScript", note: "Frontend framework of choice" },
			{ name: "Tailwind CSS", note: "Utility-first styling" },
			{ name: "Hono + tRPC", note: "Backend API layer" },
			{ name: "PostgreSQL", note: "Database for everything" },
			{ name: "Python + Vue", note: "At work (Prolific)" },
		],
	},
]

function UsesPage() {
	return (
		<div className="max-w-3xl mx-auto px-6 py-16">
			<SectionLabel>Uses</SectionLabel>
			<h1 className="text-2xl font-medium mb-3">What I use</h1>
			<p className="text-(--color-text-secondary) mb-12">
				Tools, software, and hardware that power my daily workflow.
			</p>

			<div className="space-y-12">
				{USES.map((category) => (
					<section key={category.name}>
						<h2 className="text-lg font-medium mb-4 pb-2 border-b border-(--color-border)">
							{category.name}
						</h2>
						<ul className="space-y-3">
							{category.items.map((item) => (
								<li key={item.name} className="flex gap-3">
									<span className="text-(--color-text) font-medium text-sm shrink-0">
										{item.name}
									</span>
									<span className="text-sm text-(--color-text-muted)">
										— {item.note}
									</span>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	)
}
```

- [ ] **Step 2: Verify uses page**

```bash
pnpm dev
```

Open http://localhost:3000/uses — verify categories and items render with proper styling. Stop after verifying.

- [ ] **Step 3: Commit**

```bash
git add src/routes/uses.tsx
git commit -m "feat: add uses page with tools and tech stack"
```

---

## Task 12: 404 Page

**Files:**
- Modify: `src/routes/__root.tsx` (add notFoundComponent)

- [ ] **Step 1: Add notFoundComponent to __root.tsx**

Add this import at the top of `src/routes/__root.tsx`:

```tsx
import { Link } from "@tanstack/react-router"
```

Then add `notFoundComponent` to the `createRootRoute` config, after `component`:

```tsx
	notFoundComponent: () => (
		<div className="max-w-3xl mx-auto px-6 py-24 text-center">
			<h1 className="text-4xl font-medium mb-4">404</h1>
			<p className="text-(--color-text-secondary) mb-8">
				This page doesn't exist. Maybe it was moved or you mistyped the URL.
			</p>
			<Link
				to="/"
				className="text-sm text-(--color-accent) underline underline-offset-2 hover:no-underline"
			>
				Back to home
			</Link>
		</div>
	),
```

- [ ] **Step 2: Verify 404 page**

```bash
pnpm dev
```

Open http://localhost:3000/some-random-url — should show "404" heading, message, and "Back to home" link. Stop after verifying.

- [ ] **Step 3: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat: add custom 404 page"
```

---

## Task 13: Images — Download, Optimize, and Place

**Files:**
- Create: `scripts/optimize-images.ts`
- Create: `public/images/` (optimized images)
- Create: `public/robots.txt`

- [ ] **Step 1: Install sharp**

```bash
pnpm add -D sharp
```

- [ ] **Step 2: Create scripts/optimize-images.ts**

```typescript
import sharp from "sharp"
import { mkdirSync, existsSync } from "node:fs"
import { resolve } from "node:path"

const OUT = resolve("public/images")

if (!existsSync(OUT)) {
	mkdirSync(OUT, { recursive: true })
}

async function optimizeWorkingPhoto(inputPath: string) {
	const widths = [640, 1280, 1920]
	for (const w of widths) {
		await sharp(inputPath)
			.resize(w)
			.webp({ quality: 80 })
			.toFile(resolve(OUT, `working-${w}w.webp`))
		console.log(`✓ working-${w}w.webp`)
	}
}

async function optimizeAvatar(inputPath: string) {
	for (const size of [48, 96]) {
		await sharp(inputPath)
			.resize(size, size, { fit: "cover" })
			.webp({ quality: 85 })
			.toFile(resolve(OUT, `avatar-${size}.webp`))
		console.log(`✓ avatar-${size}.webp`)
	}
}

async function createOgImage(inputPath: string) {
	await sharp(inputPath)
		.resize(1200, 630, { fit: "cover" })
		.jpeg({ quality: 85 })
		.toFile(resolve(OUT, "og-image.jpg"))
	console.log("✓ og-image.jpg")
}

async function main() {
	const workingInput = process.argv[2]
	const avatarInput = process.argv[3]

	if (!workingInput || !avatarInput) {
		console.error("Usage: npx tsx scripts/optimize-images.ts <working-photo> <avatar-photo>")
		process.exit(1)
	}

	await optimizeWorkingPhoto(workingInput)
	await optimizeAvatar(avatarInput)
	await createOgImage(workingInput)
	console.log("\nAll images optimized!")
}

main()
```

- [ ] **Step 3: Download source images and run optimization**

First, download the source images to a temporary location:

```bash
cd /Users/fidalgo/projects/fidalgo-website
mkdir -p tmp

# Download working photo
curl -L -o tmp/working.webp "https://fidalgo.dev/static/76b30bf07e67a4a5e5384c42821c3982/6f0c6/background.webp"

# Download avatar photo
curl -L -o tmp/avatar.jpg "https://media.licdn.com/dms/image/v2/D4D03AQFRQebCJxl-0g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1702331053547?e=1776902400&v=beta&t=TCfOIDgBa0ap1ri1qaEF9QpnqVqYBlS4zNL9_Qjufus"
```

Then run the optimization script:

```bash
pnpm add -D tsx
npx tsx scripts/optimize-images.ts tmp/working.webp tmp/avatar.jpg
```

Expected output:
```
✓ working-640w.webp
✓ working-1280w.webp
✓ working-1920w.webp
✓ avatar-48.webp
✓ avatar-96.webp
✓ og-image.jpg

All images optimized!
```

Clean up temp files:

```bash
rm -rf tmp
```

- [ ] **Step 4: Update nav to use srcset for avatar**

In `src/components/nav.tsx`, update the avatar `<img>`:

```tsx
				<img
					src="/images/avatar-48.webp"
					srcSet="/images/avatar-48.webp 1x, /images/avatar-96.webp 2x"
					alt="Pedro Fidalgo"
					width={32}
					height={32}
					className="rounded-full"
				/>
```

- [ ] **Step 5: Update homepage to use responsive working photo**

In `src/routes/index.tsx`, update the working photo `<img>`:

```tsx
				<img
					src="/images/working-1280w.webp"
					srcSet="/images/working-640w.webp 640w, /images/working-1280w.webp 1280w, /images/working-1920w.webp 1920w"
					sizes="100vw"
					alt="Pedro Fidalgo working at his desk with dual monitors"
					className="w-full h-64 sm:h-80 md:h-96 object-cover"
					loading="eager"
				/>
```

- [ ] **Step 6: Create public/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://fidalgo.dev/sitemap.xml
```

- [ ] **Step 7: Verify images render**

```bash
pnpm dev
```

Open http://localhost:3000. Verify:
- Avatar shows in nav (small, circular)
- Working photo shows full-width between hero and about
- Check devtools Network tab — correct image sizes load at different viewports

Stop after verifying.

- [ ] **Step 8: Commit**

```bash
git add scripts/optimize-images.ts public/images/ public/robots.txt src/components/nav.tsx src/routes/index.tsx pnpm-lock.yaml
git commit -m "feat: add optimized responsive images, OG image, and robots.txt"
```

---

## Task 14: SEO — Prerendering, Sitemap, and RSS

**Files:**
- Modify: `vite.config.ts` (add prerender + sitemap config)
- Create: `src/routes/rss[.]xml.ts` (RSS feed server route)
- Modify: `package.json` (add build:images script)

- [ ] **Step 1: Add prerender and sitemap config to vite.config.ts**

Replace the full content of `vite.config.ts`:

```typescript
import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import netlify from "@netlify/vite-plugin-tanstack-start"
import contentCollections from "@content-collections/vite"

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tailwindcss(),
		contentCollections(),
		tanstackStart({
			prerender: {
				enabled: true,
				crawlLinks: true,
			},
			sitemap: {
				enabled: true,
				host: "https://fidalgo.dev",
			},
		}),
		netlify(),
		viteReact(),
	],
})
```

- [ ] **Step 2: Create RSS feed server route**

Create `src/routes/rss[.]xml.ts`:

```typescript
import { createServerFileRoute } from "@tanstack/react-start/server"
import { allPosts } from "content-collections"
import { SITE } from "~/lib/constants"

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
}

export const ServerRoute = createServerFileRoute("/rss.xml")({
	GET: async () => {
		const published = allPosts
			.filter((p) => !p.draft)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

		const items = published
			.map(
				(post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE.url}/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${SITE.url}/blog/${post.slug}</guid>
    </item>`,
			)
			.join("\n")

		const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.title)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

		return new Response(rss, {
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": "public, max-age=3600",
			},
		})
	},
})
```

- [ ] **Step 3: Add RSS link to root head**

In `src/routes/__root.tsx`, add to the `links` array in `head`:

```tsx
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "alternate", type: "application/rss+xml", title: SITE.name, href: "/rss.xml" },
		],
```

- [ ] **Step 4: Add build:images script to package.json**

Add to the `scripts` section of `package.json`:

```json
"build:images": "tsx scripts/optimize-images.ts"
```

- [ ] **Step 5: Verify the full build works**

```bash
pnpm build
```

Expected: Build succeeds, `dist/client/` contains prerendered HTML files. Check that `dist/client/sitemap.xml` exists with the correct URLs.

- [ ] **Step 6: Preview the built site**

```bash
pnpm preview
```

Open the preview URL. Verify:
- All pages load as static HTML (view source to confirm)
- RSS feed accessible at /rss.xml
- sitemap.xml exists and lists all pages

Stop after verifying.

- [ ] **Step 7: Commit**

```bash
git add vite.config.ts src/routes/rss*.ts src/routes/__root.tsx package.json
git commit -m "feat: add static prerendering, sitemap generation, and RSS feed"
```

---

## Task 15: Final Polish and Responsive Tweaks

**Files:**
- Modify: `src/components/nav.tsx` (mobile responsive)
- Create: `public/favicon.ico` (placeholder)

- [ ] **Step 1: Make nav responsive for mobile**

Replace the full content of `src/components/nav.tsx`:

```tsx
import { Link } from "@tanstack/react-router"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
	return (
		<nav className="flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6 max-w-3xl mx-auto">
			<Link to="/" className="flex items-center gap-2 sm:gap-2.5 group" aria-label="Home">
				<img
					src="/images/avatar-48.webp"
					srcSet="/images/avatar-48.webp 1x, /images/avatar-96.webp 2x"
					alt="Pedro Fidalgo"
					width={32}
					height={32}
					className="rounded-full w-7 h-7 sm:w-8 sm:h-8"
				/>
				<span className="text-sm font-semibold text-(--color-text) group-hover:opacity-70 transition-opacity">
					pedro fidalgo
				</span>
			</Link>
			<div className="flex items-center gap-3 sm:gap-6">
				<a
					href="/#projects"
					className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors hidden sm:inline"
				>
					projects
				</a>
				<Link
					to="/blog"
					className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					blog
				</Link>
				<Link
					to="/uses"
					className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					uses
				</Link>
				<ThemeToggle />
			</div>
		</nav>
	)
}
```

- [ ] **Step 2: Create a simple favicon placeholder**

```bash
cd /Users/fidalgo/projects/fidalgo-website
# Create a minimal SVG favicon
cat > public/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1a1a1a"/>
  <text x="50%" y="55%" dominant-baseline="central" text-anchor="middle" fill="#fafafa" font-family="system-ui" font-size="18" font-weight="600">f</text>
</svg>
EOF
```

Add the favicon link in `src/routes/__root.tsx` — add to the `links` array:

```tsx
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
```

- [ ] **Step 3: Final build verification**

```bash
pnpm check
pnpm build
```

Both should succeed with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx public/favicon.svg src/routes/__root.tsx
git commit -m "feat: add responsive nav, favicon, and final polish"
```

---

## Task 16: Add CLAUDE.md and .gitignore updates

**Files:**
- Create: `CLAUDE.md`
- Modify: `.gitignore`

- [ ] **Step 1: Create CLAUDE.md**

```markdown
# fidalgo.dev

Personal portfolio and blog for Pedro Fidalgo.

## Stack

- TanStack Start (React) with static prerendering
- Tailwind CSS v4
- content-collections + MDX for blog posts
- Biome for linting/formatting
- Deployed on Netlify

## Commands

- `pnpm dev` — start dev server on port 3000
- `pnpm build` — production build with static prerendering
- `pnpm preview` — preview production build
- `pnpm check` — run Biome lint + format checks
- `pnpm check:fix` — auto-fix Biome issues

## Code Style

- Biome handles formatting (tabs, double quotes, semicolons as needed)
- Lefthook pre-commit hook runs Biome on staged files
- TypeScript strict null checks enabled

## Content

- Blog posts live in `content/posts/` as `.mdx` files
- Frontmatter: title, description, date, tags, draft
- Set `draft: true` to hide a post from the site

## Design

- Design spec: `docs/superpowers/specs/2026-04-04-portfolio-redesign-design.md`
- Clean Swiss aesthetic, Inter + JetBrains Mono fonts
- Light/Dark/System theme toggle
```

- [ ] **Step 2: Update .gitignore to include tmp and .superpowers**

Ensure `.gitignore` includes:

```
node_modules
dist
.content-collections
.netlify
.vinxi
*.local
.superpowers
tmp
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md .gitignore
git commit -m "docs: add CLAUDE.md project guide and update gitignore"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Repository bootstrap | package.json, tsconfig.json, .gitignore |
| 2 | Biome + Lefthook | biome.json, lefthook.yml |
| 3 | Vite + TanStack Start + Netlify | vite.config.ts, netlify.toml, router, root layout |
| 4 | Tailwind + design tokens + fonts | app.css, fonts, __root.tsx |
| 5 | Theme system | theme.ts, theme-toggle.tsx, flash prevention |
| 6 | Constants + site data | constants.ts, reading-time.ts |
| 7 | Nav + footer components | nav.tsx, footer.tsx, section-label.tsx |
| 8 | Homepage — all sections | index.tsx, project-item.tsx, post-item.tsx |
| 9 | Blog infrastructure | content-collections.ts, MDX + Shiki |
| 10 | Blog pages | blog/index.tsx, blog/$slug.tsx, mdx-components.tsx |
| 11 | Uses page | uses.tsx |
| 12 | 404 page | __root.tsx notFoundComponent |
| 13 | Images | optimize-images.ts, public/images/ |
| 14 | SEO — prerender, sitemap, RSS | vite.config.ts, rss.xml.ts |
| 15 | Final polish + responsive | nav responsive, favicon |
| 16 | CLAUDE.md + gitignore | CLAUDE.md |
