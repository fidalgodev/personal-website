import type { Project } from "~/lib/constants"

export function ProjectItem({ project, index }: { project: Project; index?: number }) {
	return (
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 items-start py-6 sm:py-8 border-b border-(--color-border) last:border-b-0 transition-all hover:px-2"
		>
			<span className="display text-xl text-(--color-text-muted) leading-none pt-1 w-6 tabular-nums">
				{typeof index === "number" ? String(index + 1).padStart(2, "0") : ""}
			</span>
			<div className="min-w-0">
				<h3 className="display text-2xl sm:text-3xl text-(--color-text) group-hover:text-(--color-accent) transition-colors leading-tight">
					{project.name}
				</h3>
				<p className="text-sm text-(--color-text-secondary) mt-2 max-w-prose leading-relaxed">
					{project.description}
				</p>
				<div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
					{project.tech.map((t) => (
						<span
							key={t}
							className="font-mono text-[10px] tracking-wider uppercase text-(--color-text-muted)"
						>
							{t}
						</span>
					))}
				</div>
			</div>
			<span className="text-(--color-text-muted) text-xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-(--color-accent) pt-1">
				↗
			</span>
		</a>
	)
}
