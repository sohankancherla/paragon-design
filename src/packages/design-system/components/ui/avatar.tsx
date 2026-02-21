import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { Image } from "@unpic/react";
import type * as React from "react";
import { IconEmptyCompany } from "@/packages/design-system/icons/empty-company";
import { cn } from "@/packages/design-system/lib/utils";

function Avatar({
	className,
	size = "default",
	...props
}: AvatarPrimitive.Root.Props & {
	size?: "default" | "xs" | "sm" | "lg";
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(
				"group/avatar relative flex size-8 shrink-0 select-none rounded-full after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-9 data-[size=sm]:size-7 data-[size=xs]:size-6 dark:after:mix-blend-lighten",
				className
			)}
			{...props}
		/>
	);
}

function AvatarImage({
	className,
	src,
	alt,
	...props
}: Omit<AvatarPrimitive.Image.Props, "src"> & {
	src: string;
	alt: string;
}) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(
				"aspect-square size-full rounded-full object-cover",
				className
			)}
			src={src}
			alt={alt}
			render={renderProps => (
				<Image
					{...renderProps}
					src={src}
					alt={alt}
					layout="constrained"
					width={72}
					height={72}
				/>
			)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	...props
}: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm group-data-[size=sm]/avatar:text-xs group-data-[size=xs]/avatar:text-3xs",
				className
			)}
			{...props}
		/>
	);
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(
				"absolute right-0 bottom-0 z-10 inline-flex select-none items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background",
				"group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden",
				"group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
				"group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
				"group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
				className
			)}
			{...props}
		/>
	);
}

function AvatarBrandLogo({
	src,
	alt = "Company logo",
	className,
	...props
}: React.ComponentProps<"span"> & {
	src: string;
	alt?: string;
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar-logo"
			className={cn(
				"absolute right-0 bottom-0 z-10 inline-flex select-none items-center justify-center overflow-hidden rounded-full bg-background ring-2 ring-background",
				"group-data-[size=xs]/avatar:size-2.5",
				"group-data-[size=sm]/avatar:size-3",
				"group-data-[size=default]/avatar:size-3.5",
				"group-data-[size=lg]/avatar:size-4",
				className
			)}
			{...props}
		>
			<AvatarPrimitive.Image
				src={src}
				alt={alt}
				className="pointer-events-none aspect-square size-full rounded-full object-cover"
				render={renderProps => (
					<Image
						{...renderProps}
						src={src}
						alt={alt}
						layout="constrained"
						width={24}
						height={24}
					/>
				)}
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
				"relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-9 group-has-data-[size=sm]/avatar-group:size-7 group-has-data-[size=xs]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-xs group-has-data-[size=xs]/avatar-group:text-3xs [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-4.5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3.5 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3",
				className
			)}
			{...props}
		/>
	);
}

export {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarBadge,
	AvatarBrandLogo
};
