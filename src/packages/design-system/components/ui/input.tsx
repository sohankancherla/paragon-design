import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/packages/design-system/lib/utils";

export const inputVariants = cva(
	"w-full min-w-0 rounded-md border bg-transparent outline-none transition-colors file:inline-flex file:h-6.5 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/80 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80 dark:focus-visible:border-ring",
	{
		variants: {
			variant: {
				default: "border-input dark:bg-input/30",
				ghost:
					"border-transparent hover:border-input focus:border-transparent focus:bg-muted focus-visible:border-transparent focus-visible:ring-0 dark:focus-visible:border-transparent"
			},
			size: {
				default: "h-9 px-2.5 py-1 text-base md:text-sm",
				sm: "h-8 px-2 py-1 text-sm md:text-xs",
				lg: "h-10 px-3 py-2.5 text-base md:text-sm"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

export type InputProps = Omit<ComponentProps<"input">, "size"> &
	VariantProps<typeof inputVariants>;

function Input({
	className,
	type,
	variant = "default",
	size = "default",
	...props
}: InputProps) {
	return (
		<InputPrimitive
			type={type}
			data-slot="input"
			className={cn(inputVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Input };
