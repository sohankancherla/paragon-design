import { createLazyFileRoute } from "@tanstack/react-router";
import { Example, ExampleWrapper } from "@/frontend/components/example";
import {
	Field,
	FieldDescription,
	FieldLabel
} from "@/packages/design-system/components/ui/field";
import { Textarea } from "@/packages/design-system/components/ui/textarea";

export const Route = createLazyFileRoute("/textarea/")({
	component: TextareaPage
});

function TextareaPage() {
	return (
		<ExampleWrapper title="Textarea">
			<TextareaBasic />
			<TextareaInvalid />
			<TextareaWithLabel />
			<TextareaWithDescription />
			<TextareaDisabled />
		</ExampleWrapper>
	);
}

function TextareaBasic() {
	return (
		<Example title="Basic">
			<Textarea placeholder="Type your message here." />
		</Example>
	);
}

function TextareaInvalid() {
	return (
		<Example title="Invalid">
			<Textarea placeholder="Type your message here." aria-invalid="true" />
		</Example>
	);
}

function TextareaWithLabel() {
	return (
		<Example title="With Label">
			<Field>
				<FieldLabel htmlFor="textarea-demo-message">Message</FieldLabel>
				<Textarea
					id="textarea-demo-message"
					placeholder="Type your message here."
					rows={6}
				/>
			</Field>
		</Example>
	);
}

function TextareaWithDescription() {
	return (
		<Example title="With Description">
			<Field>
				<FieldLabel htmlFor="textarea-demo-message-2">Message</FieldLabel>
				<Textarea
					id="textarea-demo-message-2"
					placeholder="Type your message here."
					rows={6}
				/>
				<FieldDescription>
					Type your message and press enter to send.
				</FieldDescription>
			</Field>
		</Example>
	);
}

function TextareaDisabled() {
	return (
		<Example title="Disabled">
			<Field>
				<FieldLabel htmlFor="textarea-demo-disabled">Message</FieldLabel>
				<Textarea
					id="textarea-demo-disabled"
					placeholder="Type your message here."
					disabled
				/>
			</Field>
		</Example>
	);
}
