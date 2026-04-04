export const SITE = {
	name: "fidalgo.dev",
	title: "Fidalgo — Product Engineer",
	description:
		"Product engineer building end-to-end. Currently at Prolific with Python and Vue. Personal stack: React, TypeScript, Node, Tailwind.",
	url: "https://fidalgo.dev",
	email: "hello@fidalgo.dev",
	cv: "/cv.pdf",
	ogImage: "/images/og-image.jpg",
} as const

export const SOCIALS = [
	{ name: "GitHub", url: "https://github.com/fidalgodev/", label: "GitHub profile" },
	{
		name: "LinkedIn",
		url: "https://www.linkedin.com/in/fidalgodev/",
		label: "LinkedIn profile",
	},
	{ name: "X", url: "https://x.com/fidalgodev", label: "X (Twitter) profile" },
	{ name: "YouTube", url: "https://youtube.com/c/fidalgodev", label: "YouTube channel" },
	{ name: "Instagram", url: "https://instagram.com/fidalgo.dev", label: "Instagram profile" },
] as const

export type Project = {
	name: string
	description: string
	url: string
	tech: string[]
}

export const PROJECTS: Project[] = [
	{
		name: "Zerosum",
		description:
			"Zero-based budgeting made simple. A full-stack SaaS I built and run with real users.",
		url: "https://zerosum.so/",
		tech: ["React", "TypeScript", "Tailwind", "Hono", "tRPC", "Postgres"],
	},
	{
		name: "Liga do Tinto",
		description:
			"A custom fantasy league dashboard for my friend group. Replaced a clunky website and messy spreadsheets with proper stats and split-season tracking.",
		url: "https://ligarecord.fidalgo.dev/",
		tech: ["React", "TypeScript", "Vite", "Tailwind"],
	},
	{
		name: "Movie Library",
		description:
			"A React app for browsing and discovering movies. One of my earlier projects that helped me learn React and working with external APIs.",
		url: "https://movies.fidalgo.dev/",
		tech: ["React", "Redux", "React Router", "Styled Components", "SASS"],
	},
]
