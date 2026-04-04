import { createFileRoute } from "@tanstack/react-router"
import { allPosts } from "content-collections"
import { SITE } from "~/lib/constants"

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
}

export const Route = createFileRoute("/rss.xml")({
	server: {
		handlers: {
			GET: async () => {
				const published = allPosts
					.filter((p) => !p.draft)
					.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

				const items = published
					.map(
						(post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE.url}/blog/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${SITE.url}/blog/${post.slug}</guid>
    </item>`,
					)
					.join("\n")

				const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.title)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

				return new Response(rss, {
					headers: {
						"Content-Type": "application/xml",
						"Cache-Control": "public, max-age=3600",
					},
				})
			},
		},
	},
})
