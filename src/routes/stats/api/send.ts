import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/stats/api/send")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const headers = new Headers()
				const contentType = request.headers.get("content-type")
				if (contentType) headers.set("Content-Type", contentType)
				const userAgent = request.headers.get("user-agent")
				if (userAgent) headers.set("User-Agent", userAgent)

				const clientIp =
					request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")
				if (clientIp) headers.set("X-Forwarded-For", clientIp)

				const upstream = await fetch("https://cloud.umami.is/api/send", {
					method: "POST",
					headers,
					body: request.body,
				})

				return new Response(upstream.body, {
					status: upstream.status,
					headers: {
						"Content-Type": upstream.headers.get("content-type") || "application/json",
					},
				})
			},
		},
	},
})
