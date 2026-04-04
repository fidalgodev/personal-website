/// <reference types="vite/client" />

import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { themeFlashScript } from "~/lib/theme"
import appCss from "~/styles/app.css?url"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "fidalgo.dev" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
		scripts: [
			{
				children: themeFlashScript,
			},
		],
	}),
	component: RootComponent,
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
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-(--color-bg) text-(--color-text) transition-colors">
				{children}
				<Scripts />
			</body>
		</html>
	)
}
