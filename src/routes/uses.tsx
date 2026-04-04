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
