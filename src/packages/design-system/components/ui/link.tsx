import { createLink, type LinkComponent } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import {
	Button,
	buttonVariants
} from "@/packages/design-system/components/ui/button";
import { cn } from "@/packages/design-system/lib/utils";

type LinkProps = ComponentProps<"a"> &
	VariantProps<typeof buttonVariants> & {
		startIcon?: React.ReactNode;
		endIcon?: React.ReactNode;
	};

function CustomLink({
	className,
	variant = "link-underline",
	size = "default",
	startIcon,
	endIcon,
	children,
	...props
}: LinkProps) {
	return (
		<Button
			variant={variant}
			size={size}
			nativeButton={false}
			startIcon={startIcon}
			endIcon={endIcon}
			className={cn(buttonVariants({ variant, size, className }))}
			render={<a data-slot="link" {...props} />}
		>
			{children}
		</Button>
	);
}

const CreatedLinkComponent = createLink(CustomLink);

export const Link: LinkComponent<typeof CustomLink> = props => {
	return <CreatedLinkComponent {...props} />;
};
