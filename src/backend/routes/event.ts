import {
	and,
	eq,
	gte,
	inArray,
	isNotNull,
	isNull,
	lte,
	type SQL,
	sql
} from "drizzle-orm";
import pkg from "rrule";

const { RRule, rrulestr } = pkg;

import { z } from "zod";
import { base } from "@/backend/base";
import { authMiddleware } from "@/backend/middleware/auth-middleware";
import {
	calendarAccessRoleMiddleware,
	checkEditorMiddleware
} from "@/backend/middleware/calendar-access-middleware";
import { securityMiddleware } from "@/backend/middleware/security-middleware";
import {
	CreateEventSchema,
	DeleteEventSchema,
	EventSchema,
	EventsSchema,
	GetEventByIdSchema,
	ListEventsSchema,
	UpdateEventSchema
} from "@/backend/schemas/event-schemas";
import { db } from "@/packages/db/drizzle";
import {
	calendar as calendarTable,
	eventException as eventExceptionTable,
	event as eventTable,
	type user as userTable
} from "@/packages/db/schema";

const SPACE_REGEX = /\s+/;

const validateRRule = (rruleString: string): boolean => {
	try {
		const rule = rrulestr(rruleString);
		return rule instanceof RRule;
	} catch (_error) {
		return false;
	}
};

// Event CRUD Operations
const createEvent = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(CreateEventSchema)
	.use(checkEditorMiddleware)
	.output(EventSchema)
	.handler(async ({ input, errors, context }) => {
		if (input.allDay) {
			input.startTime.setHours(0, 0, 0, 0);
			input.endTime.setDate(input.endTime.getDate() + 1);
			input.endTime.setHours(0, 0, 0, 0);
		}

		if (input.recurring && input.rrule && !validateRRule(input.rrule)) {
			throw errors.BAD_REQUEST({
				message: "Invalid rrule"
			});
		}

		const [event] = await db
			.insert(eventTable)
			.values({
				...input,
				calendarId: input.calendarId,
				userId: context.user.id,
				organizerEmail: context.user.email
			})
			.returning();
		return event;
	});

const updateEvent = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(UpdateEventSchema)
	// .use(checkEditorMiddleware)
	.output(EventSchema)
	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complexity linter error need to fix
	.handler(async ({ input, errors, context }) => {
		let eventId = input.id;
		if (input.originalEventId) {
			const [originalEvent] = await db
				.select()
				.from(eventTable)
				.where(eq(eventTable.id, input.originalEventId));

			if (!originalEvent) {
				throw errors.BAD_REQUEST({
					message: "Original event not found"
				});
			}

			eventId = originalEvent.id;

			if (input.onlyThisEvent) {
				const timeChanged = !!(input.startTime || input.endTime);
				const [eventException] = await db
					.update(eventExceptionTable)
					.set({
						timeChanged,
						title: input.title,
						description: input.description,
						location: input.location,
						startTime: input.startTime,
						endTime: input.endTime,
						updatedAt: new Date()
					})
					.where(eq(eventExceptionTable.id, input.id))
					.returning();

				if (!eventException && originalEvent.rrule) {
					const recurringEventIdParts = input.id.split("-");
					if (recurringEventIdParts.length !== 2) {
						throw errors.BAD_REQUEST({
							message: "Invalid recurring event id format"
						});
					}

					const index = Number(recurringEventIdParts[1]);
					await db.insert(eventExceptionTable).values({
						id: `${originalEvent.id}-${index}`,
						index,
						userId: context.user.id,
						eventId: originalEvent.id,
						timeChanged,
						startTime: input.startTime,
						endTime: input.endTime,
						title: input.title,
						description: input.description,
						location: input.location
					});
				}
				const newEvent = {
					...originalEvent,
					id: input.id,
					startTime:
						input.startTime ??
						eventException?.startTime ??
						originalEvent.startTime,
					endTime:
						input.endTime ?? eventException?.endTime ?? originalEvent.endTime,
					title: input.title ?? eventException?.title ?? originalEvent.title,
					description:
						input.description ??
						eventException?.description ??
						originalEvent.description,
					location:
						input.location ?? eventException?.location ?? originalEvent.location
				};
				return newEvent;
			}

			if (input.allEvents) {
				await db
					.update(eventExceptionTable)
					.set({
						startTime: input.startTime,
						endTime: input.endTime,
						title: input.title,
						description: input.description,
						location: input.location
					})
					.where(eq(eventExceptionTable.eventId, originalEvent.id));
			}

			if (input.onlyFollowingEvents && originalEvent.rrule) {
				const { before, after } = splitRRule(
					originalEvent.rrule,
					Number(input.id.split("-")[1])
				) ?? { before: originalEvent.rrule, after: originalEvent.rrule };
				await db
					.update(eventTable)
					.set({ rrule: before })
					.where(eq(eventTable.id, originalEvent.id));

				const [newEvent] = await db
					.insert(eventTable)
					.values({
						calendarId: originalEvent.calendarId,
						userId: context.user.id,
						organizerEmail: context.user.email,
						title: input.title ?? originalEvent.title,
						description: input.description ?? originalEvent.description,
						location: input.location ?? originalEvent.location,
						startTime: input.startTime ?? originalEvent.startTime,
						endTime: input.endTime ?? originalEvent.endTime,
						rrule: after
					})
					.returning();

				const timeChanged = !!(input.startTime || input.endTime);

				await db
					.update(eventExceptionTable)
					.set({
						id: `${newEvent.id}-${eventExceptionTable.index} - ${Number(input.id.split("-")[1])}`,
						eventId: newEvent.id,
						index: sql`${eventExceptionTable.index} - ${Number(input.id.split("-")[1])}`,
						timeChanged,
						startTime: input.startTime,
						endTime: input.endTime,
						title: input.title,
						description: input.description,
						location: input.location
					})
					.where(eq(eventExceptionTable.eventId, originalEvent.id));

				return newEvent;
			}
		}
		const [event] = await db
			.update(eventTable)
			.set({ ...input, id: eventId, updatedAt: new Date() })
			.where(eq(eventTable.id, eventId))
			.returning();

		if (!event) {
			throw errors.NOT_FOUND({ message: "Event not found" });
		}
		return event;
	});

const deleteEvent = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(DeleteEventSchema)
	// .use(checkEditorMiddleware)
	.output(z.object({ success: z.boolean() }))
	.handler(async ({ input, errors, context }) => {
		if (input.onlyThisEvent && input.originalEventId) {
			const [eventException] = await db
				.update(eventExceptionTable)
				.set({
					isCanceled: true,
					updatedAt: new Date()
				})
				.where(eq(eventExceptionTable.id, input.id))
				.returning();

			if (!eventException) {
				await db.insert(eventExceptionTable).values({
					id: input.id,
					index: Number(input.id.split("-")[1]),
					userId: context.user.id,
					eventId: input.originalEventId,
					isCanceled: true
				});
			}
			return { success: true };
		}
		let eventId = input.id;
		if (input.originalEventId) {
			eventId = input.originalEventId;
		}
		const [event] = await db
			.delete(eventTable)
			.where(eq(eventTable.id, eventId))
			.returning();
		if (!event) {
			throw errors.NOT_FOUND({ message: "Event not found" });
		}
		return { success: true };
	});

const getEventById = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(GetEventByIdSchema)
	.output(EventSchema)
	.handler(async ({ input, errors, context }) => {
		const [event] = await db
			.select()
			.from(eventTable)
			.where(
				and(eq(eventTable.id, input.id), eq(eventTable.userId, context.user.id))
			);

		if (!event) {
			throw errors.NOT_FOUND({ message: "Event not found" });
		}

		return event;
	});

const listEvents = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(ListEventsSchema)
	.use(calendarAccessRoleMiddleware)
	.output(EventsSchema)
	.handler(async ({ input, errors, context }) => {
		if ("primary" in input.calendarIdArray) {
			const [calendar] = await db
				.select()
				.from(calendarTable)
				.where(eq(calendarTable.ownerId, context.user.id));
			if (!calendar) {
				throw errors.NOT_FOUND({ message: "Primary calendar not found" });
			}
			input.calendarIdArray.push(calendar.id);
		}

		let sql_query: SQL | undefined;
		if (input.query) {
			const searchQuery = input.query
				.trim()
				.split(SPACE_REGEX)
				.filter(word => !!word)
				.join(" | ")
				.toLowerCase();
			sql_query = sql`(
						setweight(to_tsvector('english', coalesce(${eventTable.title}, '')), 'A') ||
						setweight(to_tsvector('english', coalesce(${eventTable.description}, '')), 'B'))
						@@ to_tsquery('english', ${searchQuery}
    					)`;
		}

		const baseFilters = [inArray(eventTable.calendarId, input.calendarIdArray)];

		if (sql_query) {
			baseFilters.push(sql_query);
		}

		const [regularEvents, recurringEvents] = await Promise.all([
			db
				.select()
				.from(eventTable)
				.where(
					and(
						...baseFilters,
						isNull(eventTable.rrule),
						...(input.startTime
							? [gte(eventTable.endTime, input.startTime)]
							: []),
						...(input.endTime ? [lte(eventTable.startTime, input.endTime)] : [])
					)
				)
				.limit(input.limit),

			db
				.select()
				.from(eventTable)
				.where(and(...baseFilters, isNotNull(eventTable.rrule)))
				.limit(input.limit)
		]);

		const startRange = input.startTime;
		const endRange = input.endTime
			? new Date(input.endTime)
			: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
		const hasTimeFilter = !!(input.startTime || input.endTime);

		const recurringEventsObjects = await Promise.all(
			recurringEvents.map(event =>
				generateRecurringEvents(
					event,
					{
						...context.user,
						timezone: context.user.timezone,
						image: context.user.image ?? null
					},
					startRange || event.startTime,
					endRange,
					Math.ceil(input.limit / recurringEvents.length),
					hasTimeFilter
				)
			)
		);

		const allEvents = [...regularEvents, ...recurringEventsObjects.flat()]
			.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
			.slice(0, input.limit);

		if (context.role === "observer") {
			return allEvents.map(event => ({
				id: event.id,
				calendarId: event.calendarId,
				observerEvent: true,
				startTime: event.startTime,
				endTime: event.endTime
			}));
		}

		return allEvents;
	});

const splitRRule = (
	rruleString: string,
	splitIndex: number
): { before: string; after: string } | null => {
	const rule = rrulestr(rruleString);

	const options = rule.origOptions;
	const dtstart = options.dtstart || rule.options.dtstart;

	// Get occurrences up to and including the split point
	const occurrences = options.count
		? rule.all()
		: rule.all((_, i) => i <= splitIndex);

	const splitDate = occurrences[splitIndex];
	const lastBeforeSplit = occurrences[splitIndex - 1];

	// Copy options excluding count/until
	const { count, until, dtstart: _, ...baseOptions } = options;

	if (count) {
		// Finite rule: distribute count
		return {
			before: new RRule({
				...baseOptions,
				dtstart,
				count: splitIndex
			}).toString(),
			after: new RRule({
				...baseOptions,
				dtstart: splitDate,
				count: count - splitIndex
			}).toString()
		};
	}

	// Infinite/UNTIL rule: use UNTIL for before, preserve original UNTIL for after
	return {
		before: new RRule({
			...baseOptions,
			dtstart,
			until: lastBeforeSplit
		}).toString(),
		after: new RRule({
			...baseOptions,
			dtstart: splitDate,
			...(until && { until })
		}).toString()
	};
};

const generateRecurringEvents = async (
	event: typeof eventTable.$inferSelect,
	user: typeof userTable.$inferSelect,
	startRange: Date,
	endRange: Date,
	limit: number,
	hasTimeFilter: boolean
	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complexity linter error need to fix
) => {
	if (!event.rrule || limit <= 0) {
		return [];
	}

	const rule = rrulestr(event.rrule, {
		dtstart: event.startTime
	});

	const [occurrences, exceptions] = await Promise.all([
		Promise.resolve(rule.between(startRange, endRange, true)),
		db
			.select()
			.from(eventExceptionTable)
			.where(
				and(
					eq(eventExceptionTable.eventId, event.id),
					eq(eventExceptionTable.userId, user.id)
				)
			)
	]);

	const exceptionsMap = new Map(
		exceptions.map(exception => {
			return [exception.id.split("-")[1], exception];
		})
	);

	const eventDuration = event.endTime.getTime() - event.startTime.getTime();
	const results: z.infer<typeof EventSchema>[] = [];

	for (const [index, date] of occurrences.entries()) {
		if (results.length >= limit) {
			break;
		}

		const exception = exceptionsMap.get(index.toString());

		if (exception) {
			exception.startTime ??= date;
			exception.endTime ??= new Date(date.getTime() + eventDuration);
		}

		const withinRange =
			!hasTimeFilter ||
			(exception?.startTime &&
				exception?.endTime &&
				exception.startTime <= endRange &&
				exception.endTime >= startRange);

		if (exception && !exception.isCanceled) {
			if (withinRange) {
				results.push({
					...event,
					id: `${event.id}-${index}`,
					timeChanged: exception.timeChanged,
					startTime: exception.startTime ?? event.startTime,
					endTime: exception.endTime ?? event.endTime,
					title: exception.title ?? event.title,
					description: exception.description ?? event.description,
					location: exception.location ?? event.location,
					modified: true,
					originalEventId: event.id,
					originalStartTime: date,
					originalEndTime: new Date(date.getTime() + eventDuration)
				});
			}
		} else if (!exception) {
			results.push({
				...event,
				id: `${event.id}-${index}`,
				startTime: date,
				endTime: new Date(date.getTime() + eventDuration),
				modified: false,
				originalEventId: event.id
			});
		}
	}

	return results;
};

export const event = {
	create: createEvent,
	update: updateEvent,
	delete: deleteEvent,
	getById: getEventById,
	list: listEvents
};
