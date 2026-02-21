import { createFileRoute, redirect } from "@tanstack/react-router";
import { MailCheckIcon } from "lucide-react";
import { guestRouteMiddleware } from "@/frontend/middleware/auth";
import { useAuthStore } from "@/frontend/stores/auth-store";
import { Link } from "@/packages/design-system/components/ui/link";

export const Route = createFileRoute("/(auth)/forgot-password/sent/")({
	component: ForgotPasswordSentPage,
	server: {
		middleware: [guestRouteMiddleware]
	},
	beforeLoad: () => {
		const resetPasswordEmail = useAuthStore.getState().resetPasswordEmail;

		if (!resetPasswordEmail) {
			throw redirect({ to: "/forgot-password" });
		}

		return { resetPasswordEmail };
	}
});

function ForgotPasswordSentPage() {
	const { resetPasswordEmail } = Route.useRouteContext();

	return (
		<div className="w-full max-w-md space-y-8">
			<MailCheckIcon className="mb-10 size-10 text-emerald-500" />

			<h1 className="header-2 mb-2">Reset password link sent</h1>
			<p className="text-base text-muted-foreground">
				If an account is associated with <strong>{resetPasswordEmail}</strong>,
				you will receive an email with a link to reset your password.
			</p>

			<p className="font-medium text-muted-foreground text-sm">
				Wrong email?{" "}
				<Link to="/forgot-password" variant="link-underline">
					Change it here
				</Link>
			</p>
		</div>
	);
}
