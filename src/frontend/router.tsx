import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { NotFound } from "@/frontend/not-found";
import { routeTree } from "@/frontend/routeTree.gen";

export function getRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 5000
			}
		}
	});

	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		context: {
			queryClient
		},
		defaultNotFoundComponent: () => {
			return <NotFound />;
		}
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});

	return router;
}
