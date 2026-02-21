import { createFileRoute } from "@tanstack/react-router";
import Terms from "@/frontend/routes/(home)/legal/terms/content.mdx";

export const Route = createFileRoute("/(home)/legal/terms/")({
	component: TermsPage
});

function TermsPage() {
	return <Terms />;
}
