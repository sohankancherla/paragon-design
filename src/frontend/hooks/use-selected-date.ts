import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { useCallback, useMemo } from "react";

const calendarRoute = getRouteApi("/(app)/calendar/$");

export function parseDateFromSplat(splat: string | undefined) {
	if (!splat) {
		return null;
	}
	const dateParams = splat.split("/");
	if (dateParams.length !== 3) {
		return null;
	}

	const month = Number(dateParams[0]);
	const day = Number(dateParams[1]);
	const year = Number(dateParams[2]);

	if (Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(year)) {
		return null;
	}

	const date = DateTime.fromObject({ month, day, year });

	return date.isValid ? date : null;
}

export function useSelectedDate() {
	const navigate = useNavigate();

	const { _splat } = calendarRoute.useParams();

	const [selectedDate, selectedDateTime] = useMemo(() => {
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const currentDate = DateTime.now().setZone(timeZone);

		const date = parseDateFromSplat(_splat) ?? currentDate;
		return [date.toJSDate(), date];
	}, [_splat]);

	const [selectedWeekDates, selectedWeekDateTimes] = useMemo(() => {
		return [
			Array.from({ length: 7 }, (_, index) => {
				return selectedDateTime
					.startOf("week", { useLocaleWeeks: true })
					.plus({ days: index })
					.toJSDate();
			}),
			Array.from({ length: 7 }, (_, index) => {
				return selectedDateTime
					.startOf("week", { useLocaleWeeks: true })
					.plus({ days: index });
			})
		];
	}, [selectedDateTime]);

	const setSelectedDate = useCallback(
		(date: Date) => {
			navigate({
				to: "/calendar/$",
				params: {
					_splat: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
				},
				replace: true
			});
		},
		[navigate]
	);

	return {
		selectedDate,
		selectedDateTime,
		selectedWeekDates,
		selectedWeekDateTimes,
		setSelectedDate
	};
}
