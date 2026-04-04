import { useCallback, useEffect, useState } from "react"
import { applyTheme, getStoredTheme, storeTheme, type Theme } from "~/lib/theme"

const CYCLE: Theme[] = ["light", "dark", "system"]

const ICONS: Record<Theme, string> = {
	light: "☀️",
	dark: "🌙",
	system: "💻",
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
				<span className="opacity-0">☀️</span>
			</button>
		)
	}

	return (
		<button
			type="button"
			onClick={cycle}
			className="w-8 h-8 flex items-center justify-center text-sm transition-opacity hover:opacity-70"
			aria-label={LABELS[theme]}
			title={LABELS[theme]}
		>
			{ICONS[theme]}
		</button>
	)
}
