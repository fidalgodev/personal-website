import type { Project } from "~/lib/constants"

export function ProjectItem({ project }: { project: Project }) {
	return (
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-start justify-between gap-4 py-4 border-b border-(--color-border) last:border-b-0 transition-colors"
		>
			<div className="min-w-0">
				<div className="flex items-center gap-2">
					<h3 className="text-base font-medium text-(--color-text) group-hover:text-(--color-accent) transition-colors">
						{project.name}
					</h3>
					<span className="text-(--color-text-muted) text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
						↗
					</span>
				</div>
				<p className="text-sm text-(--color-text-secondary) mt-1">{project.description}</p>
				<div className="flex flex-wrap gap-2 mt-2">
					{project.tech.map((t) => (
						<span
							key={t}
							className="text-xs text-(--color-text-muted) border border-(--color-border) px-2 py-0.5 rounded"
						>
							{t}
						</span>
					))}
				</div>
			</div>
		</a>
	)
}
