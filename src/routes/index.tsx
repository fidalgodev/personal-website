import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: HomePage,
})

function HomePage() {
	return (
		<main>
			<h1>fidalgo.dev</h1>
			<p>Coming soon.</p>
		</main>
	)
}
