import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/packages/design-system/lib/utils";

const badgeVariants = cva(
	"group/badge inline-flex h-5 w-fit shrink-0 select-none items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border border-transparent px-2 py-0.5 font-medium text-2xs transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/80 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:size-3!",
	{
		variants: {
			variant: {
				default:
					"border-muted/90 bg-muted/50 text-accent-foreground [a]:hover:bg-muted/80",
				secondary:
					"border-secondary/50 bg-secondary/15 text-accent-foreground [a]:hover:bg-secondary/30",
				info: "border-sky-500/30 bg-sky-500/10 text-sky-900 dark:text-sky-200 [a]:hover:bg-sky-500/30",
				success:
					"border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 [a]:hover:bg-emerald-500/30",
				warning:
					"border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 [a]:hover:bg-amber-500/30",
				destructive:
					"border-destructive-500/50 bg-destructive-500/15 text-destructive-900 focus-visible:ring-destructive/20 dark:text-destructive-200 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/30",
				outline: "border-border text-foreground [a]:hover:bg-accent",
				ghost: "hover:bg-muted dark:hover:bg-muted/60",
				link: "text-primary underline-offset-4 hover:underline"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

type RenderElement = React.ReactElement<{ children?: React.ReactNode }>;

type BadgeProps = useRender.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & {
		startIcon?: React.ReactNode;
		endIcon?: React.ReactNode;
	};

function Badge({
	className,
	variant = "default",
	startIcon,
	endIcon,
	children,
	render,
	...props
}: BadgeProps) {
	// TODO: Find a better way to handle start and end icons
	const isRenderElement =
		render && typeof render !== "function" && isValidElement(render);

	const contentChildren = isRenderElement
		? ((render as RenderElement).props.children ?? children)
		: children;

	const composedChildren = (
		<>
			{startIcon && <span data-icon="inline-start">{startIcon}</span>}
			{contentChildren}
			{endIcon && <span data-icon="inline-end">{endIcon}</span>}
		</>
	);

	const processedRender = isRenderElement
		? cloneElement(render as RenderElement, { children: composedChildren })
		: render;

	return useRender({
		defaultTagName: "span",
		props: mergeProps<"span">(
			{
				className: cn(badgeVariants({ className, variant })),
				children: composedChildren
			},
			props
		),
		render: processedRender,
		state: { slot: "badge", variant }
	});
}

export { Badge, badgeVariants };
