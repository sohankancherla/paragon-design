import type { User } from "better-auth";
import { base } from "@/backend/base";

// const aj = arcjet
// 	.withRule(
// 		detectBot({
// 			mode: "LIVE",
// 			allow: []
// 		})
// 	)
// 	.withRule(
// 		tokenBucket({
// 			mode: "LIVE",
// 			characteristics: ["userId"],
// 			refillRate: 100,
// 			interval: 60,
// 			capacity: 120
// 		})
// 	);

export const securityMiddleware = base
	.$context<{ headers: Headers; user: User }>()
	.middleware(({ next }) => {
		// const request = getArcjetRequest();

		// const decision = await aj.protect(request, {
		// 	userId: context.user.id,
		// 	requested: 1
		// });

		// if (decision.isDenied()) {
		// 	if (decision.reason.isShield()) {
		// 		throw errors.FORBIDDEN({
		// 			message: "Access denied. Detected suspicious activity."
		// 		});
		// 	}

		// 	if (decision.reason.isBot()) {
		// 		throw errors.FORBIDDEN();
		// 	}

		// 	if (decision.reason.isRateLimit()) {
		// 		throw errors.TOO_MANY_REQUESTS({
		// 			data: { reset: decision.reason.reset }
		// 		});
		// 	}

		// 	throw errors.INTERNAL_SERVER_ERROR();
		// }

		return next();
	});
