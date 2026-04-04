export const SITE = {
	name: "fidalgo.dev",
	title: "Fidalgo — Product Engineer",
	description:
		"Product engineer building end-to-end. Currently at Prolific with Python and Vue. Personal stack: React, TypeScript, Node, Tailwind.",
	url: "https://fidalgo.dev",
	email: "hello@fidalgo.dev",
	cv: "/cv",
	ogImage: "/images/og-image.jpg",
} as const

export const COMPANIES = {
	prolific: "https://www.prolific.com/",
	mindera: "https://mindera.com/",
	dunelm: "https://www.dunelm.com/",
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

export type CvEntry = {
	role: string
	company: string
	companyUrl?: string
	location: string
	period: string
	highlights: string[]
}

export const CV_EXPERIENCE: CvEntry[] = [
	{
		role: "Senior Product Engineer",
		company: "Prolific",
		companyUrl: "https://www.prolific.com/",
		location: "Remote",
		period: "2023 — Present",
		highlights: [
			"Full-stack product ownership across the Prolific platform, shipping end-to-end features from database to UI.",
			"Backend services in Python + Django, with MongoDB and Redis for storage and caching.",
			"Frontend in Vue + TypeScript + SASS, shared across multiple product surfaces.",
			"Kubernetes for container orchestration and deployment workflows.",
		],
	},
	{
		role: "Software Engineer",
		company: "Mindera",
		companyUrl: "https://mindera.com/",
		location: "Leicester, United Kingdom",
		period: "2019 — 2023",
		highlights: [
			"Built and maintained the high-scale e-commerce platform for Dunelm, one of the UK's largest home furnishings retailers.",
			"Worked across React, Node.js, GraphQL, and AWS — from component work to backend services.",
			"Grew from junior to senior engineer, owning features and mentoring other developers.",
			"Also contributed to a frontend application for a UK finance company.",
		],
	},
	{
		role: "Web Developer",
		company: "Invisual Branding Solutions",
		location: "Aveiro, Portugal",
		period: "2017 — 2019",
		highlights: [
			"WordPress projects for small and medium clients.",
			"Small internal management apps with PHP.",
			"Static websites with HTML5 and CSS3.",
			"Cross-platform mobile apps with PhoneGap.",
		],
	},
]

export const CV_EDUCATION = [
	{
		title: "Communication and Multimedia",
		institution: "Universidade de Trás-os-Montes e Alto Douro",
		location: "Vila Real, Portugal",
		period: "2014 — 2017",
	},
	{
		title: "Technical Course of Multimedia",
		institution: "Escola EB 2/3 c/ Secundário PAMF",
		location: "Murtosa, Portugal",
		period: "2010 — 2013",
	},
] as const

export const CV_SKILLS = [
	{
		label: "Languages",
		items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
	},
	{
		label: "Frontend",
		items: ["React", "Next.js", "Vue", "TanStack Start", "TanStack Router", "TanStack Query"],
	},
	{
		label: "Backend",
		items: ["Node.js", "Hono", "tRPC", "Django", "FastAPI"],
	},
	{
		label: "Styling",
		items: ["Tailwind CSS", "SASS", "Styled Components"],
	},
	{
		label: "Databases",
		items: ["PostgreSQL", "MongoDB", "Redis"],
	},
	{
		label: "DevOps",
		items: ["Docker", "Kubernetes", "Git", "CI / CD"],
	},
] as const

export const CV_LANGUAGES = [
	{ language: "Portuguese", level: "Native" },
	{ language: "English", level: "Fluent" },
] as const

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
