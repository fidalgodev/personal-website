export function SectionLabel({ children }: { children: string }) {
	return (
		<h2 className="text-xs uppercase tracking-[0.2em] text-(--color-text-muted) mb-6">
			{children}
		</h2>
	)
}
