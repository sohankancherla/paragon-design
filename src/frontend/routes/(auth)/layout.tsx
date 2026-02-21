import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	component: AuthLayout
});

function AuthLayout() {
	return (
		<main className="large-container flex items-center justify-center">
			<Outlet />
		</main>
	);
}
