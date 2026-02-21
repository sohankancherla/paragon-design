import { createLazyFileRoute } from "@tanstack/react-router";
import { ParagonAbstract } from "@/packages/design-system/icons/paragon-abstract";

export const Route = createLazyFileRoute("/")({
	component: DesignPage
});

function DesignPage() {
	return (
		<main className="mx-auto flex flex-col items-center justify-center gap-12 px-8">
			<ParagonAbstract className="size-14" />
			<h1 className="display-2">The Paragon Design System</h1>
		</main>
	)
}
