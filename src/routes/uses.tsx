import { createFileRoute } from "@tanstack/react-router"
import { SITE } from "~/lib/constants"

export const Route = createFileRoute("/uses")({
	head: () => ({
		meta: [
			{ title: `Uses · ${SITE.name}` },
			{
				name: "description",
				content: "Tools, software, and hardware I use for development and everyday work.",
			},
			{ property: "og:title", content: `Uses · ${SITE.name}` },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: `${SITE.url}/uses` },
			{ property: "og:image", content: `${SITE.url}${SITE.ogImage}` },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: `Uses · ${SITE.name}` },
			{
				name: "twitter:description",
				content: "Tools, software, and hardware I use for development and everyday work.",
			},
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
			{
				name: "MacBook Pro 16” (M5 Pro, 48GB)",
				note: "My main machine. Silly fast, all-day battery.",
			},
			{
				name: "Apple Studio Display XDR",
				note: "27” 5K, 120Hz, and bright enough to be a little ridiculous",
			},
			{ name: "NuPhy Air75 (Raycast Edition)", note: "Low profile mechanical, great to type on" },
			{ name: "Logitech MX Master 4S", note: "The scroll wheel alone is worth it" },
		],
	},
	{
		name: "Audio",
		items: [
			{
				name: "Bose QuietComfort Ultra (Gen 2)",
				note: "For deep focus and long flights. Best noise cancelling I've tried",
			},
			{ name: "AirPods Pro 3", note: "For everything else on the go" },
		],
	},
	{
		name: "Development",
		items: [
			{ name: "VS Code", note: "My main editor" },
			{ name: "Warp", note: "Terminal of choice" },
			{ name: "Claude Code", note: "AI pair programmer I reach for daily" },
		],
	},
	{
		name: "Daily Stack",
		items: [
			{ name: "React + TypeScript", note: "Frontend of choice" },
			{ name: "Tailwind CSS", note: "Utility-first styling" },
			{ name: "Hono + OpenAPI", note: "Typed APIs with a proper spec" },
			{ name: "PostgreSQL", note: "Database for everything" },
		],
	},
	{
		name: "At Work (Prolific)",
		items: [
			{ name: "Python + Django", note: "Backend services and APIs" },
			{ name: "Vue + TypeScript", note: "Frontend framework" },
			{ name: "SASS", note: "Styling" },
			{ name: "MongoDB", note: "Primary database" },
			{ name: "Redis", note: "Caching and queues" },
			{ name: "Kubernetes", note: "Container orchestration" },
		],
	},
	{
		name: "Also Experienced With",
		items: [
			{ name: "TanStack Router + Query", note: "Type-safe routing and server state" },
			{ name: "Node.js", note: "Server runtime for most of my side projects" },
			{ name: "FastAPI", note: "Modern Python APIs" },
			{ name: "Styled Components", note: "CSS-in-JS for React" },
		],
	},
]

function UsesPage() {
	return (
		<div className="max-w-5xl mx-auto px-6 py-20 sm:py-24 relative z-10">
			<p className="font-mono text-[10px] tracking-[0.2em] uppercase text-(--color-text-muted) mb-4">
				Hardware · Software · Stack
			</p>
			<h1 className="display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight mb-6">
				What I <span className="display-italic text-(--color-text-secondary)">use</span>
			</h1>
			<p className="text-(--color-text-secondary) max-w-xl mb-16 leading-relaxed">
				The hardware, apps, and tech I use day to day. It changes more often than I'd like to admit.
			</p>

			<div className="space-y-16">
				{USES.map((category, index) => (
					<section key={category.name}>
						<div className="flex items-baseline gap-4 mb-8">
							<span className="display text-3xl text-(--color-text-muted) leading-none tabular-nums">
								{String(index + 1).padStart(2, "0")}
							</span>
							<h2 className="text-xs uppercase tracking-[0.25em] text-(--color-text-muted)">
								{category.name}
							</h2>
							<div className="flex-1 h-px bg-(--color-border) translate-y-[-4px]" />
						</div>
						<ul className="grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2">
							{category.items.map((item) => (
								<li key={item.name}>
									<div className="display text-xl text-(--color-text)">{item.name}</div>
									<div className="text-sm text-(--color-text-muted) mt-0.5">{item.note}</div>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	)
}
