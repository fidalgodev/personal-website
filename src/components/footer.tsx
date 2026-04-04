import { SITE, SOCIALS } from "~/lib/constants"

export function Footer() {
	return (
		<footer className="border-t border-(--color-border) mt-20 shrink-0">
			<div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-5">
					{SOCIALS.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
							aria-label={social.label}
						>
							{social.name}
						</a>
					))}
					<a
						href={SITE.cv}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
						aria-label="Download CV"
					>
						CV
					</a>
				</div>
				<a
					href={`mailto:${SITE.email}`}
					className="text-sm text-(--color-text-muted) hover:text-(--color-text) transition-colors"
				>
					{SITE.email}
				</a>
			</div>
		</footer>
	)
}
