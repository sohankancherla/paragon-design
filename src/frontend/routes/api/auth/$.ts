import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/packages/auth/server";

export const Route = createFileRoute("/api/auth/$")({
	server: {
		handlers: {
			ANY: ({ request }) => auth.handler(request)
		}
	}
});
