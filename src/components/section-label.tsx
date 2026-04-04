export function SectionLabel({ children, as: Tag = "h2" }: { children: string; as?: "h2" | "p" }) {
	return (
		<Tag className="text-xs uppercase tracking-[0.2em] text-(--color-text-muted) mb-6">
			{children}
		</Tag>
	)
}
