import { z } from "zod";

export const roleSchema = z.enum(["owner", "editor", "viewer", "observer"], {
	message: "Role is required"
});

export const ACLSchema = z.object({
	id: z.string("ID is required"),
	calendarId: z.string("Calendar ID is required"),
	userId: z.string("User ID is required"),
	role: roleSchema,
	createdBy: z.string("Created by is required"),
	createdAt: z.date("Created at is required"),
	updatedAt: z.date("Updated at is required")
});

export const CreateACLSchema = ACLSchema.omit({
	id: true,
	createdBy: true,
	createdAt: true,
	updatedAt: true
});

export const DeleteACLSchema = ACLSchema.pick({
	calendarId: true,
	userId: true
});

export const UpdateRoleSchema = ACLSchema.pick({
	calendarId: true,
	userId: true,
	role: true
});
