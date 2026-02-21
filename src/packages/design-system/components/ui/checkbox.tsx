import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/packages/design-system/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"peer relative flex size-4 shrink-0 items-center justify-center rounded-sm border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-secondary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-secondary data-disabled:pointer-events-none data-checked:border-secondary data-checked:bg-secondary data-checked:text-secondary-foreground data-disabled:opacity-50 dark:bg-input/30 dark:data-checked:bg-secondary dark:aria-invalid:border-destructive/80 dark:aria-invalid:ring-destructive/40",
				className
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="grid place-content-center text-current transition-none [&>svg]:size-3 [&>svg]:stroke-[2.5]"
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
