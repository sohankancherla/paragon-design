import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DesignSidebar } from "@/frontend/routes/design/components/design-sidebar";
import { SidebarProvider } from "@/packages/design-system/components/ui/sidebar";

export const Route = createFileRoute("/design")({
	component: DesignLayout
});

function DesignLayout() {
	return (
		<SidebarProvider>
			<DesignSidebar />
			<Outlet />
		</SidebarProvider>
	);
}
