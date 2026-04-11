import { cloudflare } from "@cloudflare/vite-plugin"
import contentCollections from "@content-collections/vite"
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
		cloudflare({ viteEnvironment: { name: "ssr" } }),
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
		viteReact(),
	],
})
