import { useMutation, useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { CircleAlertIcon, PlusIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useMemo, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { DateTimePicker } from "@/frontend/routes/(app)/calendar/components/calendar/events";
import { useAppForm } from "@/packages/design-system/components/form/form";
import {
	Alert,
	AlertDescription
} from "@/packages/design-system/components/ui/alert";
import { Button } from "@/packages/design-system/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/packages/design-system/components/ui/select";
import { Textarea } from "@/packages/design-system/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/packages/design-system/components/ui/tooltip";
import { orpc } from "@/packages/orpc/orpc";

const createEventSchema = z
	.object({
		title: z.string().min(1, "Please enter an event title"),
		description: z.string(),
		calendarId: z.string().min(1, "Please select a calendar"),
		startTime: z.date(),
		endTime: z.date()
	})
	.refine(data => data.startTime < data.endTime, {
		message: "Start time must be before end time",
		path: ["startTime"]
	});

export function CreateEventDialog() {
	const Route = getRouteApi("/(app)/calendar");
	const { queryClient } = Route.useRouteContext();

	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	const { data: calendarLists } = useQuery(
		orpc.calendar.list.queryOptions({ input: {} })
	);

	const calendars = useMemo(() => {
		return calendarLists ?? [];
	}, [calendarLists]);

	const defaultCalendarId = calendars[0]?.calendarId ?? "";

	const createEvent = useMutation(
		orpc.event.create.mutationOptions({
			onSettled: () => {
				queryClient.invalidateQueries({
					queryKey: orpc.event.list.key()
				});
			},
			onSuccess: () => {
				dialogCloseRef.current?.click();
				toast.success("Event created successfully");
				form.reset();
			},
			onError: () => {
				toast.error("Failed to create event");
			}
		})
	);

	const now = DateTime.now().plus({ hours: 1 }).startOf("hour");

	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
			calendarId: defaultCalendarId,
			startTime: now.toJSDate(),
			endTime: now.plus({ hours: 1 }).toJSDate()
		},
		validators: {
			onSubmit: createEventSchema
		},
		onSubmit: ({ value }) => {
			createEvent.mutate({
				calendarId: value.calendarId,
				title: value.title,
				description: value.description || null,
				startTime: value.startTime,
				endTime: value.endTime
			});
		}
	});

	return (
		<Dialog>
			<Tooltip>
				<TooltipTrigger
					render={
						<DialogTrigger
							render={
								<Button variant="ghost" size="icon-sm">
									<PlusIcon />
									<span className="sr-only">Create Event</span>
								</Button>
							}
						/>
					}
				/>
				<TooltipContent>Create event</TooltipContent>
			</Tooltip>
			<DialogContent className="select-none gap-8">
				<DialogClose ref={dialogCloseRef} hidden />
				<DialogHeader>
					<DialogTitle>Create a new event</DialogTitle>
				</DialogHeader>
				<form
					id="create-event-form"
					noValidate
					onSubmit={e => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						{createEvent.isError && (
							<Alert variant="destructive">
								<CircleAlertIcon />
								<AlertDescription>{createEvent.error.message}</AlertDescription>
							</Alert>
						)}
						<form.AppField
							name="title"
							children={field => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="title">Title</FieldLabel>
										<field.TextField
											placeholder="Event title"
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="description"
							children={field => (
								<Field>
									<FieldLabel htmlFor="description">Description</FieldLabel>
									<Textarea
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={e => field.handleChange(e.target.value)}
										placeholder="Add a description"
										className="min-h-20"
									/>
								</Field>
							)}
						/>
						<form.Field
							name="calendarId"
							children={field => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="calendarId">Calendar</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={value => {
												if (value !== null) {
													field.handleChange(value);
												}
											}}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a calendar">
													{() => {
														const selected = calendars.find(
															cal => cal.calendarId === field.state.value
														);
														if (!selected) {
															return "Select a calendar";
														}
														return (
															<>
																<div
																	className="size-3 rounded-sm"
																	style={{
																		backgroundColor: selected.color
																	}}
																/>
																{selected.displayName}
															</>
														);
													}}
												</SelectValue>
											</SelectTrigger>
											<SelectContent>
												{calendars.map(cal => (
													<SelectItem
														key={cal.calendarId}
														value={cal.calendarId}
													>
														<div
															className="size-3 rounded-sm"
															style={{ backgroundColor: cal.color }}
														/>
														{cal.displayName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="startTime"
							children={field => (
								<DateTimePicker
									label="Start"
									id="startTime"
									value={field.state.value}
									onChange={date => field.handleChange(date)}
								/>
							)}
						/>
						<form.Field
							name="endTime"
							children={field => (
								<DateTimePicker
									label="End"
									id="endTime"
									value={field.state.value}
									onChange={date => field.handleChange(date)}
								/>
							)}
						/>
					</FieldGroup>
				</form>
				<DialogFooter>
					<form.AppForm>
						<form.SubmitButton
							form="create-event-form"
							isLoading={createEvent.isPending}
						>
							Create event
						</form.SubmitButton>
					</form.AppForm>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
