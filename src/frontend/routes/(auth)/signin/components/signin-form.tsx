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
import { Link } from "@/packages/design-system/components/ui/link";

const signInSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(1, "Please enter your password")
});

const FALLBACK_ERROR_MESSAGE =
	"Something unexpected happened. Please try again or contact support if the problem persists.";

const signInRoute = getRouteApi("/(auth)/signin/");

export function SigninForm() {
	const navigate = useNavigate();

	const { error: confirmEmailError } = signInRoute.useSearch();

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const { setEmail } = useAuthStore();

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: ""
		},
		validationLogic: revalidateLogic({
			mode: "submit",
			modeAfterSubmission: "change"
		}),
		validators: {
			onDynamic: signInSchema
		},
		onSubmit: ({ value }) => {
			startTransition(async () => {
				await authClient.signIn.email(
					{
						email: value.email,
						password: value.password,
						rememberMe: true,
						callbackURL: "/calendar"
					},
					{
						onError: async ctx => {
							if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
								await authClient.sendVerificationEmail({
									email: value.email,
									callbackURL: "/welcome"
								});
								setEmail(value.email);
								navigate({ to: "/verify-email" });
							} else {
								setError(
									errorMap[
										ctx.error.code?.toUpperCase() as keyof typeof errorMap
									] || FALLBACK_ERROR_MESSAGE
								);
							}
						}
					}
				);
			});
		}
	});

	return (
		<>
			{(error || confirmEmailError) && (
				<Alert variant="destructive">
					<CircleAlertIcon />
					<AlertDescription>
						{error
							? error
							: errorMap[
									confirmEmailError?.toUpperCase() as keyof typeof errorMap
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
					<form.AppField
						name="password"
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<div className="flex items-center justify-between">
										<FieldLabel htmlFor={field.name}>Password</FieldLabel>
										<Link
											to="/forgot-password"
											variant="link-underline"
											className="text-muted-foreground"
										>
											Forgot password?
										</Link>
									</div>
									<field.PasswordField />
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
					<form.AppForm>
						<form.SubmitButton isLoading={isPending}>Sign in</form.SubmitButton>
					</form.AppForm>
				</FieldGroup>
			</form>
		</>
	);
}
