import { z } from "zod";

import { CreateCalendarListSchema } from "./calendar-list-schemas";

export const CalendarSchema = z.object({
	id: z
		.string("Calendar ID is required")
		.min(1, "Minimum 1 character required"),
	ownerId: z
		.string("Owner ID is required")
		.min(1, "Minimum 1 character required"),

	name: z.string().min(1, "Calendar name must be minimum 1 character"),
	timezone: z.string().refine(
		tz => {
			try {
				new Intl.DateTimeFormat("en-US", { timeZone: tz });
				return true;
			} catch {
				return false;
			}
		},
		{ message: "Invalid IANA time zone" }
	),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional()
});

export const CreateCalendarSchema = CalendarSchema.partial({ timezone: true })
	.omit({
		id: true,
		ownerId: true,
		createdAt: true,
		updatedAt: true
	})
	.extend({
		calendarList: CreateCalendarListSchema.omit({ calendarId: true })
	});

export const DeleteCalendarSchema = z.object({
	id: z.string()
});

export const GetCalendarByIdSchema = z.object({
	id: z.string()
});
