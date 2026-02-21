import { createLazyFileRoute } from "@tanstack/react-router";
import {
	Example,
	ExampleWrapper
} from "@/frontend/routes/design/components/example";
import { Checkbox } from "@/packages/design-system/components/ui/checkbox";
import { Field } from "@/packages/design-system/components/ui/field";
import { Input } from "@/packages/design-system/components/ui/input";
import { Label } from "@/packages/design-system/components/ui/label";
import { Textarea } from "@/packages/design-system/components/ui/textarea";

export const Route = createLazyFileRoute("/design/label/")({
	component: LabelPage
});

function LabelPage() {
	return (
		<ExampleWrapper title="Label">
			<LabelWithCheckbox />
			<LabelWithInput />
			<LabelDisabled />
			<LabelWithTextarea />
		</ExampleWrapper>
	);
}

function LabelWithCheckbox() {
	return (
		<Example title="With Checkbox">
			<Field orientation="horizontal">
				<Checkbox id="label-demo-terms" />
				<Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
			</Field>
		</Example>
	);
}

function LabelWithInput() {
	return (
		<Example title="With Input">
			<Field>
				<Label htmlFor="label-demo-username">Username</Label>
				<Input id="label-demo-username" placeholder="Username" />
			</Field>
		</Example>
	);
}

function LabelDisabled() {
	return (
		<Example title="Disabled">
			<Field data-disabled={true}>
				<Label htmlFor="label-demo-disabled">Disabled</Label>
				<Input id="label-demo-disabled" placeholder="Disabled" disabled />
			</Field>
		</Example>
	);
}

function LabelWithTextarea() {
	return (
		<Example title="With Textarea">
			<Field>
				<Label htmlFor="label-demo-message">Message</Label>
				<Textarea id="label-demo-message" placeholder="Message" />
			</Field>
		</Example>
	);
}
