import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { createContext, useContext, useMemo } from "react";
import { Button } from "@/packages/design-system/components/ui/button";
import { cn } from "@/packages/design-system/lib/utils";

type AlertDialogContextType = {
	size: "sm" | "default";
};

const AlertDialogContext = createContext<AlertDialogContextType>({
	size: "default"
});

export function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export function AlertDialogTrigger({
	...props
}: AlertDialogPrimitive.Trigger.Props) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

export function AlertDialogPortal({
	...props
}: AlertDialogPrimitive.Portal.Props) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	);
}

export function AlertDialogOverlay({
	className,
	...props
}: AlertDialogPrimitive.Backdrop.Props) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-slot="alert-dialog-overlay"
			className={cn(
				"data-open:fade-in-0 data-closed:fade-out-0 fixed inset-0 isolate z-50 bg-black/30 duration-100 data-closed:animate-out data-open:animate-in dark:bg-black/60",
				className
			)}
			{...props}
		/>
	);
}

const alertDialogContentVariants = cva(
	"group/alert-dialog-content data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-6 rounded-xl bg-background p-6 outline-none ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in",
	{
		variants: {
			size: {
				default: "max-w-xs sm:max-w-lg",
				sm: "max-w-xs"
			}
		},
		defaultVariants: {
			size: "default"
		}
	}
);

export function AlertDialogContent({
	size = "default",
	className,
	...props
}: AlertDialogPrimitive.Popup.Props &
	VariantProps<typeof alertDialogContentVariants>) {
	const value = useMemo<AlertDialogContextType>(
		() => ({ size: size ?? "default" }),
		[size]
	);

	return (
		<AlertDialogContext value={value}>
			<AlertDialogPortal>
				<AlertDialogOverlay />
				<AlertDialogPrimitive.Popup
					data-slot="alert-dialog-content"
					className={cn(alertDialogContentVariants({ size }), className)}
					{...props}
				/>
			</AlertDialogPortal>
		</AlertDialogContext>
	);
}

const alertDialogHeaderVariants = cva(
	"grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6",
	{
		variants: {
			size: {
				default:
					"sm:place-items-start sm:text-left sm:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
				sm: ""
			}
		},
		defaultVariants: {
			size: "default"
		}
	}
);

export function AlertDialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { size } = useContext(AlertDialogContext);

	return (
		<div
			data-slot="alert-dialog-header"
			className={cn(alertDialogHeaderVariants({ size }), className)}
			{...props}
		/>
	);
}

const alertDialogFooterVariants = cva(
	"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
	{
		variants: {
			size: {
				default: "",
				sm: "grid grid-cols-2"
			}
		},
		defaultVariants: {
			size: "default"
		}
	}
);

export function AlertDialogFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { size } = useContext(AlertDialogContext);

	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(alertDialogFooterVariants({ size }), className)}
			{...props}
		/>
	);
}

const alertDialogMediaVariants = cva(
	"mb-4 inline-flex size-12 items-center justify-center rounded-md *:[svg:not([class*='size-'])]:size-6",
	{
		variants: {
			variant: {
				default: "bg-muted",
				destructive: "bg-destructive/10 text-destructive"
			},
			size: {
				default: "sm:row-span-2",
				sm: ""
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

export function AlertDialogMedia({
	variant = "default",
	className,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof alertDialogMediaVariants>) {
	const { size } = useContext(AlertDialogContext);

	return (
		<div
			data-slot="alert-dialog-media"
			className={cn(alertDialogMediaVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

const alertDialogTitleVariants = cva("font-medium text-base", {
	variants: {
		size: {
			default:
				"sm:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
			sm: ""
		}
	},
	defaultVariants: {
		size: "default"
	}
});

export function AlertDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
	const { size } = useContext(AlertDialogContext);

	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn(alertDialogTitleVariants({ size }), className)}
			{...props}
		/>
	);
}

export function AlertDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn(
				"text-balance text-muted-foreground text-sm md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className
			)}
			{...props}
		/>
	);
}

export function AlertDialogAction({
	className,
	...props
}: React.ComponentProps<typeof Button>) {
	return (
		<Button
			data-slot="alert-dialog-action"
			className={cn(className)}
			{...props}
		/>
	);
}

export function AlertDialogCancel({
	className,
	variant = "outline",
	size = "default",
	...props
}: AlertDialogPrimitive.Close.Props &
	Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
	return (
		<AlertDialogPrimitive.Close
			data-slot="alert-dialog-cancel"
			className={cn(className)}
			render={<Button variant={variant} size={size} />}
			{...props}
		/>
	);
}
