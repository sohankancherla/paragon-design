import { useFieldContext } from "@/packages/design-system/components/form/form";
import {
	Input,
	type InputProps
} from "@/packages/design-system/components/ui/input";

export function TextField({ ...props }: InputProps) {
	const field = useFieldContext<string>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Input
			id={field.name}
			name={field.name}
			value={field.state.value}
			onBlur={field.handleBlur}
			onChange={e => field.handleChange(e.target.value)}
			aria-invalid={isInvalid}
			{...props}
		/>
	);
}
