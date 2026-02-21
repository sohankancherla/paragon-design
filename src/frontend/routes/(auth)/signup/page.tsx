import { Google } from "@ridemountainpig/svgl-react";
import { createFileRoute } from "@tanstack/react-router";
import { guestRouteMiddleware } from "@/frontend/middleware/auth";
import { SignupForm } from "@/frontend/routes/(auth)/signup/components/signup-form";
import { Button } from "@/packages/design-system/components/ui/button";
import { FieldSeparator } from "@/packages/design-system/components/ui/field";
import { Link } from "@/packages/design-system/components/ui/link";
import { ParagonAbstract } from "@/packages/design-system/icons/paragon-abstract";

export const Route = createFileRoute("/(auth)/signup/")({
	component: SignupPage,
	server: {
		middleware: [guestRouteMiddleware]
	}
});

function SignupPage() {
	return (
		<div className="w-full max-w-md space-y-8">
			<ParagonAbstract className="mb-10 size-8" />

			<h1 className="header-2 mb-1">Welcome to Paragon</h1>
			<p className="text-muted-foreground text-sm">
				Already registered?{" "}
				<Link to="/signin" variant="link-underline">
					Sign in
				</Link>{" "}
				to your account.
			</p>

			<Button variant="outline" className="w-full" startIcon={<Google />}>
				Continue with Google
			</Button>

			<FieldSeparator>OR</FieldSeparator>

			<SignupForm />

			<p className="-mt-2 text-2xs text-muted-foreground">
				By signing up, you agree to our{" "}
				<Link
					to="/legal/terms"
					variant="link-underline"
					rel="noopener noreferrer"
					target="_blank"
				>
					Terms of Service
				</Link>{" "}
				and{" "}
				<Link
					to="/legal/privacy"
					variant="link-underline"
					rel="noopener noreferrer"
					target="_blank"
				>
					Privacy Policy
				</Link>
				.
			</p>
		</div>
	);
}
