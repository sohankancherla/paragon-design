import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/legal/")({
	beforeLoad: () => {
		throw redirect({ to: "/legal/terms" });
	}
});
