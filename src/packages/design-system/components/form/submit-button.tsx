import { useFormContext } from "@/packages/design-system/components/form/form";
import {
	Button,
	type ButtonProps
} from "@/packages/design-system/components/ui/button";
import { cn } from "@/packages/design-system/lib/utils";

export function SubmitButton({
	className,
	children,
	...props
}: Omit<ButtonProps, "type">) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={state => state.canSubmit}
			children={canSubmit => (
				<Button
					type="submit"
					className={cn("mt-2 w-full", className)}
					disabled={!canSubmit}
					{...props}
				>
					{children}
				</Button>
			)}
		/>
	);
}
