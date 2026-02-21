import { ChevronLeftIcon } from "lucide-react";
import { Link } from "@/packages/design-system/components/ui/link";
import { ParagonAbstract } from "@/packages/design-system/icons/paragon-abstract";

export function NotFound() {
	return (
		<main className="large-container flex flex-col items-center justify-center">
			<ParagonAbstract className="size-10" aria-hidden />
			<h1 className="display-1 mt-10">Page not found.</h1>
			<p className="mt-2 text-lg text-muted-foreground">
				Sorry, we can't find the page you're looking for.
			</p>
			<Link
				to="/"
				variant="default"
				startIcon={<ChevronLeftIcon className="size-5" aria-hidden />}
				className="mt-10"
			>
				Back to home
			</Link>
		</main>
	);
}
