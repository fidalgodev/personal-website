import { createFileRoute } from "@tanstack/react-router"
import { ProjectItem } from "~/components/project-item"
import { SectionLabel } from "~/components/section-label"
import { PROJECTS, SITE } from "~/lib/constants"

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
					Currently at Prolific working with Python and Vue. My personal stack is React, TypeScript,
					Node, and Tailwind — I ship full products from database to UI. Self-taught, endlessly
					curious, and always building something on the side.
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
					src="/images/working-1280w.webp"
					srcSet="/images/working-640w.webp 640w, /images/working-1280w.webp 1280w, /images/working-1920w.webp 1920w"
					sizes="100vw"
					alt="Pedro Fidalgo working at his desk with dual monitors"
					className="w-full h-64 sm:h-80 md:h-96 object-cover"
					loading="eager"
				/>
			</section>

			{/* About */}
			<section className="max-w-3xl mx-auto px-6 py-16 border-b border-(--color-border)">
				<SectionLabel>About</SectionLabel>
				<div className="space-y-4 text-(--color-text-secondary) leading-relaxed max-w-2xl">
					<p>I'm Pedro — a self-taught software engineer based in Aveiro, Portugal.</p>
					<p>
						In 2018, I decided it was time for a change. I started teaching myself JavaScript before
						work, fell in love with it, and in January 2019 I quit my job to go all in. Six months
						later I landed my first engineering role at Mindera in the UK, where I grew into a
						full-stack developer working on large-scale e-commerce.
					</p>
					<p>
						Today I'm a Senior Product Engineer at Prolific, building with Python and Vue. But my
						heart is in the React and Node ecosystem — TypeScript, Tailwind, Hono, tRPC, and
						Postgres are what I reach for when I'm building for myself.
					</p>
					<p>
						Outside of work, I build my own things. Zerosum is a budgeting app I built from scratch
						with React, Hono, tRPC, and Postgres — a real SaaS product with real users. I like
						solving problems that I personally have, and turning them into something others can use
						too.
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
					No posts yet — but they're coming. I'll be writing about building products, technical deep
					dives, and lessons from shipping side projects.
				</p>
			</section>
		</div>
	)
}
