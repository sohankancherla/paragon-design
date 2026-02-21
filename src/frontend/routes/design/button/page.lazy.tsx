import { createLazyFileRoute } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
	Example,
	ExampleWrapper
} from "@/frontend/routes/design/components/example";
import { Button } from "@/packages/design-system/components/ui/button";

export const Route = createLazyFileRoute("/design/button/")({
	component: ButtonPage
});

function ButtonPage() {
	return (
		<ExampleWrapper title="Button">
			<ButtonVariantsAndSizes />
			<ButtonIconRight />
			<ButtonIconLeft />
			<ButtonIconOnly />
			<ButtonLoading />
			<ButtonAsChild />
			<ButtonInvalidStates />
			<ButtonExamples />
		</ExampleWrapper>
	);
}

function ButtonVariantsAndSizes() {
	return (
		<Example title="Variants & Sizes">
			<div className="flex flex-wrap items-center gap-2">
				<Button size="3xs">Default</Button>
				<Button size="3xs" variant="secondary">
					Secondary
				</Button>
				<Button size="3xs" variant="outline">
					Outline
				</Button>
				<Button size="3xs" variant="ghost">
					Ghost
				</Button>
				<Button size="3xs" variant="destructive">
					Destructive
				</Button>
				<Button size="3xs" variant="link-underline">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="2xs">Default</Button>
				<Button size="2xs" variant="secondary">
					Secondary
				</Button>
				<Button size="2xs" variant="outline">
					Outline
				</Button>
				<Button size="2xs" variant="ghost">
					Ghost
				</Button>
				<Button size="2xs" variant="destructive">
					Destructive
				</Button>
				<Button size="2xs" variant="link-underline">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="xs">Default</Button>
				<Button size="xs" variant="secondary">
					Secondary
				</Button>
				<Button size="xs" variant="outline">
					Outline
				</Button>
				<Button size="xs" variant="ghost">
					Ghost
				</Button>
				<Button size="xs" variant="destructive">
					Destructive
				</Button>
				<Button size="xs" variant="link-underline">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="sm">Default</Button>
				<Button size="sm" variant="secondary">
					Secondary
				</Button>
				<Button size="sm" variant="outline">
					Outline
				</Button>
				<Button size="sm" variant="ghost">
					Ghost
				</Button>
				<Button size="sm" variant="destructive">
					Destructive
				</Button>
				<Button size="sm" variant="link-underline">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button>Default</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="destructive">Destructive</Button>
				<Button variant="link-underline">Link</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="lg">Default</Button>
				<Button size="lg" variant="secondary">
					Secondary
				</Button>
				<Button size="lg" variant="outline">
					Outline
				</Button>
				<Button size="lg" variant="ghost">
					Ghost
				</Button>
				<Button size="lg" variant="destructive">
					Destructive
				</Button>
				<Button size="lg" variant="link-underline">
					Link
				</Button>
			</div>
		</Example>
	);
}

function ButtonIconRight() {
	return (
		<Example title="Icon Right">
			<div className="flex flex-wrap items-center gap-2">
				<Button size="3xs" endIcon={<ArrowRightIcon />}>
					Default
				</Button>
				<Button size="3xs" variant="secondary" endIcon={<ArrowRightIcon />}>
					Secondary
				</Button>
				<Button size="3xs" variant="outline" endIcon={<ArrowRightIcon />}>
					Outline
				</Button>
				<Button size="3xs" variant="ghost" endIcon={<ArrowRightIcon />}>
					Ghost
				</Button>
				<Button size="3xs" variant="destructive" endIcon={<ArrowRightIcon />}>
					Destructive
				</Button>
				<Button
					size="3xs"
					variant="link-underline"
					endIcon={<ArrowRightIcon />}
				>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="2xs" endIcon={<ArrowRightIcon />}>
					Default
				</Button>
				<Button size="2xs" variant="secondary" endIcon={<ArrowRightIcon />}>
					Secondary
				</Button>
				<Button size="2xs" variant="outline" endIcon={<ArrowRightIcon />}>
					Outline
				</Button>
				<Button size="2xs" variant="ghost" endIcon={<ArrowRightIcon />}>
					Ghost
				</Button>
				<Button size="2xs" variant="destructive" endIcon={<ArrowRightIcon />}>
					Destructive
				</Button>
				<Button
					size="2xs"
					variant="link-underline"
					endIcon={<ArrowRightIcon />}
				>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="xs" endIcon={<ArrowRightIcon />}>
					Default
				</Button>
				<Button size="xs" variant="secondary" endIcon={<ArrowRightIcon />}>
					Secondary
				</Button>
				<Button size="xs" variant="outline" endIcon={<ArrowRightIcon />}>
					Outline
				</Button>
				<Button size="xs" variant="ghost" endIcon={<ArrowRightIcon />}>
					Ghost
				</Button>
				<Button size="xs" variant="destructive" endIcon={<ArrowRightIcon />}>
					Destructive
				</Button>
				<Button size="xs" variant="link-underline" endIcon={<ArrowRightIcon />}>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="sm" endIcon={<ArrowRightIcon />}>
					Default
				</Button>
				<Button size="sm" variant="secondary" endIcon={<ArrowRightIcon />}>
					Secondary
				</Button>
				<Button size="sm" variant="outline" endIcon={<ArrowRightIcon />}>
					Outline
				</Button>
				<Button size="sm" variant="ghost" endIcon={<ArrowRightIcon />}>
					Ghost
				</Button>
				<Button size="sm" variant="destructive" endIcon={<ArrowRightIcon />}>
					Destructive
				</Button>
				<Button size="sm" variant="link-underline" endIcon={<ArrowRightIcon />}>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button endIcon={<ArrowRightIcon />}>Default</Button>
				<Button variant="secondary" endIcon={<ArrowRightIcon />}>
					Secondary
				</Button>
				<Button variant="outline" endIcon={<ArrowRightIcon />}>
					Outline
				</Button>
				<Button variant="ghost" endIcon={<ArrowRightIcon />}>
					Ghost
				</Button>
				<Button variant="destructive" endIcon={<ArrowRightIcon />}>
					Destructive
				</Button>
				<Button variant="link-underline" endIcon={<ArrowRightIcon />}>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="lg" endIcon={<ArrowRightIcon />}>
					Default
				</Button>
				<Button size="lg" variant="secondary" endIcon={<ArrowRightIcon />}>
					Secondary
				</Button>
				<Button size="lg" variant="outline" endIcon={<ArrowRightIcon />}>
					Outline
				</Button>
				<Button size="lg" variant="ghost" endIcon={<ArrowRightIcon />}>
					Ghost
				</Button>
				<Button size="lg" variant="destructive" endIcon={<ArrowRightIcon />}>
					Destructive
				</Button>
				<Button size="lg" variant="link-underline" endIcon={<ArrowRightIcon />}>
					Link
				</Button>
			</div>
		</Example>
	);
}

function ButtonIconLeft() {
	return (
		<Example title="Icon Left">
			<div className="flex flex-wrap items-center gap-2">
				<Button size="3xs" startIcon={<ArrowLeftIcon />}>
					Default
				</Button>
				<Button size="3xs" variant="secondary" startIcon={<ArrowLeftIcon />}>
					Secondary
				</Button>
				<Button size="3xs" variant="outline" startIcon={<ArrowLeftIcon />}>
					Outline
				</Button>
				<Button size="3xs" variant="ghost" startIcon={<ArrowLeftIcon />}>
					Ghost
				</Button>
				<Button size="3xs" variant="destructive" startIcon={<ArrowLeftIcon />}>
					Destructive
				</Button>
				<Button
					size="3xs"
					variant="link-underline"
					startIcon={<ArrowLeftIcon />}
				>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="2xs" startIcon={<ArrowLeftIcon />}>
					Default
				</Button>
				<Button size="2xs" variant="secondary" startIcon={<ArrowLeftIcon />}>
					Secondary
				</Button>
				<Button size="2xs" variant="outline" startIcon={<ArrowLeftIcon />}>
					Outline
				</Button>
				<Button size="2xs" variant="ghost" startIcon={<ArrowLeftIcon />}>
					Ghost
				</Button>
				<Button size="2xs" variant="destructive" startIcon={<ArrowLeftIcon />}>
					Destructive
				</Button>
				<Button
					size="2xs"
					variant="link-underline"
					startIcon={<ArrowLeftIcon />}
				>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="xs" startIcon={<ArrowLeftIcon />}>
					Default
				</Button>
				<Button size="xs" variant="secondary" startIcon={<ArrowLeftIcon />}>
					Secondary
				</Button>
				<Button size="xs" variant="outline" startIcon={<ArrowLeftIcon />}>
					Outline
				</Button>
				<Button size="xs" variant="ghost" startIcon={<ArrowLeftIcon />}>
					Ghost
				</Button>
				<Button size="xs" variant="destructive" startIcon={<ArrowLeftIcon />}>
					Destructive
				</Button>
				<Button
					size="xs"
					variant="link-underline"
					startIcon={<ArrowLeftIcon />}
				>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="sm" startIcon={<ArrowLeftIcon />}>
					Default
				</Button>
				<Button size="sm" variant="secondary" startIcon={<ArrowLeftIcon />}>
					Secondary
				</Button>
				<Button size="sm" variant="outline" startIcon={<ArrowLeftIcon />}>
					Outline
				</Button>
				<Button size="sm" variant="ghost" startIcon={<ArrowLeftIcon />}>
					Ghost
				</Button>
				<Button size="sm" variant="destructive" startIcon={<ArrowLeftIcon />}>
					Destructive
				</Button>
				<Button
					size="sm"
					variant="link-underline"
					startIcon={<ArrowLeftIcon />}
				>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button startIcon={<ArrowLeftIcon />}>Default</Button>
				<Button variant="secondary" startIcon={<ArrowLeftIcon />}>
					Secondary
				</Button>
				<Button variant="outline" startIcon={<ArrowLeftIcon />}>
					Outline
				</Button>
				<Button variant="ghost" startIcon={<ArrowLeftIcon />}>
					Ghost
				</Button>
				<Button variant="destructive" startIcon={<ArrowLeftIcon />}>
					Destructive
				</Button>
				<Button variant="link-underline" startIcon={<ArrowLeftIcon />}>
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="lg" startIcon={<ArrowLeftIcon />}>
					Default
				</Button>
				<Button size="lg" variant="secondary" startIcon={<ArrowLeftIcon />}>
					Secondary
				</Button>
				<Button size="lg" variant="outline" startIcon={<ArrowLeftIcon />}>
					Outline
				</Button>
				<Button size="lg" variant="ghost" startIcon={<ArrowLeftIcon />}>
					Ghost
				</Button>
				<Button size="lg" variant="destructive" startIcon={<ArrowLeftIcon />}>
					Destructive
				</Button>
				<Button
					size="lg"
					variant="link-underline"
					startIcon={<ArrowLeftIcon />}
				>
					Link
				</Button>
			</div>
		</Example>
	);
}

function ButtonIconOnly() {
	return (
		<Example title="Icon Only">
			<div className="flex flex-wrap items-center gap-2">
				<Button size="icon-3xs">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-3xs" variant="secondary">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-3xs" variant="outline">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-3xs" variant="ghost">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-3xs" variant="destructive">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-3xs" variant="link-underline">
					<ArrowRightIcon />
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="icon-2xs">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-2xs" variant="secondary">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-2xs" variant="outline">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-2xs" variant="ghost">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-2xs" variant="destructive">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-2xs" variant="link-underline">
					<ArrowRightIcon />
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="icon-xs">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-xs" variant="secondary">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-xs" variant="outline">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-xs" variant="ghost">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-xs" variant="destructive">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-xs" variant="link-underline">
					<ArrowRightIcon />
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="icon-sm">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-sm" variant="secondary">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-sm" variant="outline">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-sm" variant="ghost">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-sm" variant="destructive">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-sm" variant="link-underline">
					<ArrowRightIcon />
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="icon">
					<ArrowRightIcon />
				</Button>
				<Button size="icon" variant="secondary">
					<ArrowRightIcon />
				</Button>
				<Button size="icon" variant="outline">
					<ArrowRightIcon />
				</Button>
				<Button size="icon" variant="ghost">
					<ArrowRightIcon />
				</Button>
				<Button size="icon" variant="destructive">
					<ArrowRightIcon />
				</Button>
				<Button size="icon" variant="link-underline">
					<ArrowRightIcon />
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="icon-lg">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-lg" variant="secondary">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-lg" variant="outline">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-lg" variant="ghost">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-lg" variant="destructive">
					<ArrowRightIcon />
				</Button>
				<Button size="icon-lg" variant="link-underline">
					<ArrowRightIcon />
				</Button>
			</div>
		</Example>
	);
}

function ButtonLoading() {
	return (
		<Example title="Loading">
			<div className="flex flex-wrap items-center gap-2">
				<Button variant="outline">Get Started</Button>
				<Button variant="outline" startIcon={<ArrowLeftIcon />}>
					Back
				</Button>
				<Button variant="outline" endIcon={<ArrowRightIcon />}>
					Submit
				</Button>
				<Button
					variant="outline"
					startIcon={<ArrowLeftIcon />}
					endIcon={<ArrowRightIcon />}
				>
					Both Icons
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button variant="outline" isLoading>
					Get Started
				</Button>
				<Button variant="outline" startIcon={<ArrowLeftIcon />} isLoading>
					Back
				</Button>
				<Button variant="outline" endIcon={<ArrowRightIcon />} isLoading>
					Submit
				</Button>
				<Button
					variant="outline"
					startIcon={<ArrowLeftIcon />}
					endIcon={<ArrowRightIcon />}
					isLoading
				>
					Both Icons
				</Button>
			</div>
		</Example>
	);
}

function ButtonAsChild() {
	return (
		<Example title="asChild">
			<div className="flex flex-wrap items-center gap-2">
				<Button variant="outline" render={<a href="/" />} nativeButton={false}>
					Link
				</Button>
				<Button
					variant="ghost"
					render={<a href="/" />}
					nativeButton={false}
					endIcon={<ArrowRightIcon />}
				>
					Link
				</Button>
				<Button
					variant="link-underline"
					render={<a href="/" />}
					nativeButton={false}
					startIcon={<ArrowLeftIcon />}
				>
					Back
				</Button>
			</div>
		</Example>
	);
}

function ButtonInvalidStates() {
	return (
		<Example title="Invalid States">
			<div className="flex flex-wrap items-center gap-2">
				<Button size="3xs" aria-invalid="true">
					Default
				</Button>
				<Button size="3xs" variant="secondary" aria-invalid="true">
					Secondary
				</Button>
				<Button size="3xs" variant="outline" aria-invalid="true">
					Outline
				</Button>
				<Button size="3xs" variant="ghost" aria-invalid="true">
					Ghost
				</Button>
				<Button size="3xs" variant="destructive" aria-invalid="true">
					Destructive
				</Button>
				<Button size="3xs" variant="link-underline" aria-invalid="true">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="2xs" aria-invalid="true">
					Default
				</Button>
				<Button size="2xs" variant="secondary" aria-invalid="true">
					Secondary
				</Button>
				<Button size="2xs" variant="outline" aria-invalid="true">
					Outline
				</Button>
				<Button size="2xs" variant="ghost" aria-invalid="true">
					Ghost
				</Button>
				<Button size="2xs" variant="destructive" aria-invalid="true">
					Destructive
				</Button>
				<Button size="2xs" variant="link-underline" aria-invalid="true">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="xs" aria-invalid="true">
					Default
				</Button>
				<Button size="xs" variant="secondary" aria-invalid="true">
					Secondary
				</Button>
				<Button size="xs" variant="outline" aria-invalid="true">
					Outline
				</Button>
				<Button size="xs" variant="ghost" aria-invalid="true">
					Ghost
				</Button>
				<Button size="xs" variant="destructive" aria-invalid="true">
					Destructive
				</Button>
				<Button size="xs" variant="link-underline" aria-invalid="true">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="sm" aria-invalid="true">
					Default
				</Button>
				<Button size="sm" variant="secondary" aria-invalid="true">
					Secondary
				</Button>
				<Button size="sm" variant="outline" aria-invalid="true">
					Outline
				</Button>
				<Button size="sm" variant="ghost" aria-invalid="true">
					Ghost
				</Button>
				<Button size="sm" variant="destructive" aria-invalid="true">
					Destructive
				</Button>
				<Button size="sm" variant="link-underline" aria-invalid="true">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button aria-invalid="true">Default</Button>
				<Button variant="secondary" aria-invalid="true">
					Secondary
				</Button>
				<Button variant="outline" aria-invalid="true">
					Outline
				</Button>
				<Button variant="ghost" aria-invalid="true">
					Ghost
				</Button>
				<Button variant="destructive" aria-invalid="true">
					Destructive
				</Button>
				<Button variant="link-underline" aria-invalid="true">
					Link
				</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="lg" aria-invalid="true">
					Default
				</Button>
				<Button size="lg" variant="secondary" aria-invalid="true">
					Secondary
				</Button>
				<Button size="lg" variant="outline" aria-invalid="true">
					Outline
				</Button>
				<Button size="lg" variant="ghost" aria-invalid="true">
					Ghost
				</Button>
				<Button size="lg" variant="destructive" aria-invalid="true">
					Destructive
				</Button>
				<Button size="lg" variant="link-underline" aria-invalid="true">
					Link
				</Button>
			</div>
		</Example>
	);
}

function ButtonExamples() {
	return (
		<Example title="Examples">
			<div className="flex flex-wrap items-center gap-4">
				<div className="flex items-center gap-2">
					<Button variant="outline">Cancel</Button>
					<Button endIcon={<ArrowRightIcon />}>Submit</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="destructive">Delete</Button>
					<Button size="icon">
						<ArrowRightIcon />
					</Button>
				</div>
				<Button render={<a href="/" />} nativeButton={false}>
					Link
				</Button>
			</div>
		</Example>
	);
}
