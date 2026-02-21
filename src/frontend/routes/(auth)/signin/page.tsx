import { Google } from "@ridemountainpig/svgl-react";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { guestRouteMiddleware } from "@/frontend/middleware/auth";
import { SigninForm } from "@/frontend/routes/(auth)/signin/components/signin-form";
import { Button } from "@/packages/design-system/components/ui/button";
import { FieldSeparator } from "@/packages/design-system/components/ui/field";
import { Link } from "@/packages/design-system/components/ui/link";
import { ParagonAbstract } from "@/packages/design-system/icons/paragon-abstract";

const confirmEmailSearchSchema = z.object({
	error: z.string().optional()
});

export const Route = createFileRoute("/(auth)/signin/")({
	component: SigninPage,
	server: {
		middleware: [guestRouteMiddleware]
	},
	validateSearch: confirmEmailSearchSchema
});

function SigninPage() {
	return (
		<div className="w-full max-w-md space-y-8">
			<ParagonAbstract className="mb-10 size-8" />

			<h1 className="header-2 mb-1">Sign in to Paragon</h1>
			<p className="text-muted-foreground text-sm">
				Don't have an account?{" "}
				<Link to="/signup" variant="link-underline">
					Sign up
				</Link>{" "}
				for a free trial.
			</p>

			<Button variant="outline" className="w-full" startIcon={<Google />}>
				Continue with Google
			</Button>

			<FieldSeparator>OR</FieldSeparator>

			<SigninForm />

			<p className="-mt-2 text-2xs text-muted-foreground">
				By signing in, you agree to our{" "}
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
