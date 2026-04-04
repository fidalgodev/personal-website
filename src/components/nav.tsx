import { Link } from "@tanstack/react-router"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
	return (
		<nav className="relative z-20 flex items-center justify-between py-5 px-6 max-w-5xl mx-auto w-full">
			<Link to="/" className="flex items-center gap-2.5 group" aria-label="Home">
				<img
					src="/images/avatar-48.webp"
					srcSet="/images/avatar-48.webp 1x, /images/avatar-96.webp 2x"
					alt="Fidalgo"
					width={32}
					height={32}
					className="rounded-full w-8 h-8"
				/>
				<span className="text-sm font-semibold text-(--color-text) group-hover:opacity-70 transition-opacity">
					fidalgo
				</span>
			</Link>
			<div className="flex items-center gap-5 sm:gap-6">
				<a
					href="/#projects"
					className="hidden sm:block text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
				>
					projects
				</a>
				<Link
					to="/blog"
					className="text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					blog
				</Link>
				<Link
					to="/uses"
					className="text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					uses
				</Link>
				<ThemeToggle />
			</div>
		</nav>
	)
}
