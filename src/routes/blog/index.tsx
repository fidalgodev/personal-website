import { createFileRoute } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { PostItem } from "~/components/post-item"
import { SITE } from "~/lib/constants"

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
			{ property: "og:image", content: `${SITE.url}${SITE.ogImage}` },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: `Blog — ${SITE.name}` },
			{
				name: "twitter:description",
				content:
					"Writing about building products, technical deep dives, and lessons from shipping side projects.",
			},
		],
		links: [{ rel: "canonical", href: `${SITE.url}/blog` }],
	}),
	component: BlogPage,
})

function BlogPage() {
	return (
		<div className="max-w-5xl mx-auto px-6 py-20 sm:py-24 relative z-10">
			<p className="font-mono text-[10px] tracking-[0.2em] uppercase text-(--color-text-muted) mb-4">
				Writing · Essays · Notes
			</p>
			<h1 className="display text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight mb-10">
				The <span className="display-italic text-(--color-text-secondary)">Blog</span>
			</h1>
			<div className="w-full h-px bg-(--color-border) mb-12" />
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
		</div>
	)
}
