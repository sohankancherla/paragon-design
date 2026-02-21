import { createFileRoute, redirect } from "@tanstack/react-router";
import { MailCheckIcon } from "lucide-react";
import { guestRouteMiddleware } from "@/frontend/middleware/auth";
import { useAuthStore } from "@/frontend/stores/auth-store";
import { Link } from "@/packages/design-system/components/ui/link";

export const Route = createFileRoute("/(auth)/verify-email/")({
	component: VerifyEmailPage,
	server: {
		middleware: [guestRouteMiddleware]
	},
	beforeLoad: () => {
		const email = useAuthStore.getState().email;

		if (!email) {
			throw redirect({ to: "/signup" });
		}

		return { email };
	}
});

function VerifyEmailPage() {
	const { email } = Route.useRouteContext();

	return (
		<div className="w-full max-w-md space-y-8">
			<MailCheckIcon className="mb-10 size-10 text-emerald-500" />

			<h1 className="header-2 mb-2">Verify your email</h1>
			<p className="text-base text-muted-foreground">
				An email was sent out to <strong>{email}</strong>, please check your
				inbox for a link to verify your email address.
			</p>

			<p className="font-medium text-muted-foreground text-sm">
				Wrong email?{" "}
				<Link to="/signup" variant="link-underline">
					Change it here
				</Link>
			</p>
		</div>
	);
}
