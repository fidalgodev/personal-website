import { useCallback, useEffect, useState } from "react"
import { applyTheme, getStoredTheme, storeTheme, type Theme } from "~/lib/theme"

const CYCLE: Theme[] = ["light", "dark", "system"]

function ThemeIcon({ theme }: { theme: Theme }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{theme === "light" && (
				<>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
				</>
			)}
			{theme === "dark" && <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />}
			{theme === "system" && (
				<>
					<rect x="3" y="4" width="18" height="12" rx="1.5" />
					<path d="M8 20h8M12 16v4" />
				</>
			)}
		</svg>
	)
}

const LABELS: Record<Theme, string> = {
	light: "Switch to dark mode",
	dark: "Switch to system mode",
	system: "Switch to light mode",
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("system")
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setTheme(getStoredTheme())
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return
		applyTheme(theme)

		const mq = window.matchMedia("(prefers-color-scheme: dark)")
		const handler = () => {
			if (theme === "system") applyTheme("system")
		}
		mq.addEventListener("change", handler)
		return () => mq.removeEventListener("change", handler)
	}, [theme, mounted])

	const cycle = useCallback(() => {
		const next = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]
		setTheme(next)
		storeTheme(next)
	}, [theme])

	if (!mounted) {
		return (
			<button type="button" className="w-8 h-8" aria-label="Toggle theme">
				<span className="sr-only">Toggle theme</span>
			</button>
		)
	}

	return (
		<button
			type="button"
			onClick={cycle}
			className="w-8 h-8 -mr-2 flex items-center justify-center text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
			aria-label={LABELS[theme]}
			title={LABELS[theme]}
		>
			<ThemeIcon theme={theme} />
		</button>
	)
}
