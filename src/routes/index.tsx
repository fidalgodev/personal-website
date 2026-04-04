import { createFileRoute } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { PostItem } from "~/components/post-item"
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
	const publishedPosts = allPosts
		.filter((p) => !p.draft)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3)

	return (
		<div className="relative z-10">
			{/* Hero — asymmetric two-column with display serif + portrait photo */}
			<section className="max-w-5xl mx-auto px-6 pt-10 sm:pt-16 pb-20 sm:pb-28">
				<div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-14 items-start">
					{/* Left: typography */}
					<div className="order-2 md:order-1">
						<div className="fade-up delay-1 flex items-center gap-3 mb-8">
							<span className="font-mono text-[10px] tracking-[0.18em] uppercase text-(--color-text-muted)">
								PF · Aveiro, PT · Est. 2019
							</span>
						</div>

						<h1 className="fade-up delay-2 display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight mb-6">
							Senior
							<br />
							<span className="display-italic text-(--color-text-secondary)">Product</span>
							<br />
							Engineer<span className="text-(--color-accent)">.</span>
						</h1>

						<p className="fade-up delay-3 text-base sm:text-lg text-(--color-text-secondary) leading-relaxed max-w-md mb-6">
							I ship full products from database to UI.{" "}
							<span className="display-italic text-(--color-text)">
								Self-taught, endlessly curious,
							</span>{" "}
							and always building something on the side.
						</p>

						<div className="fade-up delay-4 flex items-center gap-3">
							<span className="relative flex h-2 w-2">
								<span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-(--color-green-dot) opacity-60" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-green-dot)" />
							</span>
							<span className="font-mono text-[11px] tracking-wider uppercase text-(--color-text-muted)">
								Open to interesting conversations
							</span>
						</div>
					</div>

					{/* Right: portrait photo with subtle frame */}
					<div className="fade-up delay-2 order-1 md:order-2 relative">
						<div className="relative aspect-[4/5] overflow-hidden">
							<img
								src="/images/portrait-720w.webp"
								srcSet="/images/portrait-480w.webp 480w, /images/portrait-720w.webp 720w, /images/portrait-1080w.webp 1080w"
								sizes="(min-width: 768px) 45vw, 100vw"
								alt="Pedro Fidalgo working at his desk"
								className="w-full h-full object-cover grayscale-[0.15] hover:grayscale-0 transition-[filter] duration-700"
								loading="eager"
							/>
						</div>
						{/* Corner metadata */}
						<div className="mt-3 flex items-center justify-between text-(--color-text-muted) font-mono text-[10px] tracking-wider uppercase">
							<span>Fig. 01</span>
							<span>Aveiro / PT</span>
						</div>
					</div>
				</div>
			</section>

			{/* About */}
			<section className="max-w-5xl mx-auto px-6 py-20 sm:py-24 border-t border-(--color-border)">
				<SectionLabel number="01">About</SectionLabel>
				<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14">
					<p className="display text-2xl sm:text-3xl leading-tight text-(--color-text)">
						Self-taught.{" "}
						<span className="display-italic text-(--color-text-secondary)">Product-minded.</span>{" "}
						Building since 2019.
					</p>
					<div className="space-y-5 text-(--color-text-secondary) leading-relaxed max-w-prose">
						<p>I'm Pedro — a software engineer based in Aveiro, Portugal.</p>
						<p>
							In 2018, I decided it was time for a change. I started teaching myself JavaScript
							before work, fell in love with it, and in January 2019 I quit my job to go all in. Six
							months later I landed my first engineering role at{" "}
							<span className="text-(--color-text)">Mindera</span> in the UK, where I grew into a
							full-stack developer working on large-scale e-commerce.
						</p>
						<p>
							Today I'm a Senior Product Engineer at{" "}
							<span className="text-(--color-text)">Prolific</span>, building with Python and Vue.
							But my heart is in the React and Node ecosystem —{" "}
							<span className="display-italic text-(--color-text)">
								TypeScript, Tailwind, Hono, tRPC, and Postgres
							</span>{" "}
							are what I reach for when I'm building for myself.
						</p>
						<p>
							Outside of work, I build my own things.{" "}
							<span className="text-(--color-text)">Zerosum</span> is a budgeting app I built from
							scratch — a real SaaS product with real users. I like solving problems that I
							personally have, and turning them into something others can use too.
						</p>
					</div>
				</div>
			</section>

			{/* Projects */}
			<section
				id="projects"
				className="max-w-5xl mx-auto px-6 py-20 sm:py-24 border-t border-(--color-border)"
			>
				<SectionLabel number="02">Selected Work</SectionLabel>
				<div>
					{PROJECTS.map((project, i) => (
						<ProjectItem key={project.name} project={project} index={i} />
					))}
				</div>
			</section>

			{/* Latest Posts */}
			<section className="max-w-5xl mx-auto px-6 py-20 sm:py-24 border-t border-(--color-border)">
				<SectionLabel number="03">Writing</SectionLabel>
				{publishedPosts.length === 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14">
						<p className="display text-2xl leading-tight text-(--color-text-secondary)">
							<span className="display-italic">Soon.</span>
						</p>
						<p className="text-(--color-text-secondary) leading-relaxed max-w-prose">
							No posts yet — but they're coming. I'll be writing about building products, technical
							deep dives, and lessons from shipping side projects.
						</p>
					</div>
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
								dateIso={post.date}
								description={post.description}
								slug={post.slug}
								tags={post.tags}
							/>
						))}
					</div>
				)}
			</section>
		</div>
	)
}
