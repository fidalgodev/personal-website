/// <reference types="vite/client" />

import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { Footer } from "~/components/footer"
import { Nav } from "~/components/nav"
import { SITE } from "~/lib/constants"
import { themeFlashScript } from "~/lib/theme"
import appCss from "~/styles/app.css?url"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: SITE.title },
			{ name: "description", content: SITE.description },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "alternate", type: "application/rss+xml", title: SITE.name, href: "/rss.xml" },
		],
		scripts: [
			{
				children: themeFlashScript,
			},
		],
	}),
	component: RootComponent,
	notFoundComponent: () => (
		<div className="max-w-3xl mx-auto px-6 py-24 text-center">
			<h1 className="text-4xl font-medium mb-4">404</h1>
			<p className="text-(--color-text-secondary) mb-8">
				This page doesn't exist. Maybe it was moved or you mistyped the URL.
			</p>
			<Link
				to="/"
				className="text-sm text-(--color-accent) underline underline-offset-2 hover:no-underline"
			>
				Back to home
			</Link>
		</div>
	),
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="bg-(--color-bg) text-(--color-text) transition-colors min-h-dvh flex flex-col">
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<Nav />
				<main id="main" className="flex-1">
					{children}
				</main>
				<Footer />
				<Scripts />
			</body>
		</html>
	)
}
