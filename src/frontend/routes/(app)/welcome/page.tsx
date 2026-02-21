import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import { protectedRouteMiddleware } from "@/frontend/middleware/auth";

const confirmEmailSearchSchema = z.object({
	error: z.string().optional()
});

export const Route = createFileRoute("/(app)/welcome/")({
	component: WelcomePage,
	server: {
		middleware: [protectedRouteMiddleware]
	},
	validateSearch: confirmEmailSearchSchema,
	beforeLoad: ({ search }) => {
		const { error } = search;

		if (error) {
			throw redirect({ to: "/signin", search: { error } });
		}
	}
});

function WelcomePage() {
	return <div>Hello "/(app)/welcome/"!</div>;
}
