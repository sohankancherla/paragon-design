import { createFileRoute } from "@tanstack/react-router";
import Cookies from "@/frontend/routes/(home)/legal/cookies/content.mdx";

export const Route = createFileRoute("/(home)/legal/cookies/")({
	component: CookiesPage
});

function CookiesPage() {
	return <Cookies />;
}
