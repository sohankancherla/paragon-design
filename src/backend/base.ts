import { os } from "@orpc/server";

export const base = os.$context<{ headers: Headers }>().errors({
	BAD_REQUEST: {
		status: 400,
		message: "Bad request. Please check the request body."
	},
	UNAUTHORIZED: {
		status: 401,
		message: "User is not authenticated"
	},
	FORBIDDEN: {
		status: 403,
		message: "User does not have access to this resource"
	},
	NOT_FOUND: {
		status: 404,
		message: "Resource not found"
	},
	TOO_MANY_REQUESTS: {
		status: 429,
		message: "Rate limit exceeded. Please wait a moment before trying again."
	},
	INTERNAL_SERVER_ERROR: {
		status: 500,
		message: "Internal server error"
	}
});
