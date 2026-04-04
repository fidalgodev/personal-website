import { SITE, SOCIALS } from "~/lib/constants"

export function Footer() {
	const year = new Date().getFullYear()
	return (
		<footer className="border-t border-(--color-border) mt-20 shrink-0 relative z-10">
			<div className="max-w-5xl mx-auto px-6 py-10">
				{/* Top row: big mono line */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
					<p className="display text-3xl sm:text-4xl leading-tight text-(--color-text)">
						Let's build something <span className="display-italic">together.</span>
					</p>
					<a
						href={`mailto:${SITE.email}`}
						className="font-mono text-sm tracking-wide text-(--color-text) hover:text-(--color-accent) transition-colors underline underline-offset-4 decoration-(--color-border) hover:decoration-(--color-accent)"
					>
						{SITE.email}
					</a>
				</div>

				{/* Bottom row: socials + cv + copyright */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-(--color-border)">
					<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
						{SOCIALS.map((social) => (
							<a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted) hover:text-(--color-text) transition-colors"
								aria-label={social.label}
							>
								{social.name}
							</a>
						))}
						<a
							href={SITE.cv}
							target="_blank"
							rel="noopener noreferrer"
							className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted) hover:text-(--color-text) transition-colors"
							aria-label="Download CV"
						>
							CV
						</a>
					</div>
					<p className="text-xs font-mono uppercase tracking-wider text-(--color-text-muted)">
						© {year} · Pedro Fidalgo · Made with care
					</p>
				</div>
			</div>
		</footer>
	)
}
