import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { useOptimisticMutation } from "@/frontend/hooks/use-optimistic-mutation";
import { protectedRouteMiddleware } from "@/frontend/middleware/auth";
import { Button } from "@/packages/design-system/components/ui/button";
import { Input } from "@/packages/design-system/components/ui/input";
import { orpc } from "@/packages/orpc/orpc";

export const Route = createFileRoute("/(home)/")({
	component: HomePage,
	server: {
		middleware: [protectedRouteMiddleware]
	},
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(
			orpc.todo.list.queryOptions({ input: {} })
		);
	}
});

function HomePage() {
	const { queryClient } = Route.useRouteContext();

	const [title, setTitle] = useState("");

	const createTodo = useOptimisticMutation({
		type: "create",
		queryClient,
		rootProcedureKey: orpc.todo.key(),
		mutationProcedure: orpc.todo.create,
		queryInvalidateProcedure: orpc.todo.list,
		queryInvalidateKeyInput: {},
		defaultCreateItem: {
			userId: "",
			title: "",
			completed: false
		}
	});

	function handleCreateTodo() {
		if (!title.trim()) {
			return;
		}
		createTodo.mutate({ title });
		setTitle("");
	}

	return (
		<main className="max-w-lg space-y-8 p-8">
			<h1 className="header-1">To-Do List</h1>

			<div className="flex items-center gap-4">
				<Input
					type="text"
					maxLength={255}
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<Button type="button" onClick={handleCreateTodo}>
					Create
				</Button>
			</div>

			<Suspense fallback={<div>Loading todos...</div>}>
				<TodoList />
			</Suspense>
		</main>
	);
}

function TodoList() {
	const homeRoute = getRouteApi("/(home)/");
	const { queryClient } = homeRoute.useRouteContext();

	const { data: todos } = useSuspenseQuery(
		orpc.todo.list.queryOptions({ input: {} })
	);

	const updateTodo = useOptimisticMutation({
		type: "update",
		queryClient,
		rootProcedureKey: orpc.todo.key(),
		mutationProcedure: orpc.todo.update,
		queryInvalidateProcedure: orpc.todo.list,
		queryInvalidateKeyInput: {}
	});

	const deleteTodo = useOptimisticMutation({
		type: "delete",
		queryClient,
		rootProcedureKey: orpc.todo.key(),
		mutationProcedure: orpc.todo.delete,
		queryInvalidateProcedure: orpc.todo.list,
		queryInvalidateKeyInput: {}
	});

	return (
		<ul className="space-y-2">
			{todos.map(todo => (
				<li key={todo.id} className="flex w-full items-center justify-between">
					<div className="flex items-center gap-4">
						<Input
							type="checkbox"
							checked={todo.completed}
							onChange={() =>
								updateTodo.mutate({ id: todo.id, completed: !todo.completed })
							}
							className="size-4"
						/>
						<span>{todo.title}</span>
					</div>
					<Button
						type="button"
						variant="destructive"
						onClick={() => deleteTodo.mutate({ id: todo.id })}
					>
						Delete
					</Button>
				</li>
			))}
		</ul>
	);
}
