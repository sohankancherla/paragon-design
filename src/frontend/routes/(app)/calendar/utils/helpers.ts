import { DateTime } from "luxon";
import type { z } from "zod";
import type { EventSchema } from "@/backend/schemas/event-schemas";

export function formatEventTime(start: DateTime, end: DateTime) {
	function formatPart(date: DateTime, includeAmPm: boolean) {
		const timeStr =
			date.minute === 0 ? date.toFormat("h") : date.toFormat("h:mm");
		return includeAmPm ? `${timeStr} ${date.toFormat("a")}` : timeStr;
	}

	const isSameAmPm = start.toFormat("a") === end.toFormat("a");

	if (isSameAmPm) {
		return `${formatPart(start, false)}-${formatPart(end, true)}`;
	}
	return `${formatPart(start, true)}-${formatPart(end, true)}`;
}

type Event = z.infer<typeof EventSchema> & {
	color: string;
};

export type PositionedEvent = Event & {
	column: number;
	top: number;
	height: number;
	left: number;
	width: number;
};

export function calculateEventPositions(events: Event[]): PositionedEvent[] {
	const CELL_HEIGHT = 48;

	return events.map(event => {
		const startDateTime = DateTime.fromJSDate(event.startTime);
		const endDateTime = DateTime.fromJSDate(event.endTime);
		const duration = endDateTime.diff(startDateTime).as("minutes");

		const weekStart = startDateTime.startOf("week", {
			useLocaleWeeks: true
		});
		const column = Math.round(
			startDateTime.startOf("day").diff(weekStart, "days").days
		);
		const top =
			CELL_HEIGHT * startDateTime.hour +
			CELL_HEIGHT * (startDateTime.minute / 60);
		const height = CELL_HEIGHT * (duration / 60) - 2.5;
		const left = 0;
		const width = 90;
		return { ...event, column, top, height, left, width };
	});
}
