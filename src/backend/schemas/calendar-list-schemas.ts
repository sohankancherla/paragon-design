import { z } from "zod";

export const CalendarListSchema = z.object({
	id: z
		.string("CalendarList ID is required")
		.min(1, "Minimum 1 character required"),
	userId: z
		.string("User ID is required")
		.min(1, "Minimum 1 character required"),
	calendarId: z
		.string("Calendar ID is required")
		.min(1, "Minimum 1 character required"),
	primaryCalendar: z.boolean(),
	defaultCalendar: z.boolean(),
	displayName: z.string().min(1, "Calendar name must be minimum 1 character"),
	timezone: z.string().refine(
		tz => {
			try {
				if (tz === "Auto") {
					return true;
				}
				new Intl.DateTimeFormat("en-US", { timeZone: tz });
				return true;
			} catch {
				return false;
			}
		},
		{ message: "Invalid IANA time zone" }
	),
	color: z.string(),
	is_visible: z.boolean(),
	notificationSettings: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date()
});

export const CreateCalendarListSchema = CalendarListSchema.omit({
	id: true,
	userId: true,
	createdAt: true,
	updatedAt: true
}).partial({
	primaryCalendar: true,
	defaultCalendar: true,
	displayName: true,
	timezone: true,
	color: true,
	is_visible: true,
	notificationSettings: true
});

export const UpdateCalendarListSchema = CalendarListSchema.omit({
	userId: true,
	calendarId: true,
	createdAt: true,
	updatedAt: true
})
	.partial({
		primaryCalendar: true,
		defaultCalendar: true,
		displayName: true,
		timezone: true,
		color: true,
		is_visible: true,
		notificationSettings: true
	})
	.extend({
		updateParent: z.boolean().default(false)
	});

export const DeleteCalendarListSchema = CalendarListSchema.pick({
	id: true
}).extend({
	deleteParent: z.boolean().default(false)
});
