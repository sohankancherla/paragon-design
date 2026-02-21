import { createLazyFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { Example, ExampleWrapper } from "@/frontend/components/example";
import { Badge } from "@/packages/design-system/components/ui/badge";
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
	Field,
	FieldLabel
} from "@/packages/design-system/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput
} from "@/packages/design-system/components/ui/input-group";
import { Link } from "@/packages/design-system/components/ui/link";
import { Spinner } from "@/packages/design-system/components/ui/spinner";

export const Route = createLazyFileRoute("/spinner/")({
	component: SpinnerPage
});

function SpinnerPage() {
	return (
		<ExampleWrapper title="Spinner">
			<SpinnerBasic />
			<SpinnerInButtons />
			<SpinnerInBadges />
			<SpinnerInInputGroup />
			<SpinnerInEmpty />
		</ExampleWrapper>
	);
}

function SpinnerBasic() {
	return (
		<Example title="Basic">
			<div className="flex items-center gap-6">
				<Spinner />
				<Spinner className="size-6" />
			</div>
		</Example>
	);
}

function SpinnerInButtons() {
	return (
		<Example title="In Buttons">
			<div className="flex flex-wrap items-center gap-4">
				<Button startIcon={<Spinner />}>Submit</Button>
				<Button disabled startIcon={<Spinner />}>
					Disabled
				</Button>
				<Button variant="outline" disabled startIcon={<Spinner />}>
					Outline
				</Button>
			</div>
		</Example>
	);
}

function SpinnerInBadges() {
	return (
		<Example title="In Badges" className="items-center justify-center">
			<div className="flex flex-wrap items-center justify-center gap-4">
				<Badge startIcon={<Spinner />}>Badge</Badge>
				<Badge variant="secondary" startIcon={<Spinner />}>
					Badge
				</Badge>
				<Badge variant="destructive" startIcon={<Spinner />}>
					Badge
				</Badge>
				<Badge variant="outline" startIcon={<Spinner />}>
					Badge
				</Badge>
			</div>
		</Example>
	);
}

function SpinnerInInputGroup() {
	return (
		<Example title="In Input Group">
			<Field>
				<FieldLabel htmlFor="input-group-spinner">Input Group</FieldLabel>
				<InputGroup>
					<InputGroupInput id="input-group-spinner" />
					<InputGroupAddon>
						<Spinner />
					</InputGroupAddon>
				</InputGroup>
			</Field>
		</Example>
	);
}

function SpinnerInEmpty() {
	return (
		<Example title="In Empty State" containerClassName="lg:col-span-full">
			<Empty className="min-h-[300px]">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Spinner />
					</EmptyMedia>
					<EmptyTitle>No projects yet</EmptyTitle>
					<EmptyDescription>
						You haven&apos;t created any projects yet. Get started by creating
						your first project.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Link to="/" variant="default">
							Create project
						</Link>
						<Button variant="outline">Import project</Button>
					</div>
					<Link
						to="/"
						variant="link-foreground"
						endIcon={<ArrowRightIcon />}
						className="text-muted-foreground"
					>
						Learn more
					</Link>
				</EmptyContent>
			</Empty>
		</Example>
	);
}
