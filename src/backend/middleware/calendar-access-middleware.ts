import type { User } from "better-auth";
import { and, eq, inArray } from "drizzle-orm";
import { base } from "@/backend/base";
import { db } from "@/packages/db/drizzle";
import {
	acl as aclTable,
	calendar as calendarTable
} from "@/packages/db/schema";

export const calendarAccessRoleMiddleware = base
	.$context<{ headers: Headers; user: User }>()
	.middleware(
		async (
			{ context, errors, next },
			input: Record<string, unknown> & {
				calendarIdArray?: string[];
				calendarId?: string;
			}
		) => {
			if (!(input.calendarIdArray || input.calendarId)) {
				throw errors.BAD_REQUEST({ message: "Calendar ID is required" });
			}

			const calendarIds: string[] = input.calendarIdArray || [
				input.calendarId || ""
			];

			const [calendar] = await db
				.select()
				.from(calendarTable)
				.where(inArray(calendarTable.id, calendarIds));
			if (!calendar) {
				throw errors.NOT_FOUND({ message: "Calendar does not exist" });
			}

			const [acl] = await db
				.select()
				.from(aclTable)
				.where(
					and(
						inArray(aclTable.calendarId, calendarIds),
						eq(aclTable.userId, context.user.id)
					)
				);
			if (!acl) {
				throw errors.FORBIDDEN({
					message: "User does not have access to this calendar"
				});
			}
			return next({ context: { role: acl.role } });
		}
	);

export const checkOwnerMiddleware = calendarAccessRoleMiddleware.concat(
	({ next, errors, context }) => {
		if (context.role !== "owner") {
			throw errors.FORBIDDEN({
				message: "User is not the owner of the calendar"
			});
		}
		return next();
	}
);

export const checkEditorMiddleware = calendarAccessRoleMiddleware.concat(
	({ next, errors, context }) => {
		if (context.role !== "owner" && context.role !== "editor") {
			throw errors.FORBIDDEN({
				message: "User does not have editor access to this calendar"
			});
		}
		return next();
	}
);
