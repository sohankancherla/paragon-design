import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { toast } from "sonner";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/packages/design-system/components/ui/alert-dialog";
import { orpc } from "@/packages/orpc/orpc";

export function DeleteCalendarDialog({
	calendarListId,
	calendarName
}: {
	calendarListId: string;
	calendarName: string;
}) {
	const Route = getRouteApi("/(app)/calendar");
	const { queryClient } = Route.useRouteContext();

	const deleteCalendar = useMutation(
		orpc.calendar.delete.mutationOptions({
			onSuccess: () => {
				toast.success(`Calendar ${calendarName} deleted successfully`);
			},
			onError: () => {
				toast.error(`Failed to delete calendar ${calendarName}`);
			},
			onSettled: () => {
				queryClient.invalidateQueries(
					orpc.calendar.list.queryOptions({ input: {} })
				);
			}
		})
	);

	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>
					Delete the calendar &quot;{calendarName}&quot;?
				</AlertDialogTitle>
				<AlertDialogDescription>
					This will permanently delete this calendar and all its events.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
				<AlertDialogAction
					variant="destructive"
					isLoading={deleteCalendar.isPending}
					onClick={() => deleteCalendar.mutate({ id: calendarListId })}
				>
					Delete
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}
