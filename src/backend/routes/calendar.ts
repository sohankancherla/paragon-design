import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "@/backend/base";
import { authMiddleware } from "@/backend/middleware/auth-middleware";
import { securityMiddleware } from "@/backend/middleware/security-middleware";
import { ACLSchema } from "@/backend/schemas/acl-schemas";
import {
	CalendarListSchema,
	DeleteCalendarListSchema,
	UpdateCalendarListSchema
} from "@/backend/schemas/calendar-list-schemas";
import {
	CalendarSchema,
	CreateCalendarSchema
} from "@/backend/schemas/calendar-schemas";

import { db } from "@/packages/db/drizzle";
import {
	acl as aclTable,
	calendarList as calendarListTable,
	calendar as calendarTable
} from "@/packages/db/schema";

const createCalendar = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(CreateCalendarSchema)
	.output(
		z.object({
			calendar: CalendarSchema,
			calendarList: CalendarListSchema,
			acl: ACLSchema
		})
	)
	.handler(async ({ input, context }) => {
		const [calendar] = await db
			.insert(calendarTable)
			.values({
				...input,
				ownerId: context.user.id,
				timezone: input.timezone || context.user.timezone
			})
			.returning();

		const [calendarList] = await db
			.insert(calendarListTable)
			.values({
				...input,
				timezone: input.timezone || context.user.timezone,
				displayName: input.calendarList?.displayName || calendar.name,
				color: input.calendarList.color,
				calendarId: calendar.id,
				userId: context.user.id
			})
			.returning();

		const [acl] = await db
			.insert(aclTable)
			.values({
				calendarId: calendar.id,
				userId: context.user.id,
				role: "owner",
				createdBy: context.user.id
			})
			.returning();

		return { calendar, calendarList, acl };
	});

const updateCalendar = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(UpdateCalendarListSchema)
	.output(
		z.object({
			calendarList: CalendarListSchema,
			calendar: CalendarSchema.nullable()
		})
	)
	.handler(async ({ input, context, errors }) => {
		const { id, updateParent, ...updateData } = input;

		const [calendarList] = await db
			.update(calendarListTable)
			.set({ ...updateData, updatedAt: new Date() })
			.where(
				and(
					eq(calendarListTable.id, id as string),
					eq(calendarListTable.userId, context.user.id)
				)
			)
			.returning();

		if (!calendarList) {
			throw errors.NOT_FOUND({ message: "Calendar not found" });
		}

		let calendar: typeof calendarTable.$inferSelect | null = null;

		if (updateParent) {
			const [updatedCalendar] = await db
				.update(calendarTable)
				.set({
					name: updateData.displayName,
					timezone: updateData.timezone,
					updatedAt: new Date()
				})
				.where(
					and(
						eq(calendarTable.id, calendarList.calendarId),
						eq(calendarTable.ownerId, context.user.id)
					)
				)
				.returning();

			calendar = updatedCalendar || null;
		}

		return { calendarList, calendar };
	});

const deleteCalendar = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(DeleteCalendarListSchema)
	.output(
		z.object({
			calendarList: CalendarListSchema.nullable(),
			calendar: CalendarSchema.nullable()
		})
	)
	.handler(async ({ input, context }) => {
		const { id, deleteParent } = input;

		const [calendarList] = await db
			.delete(calendarListTable)
			.where(
				and(
					eq(calendarListTable.id, id),
					eq(calendarListTable.userId, context.user.id)
				)
			)
			.returning();

		let calendar: typeof calendarTable.$inferSelect | null = null;

		if (deleteParent && calendarList) {
			const [deletedCalendar] = await db
				.delete(calendarTable)
				.where(
					and(
						eq(calendarTable.id, calendarList.calendarId),
						eq(calendarTable.ownerId, context.user.id)
					)
				)
				.returning();

			calendar = deletedCalendar || null;
		}

		return { calendarList: calendarList || null, calendar };
	});

const listCalendars = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.output(z.array(CalendarListSchema))
	.handler(async ({ context }) => {
		const calendarLists = await db
			.select()
			.from(calendarListTable)
			.where(eq(calendarListTable.userId, context.user.id));
		return calendarLists;
	});

const getCalendarById = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(z.object({ id: z.string() }))
	.output(CalendarListSchema)
	.handler(async ({ input, context, errors }) => {
		const [calendarList] = await db
			.select()
			.from(calendarListTable)
			.where(
				and(
					eq(calendarListTable.id, input.id),
					eq(calendarListTable.userId, context.user.id)
				)
			);

		if (!calendarList) {
			throw errors.NOT_FOUND({ message: "Calendar not found" });
		}

		return calendarList;
	});

export const calendar = {
	create: createCalendar,
	update: updateCalendar,
	delete: deleteCalendar,
	list: listCalendars,
	getById: getCalendarById
};
