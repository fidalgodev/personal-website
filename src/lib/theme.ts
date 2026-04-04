export type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

export function getStoredTheme(): Theme {
	if (typeof window === "undefined") return "system"
	return (localStorage.getItem(STORAGE_KEY) as Theme) ?? "system"
}

export function storeTheme(theme: Theme): void {
	localStorage.setItem(STORAGE_KEY, theme)
}

export function applyTheme(theme: Theme): void {
	const isDark =
		theme === "dark" ||
		(theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

	document.documentElement.classList.toggle("dark", isDark)
}

/** Inline script string injected into <head> to prevent theme flash */
export const themeFlashScript = `
(function() {
	var t = localStorage.getItem("${STORAGE_KEY}") || "system";
	var d = t === "dark" || (t === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
	if (d) document.documentElement.classList.add("dark");
})();
`
