import { cn } from "@/packages/design-system/lib/utils";

function ExampleWrapper({
	title,
	className,
	children,
	...props
}: React.ComponentProps<"div"> & { title: string }) {
	return (
		<main
			data-slot="example-wrapper"
			className={cn(
				"mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pt-16 pb-10 2xl:max-w-6xl",

				className
			)}
			{...props}
		>
			<h1 className="header-1">{title}</h1>
			{children}
		</main>
	);
}

function Example({
	title,
	children,
	className,
	containerClassName,
	...props
}: React.ComponentProps<"div"> & {
	title: string;
	containerClassName?: string;
}) {
	return (
		<div
			data-slot="example"
			className={cn("flex w-full flex-col gap-1", containerClassName)}
			{...props}
		>
			<div className="px-1.5 py-2 font-medium text-muted-foreground text-xs">
				{title}
			</div>
			<div
				data-slot="example-content"
				className={cn(
					"flex min-w-0 flex-1 flex-col items-start gap-6 border border-dashed bg-background p-4 text-foreground sm:p-6 *:[div:not([class*='w-'])]:w-full",
					className
				)}
			>
				{children}
			</div>
		</div>
	);
}

export { ExampleWrapper, Example };
