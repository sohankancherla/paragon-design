import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";
import { DesignSidebar } from "@/frontend/routes/components/design-sidebar";
import { SidebarProvider } from "@/packages/design-system/components/ui/sidebar";
import { Toaster } from "@/packages/design-system/components/ui/sonner";

import styles from "@/packages/design-system/styles/globals.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: () => ({
			meta: [
				{
					charSet: "utf-8"
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				},
				{
					title: "Paragon - The Calendar Built for the AI Era",
					description:
						"Paragon is an AI-powered calendar that brings tasks, reminders, scheduling links, and integrations into one place."
				}
			],
			links: [
				{
					rel: "stylesheet",
					href: styles
				}
			]
		}),

		shellComponent: RootDocument
	}
);

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-svh">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<DesignSidebar />
						{children}
						<Toaster richColors />
					</SidebarProvider>
				</ThemeProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right"
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />
						},
						{
							name: "Tanstack Query",
							render: <ReactQueryDevtools />
						},
						formDevtoolsPlugin()
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
