import { createFileRoute, Link } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { PostItem } from "~/components/post-item"
import { ProjectItem } from "~/components/project-item"
import { SectionLabel } from "~/components/section-label"
import { COMPANIES, PROJECTS, SITE } from "~/lib/constants"

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
					name: "Fidalgo",
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

const featuredProjects = PROJECTS.filter((p) => !p.earlier)
const earlierProjects = PROJECTS.filter((p) => p.earlier)

const inlineLinkClass =
	"text-(--color-text) underline underline-offset-4 decoration-(--color-border) hover:decoration-(--color-accent) transition-colors"

function HomePage() {
	const publishedPosts = allPosts
		.filter((p) => !p.draft)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3)

	return (
		<div className="relative z-10">
			{/* Hero: balanced 2-column with contained portrait */}
			<section className="max-w-5xl mx-auto px-6 pt-10 sm:pt-16 pb-20 sm:pb-24">
				<div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-12 lg:gap-16 items-center">
					{/* Text */}
					<div className="order-1">
						<div className="fade-up delay-1 flex items-center gap-3 mb-7">
							<span className="font-mono text-[10px] tracking-[0.18em] uppercase text-(--color-text-muted)">
								Based in Aveiro, Portugal
							</span>
						</div>

						<h1 className="fade-up delay-2 display text-5xl sm:text-6xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
							<span className="display-italic text-(--color-text-secondary)">Senior</span>
							<br />
							Product
							<br />
							Engineer<span className="text-(--color-accent)">.</span>
						</h1>

						<p className="fade-up delay-3 text-base sm:text-lg text-(--color-text-secondary) leading-relaxed max-w-md mb-8">
							I make software people use every day, and I care about how every part of it feels. I'm{" "}
							<span className="display-italic text-(--color-text)">self-taught</span>, and there's
							always a side project on the go.
						</p>

						{/* CTA row */}
						<div className="fade-up delay-4 flex flex-wrap items-baseline gap-x-5 gap-y-3 pt-6 border-t border-(--color-border)">
							<a
								href={`mailto:${SITE.email}`}
								className="group inline-flex items-baseline gap-1.5 text-(--color-text) hover:text-(--color-accent) transition-colors"
							>
								<span className="font-mono text-sm tracking-wide underline underline-offset-4 decoration-(--color-border) group-hover:decoration-(--color-accent)">
									{SITE.email}
								</span>
								<span className="font-mono text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
									↗
								</span>
							</a>
							<span className="hidden sm:inline text-(--color-border)">/</span>
							<a
								href="https://www.linkedin.com/in/fidalgodev/"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-baseline gap-1.5 font-mono text-sm tracking-wide text-(--color-text-muted) hover:text-(--color-text) transition-colors"
							>
								<span>LinkedIn</span>
								<span className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
									↗
								</span>
							</a>
							<Link
								to="/cv"
								className="group inline-flex items-baseline gap-1.5 font-mono text-sm tracking-wide text-(--color-text-muted) hover:text-(--color-text) transition-colors"
							>
								<span>CV</span>
								<span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
							</Link>
						</div>
					</div>

					{/* Portrait: natural 4:5 aspect */}
					<div className="fade-up delay-2 order-2">
						<div className="relative aspect-[4/5] overflow-hidden">
							<img
								src="/images/portrait-720w.webp"
								srcSet="/images/portrait-480w.webp 480w, /images/portrait-720w.webp 720w, /images/portrait-1080w.webp 1080w"
								sizes="(min-width: 768px) 45vw, 100vw"
								alt="Fidalgo working at his desk"
								width={720}
								height={900}
								className="w-full h-full object-cover grayscale-[0.15] hover:grayscale-0 transition-[filter] duration-700"
								loading="eager"
								fetchPriority="high"
								decoding="async"
							/>
						</div>
						<div className="mt-3 flex items-center justify-between text-(--color-text-muted) font-mono text-[10px] tracking-wider uppercase">
							<span>Fig. 01 · Home office</span>
							<span>Aveiro, PT</span>
						</div>
					</div>
				</div>
			</section>

			{/* About */}
			<section className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
				<SectionLabel number="01">About</SectionLabel>
				<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14">
					<p className="display text-2xl sm:text-3xl leading-tight text-(--color-text)">
						I taught myself to code in 2018.{" "}
						<span className="display-italic text-(--color-text-secondary)">
							I still haven't stopped.
						</span>
					</p>
					<div className="space-y-5 text-(--color-text-secondary) leading-relaxed max-w-prose">
						<p>I'm Fidalgo, a software engineer living in Aveiro, Portugal.</p>
						<p>
							In 2018 I decided it was time for a change. I started teaching myself JavaScript
							before work, fell in love with it, and in January 2019 I quit my job to go all in. Six
							months later I got my first engineering job at{" "}
							<a
								href={COMPANIES.mindera}
								target="_blank"
								rel="noopener noreferrer"
								className={inlineLinkClass}
							>
								Mindera
							</a>{" "}
							in the UK. I grew into a full stack developer there, mostly working on{" "}
							<a
								href={COMPANIES.dunelm}
								target="_blank"
								rel="noopener noreferrer"
								className={inlineLinkClass}
							>
								Dunelm
							</a>
							, one of the biggest home furnishing retailers in the UK.
						</p>
						<p>
							Today I'm a Senior Product Engineer at{" "}
							<a
								href={COMPANIES.prolific}
								target="_blank"
								rel="noopener noreferrer"
								className={inlineLinkClass}
							>
								Prolific
							</a>
							. Most of my time goes into making the platform better for the people who use it. I've
							led our accessibility work, built design system components, improved internal tools,
							and mentored engineers across teams. When I'm building for myself, I reach for{" "}
							<span className="display-italic text-(--color-text)">
								React, TypeScript, Tailwind, and Postgres
							</span>
							.
						</p>
						<p>
							Outside of work, I build my own things. The biggest one is{" "}
							<a
								href="https://zerosumapp.com/"
								target="_blank"
								rel="noopener noreferrer"
								className={inlineLinkClass}
							>
								Zerosum
							</a>
							, a zero-based budgeting app I started because I wanted a better way to plan my own
							money. It's grown to more than 5,000 people, which still surprises me. I like fixing
							problems I actually have, then making the fix good enough for other people to use.
						</p>
					</div>
				</div>
			</section>

			{/* Projects */}
			<section id="projects" className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
				<SectionLabel number="02">Selected Work</SectionLabel>
				<div>
					{featuredProjects.map((project, i) => (
						<ProjectItem key={project.name} project={project} index={i} />
					))}
				</div>
				{earlierProjects.length > 0 && (
					<div className="mt-6 pt-6 border-t border-(--color-border) flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
						<p className="font-mono text-[10px] tracking-wider uppercase text-(--color-text-muted) shrink-0 sm:w-24">
							Earlier
						</p>
						<ul className="space-y-2">
							{earlierProjects.map((project) => (
								<li key={project.name} className="text-sm text-(--color-text-secondary)">
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										className={inlineLinkClass}
									>
										{project.name}
									</a>{" "}
									<span className="text-(--color-text-muted)">↗</span> {project.description}
								</li>
							))}
						</ul>
					</div>
				)}
			</section>

			{/* Latest Posts (hidden until there's something to show) */}
			{publishedPosts.length > 0 && (
				<section className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
					<SectionLabel number="03">Writing</SectionLabel>
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
				</section>
			)}
		</div>
	)
}
