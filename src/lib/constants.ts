export const SITE = {
	name: "fidalgo.dev",
	title: "Fidalgo · Senior Product Engineer",
	description:
		"Senior Product Engineer at Prolific, based in Aveiro, Portugal. I care about accessibility and the small details that make software feel good, and I build my own products on the side.",
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
	{ name: "Instagram", url: "https://instagram.com/fidalgo.dev", label: "Instagram profile" },
] as const

export type Project = {
	name: string
	description: string
	url: string
	tech: string[]
	/** Older work, listed quietly under "Earlier" instead of the main list */
	earlier?: boolean
}

export type CvRole = {
	title: string
	period: string
	highlights: string[]
}

export type CvEntry = {
	company: string
	companyUrl?: string
	location: string
	period: string
	roles: CvRole[]
}

export const CV_EXPERIENCE: CvEntry[] = [
	{
		company: "Prolific",
		companyUrl: "https://www.prolific.com/",
		location: "Remote",
		period: "Dec 2021 to Present",
		roles: [
			{
				title: "Senior Product Engineer",
				period: "Sep 2023 to Present",
				highlights: [
					"Own features end-to-end across the platform, from design through to production support.",
					"Designed and built a study distribution system that cut participant-facing errors by about 75%. It worked within the existing infrastructure, which saved months of cross-team work.",
					"Led accessibility (WCAG AA) initiatives, building automation testing frameworks and influencing other teams to adopt them.",
					"Built and maintained design system components used across the platform, improving frontend consistency and velocity.",
					"Improved the participant experience with new onboarding flows and UI changes that increased engagement and retention.",
					"Improved internal admin tooling, transforming support team workflows and efficiency.",
					"Stepped in beyond my team: handled production incidents out of hours and embedded with other teams to share frontend knowledge.",
					"Led the Vue 3 migration and company rebrand implementation across the web client.",
					"Pushed for frontend quality through code reviews, knowledge sharing, and mentoring newer engineers.",
					"Full-stack delivery across Python, Django, Vue, TypeScript, MongoDB, Redis, and Kubernetes.",
				],
			},
			{
				title: "Frontend Engineer",
				period: "Dec 2021 to Sep 2023",
				highlights: [
					"Built and shipped features focused on improving participant and researcher experiences.",
					"Led the company rebranding implementation across the web application, exceeding expectations on quality and timeline.",
					"Helped establish a new product team, becoming a key technical resource during a critical formation period.",
					"Collaborated closely with designers and product managers to shape and deliver user-facing improvements.",
					"Promoted to Senior Product Engineer after ~2 years.",
				],
			},
		],
	},
	{
		company: "Mindera UK",
		companyUrl: "https://mindera.com/",
		location: "Leicester, United Kingdom",
		period: "Jul 2019 to Nov 2021",
		roles: [
			{
				title: "Full-stack Developer",
				period: "Mar 2020 to Nov 2021",
				highlights: [
					"Built and maintained the full-stack e-commerce platform for Dunelm.com, one of the UK's largest home furnishings retailers.",
					"Stack: AWS, Node.js, React, GraphQL.",
					"Shipped features across the storefront, basket, and checkout experiences.",
				],
			},
			{
				title: "Front-end Developer",
				period: "Jul 2019 to Mar 2020",
				highlights: [
					"Built a React-based web application for a UK finance company.",
					"Promoted to Full-stack Developer after ~9 months.",
				],
			},
		],
	},
	{
		company: "Invisual Branding Solutions",
		location: "Aveiro, Portugal",
		period: "Sep 2017 to Jan 2019",
		roles: [
			{
				title: "Web Developer",
				period: "Sep 2017 to Jan 2019",
				highlights: [
					"WordPress projects for small and medium clients.",
					"Small internal management apps with PHP.",
					"Static websites with HTML5 and CSS3.",
					"Cross-platform mobile apps with PhoneGap.",
				],
			},
		],
	},
]

export const CV_EDUCATION = [
	{
		title: "Communication and Multimedia",
		institution: "Universidade de Trás-os-Montes e Alto Douro",
		location: "Vila Real, Portugal",
		period: "2014 to 2017",
	},
	{
		title: "Technical Course of Multimedia",
		institution: "Escola EB 2/3 c/ Secundário PAMF",
		location: "Murtosa, Portugal",
		period: "2010 to 2013",
	},
] as const

export const CV_SKILLS = [
	{
		label: "Languages",
		items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
	},
	{
		label: "Frontend",
		items: ["React", "Vue", "TanStack Router", "TanStack Query"],
	},
	{
		label: "Backend",
		items: ["Node.js", "Hono", "OpenAPI", "Django", "FastAPI"],
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
			"A zero-based budgeting app where every bit of money gets a job before you spend it. I started it to sort out my own budget, and now more than 5,000 people use it too.",
		url: "https://zerosumapp.com/",
		tech: ["React", "TypeScript", "Tailwind", "Hono", "OpenAPI", "Postgres"],
	},
	{
		name: "Liga dos Chorões",
		description:
			"A dashboard for the fantasy football league my friends and I play in. It replaced a clunky website and a pile of spreadsheets with proper stats, streaks, and split season standings. Two other groups of friends liked it enough that it now runs their leagues too, Liga da Carneirada and Recordalti.",
		url: "https://liga-record-choroes.pages.dev/",
		tech: ["React", "TypeScript", "Vite", "Tailwind", "Cloudflare"],
	},
	{
		name: "Movie Library",
		description:
			"An app for browsing and discovering movies. One of my first projects, and the one where React and external APIs finally clicked for me.",
		url: "https://movies.fidalgo.dev/",
		earlier: true,
		tech: ["React", "Redux", "React Router", "Styled Components", "SASS"],
	},
]
