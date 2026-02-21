import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "@/packages/design-system/components/ui/spinner";
import { cn } from "@/packages/design-system/lib/utils";

const buttonVariants = cva(
	"group/button inline-flex shrink-0 select-none items-center justify-center rounded-md border border-transparent bg-clip-padding font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/50 dark:aria-invalid:border-destructive/80 dark:focus-visible:border-ring [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/80 aria-expanded:bg-primary aria-expanded:text-primary-foreground",
				outline:
					"border-border bg-background shadow-xs hover:bg-accent hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				ghost:
					"text-muted-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				destructive:
					"bg-destructive text-secondary-foreground hover:bg-destructive/80 focus-visible:border-destructive focus-visible:ring-destructive/50 aria-expanded:bg-destructive aria-expanded:text-secondary-foreground dark:focus-visible:border-destructive",
				"link-underline":
					"h-fit! w-fit! px-0! text-[length:inherit]! text-current underline-offset-2 hover:underline",
				"link-foreground":
					"h-fit! w-fit! px-0! text-[length:inherit]! text-current underline-offset-2 hover:text-foreground",
				"link-secondary-underline":
					"h-fit! w-fit! px-0! text-[length:inherit]! text-secondary underline-offset-2 hover:underline",
				"link-secondary":
					"h-fit! w-fit! px-0! text-[length:inherit]! text-current underline underline-offset-2 hover:text-secondary"
			},
			size: {
				default:
					"h-9 gap-1.5 px-3 text-sm has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-4",
				"3xs":
					"h-5 gap-0.5 in-data-[slot=button-group]:rounded-sm rounded-sm px-2 text-4xs has-data-[icon=inline-end]:pr-1.25 has-data-[icon=inline-start]:pl-1.25 [&_svg:not([class*='size-'])]:size-2.75",
				"2xs":
					"h-6 gap-0.75 in-data-[slot=button-group]:rounded-sm rounded-sm px-2.25 text-3xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				xs: "h-7 gap-1 in-data-[slot=button-group]:rounded-md rounded-md px-2.5 text-2xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.25",
				sm: "h-8 gap-1.25 in-data-[slot=button-group]:rounded-md rounded-md px-2.75 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
				lg: "h-10 gap-1.5 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4",
				icon: "size-9 [&_svg:not([class*='size-'])]:size-4.25",
				"icon-3xs":
					"size-5 in-data-[slot=button-group]:rounded-sm rounded-sm [&_svg:not([class*='size-'])]:size-3.25",
				"icon-2xs":
					"size-6 in-data-[slot=button-group]:rounded-sm rounded-sm [&_svg:not([class*='size-'])]:size-3.5",
				"icon-xs":
					"size-7 in-data-[slot=button-group]:rounded-md rounded-md [&_svg:not([class*='size-'])]:size-3.75",
				"icon-sm":
					"size-8 in-data-[slot=button-group]:rounded-md rounded-md [&_svg:not([class*='size-'])]:size-4",
				"icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-4.5"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

export type ButtonProps = ButtonPrimitive.Props &
	VariantProps<typeof buttonVariants> & {
		isLoading?: boolean;
		startIcon?: React.ReactNode;
		endIcon?: React.ReactNode;
	};

function Button({
	className,
	variant = "default",
	size = "default",
	isLoading = false,
	startIcon,
	endIcon,
	children,
	...props
}: ButtonProps) {
	return (
		<ButtonPrimitive
			data-slot="button"
			disabled={isLoading || props.disabled}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{isLoading && <Spinner className="absolute" />}
			{startIcon && (
				<span data-icon="inline-start" className={cn(isLoading && "opacity-0")}>
					{startIcon}
				</span>
			)}
			{/* TODO: Find a way to make children opacity 0 without using a span */}
			<span
				className={cn(
					isLoading && "opacity-0",
					"inline-flex items-center justify-center whitespace-nowrap"
				)}
			>
				{children}
			</span>
			{endIcon && (
				<span data-icon="inline-end" className={cn(isLoading && "opacity-0")}>
					{endIcon}
				</span>
			)}
		</ButtonPrimitive>
	);
}

export { Button, buttonVariants };
