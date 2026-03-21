import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { createContext, useContext, useMemo } from "react";
import { IconEmptyCompany } from "@/packages/design-system/icons/empty-company";
import { cn } from "@/packages/design-system/lib/utils";

type AvatarContextType = {
	size: "xs" | "sm" | "default" | "lg";
};

const AvatarContext = createContext<AvatarContextType>({
	size: "default"
});

const avatarVariants = cva(
	"group/avatar relative flex shrink-0 select-none rounded-full after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
	{
		variants: {
			size: {
				default: "size-8",
				xs: "size-6",
				sm: "size-7",
				lg: "size-9"
			}
		},
		defaultVariants: {
			size: "default"
		}
	}
);

function Avatar({
	className,
	size = "default",
	...props
}: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
	const value = useMemo<AvatarContextType>(
		() => ({ size: size ?? "default" }),
		[size]
	);

	return (
		<AvatarContext value={value}>
			<AvatarPrimitive.Root
				data-slot="avatar"
				data-size={size}
				className={cn(avatarVariants({ size }), className)}
				{...props}
			/>
		</AvatarContext>
	);
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(
				"aspect-square size-full rounded-full object-cover",
				className
			)}
			{...props}
		/>
	);
}

const avatarFallbackVariants = cva(
	"flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground",
	{
		variants: {
			size: {
				default: "text-sm",
				xs: "text-2xs",
				sm: "text-xs",
				lg: "text-sm"
			}
		},
		defaultVariants: {
			size: "default"
		}
	}
);

function AvatarFallback({
	className,
	...props
}: AvatarPrimitive.Fallback.Props) {
	const { size } = useContext(AvatarContext);

	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(avatarFallbackVariants({ size }), className)}
			{...props}
		/>
	);
}

const avatarBadgeVariants = cva(
	"absolute right-0 bottom-0 z-10 inline-flex select-none items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background [&>svg]:stroke-[2.5]",
	{
		variants: {
			size: {
				default: "size-2.5 [&>svg]:size-2",
				xs: "size-1.5 [&>svg]:hidden",
				sm: "size-2 [&>svg]:size-1.5",
				lg: "size-3 [&>svg]:size-2"
			}
		},
		defaultVariants: {
			size: "default"
		}
	}
);

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
	const { size } = useContext(AvatarContext);

	return (
		<span
			data-slot="avatar-badge"
			className={cn(avatarBadgeVariants({ size }), className)}
			{...props}
		/>
	);
}

const avatarBrandLogoVariants = cva(
	"absolute right-0 bottom-0 z-10 inline-flex select-none items-center justify-center overflow-hidden rounded-full bg-background ring-2 ring-background",
	{
		variants: {
			size: {
				default: "size-3.5",
				xs: "size-2.5",
				sm: "size-3",
				lg: "size-4"
			}
		},
		defaultVariants: {
			size: "default"
		}
	}
);

function AvatarBrandLogo({ className, ...props }: AvatarPrimitive.Image.Props) {
	const { size } = useContext(AvatarContext);

	return (
		<AvatarPrimitive.Root
			data-slot="avatar-brand-logo"
			className={cn(avatarBrandLogoVariants({ size }), className)}
		>
			<AvatarPrimitive.Image
				data-slot="avatar-brand-image"
				className={cn(
					"aspect-square size-full rounded-full object-cover",
					className
				)}
				{...props}
			/>
			<AvatarPrimitive.Fallback className="flex size-full items-center justify-center">
				<IconEmptyCompany className="size-full" />
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
	);
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group"
			className={cn(
				"group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
				className
			)}
			{...props}
		/>
	);
}

function AvatarGroupCount({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group-count"
			className={cn(
				"relative flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background",
				"group-has-data-[size=xs]/avatar-group:size-6 group-has-data-[size=xs]/avatar-group:text-2xs group-has-data-[size=xs]/avatar-group:[&>svg]:size-3",
				"group-has-data-[size=sm]/avatar-group:size-7 group-has-data-[size=sm]/avatar-group:text-xs group-has-data-[size=sm]/avatar-group:[&>svg]:size-3.5",
				"group-has-data-[size=default]/avatar-group:size-8 group-has-data-[size=default]/avatar-group:text-sm group-has-data-[size=default]/avatar-group:[&>svg]:size-4",
				"group-has-data-[size=lg]/avatar-group:size-9 group-has-data-[size=lg]/avatar-group:text-sm group-has-data-[size=lg]/avatar-group:[&>svg]:size-4.5",
				className
			)}
			{...props}
		/>
	);
}

export {
	Avatar,
	AvatarBadge,
	AvatarBrandLogo,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage
};
