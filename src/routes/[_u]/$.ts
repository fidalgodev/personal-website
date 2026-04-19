import { createFileRoute } from "@tanstack/react-router"

const UMAMI_UPSTREAM = "https://cloud.umami.is"

async function proxyUmami(request: Request): Promise<Response> {
	const url = new URL(request.url)
	const upstreamPath = url.pathname.replace(/^\/_u/, "")
	const upstreamUrl = `${UMAMI_UPSTREAM}${upstreamPath}${url.search}`
	const headers = new Headers(request.headers)
	headers.delete("host")
	return fetch(upstreamUrl, {
		method: request.method,
		headers,
		body: request.body,
		redirect: "manual",
	})
}

export const Route = createFileRoute("/_u/$")({
	server: {
		handlers: {
			GET: ({ request }) => proxyUmami(request),
			POST: ({ request }) => proxyUmami(request),
		},
	},
})
