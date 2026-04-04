type SectionLabelProps = {
	children: string
	as?: "h2" | "p"
	number?: string
}

export function SectionLabel({ children, as: Tag = "h2", number }: SectionLabelProps) {
	return (
		<div className="flex items-baseline gap-4 mb-8">
			{number && (
				<span className="display text-3xl text-(--color-text-muted) leading-none">{number}</span>
			)}
			<Tag className="text-xs uppercase tracking-[0.25em] text-(--color-text-muted)">
				{children}
			</Tag>
			<div className="flex-1 h-px bg-(--color-border) translate-y-[-4px]" />
		</div>
	)
}
