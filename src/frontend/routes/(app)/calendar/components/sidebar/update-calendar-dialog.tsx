import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { CircleAlertIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useAppForm } from "@/packages/design-system/components/form/form";
import {
	Alert,
	AlertDescription
} from "@/packages/design-system/components/ui/alert";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from "@/packages/design-system/components/ui/combobox";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/packages/design-system/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel
} from "@/packages/design-system/components/ui/field";
import { orpc } from "@/packages/orpc/orpc";

const allTimezones = Intl.supportedValuesOf("timeZone");

const updateCalendarSchema = z.object({
	name: z.string().min(1, "Please enter a calendar name"),
	color: z.string().min(1, "Please select a color"),
	timezone: z.string().min(1, "Please select a timezone")
});

type CalendarListData = {
	id: string;
	displayName: string;
	color: string;
	timezone: string;
};

export function UpdateCalendarDialog({
	calendarList
}: {
	calendarList: CalendarListData;
}) {
	const Route = getRouteApi("/(app)/calendar");
	const { queryClient } = Route.useRouteContext();

	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	const updateCalendar = useMutation(
		orpc.calendar.update.mutationOptions({
			onSettled: () => {
				queryClient.invalidateQueries(
					orpc.calendar.list.queryOptions({ input: {} })
				);
			},
			onSuccess: ({ calendarList: { displayName } }) => {
				dialogCloseRef.current?.click();
				toast.success(`Calendar "${displayName}" updated successfully`);
				form.reset();
			}
		})
	);

	const form = useAppForm({
		defaultValues: {
			name: calendarList.displayName,
			color: calendarList.color,
			timezone: calendarList.timezone
		},
		validators: {
			onSubmit: updateCalendarSchema
		},
		onSubmit: ({ value }) => {
			updateCalendar.mutate({
				id: calendarList.id,
				displayName: value.name,
				timezone: value.timezone,
				color: value.color
			});
		}
	});

	return (
		<form
			id="update-calendar-form"
			noValidate
			className="contents"
			onSubmit={e => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<DialogContent className="select-none gap-8">
				<DialogClose ref={dialogCloseRef} hidden />
				<DialogHeader>
					<DialogTitle>Update calendar</DialogTitle>
					<DialogDescription>
						Edit the calendar name, color, and timezone.
					</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					{updateCalendar.isError && (
						<Alert variant="destructive">
							<CircleAlertIcon />
							<AlertDescription>
								{updateCalendar.error.message}
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
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
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
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</>
							);
						}}
					/>
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
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</>
							);
						}}
					/>
				</FieldGroup>
				<DialogFooter>
					<form.AppForm>
						<form.SubmitButton
							form="update-calendar-form"
							isLoading={updateCalendar.isPending}
						>
							Update calendar
						</form.SubmitButton>
					</form.AppForm>
				</DialogFooter>
			</DialogContent>
		</form>
	);
}
