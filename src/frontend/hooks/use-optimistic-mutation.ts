import type { GeneralUtils, ProcedureUtils } from "@orpc/tanstack-query";
import type { QueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

type ItemWithId = { id: string };

type Procedure<TInput, TOutput, TErrors> = ProcedureUtils<
	Record<never, never>,
	TInput,
	TOutput,
	TErrors
> &
	GeneralUtils<TInput>;

type OptimisticMutationProps<
	TMutationInput,
	TMutationOutput,
	TMutationErrors,
	TQueryInput,
	TQueryOutput extends ItemWithId[],
	TQueryErrors
> = {
	queryClient: QueryClient;
	rootProcedureKey: readonly unknown[];
	mutationProcedure: Procedure<
		TMutationInput,
		TMutationOutput,
		TMutationErrors
	>;
	queryInvalidateProcedure: Procedure<TQueryInput, TQueryOutput, TQueryErrors>;
	queryInvalidateKeyInput: TQueryInput;
} & (
	| { type: "create"; defaultCreateItem: Omit<TQueryOutput[number], "id"> }
	| { type: "update" | "delete"; defaultCreateItem?: never }
);

export function useOptimisticMutation<
	TMutationInput,
	TMutationOutput,
	TMutationErrors,
	TQueryInput,
	TQueryOutput extends ItemWithId[],
	TQueryErrors
>({
	type,
	queryClient,
	rootProcedureKey,
	mutationProcedure,
	queryInvalidateProcedure,
	queryInvalidateKeyInput,
	defaultCreateItem
}: OptimisticMutationProps<
	TMutationInput,
	TMutationOutput,
	TMutationErrors,
	TQueryInput,
	TQueryOutput,
	TQueryErrors
>) {
	return useMutation(
		mutationProcedure.mutationOptions({
			onMutate: async mutatedItem => {
				// Cancel any outgoing refetches
				await queryClient.cancelQueries({
					queryKey: queryInvalidateProcedure.key()
				});

				// Get full matching key
				const queryKey = queryInvalidateProcedure.queryKey({
					input: queryInvalidateKeyInput
				});

				// Get rollback item
				let rollbackItem: TQueryOutput[number] | undefined;

				// Optimistically update to the new value
				switch (type) {
					case "create": {
						rollbackItem = {
							...defaultCreateItem,
							...mutatedItem,
							id: crypto.randomUUID()
						};
						queryClient.setQueryData<TQueryOutput>(
							queryKey,
							prevItems =>
								prevItems?.concat({
									...rollbackItem
								} as TQueryOutput[number]) as TQueryOutput
						);
						break;
					}
					case "update": {
						const previousItems = queryClient.getQueryData(queryKey);
						rollbackItem = previousItems?.find(
							item => item.id === (mutatedItem as ItemWithId).id
						);
						queryClient.setQueryData<TQueryOutput>(
							queryKey,
							prevItems =>
								prevItems?.map(item =>
									item.id === (mutatedItem as ItemWithId).id
										? {
												...item,
												...mutatedItem
											}
										: item
								) as TQueryOutput
						);
						break;
					}
					case "delete": {
						const previousItems =
							queryClient.getQueryData<TQueryOutput>(queryKey);
						rollbackItem = previousItems?.find(
							item => item.id === (mutatedItem as ItemWithId).id
						);
						queryClient.setQueryData<TQueryOutput>(
							queryKey,
							prevItems =>
								prevItems?.filter(
									item => item.id !== (mutatedItem as ItemWithId).id
								) as TQueryOutput
						);
						break;
					}
					default:
						throw new Error(`Invalid type: ${type}`);
				}

				// Return item before mutation to be used in the onError callback
				return { rollbackItem };
			},
			onError: (_error, _mutatedItem, context) => {
				const rollbackItem = context?.rollbackItem;
				if (rollbackItem) {
					switch (type) {
						// Remove item from the query data
						case "create":
							queryClient.setQueryData<TQueryOutput>(
								queryInvalidateProcedure.queryKey({
									input: queryInvalidateKeyInput
								}),
								prevItems =>
									prevItems?.filter(
										item => item.id !== rollbackItem.id
									) as TQueryOutput
							);
							break;
						// Update item back to the original value in the query data
						case "update":
							queryClient.setQueryData<TQueryOutput>(
								queryInvalidateProcedure.queryKey({
									input: queryInvalidateKeyInput
								}),
								prevItems =>
									prevItems?.map(item =>
										item.id === rollbackItem.id ? rollbackItem : item
									) as TQueryOutput
							);
							break;
						// Add item back to the query data
						case "delete":
							queryClient.setQueryData<TQueryOutput>(
								queryInvalidateProcedure.queryKey({
									input: queryInvalidateKeyInput
								}),
								prevItems => prevItems?.concat(rollbackItem) as TQueryOutput
							);
							break;
						default:
							throw new Error(`Invalid type: ${type}`);
					}
				}
			},
			onSettled: () => {
				// Invalidate query if there are no concurrent mutations in progress
				if (queryClient.isMutating({ mutationKey: rootProcedureKey }) === 1) {
					queryClient.invalidateQueries({
						queryKey: queryInvalidateProcedure.key()
					});
				}
			}
		})
	);
}
