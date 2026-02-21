import { getRouteApi } from "@tanstack/react-router";
import { CircleAlertIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { z } from "zod";
import { authClient } from "@/packages/auth/client";
import { errorMap } from "@/packages/auth/utils";
import { useAppForm } from "@/packages/design-system/components/form/form";
import {
	Alert,
	AlertDescription
} from "@/packages/design-system/components/ui/alert";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel
} from "@/packages/design-system/components/ui/field";

const resetPasswordSchema = z.object({
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[a-z]/, "Password must include a lowercase letter")
		.regex(/[A-Z]/, "Password must include an uppercase letter")
		.regex(/[0-9]/, "Password must include a number")
		.regex(
			/[!@#$%^&*(),.?":{}|<>]/,
			"Password must include a special character"
		),
	confirmPassword: z.string()
});

const FALLBACK_ERROR_MESSAGE =
	"Something unexpected happened. Please try again or contact support if the problem persists.";

const resetPasswordRoute = getRouteApi("/(auth)/reset-password/");

export function ResetPasswordForm({
	setIsPasswordReset
}: {
	setIsPasswordReset: (isPasswordReset: boolean) => void;
}) {
	const { token } = resetPasswordRoute.useSearch();

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const form = useAppForm({
		defaultValues: {
			newPassword: "",
			confirmPassword: ""
		},
		onSubmit: ({ value }) => {
			startTransition(async () => {
				await authClient.resetPassword(
					{
						newPassword: value.newPassword,
						token
					},
					{
						onSuccess: () => {
							setIsPasswordReset(true);
						},
						onError: ctx => {
							setError(
								errorMap[ctx.error.code as keyof typeof errorMap] ||
									FALLBACK_ERROR_MESSAGE
							);
						}
					}
				);
			});
		}
	});

	return (
		<>
			{error && (
				<Alert variant="destructive">
					<CircleAlertIcon />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<form
				noValidate
				onSubmit={e => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<form.AppField
						name="newPassword"
						validators={{
							onChange: resetPasswordSchema.shape.newPassword
						}}
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>New password</FieldLabel>
									<field.PasswordField autoComplete="new-password" />
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
					<form.AppField
						name="confirmPassword"
						validators={{
							onChangeListenTo: ["newPassword"],
							onSubmit: ({ value, fieldApi }) => {
								const newPassword = fieldApi.form.getFieldValue("newPassword");
								if (value !== newPassword) {
									return { message: "Passwords do not match" };
								}
							}
						}}
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
									<field.PasswordField autoComplete="new-password" />
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
					<form.AppForm>
						<form.SubmitButton isLoading={isPending}>
							Reset password
						</form.SubmitButton>
					</form.AppForm>
				</FieldGroup>
			</form>
		</>
	);
}
