import type { MDXComponents } from "mdx/types";
import { Link } from "@/packages/design-system/components/ui/link";

const components: MDXComponents = {
	h1: ({ children }) => <h1 className="header-1">{children}</h1>,
	h2: ({ children }) => <h2 className="header-2">{children}</h2>,
	h3: ({ children }) => <h3 className="header-3">{children}</h3>,
	h4: ({ children }) => <h4 className="header-4">{children}</h4>,
	a: ({ children, href }) => (
		<Link to={href} variant="link-secondary-underline">
			{children}
		</Link>
	)
};

export function useMDXComponents(): MDXComponents {
	return components;
}
