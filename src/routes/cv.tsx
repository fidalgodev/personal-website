import { createFileRoute } from "@tanstack/react-router"
import {
	CV_EDUCATION,
	CV_EXPERIENCE,
	CV_LANGUAGES,
	CV_SKILLS,
	PROJECTS,
	SITE,
} from "~/lib/constants"

export const Route = createFileRoute("/cv")({
	head: () => ({
		meta: [
			{ title: `CV — ${SITE.name}` },
			{
				name: "description",
				content: "Curriculum vitae for Fidalgo — product engineer based in Aveiro, Portugal.",
			},
			{ property: "og:title", content: `CV — ${SITE.name}` },
			{ property: "og:type", content: "profile" },
			{ property: "og:url", content: `${SITE.url}/cv` },
			{ property: "og:image", content: `${SITE.url}${SITE.ogImage}` },
		],
		links: [{ rel: "canonical", href: `${SITE.url}/cv` }],
	}),
	component: CvPage,
})

function CvPage() {
	return (
		<div className="cv-page relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-20">
			{/* Screen-only utility bar */}
			<div className="no-print flex items-center justify-between mb-10 pb-6 border-b border-(--color-border)">
				<p className="font-mono text-[10px] tracking-[0.2em] uppercase text-(--color-text-muted)">
					Curriculum Vitae · Last updated {new Date().getFullYear()}
				</p>
				<button
					type="button"
					onClick={() => window.print()}
					className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-(--color-text) hover:text-(--color-accent) transition-colors"
				>
					<span>Print / Save as PDF</span>
					<span className="transition-transform group-hover:translate-y-0.5">↓</span>
				</button>
			</div>

			{/* Header */}
			<header className="mb-12">
				<h1 className="display text-5xl sm:text-6xl leading-[0.95] tracking-tight mb-4">
					Fidalgo<span className="text-(--color-accent)">.</span>
				</h1>
				<p className="text-lg text-(--color-text-secondary) mb-5">
					<span className="display-italic">Product engineer</span> building end-to-end. Based in
					Aveiro, Portugal.
				</p>
				<div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-(--color-text-muted) uppercase tracking-wider">
					<a href={`mailto:${SITE.email}`} className="hover:text-(--color-text) transition-colors">
						{SITE.email}
					</a>
					<span>·</span>
					<a href={SITE.url} className="hover:text-(--color-text) transition-colors">
						fidalgo.dev
					</a>
					<span>·</span>
					<a
						href="https://github.com/fidalgodev/"
						className="hover:text-(--color-text) transition-colors"
					>
						github.com/fidalgodev
					</a>
					<span>·</span>
					<a
						href="https://www.linkedin.com/in/fidalgodev/"
						className="hover:text-(--color-text) transition-colors"
					>
						linkedin.com/in/fidalgodev
					</a>
				</div>
			</header>

			{/* Experience */}
			<section className="mb-12">
				<CvSection label="Experience" number="01" />
				<div className="space-y-8">
					{CV_EXPERIENCE.map((entry) => (
						<div key={`${entry.company}-${entry.period}`}>
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
								<h3 className="display text-xl text-(--color-text)">
									{entry.role} ·{" "}
									{entry.companyUrl ? (
										<a
											href={entry.companyUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="display-italic text-(--color-text-secondary) hover:text-(--color-accent) transition-colors"
										>
											{entry.company}
										</a>
									) : (
										<span className="display-italic text-(--color-text-secondary)">
											{entry.company}
										</span>
									)}
								</h3>
								<span className="font-mono text-[11px] uppercase tracking-wider text-(--color-text-muted)">
									{entry.period}
								</span>
							</div>
							<p className="font-mono text-[10px] uppercase tracking-wider text-(--color-text-muted) mb-3">
								{entry.location}
							</p>
							<ul className="space-y-1.5 text-sm text-(--color-text-secondary) leading-relaxed">
								{entry.highlights.map((h) => (
									<li key={h} className="flex gap-2">
										<span className="text-(--color-text-muted) shrink-0">—</span>
										<span>{h}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			{/* Selected Projects */}
			<section className="mb-12">
				<CvSection label="Selected Projects" number="02" />
				<div className="space-y-5">
					{PROJECTS.map((project) => (
						<div key={project.name}>
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
								<h3 className="display text-lg text-(--color-text)">{project.name}</h3>
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-mono text-[10px] uppercase tracking-wider text-(--color-text-muted) hover:text-(--color-text) transition-colors"
								>
									{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
								</a>
							</div>
							<p className="text-sm text-(--color-text-secondary) leading-relaxed mb-2">
								{project.description}
							</p>
							<p className="font-mono text-[10px] uppercase tracking-wider text-(--color-text-muted)">
								{project.tech.join(" · ")}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Skills */}
			<section className="mb-12">
				<CvSection label="Skills" number="03" />
				<dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
					{CV_SKILLS.map((group) => (
						<div key={group.label} className="flex gap-3">
							<dt className="font-mono text-[10px] uppercase tracking-wider text-(--color-text-muted) shrink-0 w-24 pt-0.5">
								{group.label}
							</dt>
							<dd className="text-sm text-(--color-text-secondary)">{group.items.join(" · ")}</dd>
						</div>
					))}
				</dl>
			</section>

			{/* Education */}
			<section className="mb-12">
				<CvSection label="Education" number="04" />
				<div className="space-y-5">
					{CV_EDUCATION.map((edu) => (
						<div key={edu.title}>
							<div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
								<h3 className="display text-lg text-(--color-text)">{edu.title}</h3>
								<span className="font-mono text-[11px] uppercase tracking-wider text-(--color-text-muted)">
									{edu.period}
								</span>
							</div>
							<p className="text-sm text-(--color-text-secondary)">
								{edu.institution} · {edu.location}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Languages */}
			<section className="mb-4">
				<CvSection label="Languages" number="05" />
				<ul className="space-y-1">
					{CV_LANGUAGES.map((lang) => (
						<li key={lang.language} className="flex gap-3 text-sm text-(--color-text-secondary)">
							<span className="text-(--color-text) font-medium w-28">{lang.language}</span>
							<span className="text-(--color-text-muted)">{lang.level}</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}

function CvSection({ label, number }: { label: string; number: string }) {
	return (
		<div className="flex items-baseline gap-4 mb-6">
			<span className="display text-2xl text-(--color-text-muted) leading-none tabular-nums">
				{number}
			</span>
			<h2 className="text-[11px] uppercase tracking-[0.25em] text-(--color-text-muted)">{label}</h2>
			<div className="flex-1 h-px bg-(--color-border) translate-y-[-3px]" />
		</div>
	)
}
