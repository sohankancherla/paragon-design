import { revalidateLogic } from "@tanstack/react-form";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { CircleAlertIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { z } from "zod";
import { useAuthStore } from "@/frontend/stores/auth-store";
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

const forgotPasswordSchema = z.object({
	email: z.email("Please enter a valid email address")
});

const FALLBACK_ERROR_MESSAGE =
	"Something unexpected happened. Please try again or contact support if the problem persists.";

const forgotPasswordRoute = getRouteApi("/(auth)/forgot-password/");

export function ForgotPasswordForm() {
	const navigate = useNavigate();

	const { error: resetPasswordError } = forgotPasswordRoute.useSearch();

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const { setResetPasswordEmail } = useAuthStore();

	const form = useAppForm({
		defaultValues: {
			email: ""
		},
		validationLogic: revalidateLogic({
			mode: "submit",
			modeAfterSubmission: "change"
		}),
		validators: {
			onDynamic: forgotPasswordSchema
		},
		onSubmit: ({ value }) => {
			startTransition(async () => {
				await authClient.requestPasswordReset(
					{
						email: value.email,
						redirectTo: "/reset-password"
					},
					{
						onSuccess: () => {
							setResetPasswordEmail(value.email);
							navigate({ to: "/forgot-password/sent" });
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
			{(error || resetPasswordError) && (
				<Alert variant="destructive">
					<CircleAlertIcon />
					<AlertDescription>
						{error
							? error
							: errorMap[
									resetPasswordError?.toUpperCase() as keyof typeof errorMap
								] || FALLBACK_ERROR_MESSAGE}
					</AlertDescription>
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
						name="email"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Email address</FieldLabel>
									<field.TextField
										type="email"
										autoComplete="email"
										maxLength={255}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
					<form.AppForm>
						<form.SubmitButton isLoading={isPending}>
							Send link
						</form.SubmitButton>
					</form.AppForm>
				</FieldGroup>
			</form>
		</>
	);
}
