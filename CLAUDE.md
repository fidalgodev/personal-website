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
