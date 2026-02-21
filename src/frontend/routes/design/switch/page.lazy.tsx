import { createLazyFileRoute } from "@tanstack/react-router";
import {
	Example,
	ExampleWrapper
} from "@/frontend/routes/design/components/example";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle
} from "@/packages/design-system/components/ui/field";
import { Label } from "@/packages/design-system/components/ui/label";
import { Switch } from "@/packages/design-system/components/ui/switch";

export const Route = createLazyFileRoute("/design/switch/")({
	component: SwitchPage
});

function SwitchPage() {
	return (
		<ExampleWrapper title="Switch">
			<SwitchBasic />
			<SwitchWithDescription />
			<SwitchDisabled />
			<SwitchSizes />
		</ExampleWrapper>
	);
}

function SwitchBasic() {
	return (
		<Example title="Basic">
			<Field orientation="horizontal">
				<Switch id="switch-basic" />
				<FieldLabel htmlFor="switch-basic">Airplane Mode</FieldLabel>
			</Field>
		</Example>
	);
}

function SwitchWithDescription() {
	return (
		<Example title="With Description">
			<FieldLabel htmlFor="switch-focus-mode">
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>Share across devices</FieldTitle>
						<FieldDescription>
							Focus is shared across devices, and turns off when you leave the
							app.
						</FieldDescription>
					</FieldContent>
					<Switch id="switch-focus-mode" />
				</Field>
			</FieldLabel>
		</Example>
	);
}

function SwitchDisabled() {
	return (
		<Example title="Disabled">
			<div className="flex flex-col gap-12">
				<div className="flex items-center gap-2">
					<Switch id="switch-disabled-unchecked" disabled />
					<Label htmlFor="switch-disabled-unchecked">
						Disabled (Unchecked)
					</Label>
				</div>
				<div className="flex items-center gap-2">
					<Switch id="switch-disabled-checked" defaultChecked disabled />
					<Label htmlFor="switch-disabled-checked">Disabled (Checked)</Label>
				</div>
			</div>
		</Example>
	);
}

function SwitchSizes() {
	return (
		<Example title="Sizes">
			<div className="flex flex-col gap-12">
				<div className="flex items-center gap-2">
					<Switch id="switch-size-sm" size="sm" />
					<Label htmlFor="switch-size-sm">Small</Label>
				</div>
				<div className="flex items-center gap-2">
					<Switch id="switch-size-default" size="default" />
					<Label htmlFor="switch-size-default">Default</Label>
				</div>
			</div>
		</Example>
	);
}
