import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "@/backend/base";
import { authMiddleware } from "@/backend/middleware/auth-middleware";
import { securityMiddleware } from "@/backend/middleware/security-middleware";
import {
	CreateTodoSchema,
	DeleteTodoSchema,
	ListTodosSchema,
	TodoSchema,
	UpdateTodoSchema
} from "@/backend/schemas/todo-schemas";
import { db } from "@/packages/db/drizzle";
import { todo as todoTable } from "@/packages/db/schema";

const listTodos = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(ListTodosSchema)
	.output(z.array(TodoSchema))
	.handler(async ({ context }) => {
		const todos = await db
			.select()
			.from(todoTable)
			.where(eq(todoTable.userId, context.user.id));
		return todos;
	});

const createTodo = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(CreateTodoSchema)
	.output(TodoSchema)
	.handler(async ({ input, context }) => {
		const [todo] = await db
			.insert(todoTable)
			.values({ ...input, userId: context.user.id })
			.returning();
		return todo;
	});

const updateTodo = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(UpdateTodoSchema)
	.output(TodoSchema)
	.handler(async ({ input, context, errors }) => {
		const { id, ...updateData } = input;

		const [todo] = await db
			.update(todoTable)
			.set({ ...updateData })
			.where(and(eq(todoTable.id, id), eq(todoTable.userId, context.user.id)))
			.returning();

		if (!todo) {
			throw errors.NOT_FOUND();
		}

		return todo;
	});

const deleteTodo = base
	.use(authMiddleware)
	.use(securityMiddleware)
	.input(DeleteTodoSchema)
	.output(z.object({ success: z.boolean() }))
	.handler(async ({ input, context, errors }) => {
		const [result] = await db
			.delete(todoTable)
			.where(
				and(eq(todoTable.id, input.id), eq(todoTable.userId, context.user.id))
			)
			.returning();

		if (!result) {
			throw errors.NOT_FOUND();
		}

		return { success: true };
	});

export const todo = {
	list: listTodos,
	create: createTodo,
	update: updateTodo,
	delete: deleteTodo
};
