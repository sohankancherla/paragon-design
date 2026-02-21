import { createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowLeftIcon, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { guestRouteMiddleware } from "@/frontend/middleware/auth";
import { ResetPasswordForm } from "@/frontend/routes/(auth)/reset-password/components/reset-password-form";
import { Link } from "@/packages/design-system/components/ui/link";
import { ParagonAbstract } from "@/packages/design-system/icons/paragon-abstract";

const resetPasswordSearchSchema = z.object({
	token: z.string().optional(),
	error: z.string().optional()
});

export const Route = createFileRoute("/(auth)/reset-password/")({
	component: ResetPasswordPage,
	server: {
		middleware: [guestRouteMiddleware]
	},
	validateSearch: resetPasswordSearchSchema,
	beforeLoad: ({ search }) => {
		const { token, error } = search;

		if (error) {
			throw redirect({ to: "/forgot-password", search: { error } });
		}

		if (!token) {
			throw redirect({ to: "/forgot-password" });
		}
	}
});

function ResetPasswordPage() {
	const [isPasswordReset, setIsPasswordReset] = useState(false);

	if (isPasswordReset) {
		return (
			<div className="w-full max-w-md space-y-8">
				<LockKeyholeIcon className="mb-10 size-10 text-emerald-500" />

				<h1 className="header-2 mb-2">Password updated</h1>
				<p className="text-base text-muted-foreground">
					Your password has been updated successfully. You can now sign in with
					your new password.
				</p>

				<Link to="/signin" variant="default" startIcon={<ArrowLeftIcon />}>
					Back to sign in
				</Link>
			</div>
		);
	}

	return (
		<>
			<Link
				to="/signin"
				variant="link-foreground"
				startIcon={<ArrowLeftIcon />}
				className="absolute top-6 left-6 gap-1 text-muted-foreground text-sm! sm:top-8 sm:left-8"
			>
				Back to sign in
			</Link>
			<div className="w-full max-w-md space-y-8">
				<ParagonAbstract className="mb-10 size-8" />

				<h1 className="header-2 mb-1">Reset your password</h1>
				<p className="text-muted-foreground text-sm">
					Enter and confirm your new password
				</p>

				<ResetPasswordForm setIsPasswordReset={setIsPasswordReset} />
			</div>
		</>
	);
}
