import { createLazyFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, ArrowUpRightIcon, BadgeCheckIcon } from "lucide-react";
import { Example, ExampleWrapper } from "@/frontend/components/example";
import { Badge } from "@/packages/design-system/components/ui/badge";
import { Spinner } from "@/packages/design-system/components/ui/spinner";

export const Route = createLazyFileRoute("/badge/")({
	component: BadgePage
});

function BadgePage() {
	return (
		<ExampleWrapper title="Badge">
			<BadgeVariants />
			<BadgeWithIconLeft />
			<BadgeWithIconRight />
			<BadgeWithSpinner />
			<BadgeAsLink />
			<BadgeLongText />
		</ExampleWrapper>
	);
}

function BadgeVariants() {
	return (
		<Example title="Variants">
			<div className="flex flex-wrap gap-2">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="destructive">Destructive</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="ghost">Ghost</Badge>
				<Badge variant="link">Link</Badge>
			</div>
		</Example>
	);
}

function BadgeWithIconLeft() {
	return (
		<Example title="Icon Left" className="max-w-fit">
			<div className="flex flex-wrap gap-2">
				<Badge startIcon={<BadgeCheckIcon />}>Default</Badge>
				<Badge variant="secondary" startIcon={<BadgeCheckIcon />}>
					Secondary
				</Badge>
				<Badge variant="info" startIcon={<BadgeCheckIcon />}>
					Info
				</Badge>
				<Badge variant="success" startIcon={<BadgeCheckIcon />}>
					Success
				</Badge>
				<Badge variant="warning" startIcon={<BadgeCheckIcon />}>
					Warning
				</Badge>
				<Badge variant="destructive" startIcon={<BadgeCheckIcon />}>
					Destructive
				</Badge>
				<Badge variant="outline" startIcon={<BadgeCheckIcon />}>
					Outline
				</Badge>
				<Badge variant="ghost" startIcon={<BadgeCheckIcon />}>
					Ghost
				</Badge>
				<Badge variant="link" startIcon={<BadgeCheckIcon />}>
					Link
				</Badge>
			</div>
		</Example>
	);
}

function BadgeWithIconRight() {
	return (
		<Example title="Icon Right" className="max-w-fit">
			<div className="flex flex-wrap gap-2">
				<Badge endIcon={<ArrowRightIcon />}>Default</Badge>
				<Badge variant="secondary" endIcon={<ArrowRightIcon />}>
					Secondary
				</Badge>
				<Badge variant="info" endIcon={<ArrowRightIcon />}>
					Info
				</Badge>
				<Badge variant="success" endIcon={<ArrowRightIcon />}>
					Success
				</Badge>
				<Badge variant="warning" endIcon={<ArrowRightIcon />}>
					Warning
				</Badge>
				<Badge variant="destructive" endIcon={<ArrowRightIcon />}>
					Destructive
				</Badge>
				<Badge variant="outline" endIcon={<ArrowRightIcon />}>
					Outline
				</Badge>
				<Badge variant="ghost" endIcon={<ArrowRightIcon />}>
					Ghost
				</Badge>
				<Badge variant="link" endIcon={<ArrowRightIcon />}>
					Link
				</Badge>
			</div>
		</Example>
	);
}

function BadgeWithSpinner() {
	return (
		<Example title="With Spinner" className="max-w-fit">
			<div className="flex flex-wrap gap-2">
				<Badge startIcon={<Spinner />}>Default</Badge>
				<Badge variant="secondary" startIcon={<Spinner />}>
					Secondary
				</Badge>
				<Badge variant="info" startIcon={<Spinner />}>
					Info
				</Badge>
				<Badge variant="success" startIcon={<Spinner />}>
					Success
				</Badge>
				<Badge variant="warning" startIcon={<Spinner />}>
					Warning
				</Badge>
				<Badge variant="destructive" startIcon={<Spinner />}>
					Destructive
				</Badge>
				<Badge variant="outline" startIcon={<Spinner />}>
					Outline
				</Badge>
				<Badge variant="ghost" startIcon={<Spinner />}>
					Ghost
				</Badge>
				<Badge variant="link" startIcon={<Spinner />}>
					Link
				</Badge>
			</div>
		</Example>
	);
}

function BadgeAsLink() {
	return (
		<Example title="asChild">
			<div className="flex flex-wrap gap-2">
				<Badge endIcon={<ArrowUpRightIcon />} render={<a href="/">Link</a>} />
				<Badge
					variant="secondary"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
				<Badge
					variant="info"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
				<Badge
					variant="success"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
				<Badge
					variant="warning"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
				<Badge
					variant="destructive"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
				<Badge
					variant="outline"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
				<Badge
					variant="ghost"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
				<Badge
					variant="link"
					endIcon={<ArrowUpRightIcon />}
					render={<a href="/">Link</a>}
				/>
			</div>
		</Example>
	);
}

function BadgeLongText() {
	return (
		<Example title="Long Text">
			<div className="flex flex-wrap gap-2">
				<Badge variant="secondary">
					A badge with a lot of text to see how it wraps
				</Badge>
			</div>
		</Example>
	);
}
