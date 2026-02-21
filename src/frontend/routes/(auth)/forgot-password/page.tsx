import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import z from "zod";
import { guestRouteMiddleware } from "@/frontend/middleware/auth";
import { ForgotPasswordForm } from "@/frontend/routes/(auth)/forgot-password/components/forgot-password-form";
import { Link } from "@/packages/design-system/components/ui/link";
import { ParagonAbstract } from "@/packages/design-system/icons/paragon-abstract";

const resetPasswordSearchSchema = z.object({
	error: z.string().optional()
});

export const Route = createFileRoute("/(auth)/forgot-password/")({
	component: ForgotPasswordPage,
	server: {
		middleware: [guestRouteMiddleware]
	},
	validateSearch: resetPasswordSearchSchema
});

function ForgotPasswordPage() {
	return (
		<>
			<Link
				to="/signin"
				variant="link-foreground"
				startIcon={<ArrowLeftIcon />}
				className="absolute top-6 left-6 text-muted-foreground text-sm! sm:top-8 sm:left-8"
			>
				Back to sign in
			</Link>
			<div className="w-full max-w-md space-y-8">
				<ParagonAbstract className="mb-10 size-8" />

				<h1 className="header-2 mb-1">Forgot your password?</h1>
				<p className="text-muted-foreground text-sm">
					Enter your email address and we&apos;ll send you a reset link
				</p>

				<ForgotPasswordForm />
			</div>
		</>
	);
}
