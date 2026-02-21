import { base } from "@/backend/base";
import { auth } from "@/packages/auth/server";

export const authMiddleware = base
	.$context<{ headers: Headers }>()
	.middleware(async ({ context, next, errors }) => {
		const session = await auth.api.getSession({
			headers: context.headers
		});

		if (!session) {
			throw errors.UNAUTHORIZED();
		}

		return next({
			context: {
				session: session.session,
				user: session.user
			}
		});
	});
