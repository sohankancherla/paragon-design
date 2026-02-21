import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { CircleAlertIcon, PlusIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useUserTimezone } from "@/frontend/hooks/use-user-timezone";
import { useAppForm } from "@/packages/design-system/components/form/form";
import {
	Alert,
	AlertDescription
} from "@/packages/design-system/components/ui/alert";
import { Button } from "@/packages/design-system/components/ui/button";
import { defaultColors } from "@/packages/design-system/components/ui/color-picker";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from "@/packages/design-system/components/ui/combobox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/packages/design-system/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel
} from "@/packages/design-system/components/ui/field";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/packages/design-system/components/ui/tooltip";
import { orpc } from "@/packages/orpc/orpc";

const allTimezones = Intl.supportedValuesOf("timeZone");

const createCalendarSchema = z.object({
	name: z.string().min(1, "Please enter a calendar name"),
	color: z.string().min(1, "Please select a color"),
	timezone: z.string().min(1, "Please select a timezone")
});

export function CreateCalendarDialog() {
	const Route = getRouteApi("/(app)/calendar");
	const { queryClient } = Route.useRouteContext();

	const timezone = useUserTimezone();

	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	const createCalendar = useMutation(
		orpc.calendar.create.mutationOptions({
			onSettled: () => {
				queryClient.invalidateQueries(
					orpc.calendar.list.queryOptions({ input: {} })
				);
			},
			onSuccess: ({ calendarList: { displayName } }) => {
				dialogCloseRef.current?.click();
				toast.success(`Calendar "${displayName}" created successfully`);
				form.reset();
			}
		})
	);

	const form = useAppForm({
		defaultValues: {
			name: "",
			color: defaultColors.red,
			timezone
		},
		validators: {
			onSubmit: createCalendarSchema
		},
		onSubmit: ({ value }) => {
			createCalendar.mutate({
				name: value.name,
				timezone: value.timezone,
				calendarList: {
					color: value.color
				}
			});
		}
	});

	// TODO: Find a better way to prevent the collapsible from toggling when clicking on the form.
	return (
		<Dialog>
			{/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: Prevent collapsible from toggling when clicking on the form */}
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: Prevent collapsible from toggling when clicking on the form */}
			<form
				id="create-calendar-form"
				noValidate
				onSubmit={e => {
					e.preventDefault();
					form.handleSubmit();
				}}
				onClick={e => {
					e.stopPropagation();
				}}
			>
				<Tooltip>
					<TooltipTrigger
						render={
							<DialogTrigger
								render={
									<Button
										variant="ghost"
										size="icon-3xs"
										className="hover:bg-muted-foreground/15 aria-expanded:bg-muted-foreground/15"
										onClick={e => {
											e.stopPropagation();
										}}
									>
										<PlusIcon />
									</Button>
								}
							/>
						}
					/>
					<TooltipContent>Create calendar</TooltipContent>
				</Tooltip>
				<DialogContent className="select-none gap-8">
					<DialogClose ref={dialogCloseRef} hidden />
					<DialogHeader>
						<DialogTitle>Create a new calendar</DialogTitle>
						<DialogDescription>
							Set a name, color, and timezone.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						{createCalendar.isError && (
							<Alert variant="destructive">
								<CircleAlertIcon />
								<AlertDescription>
									{createCalendar.error.message}
								</AlertDescription>
							</Alert>
						)}
						<form.AppField
							name="name"
							children={field => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<>
										<Field orientation="horizontal" data-invalid={isInvalid}>
											<FieldLabel htmlFor="name">Calendar name</FieldLabel>
											<field.TextField
												placeholder="Calendar name"
												autoComplete="off"
												className="w-45"
											/>
										</Field>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</>
								);
							}}
						/>
						<form.AppField
							name="color"
							children={field => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<>
										<Field orientation="horizontal" data-invalid={isInvalid}>
											<FieldLabel htmlFor="color">Color</FieldLabel>
											<field.ColorPicker />
										</Field>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</>
								);
							}}
						/>
						{/* TODO: Create resusable combobox */}
						{/* TODO: Make Timezones more readable */}
						<form.Field
							name="timezone"
							children={field => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<>
										<Field orientation="horizontal" data-invalid={isInvalid}>
											<FieldLabel htmlFor="timezone">Timezone</FieldLabel>
											<Combobox
												value={field.state.value}
												onValueChange={value =>
													value && field.handleChange(value)
												}
												items={allTimezones}
											>
												<ComboboxInput
													id="timezone"
													name={field.name}
													onBlur={field.handleBlur}
													aria-invalid={isInvalid}
													placeholder="Select a timezone"
													showClear
												/>
												<ComboboxContent side="bottom">
													<ComboboxEmpty>No timezones found.</ComboboxEmpty>
													<ComboboxList>
														{timezone => (
															<ComboboxItem key={timezone} value={timezone}>
																{timezone}
															</ComboboxItem>
														)}
													</ComboboxList>
												</ComboboxContent>
											</Combobox>
										</Field>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</>
								);
							}}
						/>
					</FieldGroup>
					<DialogFooter>
						<form.AppForm>
							<form.SubmitButton
								form="create-calendar-form"
								isLoading={createCalendar.isPending}
							>
								Create calendar
							</form.SubmitButton>
						</form.AppForm>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
