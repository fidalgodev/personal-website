import { Link } from "@tanstack/react-router"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
	return (
		<nav className="flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6 max-w-3xl mx-auto">
			<Link to="/" className="flex items-center gap-2 sm:gap-2.5 group" aria-label="Home">
				<img
					src="/images/avatar-48.webp"
					srcSet="/images/avatar-48.webp 1x, /images/avatar-96.webp 2x"
					alt="Pedro Fidalgo"
					width={32}
					height={32}
					className="rounded-full w-7 h-7 sm:w-8 sm:h-8"
				/>
				<span className="text-sm font-semibold text-(--color-text) group-hover:opacity-70 transition-opacity">
					pedro fidalgo
				</span>
			</Link>
			<div className="flex items-center gap-3 sm:gap-6">
				<a
					href="/#projects"
					className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors hidden sm:inline"
				>
					projects
				</a>
				<Link
					to="/blog"
					className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					blog
				</Link>
				<Link
					to="/uses"
					className="text-xs sm:text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
					activeProps={{ className: "text-(--color-text) font-medium" }}
				>
					uses
				</Link>
				<ThemeToggle />
			</div>
		</nav>
	)
}
