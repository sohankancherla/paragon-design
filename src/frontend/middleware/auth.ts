import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/packages/auth/server";

export const protectedRouteMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		const session = await auth.api.getSession({ headers: request.headers });

		if (!session) {
			throw redirect({ to: "/signin" });
		}

		return await next();
	}
);

export const guestRouteMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		const session = await auth.api.getSession({ headers: request.headers });

		if (session) {
			throw redirect({ to: "/calendar" });
		}

		return await next();
	}
);
