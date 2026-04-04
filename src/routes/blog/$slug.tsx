import { MDXContent } from "@content-collections/mdx/react"
import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { mdxComponents } from "~/components/mdx-components"
import { SITE } from "~/lib/constants"
import { calculateReadingTime } from "~/lib/reading-time"

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		const post = allPosts.find((p) => p.slug === params.slug && !p.draft)
		if (!post) throw notFound()
		return { post }
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {}
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
							name: "Fidalgo",
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
			<Link
				to="/blog"
				className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors mb-8 inline-block"
			>
				← Back to blog
			</Link>
			<header className="mb-10">
				<h1 className="text-2xl sm:text-3xl font-medium leading-snug mb-3">{post.title}</h1>
				<div className="flex items-center gap-3 text-sm text-(--color-text-muted)">
					<time dateTime={post.date}>{formattedDate}</time>
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
