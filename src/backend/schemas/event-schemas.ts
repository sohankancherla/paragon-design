import {
	createSchemaFactory,
	createSelectSchema,
	createUpdateSchema
} from "drizzle-zod";
import { z } from "zod";

import { event as eventTable } from "@/packages/db/schema";

const { createInsertSchema } = createSchemaFactory({
	coerce: {
		date: true
	}
});

export const CreateEventSchema = createInsertSchema(eventTable)
	.omit({
		id: true,
		userId: true,
		organizerEmail: true
	})
	.refine(
		data => {
			const hasRrule = data.rrule !== null && data.rrule !== undefined;
			const hasRecurring =
				data.recurring !== null && data.recurring !== undefined;
			return hasRrule === hasRecurring;
		},
		{
			message:
				"Both 'rrule' and 'recurring' must be provided together or both omitted",
			path: ["recurring"]
		}
	)
	.refine(
		data => {
			return data.startTime < data.endTime;
		},
		{
			message: "Start time must be before end time",
			path: ["startTime"]
		}
	)
	.refine(
		data => {
			const MS_IN_DAY = 24 * 60 * 60 * 1000;
			const start = new Date(data.startTime);
			const end = new Date(data.endTime);
			const isMultiDay = Math.abs(end.getTime() - start.getTime()) >= MS_IN_DAY;
			if (isMultiDay && !data.allDay) {
				return false;
			}
			return true;
		},
		{
			message: "Events longer than a day must be marked as all day.",
			path: ["allDay"]
		}
	);

export const UpdateEventSchema = createUpdateSchema(eventTable)
	.extend({
		onlyThisEvent: z
			.literal(true)
			.optional()
			.describe("Whether to modify only this event"),
		onlyFollowingEvents: z
			.literal(true)
			.optional()
			.describe("Whether to modify only this and the following events"),
		allEvents: z
			.literal(true)
			.optional()
			.describe("Whether to modify all events"),
		originalEventId: z.string().optional().describe("Original event identifier")
	})
	.omit({
		userId: true
	})
	.required({ id: true });

export const DeleteEventSchema = z.object({
	id: z.string(),
	onlyThisEvent: z
		.literal(true)
		.optional()
		.describe("Whether to modify only this event"),
	originalEventId: z.string().optional().describe("Original event identifier"),
	exceptionId: z.string().optional().describe("Exception identifier")
});

export const GetEventByIdSchema = z.object({
	id: z.string()
});

export const ListEventsSchema = z.object({
	calendarIdArray: z
		.array(z.string())
		.describe("All the calendar IDs to list events from"),
	query: z.string().optional(),
	limit: z.number().default(30),
	startTime: z.coerce
		.date()
		.optional()
		.describe("Start time to list events from"),
	endTime: z.coerce.date().optional().describe("End time to list events from"),
	orderBy: z
		.enum(["startTime", "endTime"])
		.optional()
		.describe("Order by start time or end time")
});

export const CoreEventSchema = createSelectSchema(eventTable).extend({
	originalEventId: z.string().optional().describe("Original event identifier"),
	originalStartTime: z.coerce.date().optional().describe("Original start time"),
	originalEndTime: z.coerce.date().optional().describe("Original end time"),
	timeChanged: z
		.boolean()
		.optional()
		.describe("Whether the event time has been changed in exception"),
	modified: z
		.boolean()
		.optional()
		.describe("Whether the recurring event is modified")
});

export const ObserverEventSchema = z.object({
	id: z.string(),
	calendarId: z.string().describe("Calendar ID"),
	observerEvent: z.literal(true).describe("Whether the event type is observer"),
	startTime: z.coerce.date(),
	endTime: z.coerce.date()
});

export const EventSchema = z.union([CoreEventSchema, ObserverEventSchema]);

export const EventsSchema = z.array(EventSchema);
