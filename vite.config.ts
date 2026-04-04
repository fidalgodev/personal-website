import contentCollections from "@content-collections/vite"
import netlify from "@netlify/vite-plugin-tanstack-start"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tailwindcss(),
		contentCollections(),
		tanstackStart({
			pages: [{ path: "/" }, { path: "/blog" }, { path: "/uses" }, { path: "/cv" }],
			prerender: {
				enabled: true,
				crawlLinks: false,
				autoStaticPathsDiscovery: false,
			},
			sitemap: {
				enabled: true,
				host: "https://fidalgo.dev",
			},
		}),
		netlify(),
		viteReact(),
	],
})
