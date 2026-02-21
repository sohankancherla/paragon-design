import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/legal")({
	component: LegalLayout
});

function LegalLayout() {
	return (
		<main className="mdx-container typography">
			<Outlet />
		</main>
	);
}
