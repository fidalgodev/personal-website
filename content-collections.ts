import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code"
import rehypePrettyCode from "rehype-pretty-code"
import { z } from "zod"

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
	theme: {
		dark: "github-dark-dimmed",
		light: "github-light",
	},
	keepBackground: true,
}

const posts = defineCollection({
	name: "posts",
	directory: "content/posts",
	include: "**/*.mdx",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.string(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const mdx = await context.cache(document.content, async () =>
			compileMDX(context, document, {
				rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
			}),
		)
		return {
			...document,
			mdx,
			slug: document._meta.path,
		}
	},
})

export default defineConfig({
	content: [posts],
})
