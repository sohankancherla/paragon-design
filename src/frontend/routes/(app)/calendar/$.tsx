import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { parseDateFromSplat } from "@/frontend/hooks/use-selected-date";
import { Calendar } from "@/frontend/routes/(app)/calendar/components/calendar/calendar";
import { CalendarHeader } from "@/frontend/routes/(app)/calendar/components/calendar/calendar-header";
import { PageHeader } from "@/frontend/routes/(app)/calendar/components/calendar/page-header";

export const Route = createFileRoute("/(app)/calendar/$")({
	component: RouteComponent
});

function RouteComponent() {
	const { _splat } = Route.useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const date = parseDateFromSplat(_splat);

		if (!date) {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const currentDate = DateTime.now().setZone(timeZone);

			navigate({
				to: "/calendar/$",
				params: {
					_splat: `${currentDate.month}/${currentDate.day}/${currentDate.year}`
				},
				replace: true
			});
		}
	}, [_splat, navigate]);

	return (
		<main className="flex h-svh w-full select-none flex-col overflow-hidden">
			<PageHeader />
			<CalendarHeader />
			<Calendar />
		</main>
	);
}
