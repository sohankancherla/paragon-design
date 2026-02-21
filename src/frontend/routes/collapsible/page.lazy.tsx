import { createLazyFileRoute } from "@tanstack/react-router";
import {
	ChevronRightIcon,
	FileIcon,
	FolderIcon,
	MaximizeIcon,
	MinimizeIcon
} from "lucide-react";
import { useState } from "react";
import { Example, ExampleWrapper } from "@/frontend/components/example";
import { Button } from "@/packages/design-system/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/packages/design-system/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "@/packages/design-system/components/ui/collapsible";
import {
	Field,
	FieldGroup,
	FieldLabel
} from "@/packages/design-system/components/ui/field";
import { Input } from "@/packages/design-system/components/ui/input";
import {
	Tabs,
	TabsList,
	TabsTrigger
} from "@/packages/design-system/components/ui/tabs";

export const Route = createLazyFileRoute("/collapsible/")({
	component: CollapsiblePage
});

function CollapsiblePage() {
	return (
		<ExampleWrapper title="Collapsible">
			<CollapsibleFileTree />
			<CollapsibleSettings />
		</ExampleWrapper>
	);
}

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

function CollapsibleFileTree() {
	const fileTree: FileTreeItem[] = [
		{
			name: "components",
			items: [
				{
					name: "ui",
					items: [
						{ name: "button.tsx" },
						{ name: "card.tsx" },
						{ name: "dialog.tsx" },
						{ name: "input.tsx" },
						{ name: "select.tsx" },
						{ name: "table.tsx" }
					]
				},
				{ name: "login-form.tsx" },
				{ name: "register-form.tsx" }
			]
		},
		{
			name: "lib",
			items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }]
		},
		{
			name: "hooks",
			items: [
				{ name: "use-media-query.ts" },
				{ name: "use-debounce.ts" },
				{ name: "use-local-storage.ts" }
			]
		},
		{
			name: "types",
			items: [{ name: "index.d.ts" }, { name: "api.d.ts" }]
		},
		{
			name: "public",
			items: [{ name: "favicon.ico" }, { name: "logo.svg" }, { name: "images" }]
		},
		{ name: "app.tsx" },
		{ name: "layout.tsx" },
		{ name: "globals.css" },
		{ name: "package.json" },
		{ name: "tsconfig.json" },
		{ name: "README.md" },
		{ name: ".gitignore" }
	];

	const renderItem = (fileItem: FileTreeItem) => {
		if ("items" in fileItem) {
			return (
				<Collapsible key={fileItem.name}>
					<CollapsibleTrigger
						render={
							<Button
								variant="ghost"
								className="group/trigger h-8 w-full justify-start text-foreground transition-none"
							/>
						}
					>
						<span className="flex items-center gap-1">
							<ChevronRightIcon className="transition-transform duration-100 group-data-panel-open/trigger:rotate-90" />
							<FolderIcon />
							{fileItem.name}
						</span>
					</CollapsibleTrigger>
					<CollapsibleContent className="mt-1 ml-5">
						<div className="flex flex-col gap-1">
							{fileItem.items.map(child => renderItem(child))}
						</div>
					</CollapsibleContent>
				</Collapsible>
			);
		}
		return (
			<Button
				key={fileItem.name}
				variant="link-underline"
				className="h-8 w-full justify-start"
			>
				<span className="flex items-center gap-2">
					<FileIcon />
					<span>{fileItem.name}</span>
				</span>
			</Button>
		);
	};

	return (
		<Example title="File Tree" className="items-center">
			<Card className="mx-auto w-full max-w-[16rem] gap-2" size="sm">
				<CardHeader>
					<Tabs defaultValue="explorer">
						<TabsList className="w-full">
							<TabsTrigger value="explorer">Explorer</TabsTrigger>
							<TabsTrigger value="settings">Outline</TabsTrigger>
						</TabsList>
					</Tabs>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-1">
						{fileTree.map(item => renderItem(item))}
					</div>
				</CardContent>
			</Card>
		</Example>
	);
}

function CollapsibleSettings() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Example title="Settings" className="items-center">
			<Card className="mx-auto w-full max-w-xs" size="sm">
				<CardHeader>
					<CardTitle>Radius</CardTitle>
					<CardDescription>
						Set the corner radius of the element.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Collapsible
						open={isOpen}
						onOpenChange={setIsOpen}
						className="flex items-start gap-2"
					>
						<FieldGroup className="grid w-full grid-cols-2 gap-2">
							<Field>
								<FieldLabel htmlFor="radius-x" className="sr-only">
									Radius X
								</FieldLabel>
								<Input id="radius" placeholder="0" defaultValue={0} />
							</Field>
							<Field>
								<FieldLabel htmlFor="radius-y" className="sr-only">
									Radius Y
								</FieldLabel>
								<Input id="radius" placeholder="0" defaultValue={0} />
							</Field>
							<CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
								<Field>
									<FieldLabel htmlFor="radius-x" className="sr-only">
										Radius X
									</FieldLabel>
									<Input id="radius" placeholder="0" defaultValue={0} />
								</Field>
								<Field>
									<FieldLabel htmlFor="radius-y" className="sr-only">
										Radius Y
									</FieldLabel>
									<Input id="radius" placeholder="0" defaultValue={0} />
								</Field>
							</CollapsibleContent>
						</FieldGroup>
						<CollapsibleTrigger
							render={<Button variant="outline" size="icon" />}
						>
							{isOpen ? <MinimizeIcon /> : <MaximizeIcon />}
						</CollapsibleTrigger>
					</Collapsible>
				</CardContent>
			</Card>
		</Example>
	);
}
