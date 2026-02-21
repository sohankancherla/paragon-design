import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "@/backend/base";
import { authMiddleware } from "@/backend/middleware/auth-middleware";
import { securityMiddleware } from "@/backend/middleware/security-middleware";
import {
	CreateACLSchema,
	DeleteACLSchema,
	UpdateRoleSchema
} from "@/backend/schemas/acl-schemas";

import { db } from "@/packages/db/drizzle";
import {
	acl as aclTable,
	calendarList as calendarListTable,
	calendar as calendarTable
} from "@/packages/db/schema";
import { checkOwnerMiddleware } from "../middleware/calendar-access-middleware";

const shareCalendar = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(CreateACLSchema)
	.use(checkOwnerMiddleware)
	.output(z.object({ success: z.boolean() }))
	.handler(async ({ input, context, errors }) => {
		const [calendar] = await db
			.select()
			.from(calendarTable)
			.where(eq(calendarTable.id, input.calendarId));
		if (!calendar) {
			throw errors.NOT_FOUND({ message: "Calendar not found" });
		}
		await db.insert(aclTable).values({
			calendarId: input.calendarId,
			userId: input.userId,
			role: input.role,
			createdBy: context.user.id
		});

		await db.insert(calendarListTable).values({
			calendarId: input.calendarId,
			userId: input.userId,
			displayName: calendar.name,
			timezone: calendar.timezone
		});
		return { success: true };
	});

const unshareCalendar = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(DeleteACLSchema)
	.use(checkOwnerMiddleware)
	.output(z.object({ success: z.boolean() }))
	.handler(async ({ input }) => {
		await db
			.delete(aclTable)
			.where(
				and(
					eq(aclTable.calendarId, input.calendarId),
					eq(aclTable.userId, input.userId)
				)
			);
		await db
			.delete(calendarListTable)
			.where(
				and(
					eq(calendarListTable.calendarId, input.calendarId),
					eq(calendarListTable.userId, input.userId)
				)
			);
		return { success: true };
	});

const updateRole = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(UpdateRoleSchema)
	.use(checkOwnerMiddleware)
	.output(z.object({ success: z.boolean() }))
	.handler(async ({ input }) => {
		await db
			.update(aclTable)
			.set({ role: input.role })
			.where(
				and(
					eq(aclTable.calendarId, input.calendarId),
					eq(aclTable.userId, input.userId)
				)
			);
		return { success: true };
	});

export const share = {
	share: shareCalendar,
	remove: unshareCalendar,
	update: updateRole
};
