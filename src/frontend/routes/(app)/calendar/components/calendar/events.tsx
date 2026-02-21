import { useMutation, useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { CalendarIcon, Clock2Icon, Trash2Icon } from "lucide-react";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useCurrentTime } from "@/frontend/hooks/use-current-time";
import { useSelectedDate } from "@/frontend/hooks/use-selected-date";
import { DAYS_IN_WEEK } from "@/frontend/routes/(app)/calendar/utils/constants";
import {
	calculateEventPositions,
	formatEventTime,
	type PositionedEvent
} from "@/frontend/routes/(app)/calendar/utils/helpers";
import { useAppForm } from "@/packages/design-system/components/form/form";
import { Calendar } from "@/packages/design-system/components/ui/calendar";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger
} from "@/packages/design-system/components/ui/context-menu";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel
} from "@/packages/design-system/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput
} from "@/packages/design-system/components/ui/input-group";
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger
} from "@/packages/design-system/components/ui/popover";
import { Textarea } from "@/packages/design-system/components/ui/textarea";
import { cn } from "@/packages/design-system/lib/utils";
import { orpc } from "@/packages/orpc/orpc";

export function EventsLayer() {
	const { selectedWeekDates } = useSelectedDate();

	const { data: calendarLists } = useQuery(
		orpc.calendar.list.queryOptions({ input: {} })
	);

	const visibleCalendars = useMemo(() => {
		return calendarLists?.filter(cal => cal.is_visible) ?? [];
	}, [calendarLists]);

	const { data: events } = useQuery(
		orpc.event.list.queryOptions({
			input: {
				calendarIdArray: visibleCalendars.map(cal => cal.calendarId),
				startTime: selectedWeekDates[0],
				endTime: selectedWeekDates[6]
			}
		})
	);

	const positionedEvents = useMemo(() => {
		if (!events) {
			return [];
		}
		return calculateEventPositions(
			events.map(event => ({
				...event,
				color:
					visibleCalendars.find(cal => cal.calendarId === event.calendarId)
						?.color ?? "#3b82f6"
			}))
		);
	}, [events, visibleCalendars]);

	return (
		<div className="pointer-events-none absolute inset-0 z-10">
			<div className="grid grid-cols-[repeat(7,1fr)]">
				{Array.from({ length: DAYS_IN_WEEK }).map((_, dayIndex) => (
					<div
						key={`day-${
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed array
							dayIndex
						}`}
						className="relative"
					>
						{positionedEvents
							.filter(event => event.column === dayIndex)
							.map(event => (
								<EventBlock key={`event-${event.id}`} event={event} />
							))}
					</div>
				))}
			</div>
		</div>
	);
}

type EventBlockProps = {
	event: PositionedEvent;
};

function EventBlock({ event }: EventBlockProps) {
	const currentTime = useCurrentTime();
	const [open, setOpen] = useState(false);
	const Route = getRouteApi("/(app)/calendar");
	const { queryClient } = Route.useRouteContext();

	const deleteEvent = useMutation(
		orpc.event.delete.mutationOptions({
			onSettled: () => {
				queryClient.invalidateQueries({
					queryKey: orpc.event.list.key()
				});
			},
			onSuccess: () => {
				toast.success("Event deleted");
			},
			onError: () => {
				toast.error("Failed to delete event");
			}
		})
	);

	const startDateTime = DateTime.fromJSDate(event.startTime);
	const endDateTime = DateTime.fromJSDate(event.endTime);
	const duration = endDateTime.diff(startDateTime).as("minutes");

	return (
		<ContextMenu>
			<ContextMenuTrigger
				render={<div />}
				className={cn(
					"pointer-events-auto absolute -mt-[0.5px] ml-[0.5px] flex h-full w-full cursor-pointer overflow-hidden",
					endDateTime < currentTime &&
						"after:absolute after:inset-0 after:bg-background/40",
					duration > 15 ? "rounded-md" : "rounded-sm",
					"[background:color-mix(in_lab,var(--event-color)_26%,var(--background))]",
					"dark:[background:color-mix(in_lab,var(--event-color)_35%,var(--background))]"
				)}
				style={
					{
						top: `${event.top}px`,
						height: `${event.height}px`,
						left: `${event.left}%`,
						width: `${event.width}%`,
						"--event-color": event.color
					} as React.CSSProperties
				}
			>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger render={<div />} className="flex h-full w-full">
						<div
							className="h-full w-1 flex-none"
							style={{ backgroundColor: event.color }}
						/>
						<div
							className={cn(
								"flex min-w-0 flex-1 px-1.5 py-1",
								duration > 36 ? "flex-col" : "items-center gap-1"
							)}
						>
							<div className="whitespace-nowrap font-[550] text-2xs text-[color-mix(in_lab,var(--event-color)_40%,var(--foreground))] dark:text-[color-mix(in_lab,var(--foreground)_80%,var(--event-color))]">
								{/* @ts-expect-error */}
								{event.title}
							</div>
							<div className="whitespace-nowrap font-features-['ss01'] text-3xs text-[color-mix(in_lab,var(--event-color)_50%,var(--foreground))] dark:text-[color-mix(in_lab,var(--foreground)_60%,var(--event-color))]">
								{formatEventTime(startDateTime, endDateTime)}
							</div>
						</div>
					</PopoverTrigger>
					<PopoverContent side="right" sideOffset={8} className="w-80">
						<EditEventForm event={event} onClose={() => setOpen(false)} />
					</PopoverContent>
				</Popover>
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem
					variant="destructive"
					onClick={() => {
						deleteEvent.mutate({
							id: event.id,
							...("originalEventId" in event && event.originalEventId
								? { originalEventId: event.originalEventId }
								: {})
						});
					}}
				>
					<Trash2Icon />
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

const updateEventSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string(),
	startTime: z.date(),
	endTime: z.date()
});

function EditEventForm({
	event,
	onClose
}: {
	event: PositionedEvent;
	onClose: () => void;
}) {
	const Route = getRouteApi("/(app)/calendar");
	const { queryClient } = Route.useRouteContext();

	const updateEvent = useMutation(
		orpc.event.update.mutationOptions({
			onSettled: () => {
				queryClient.invalidateQueries({
					queryKey: orpc.event.list.key()
				});
			},
			onSuccess: () => {
				onClose();
				toast.success("Event updated");
			},
			onError: () => {
				toast.error("Failed to update event");
			}
		})
	);

	const form = useAppForm({
		defaultValues: {
			// @ts-expect-error
			title: event.title ?? "",
			// @ts-expect-error
			description: event.description ?? "",
			startTime: event.startTime,
			endTime: event.endTime
		},
		validators: {
			onSubmit: updateEventSchema
		},
		onSubmit: ({ value }) => {
			updateEvent.mutate({
				id: event.id,
				title: value.title,
				description: value.description || null,
				startTime: value.startTime,
				endTime: value.endTime
			});
		}
	});

	return (
		<form
			noValidate
			className="contents"
			onSubmit={e => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<PopoverHeader>
				<PopoverTitle>Edit event</PopoverTitle>
			</PopoverHeader>
			<FieldGroup>
				<form.AppField
					name="title"
					children={field => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor="title">Title</FieldLabel>
								<field.TextField placeholder="Event title" autoComplete="off" />
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
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
			<form.AppForm>
				<form.SubmitButton isLoading={updateEvent.isPending}>
					Save
				</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}

export function DateTimePicker({
	label,
	id,
	value,
	onChange
}: {
	label: string;
	id: string;
	value: Date;
	onChange: (date: Date) => void;
}) {
	const dt = DateTime.fromJSDate(value);

	return (
		<Field>
			<FieldLabel htmlFor={id}>{label}</FieldLabel>
			<Popover>
				<PopoverTrigger render={<div />} className="cursor-pointer">
					<InputGroup>
						<InputGroupInput
							id={id}
							readOnly
							value={dt.toFormat("MMM d, yyyy 'at' h:mm a")}
							className="cursor-pointer"
						/>
						<InputGroupAddon align="inline-end">
							<CalendarIcon />
						</InputGroupAddon>
					</InputGroup>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={value}
						onSelect={date => {
							if (date) {
								const newDt = DateTime.fromJSDate(date).set({
									hour: dt.hour,
									minute: dt.minute
								});
								onChange(newDt.toJSDate());
							}
						}}
						defaultMonth={value}
					/>
					<div className="border-t p-3">
						<InputGroup>
							<InputGroupInput
								type="time"
								value={dt.toFormat("HH:mm")}
								onChange={e => {
									const [hours, minutes] = e.target.value
										.split(":")
										.map(Number);
									const newDt = dt.set({ hour: hours, minute: minutes });
									onChange(newDt.toJSDate());
								}}
								className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
							/>
							<InputGroupAddon>
								<Clock2Icon />
							</InputGroupAddon>
						</InputGroup>
					</div>
				</PopoverContent>
			</Popover>
		</Field>
	);
}
