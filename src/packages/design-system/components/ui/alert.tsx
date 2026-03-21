import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/packages/design-system/lib/utils";

const alertVariants = cva(
	"group/alert relative grid w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 has-data-[slot=alert-action]:pr-18 *:[svg:not([class*='size-'])]:size-4 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current",
	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				info: "border-sky-500/30 bg-sky-500/10 text-sky-900 dark:text-sky-200 [&>svg]:text-sky-500",
				success:
					"border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 [&>svg]:text-emerald-500",
				warning:
					"border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 [&>svg]:text-amber-500",
				destructive:
					"border-destructive-500/30 bg-destructive-500/10 text-destructive-900 dark:text-destructive-200 [&>svg]:text-destructive-500"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
				className
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"text-balance text-sm md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
				className
			)}
			{...props}
		/>
	);
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-action"
			className={cn("absolute top-2.5 right-3", className)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
