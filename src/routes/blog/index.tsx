import { createFileRoute } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { PostItem } from "~/components/post-item"
import { SectionLabel } from "~/components/section-label"
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
		<div className="max-w-3xl mx-auto px-6 py-16">
			<SectionLabel as="p">Blog</SectionLabel>
			<h1 className="text-2xl font-medium mb-8">Writing</h1>
			{publishedPosts.length === 0 ? (
				<p className="text-sm text-(--color-text-muted) italic">
					No posts yet — but they're coming. I'll be writing about building products, technical deep
					dives, and lessons from shipping side projects.
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
