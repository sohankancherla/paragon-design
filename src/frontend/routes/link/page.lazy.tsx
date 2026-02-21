import { createLazyFileRoute } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Example, ExampleWrapper } from "@/frontend/components/example";
import { Link } from "@/packages/design-system/components/ui/link";

export const Route = createLazyFileRoute("/link/")({
	component: LinkPage
});

function LinkPage() {
	return (
		<ExampleWrapper title="Link">
			<LinkVariantsAndSizes />
		</ExampleWrapper>
	);
}

function LinkVariantsAndSizes() {
	return (
		<Example title="Variants & Sizes">
			<div className="flex flex-wrap items-center gap-2">
				<Link
					to="/"
					variant="default"
					size="3xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="secondary"
					size="3xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="outline"
					size="3xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="ghost" size="3xs" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link
					to="/"
					variant="destructive"
					size="3xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="link-underline" size="3xs">
					Learn more
				</Link>
				<Link
					to="/"
					variant="link-foreground"
					size="3xs"
					className="text-muted-foreground"
				>
					Learn more
				</Link>
				<Link to="/" variant="link-secondary-underline" size="3xs">
					Learn more
				</Link>
				<Link to="/" variant="link-secondary" size="3xs">
					Learn more
				</Link>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Link
					to="/"
					variant="default"
					size="2xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="secondary"
					size="2xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="outline"
					size="2xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="ghost" size="2xs" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link
					to="/"
					variant="destructive"
					size="2xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="link-underline" size="2xs">
					Learn more
				</Link>
				<Link
					to="/"
					variant="link-foreground"
					size="2xs"
					className="text-muted-foreground"
				>
					Learn more
				</Link>
				<Link to="/" variant="link-secondary-underline" size="2xs">
					Learn more
				</Link>
				<Link to="/" variant="link-secondary" size="2xs">
					Learn more
				</Link>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Link
					to="/"
					variant="default"
					size="xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="secondary"
					size="xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="outline"
					size="xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="ghost" size="xs" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link
					to="/"
					variant="destructive"
					size="xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="link-underline" size="xs">
					Learn more
				</Link>
				<Link
					to="/"
					variant="link-foreground"
					size="xs"
					className="text-muted-foreground"
				>
					Learn more
				</Link>
				<Link to="/" variant="link-secondary-underline" size="xs">
					Learn more
				</Link>
				<Link to="/" variant="link-secondary" size="xs">
					Learn more
				</Link>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Link
					to="/"
					variant="default"
					size="sm"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="secondary"
					size="sm"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="outline"
					size="sm"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="ghost" size="sm" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link
					to="/"
					variant="destructive"
					size="sm"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="link-underline" size="sm">
					Learn more
				</Link>
				<Link
					to="/"
					variant="link-foreground"
					size="sm"
					className="text-muted-foreground"
				>
					Learn more
				</Link>
				<Link to="/" variant="link-secondary-underline" size="sm">
					Learn more
				</Link>
				<Link to="/" variant="link-secondary" size="sm">
					Learn more
				</Link>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Link to="/" variant="default" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link to="/" variant="secondary" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link to="/" variant="outline" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link to="/" variant="ghost" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link to="/" variant="destructive" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link to="/" variant="link-underline">
					Learn more
				</Link>
				<Link
					to="/"
					variant="link-foreground"
					className="text-muted-foreground"
				>
					Learn more
				</Link>
				<Link to="/" variant="link-secondary-underline">
					Learn more
				</Link>
				<Link to="/" variant="link-secondary">
					Learn more
				</Link>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Link
					to="/"
					variant="default"
					size="lg"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="secondary"
					size="lg"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link
					to="/"
					variant="outline"
					size="lg"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="ghost" size="lg" startIcon={<ChevronLeftIcon />}>
					Back to app
				</Link>
				<Link
					to="/"
					variant="destructive"
					size="lg"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
				<Link to="/" variant="link-underline" size="lg">
					Learn more
				</Link>
				<Link
					to="/"
					variant="link-foreground"
					size="lg"
					className="text-muted-foreground"
				>
					Learn more
				</Link>
				<Link to="/" variant="link-secondary-underline" size="lg">
					Learn more
				</Link>
				<Link to="/" variant="link-secondary" size="lg">
					Learn more
				</Link>
			</div>
		</Example>
	);
}
