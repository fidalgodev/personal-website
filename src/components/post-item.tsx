import { Link } from "@tanstack/react-router"

type PostItemProps = {
	title: string
	date: string
	description: string
	slug: string
	tags?: string[]
}

export function PostItem({ title, date, description, slug, tags }: PostItemProps) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug }}
			className="group block py-4 border-b border-(--color-border) last:border-b-0"
		>
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="text-base font-medium text-(--color-text) group-hover:text-(--color-accent) transition-colors">
					{title}
				</h3>
				<time className="text-sm text-(--color-text-muted) shrink-0">{date}</time>
			</div>
			<p className="text-sm text-(--color-text-secondary) mt-1">{description}</p>
			{tags && tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="text-xs text-(--color-text-muted) border border-(--color-border) px-2 py-0.5 rounded"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</Link>
	)
}
