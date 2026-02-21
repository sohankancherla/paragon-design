import { createLazyFileRoute } from "@tanstack/react-router";
import {
	ArrowUpRightIcon,
	CircleDashedIcon,
	FolderIcon,
	PlusIcon
} from "lucide-react";
import { Example, ExampleWrapper } from "@/frontend/components/example";
import { Button } from "@/packages/design-system/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from "@/packages/design-system/components/ui/empty";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput
} from "@/packages/design-system/components/ui/input-group";
import { Kbd } from "@/packages/design-system/components/ui/kbd";
import { Link } from "@/packages/design-system/components/ui/link";

export const Route = createLazyFileRoute("/empty/")({
	component: EmptyPage
});

function EmptyPage() {
	return (
		<ExampleWrapper title="Empty">
			<EmptyBasic />
			<EmptyWithAccentBackground />
			<EmptyWithBorder />
			<EmptyWithIcon />
			<EmptyWithAccentBackgroundAlt />
			<EmptyInCard />
		</ExampleWrapper>
	);
}

function EmptyBasic() {
	return (
		<Example title="Basic">
			<Empty>
				<EmptyHeader>
					<EmptyTitle>No projects yet</EmptyTitle>
					<EmptyDescription>
						You haven&apos;t created any projects yet. Get started by creating
						your first project.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button render={<a href="/" />} nativeButton={false}>
							Create project
						</Button>
						<Button variant="outline">Import project</Button>
					</div>
					<Link
						to="/"
						variant="link-foreground"
						endIcon={<ArrowUpRightIcon />}
						className="text-muted-foreground"
					>
						Learn more
					</Link>
				</EmptyContent>
			</Empty>
		</Example>
	);
}

function EmptyWithAccentBackground() {
	return (
		<Example title="With Accent Background">
			<Empty className="border border-solid bg-accent">
				<EmptyHeader>
					<EmptyTitle>No results found</EmptyTitle>
					<EmptyDescription>
						No results found for your search. Try adjusting your search terms.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button>Try again</Button>
					<Link
						to="/"
						variant="link-foreground"
						endIcon={<ArrowUpRightIcon />}
						className="text-muted-foreground"
					>
						Learn more
					</Link>
				</EmptyContent>
			</Empty>
		</Example>
	);
}

function EmptyWithBorder() {
	return (
		<Example title="With Border">
			<Empty className="border">
				<EmptyHeader>
					<EmptyTitle>404 - Not Found</EmptyTitle>
					<EmptyDescription>
						The page you&apos;re looking for doesn&apos;t exist. Try searching
						for what you need below.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<InputGroup className="w-3/4">
						<InputGroupInput placeholder="Try searching for pages..." />
						<InputGroupAddon>
							<CircleDashedIcon />
						</InputGroupAddon>
						<InputGroupAddon align="inline-end">
							<Kbd>/</Kbd>
						</InputGroupAddon>
					</InputGroup>
					<EmptyDescription>
						Need help?{" "}
						<Link to="/" variant="link-foreground" className="underline">
							Contact support
						</Link>
					</EmptyDescription>
				</EmptyContent>
			</Empty>
		</Example>
	);
}

function EmptyWithIcon() {
	return (
		<Example title="With Icon">
			<Empty className="border">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<FolderIcon />
					</EmptyMedia>
					<EmptyTitle>Nothing to see here</EmptyTitle>
					<EmptyDescription>
						No posts have been created yet. Get started by{" "}
						<a href="/">creating your first post</a>.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button variant="outline" startIcon={<PlusIcon />}>
						New Post
					</Button>
				</EmptyContent>
			</Empty>
		</Example>
	);
}

function EmptyWithAccentBackgroundAlt() {
	return (
		<Example title="With Accent Background Alt">
			<Empty className="border border-solid bg-accent">
				<EmptyHeader>
					<EmptyTitle>404 - Not Found</EmptyTitle>
					<EmptyDescription>
						The page you&apos;re looking for doesn&apos;t exist. Try searching
						for what you need below.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<InputGroup className="w-3/4">
						<InputGroupInput placeholder="Try searching for pages..." />
						<InputGroupAddon>
							<CircleDashedIcon />
						</InputGroupAddon>
						<InputGroupAddon align="inline-end">
							<Kbd>/</Kbd>
						</InputGroupAddon>
					</InputGroup>
					<EmptyDescription>
						Need help?{" "}
						<Link to="/" variant="link-foreground" className="underline">
							Contact support
						</Link>
					</EmptyDescription>
				</EmptyContent>
			</Empty>
		</Example>
	);
}

function EmptyInCard() {
	return (
		<Example title="In Card">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<FolderIcon />
					</EmptyMedia>
					<EmptyTitle>No projects yet</EmptyTitle>
					<EmptyDescription>
						You haven&apos;t created any projects yet. Get started by creating
						your first project.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button render={<a href="/" />} nativeButton={false}>
							Create project
						</Button>
						<Button variant="outline">Import project</Button>
					</div>
					<Link
						to="/"
						variant="link-foreground"
						endIcon={<ArrowUpRightIcon />}
						className="text-muted-foreground"
					>
						Learn more
					</Link>
				</EmptyContent>
			</Empty>
		</Example>
	);
}
