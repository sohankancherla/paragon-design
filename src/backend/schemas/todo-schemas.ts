import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema
} from "drizzle-zod";
import { z } from "zod";

import { todo as todoTable } from "@/packages/db/schema";

export const TodoSchema = createSelectSchema(todoTable);

export const ListTodosSchema = z.object({});

export const CreateTodoSchema = createInsertSchema(todoTable).omit({
	id: true,
	userId: true
});

export const UpdateTodoSchema = createUpdateSchema(todoTable)
	.omit({
		userId: true
	})
	.required({
		id: true
	});

export const DeleteTodoSchema = TodoSchema.pick({ id: true });
