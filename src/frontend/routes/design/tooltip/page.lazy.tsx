import { createLazyFileRoute } from "@tanstack/react-router";
import { InfoIcon, SaveIcon } from "lucide-react";
import {
	Example,
	ExampleWrapper
} from "@/frontend/routes/design/components/example";
import { Button } from "@/packages/design-system/components/ui/button";
import { Kbd } from "@/packages/design-system/components/ui/kbd";
import { Link } from "@/packages/design-system/components/ui/link";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/packages/design-system/components/ui/tooltip";

export const Route = createLazyFileRoute("/design/tooltip/")({
	component: TooltipPage
});

function TooltipPage() {
	return (
		<ExampleWrapper title="Tooltip">
			<TooltipBasic />
			<TooltipSides />
			<TooltipWithIcon />
			<TooltipLongContent />
			<TooltipDisabled />
			<TooltipWithKeyboard />
			<TooltipOnLink />
			<TooltipFormatted />
		</ExampleWrapper>
	);
}

function TooltipBasic() {
	return (
		<Example title="Basic">
			<Tooltip>
				<TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
					Show Tooltip
				</TooltipTrigger>
				<TooltipContent>
					<p>Add to library</p>
				</TooltipContent>
			</Tooltip>
		</Example>
	);
}

function TooltipSides() {
	return (
		<Example title="Sides">
			<div className="flex flex-wrap gap-2">
				{(
					[
						"inline-start",
						"left",
						"top",
						"bottom",
						"right",
						"inline-end"
					] as const
				).map(side => (
					<Tooltip key={side}>
						<TooltipTrigger
							render={<Button variant="outline" className="w-fit capitalize" />}
						>
							{side.replace("-", " ")}
						</TooltipTrigger>
						<TooltipContent side={side}>
							<p>Add to library</p>
						</TooltipContent>
					</Tooltip>
				))}
			</div>
		</Example>
	);
}

function TooltipWithIcon() {
	return (
		<Example title="With Icon">
			<Tooltip>
				<TooltipTrigger render={<Button variant="ghost" size="icon" />}>
					<InfoIcon />
					<span className="sr-only">Info</span>
				</TooltipTrigger>
				<TooltipContent>
					<p>Additional information</p>
				</TooltipContent>
			</Tooltip>
		</Example>
	);
}

function TooltipLongContent() {
	return (
		<Example title="Long Content">
			<Tooltip>
				<TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
					Show Tooltip
				</TooltipTrigger>
				<TooltipContent>
					To learn more about how this works, check out the docs. If you have
					any questions, please reach out to us.
				</TooltipContent>
			</Tooltip>
		</Example>
	);
}

function TooltipDisabled() {
	return (
		<Example title="Disabled">
			<Tooltip>
				<TooltipTrigger render={<span className="inline-block w-fit" />}>
					<Button variant="outline" disabled>
						Disabled
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>This feature is currently unavailable</p>
				</TooltipContent>
			</Tooltip>
		</Example>
	);
}

function TooltipWithKeyboard() {
	return (
		<Example title="With Keyboard Shortcut">
			<Tooltip>
				<TooltipTrigger render={<Button variant="outline" size="icon-sm" />}>
					<SaveIcon />
				</TooltipTrigger>
				<TooltipContent className="pr-1.5">
					<div className="flex items-center gap-2">
						Save Changes <Kbd>S</Kbd>
					</div>
				</TooltipContent>
			</Tooltip>
		</Example>
	);
}

function TooltipOnLink() {
	return (
		<Example title="On Link">
			<Tooltip>
				<TooltipTrigger
					render={
						<Link
							to="/"
							variant="link-underline"
							onClick={e => e.preventDefault()}
						/>
					}
				>
					Learn more
				</TooltipTrigger>
				<TooltipContent>
					<p>Click to read the documentation</p>
				</TooltipContent>
			</Tooltip>
		</Example>
	);
}

function TooltipFormatted() {
	return (
		<Example title="Formatted Content">
			<Tooltip>
				<TooltipTrigger render={<Button variant="outline" className="w-fit" />}>
					Status
				</TooltipTrigger>
				<TooltipContent>
					<div className="flex flex-col gap-1">
						<p className="font-semibold">Active</p>
						<p className="text-xs opacity-80">Last updated 2 hours ago</p>
					</div>
				</TooltipContent>
			</Tooltip>
		</Example>
	);
}
