import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/frontend/routes/(home)/legal/privacy/content.mdx";

export const Route = createFileRoute("/(home)/legal/privacy/")({
	component: PrivacyPage
});

function PrivacyPage() {
	return <Privacy />;
}
