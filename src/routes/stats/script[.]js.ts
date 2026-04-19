import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/stats/script.js")({
	server: {
		handlers: {
			GET: async () => {
				const upstream = await fetch("https://cloud.umami.is/script.js", {
					cf: { cacheTtl: 86400, cacheEverything: true },
				} as RequestInit)

				return new Response(upstream.body, {
					status: upstream.status,
					headers: {
						"Content-Type": "application/javascript; charset=utf-8",
						"Cache-Control": "public, max-age=86400",
					},
				})
			},
		},
	},
})
