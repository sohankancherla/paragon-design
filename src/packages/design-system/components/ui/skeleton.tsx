import { cn } from "@/packages/design-system/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("animate-pulse rounded-sm bg-muted", className)}
			{...props}
		/>
	);
}

export { Skeleton };
