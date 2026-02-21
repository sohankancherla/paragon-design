import { revalidateLogic } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { capitalCase } from "change-case";
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

const signUpSchema = z.object({
	firstName: z.string().trim().min(1, "Please enter your first name"),
	lastName: z.string().trim().min(1, "Please enter your last name"),
	email: z.email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[a-z]/, "Password must include a lowercase letter")
		.regex(/[A-Z]/, "Password must include an uppercase letter")
		.regex(/[0-9]/, "Password must include a number")
		.regex(
			/[!@#$%^&*(),.?":{}|<>]/,
			"Password must include a special character"
		)
});

const FALLBACK_ERROR_MESSAGE =
	"Something unexpected happened. Please try again or contact support if the problem persists.";

export function SignupForm() {
	const navigate = useNavigate();

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const { setEmail } = useAuthStore();

	const form = useAppForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: ""
		},
		validationLogic: revalidateLogic({
			mode: "submit",
			modeAfterSubmission: "change"
		}),
		onSubmit: ({ value }) => {
			startTransition(async () => {
				await authClient.signUp.email(
					{
						name: `${capitalCase(value.firstName.trim())} ${capitalCase(value.lastName.trim())}`,
						email: value.email,
						timezone: "Auto",
						password: value.password,
						callbackURL: "/welcome"
					},
					{
						onSuccess: () => {
							setEmail(value.email);
							navigate({ to: "/verify-email" });
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
					<div className="grid grid-cols-2 gap-4">
						<form.AppField
							name="firstName"
							validators={{
								onDynamic: signUpSchema.shape.firstName
							}}
							children={field => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>First name</FieldLabel>
										<field.TextField
											type="text"
											autoComplete="given-name"
											maxLength={32}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.AppField
							name="lastName"
							validators={{
								onDynamic: signUpSchema.shape.lastName
							}}
							children={field => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Last name</FieldLabel>
										<field.TextField
											type="text"
											autoComplete="family-name"
											maxLength={32}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</div>
					<form.AppField
						name="email"
						validators={{
							onDynamic: signUpSchema.shape.email
						}}
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
						validators={{
							onChange: signUpSchema.shape.password
						}}
						children={field => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<field.PasswordField />
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
					<form.AppForm>
						<form.SubmitButton isLoading={isPending}>Sign up</form.SubmitButton>
					</form.AppForm>
				</FieldGroup>
			</form>
		</>
	);
}
