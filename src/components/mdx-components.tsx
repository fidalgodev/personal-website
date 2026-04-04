import type { ComponentProps } from "react"

export const mdxComponents = {
	a: (props: ComponentProps<"a">) => {
		const isExternal = props.href?.startsWith("http")
		return (
			<a {...props} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} />
		)
	},
}
