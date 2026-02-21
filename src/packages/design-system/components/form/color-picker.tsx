import { useFieldContext } from "@/packages/design-system/components/form/form";
import type { ColorPickerProps } from "@/packages/design-system/components/ui/color-picker";
import { ColorPicker as ColorPickerPrimitive } from "@/packages/design-system/components/ui/color-picker";

export function ColorPicker({ ...props }: ColorPickerProps) {
	const field = useFieldContext<string>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<ColorPickerPrimitive
			id={field.name}
			name={field.name}
			value={field.state.value}
			onValueChange={field.handleChange}
			onBlur={field.handleBlur}
			aria-invalid={isInvalid}
			{...props}
		/>
	);
}
