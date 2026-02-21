import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/packages/design-system/lib/utils";

function Separator({
	className,
	orientation = "horizontal",
	...props
}: SeparatorPrimitive.Props) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(
				"shrink-0 rounded-full bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
				className
			)}
			{...props}
		/>
	);
}

export { Separator };
