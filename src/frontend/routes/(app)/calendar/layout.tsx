import { createFileRoute, Outlet } from "@tanstack/react-router";
import { protectedRouteMiddleware } from "@/frontend/middleware/auth";
import { CalendarSidebar } from "@/frontend/routes/(app)/calendar/components/sidebar/calendar-sidebar";
import { SidebarProvider } from "@/packages/design-system/components/ui/sidebar";
import { orpc } from "@/packages/orpc/orpc";

export const Route = createFileRoute("/(app)/calendar")({
	component: CalendarLayout,
	server: {
		middleware: [protectedRouteMiddleware]
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			orpc.calendar.list.queryOptions({ input: {} })
		);
	}
});

function CalendarLayout() {
	return (
		<SidebarProvider>
			<CalendarSidebar />
			<Outlet />
		</SidebarProvider>
	);
}
