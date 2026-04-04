import { createFileRoute } from "@tanstack/react-router"
import { SectionLabel } from "~/components/section-label"
import { SITE } from "~/lib/constants"

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
			{ property: "og:image", content: `${SITE.url}${SITE.ogImage}` },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: `Uses — ${SITE.name}` },
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
				name: "MacBook Pro 16” (M4 Pro, 24GB)",
				note: "My main machine. Silly fast, all-day battery.",
			},
			{
				name: "Apple Studio Display XDR",
				note: "27” 5K Retina XDR, 120Hz, 1000 nits SDR / 2000 nits HDR",
			},
			{ name: "Apple Magic Keyboard", note: "Clean, low-profile, pairs perfectly with macOS" },
			{ name: "Keychron M6 Mouse", note: "Lightweight, ergonomic, works wired or wireless" },
		],
	},
	{
		name: "Audio",
		items: [
			{
				name: "Bose QuietComfort Ultra (Gen 2)",
				note: "For deep focus and long flights — best ANC I've tried",
			},
			{ name: "AirPods Pro 3", note: "For everything else on the go" },
		],
	},
	{
		name: "Development",
		items: [
			{ name: "Zed", note: "Primary editor — fast, clean, collaborative" },
			{ name: "Warp", note: "Terminal of choice" },
			{ name: "Claude Code", note: "AI pair programmer I reach for daily" },
			{ name: "Git", note: "Version control, obviously" },
		],
	},
	{
		name: "Daily Stack",
		items: [
			{ name: "React + TypeScript", note: "Frontend of choice" },
			{ name: "Tailwind CSS", note: "Utility-first styling" },
			{ name: "Hono + tRPC", note: "Backend API layer" },
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
			{ name: "Next.js", note: "React meta-framework for full-stack apps" },
			{
				name: "TanStack Start / Router / Query",
				note: "Type-safe routing and async state (this site runs on Start)",
			},
			{ name: "Node.js", note: "Server runtime for most of my side projects" },
			{ name: "FastAPI", note: "Modern Python APIs" },
			{ name: "Styled Components", note: "CSS-in-JS for React" },
		],
	},
]

function UsesPage() {
	return (
		<div className="max-w-3xl mx-auto px-6 py-16">
			<SectionLabel as="p">Uses</SectionLabel>
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
									<span className="text-sm text-(--color-text-muted)">— {item.note}</span>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</div>
	)
}
