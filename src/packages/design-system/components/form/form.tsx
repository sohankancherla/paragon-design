import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { ColorPicker } from "@/packages/design-system/components/form/color-picker";
import { PasswordField } from "@/packages/design-system/components/form/password-field";
import { SubmitButton } from "@/packages/design-system/components/form/submit-button";
import { TextField } from "@/packages/design-system/components/form/text-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		PasswordField,
		ColorPicker
	},
	formComponents: {
		SubmitButton
	}
});
