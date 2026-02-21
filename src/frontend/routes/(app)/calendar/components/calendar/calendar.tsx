import { useCurrentTime } from "@/frontend/hooks/use-current-time";
import { EventsLayer } from "@/frontend/routes/(app)/calendar/components/calendar/events";
import {
	DAYS_IN_WEEK,
	HOURS_IN_DAY,
	hours
} from "@/frontend/routes/(app)/calendar/utils/constants";
import { cn } from "@/packages/design-system/lib/utils";

export function Calendar() {
	return (
		<div className="flex flex-1 overflow-y-auto overscroll-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
			<TimeColumn />
			<CalendarGrid />
		</div>
	);
}

function TimeColumn() {
	return (
		<div className="relative grid grid-rows-[repeat(24,48px)]">
			{Array.from({ length: HOURS_IN_DAY }).map((_, hourIndex) => (
				<div
					key={`hour-${
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed array
						hourIndex
					}`}
					className={cn(
						"flex items-end gap-1 pr-0.5 pl-6.5 font-features-['ss01'] font-medium text-4xs text-muted-foreground"
					)}
				>
					<span className="min-w-11 translate-y-2 px-1 text-right">
						{hours[hourIndex]}
					</span>
				</div>
			))}
		</div>
	);
}

function CalendarGrid() {
	return (
		<div className="relative grid flex-1 grid-cols-[repeat(7,1fr)]">
			{Array.from({ length: HOURS_IN_DAY }).map((_, hourIndex) => (
				<>
					{Array.from({ length: DAYS_IN_WEEK }).map((_, dayIndex) => (
						<div
							key={`hour-${hourIndex}-day-${
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed array
								dayIndex
							}`}
							className={cn(
								"h-12 border-border/55 border-l dark:border-border/30",
								hourIndex !== HOURS_IN_DAY - 1 && "border-b",
								(dayIndex === 0 || dayIndex === 6) && "bg-background2"
							)}
						/>
					))}
				</>
			))}
			<CurrentTimeIndicator />
			<EventsLayer />
		</div>
	);
}

function CurrentTimeIndicator() {
	const currentTime = useCurrentTime();

	return (
		<div
			className="pointer-events-none absolute z-50 flex w-full"
			style={{
				top: `${48 * currentTime.hour + 48 * (currentTime.minute / 60)}px`
			}}
		>
			<div className="relative grid w-full grid-cols-[repeat(7,1fr)]">
				{Array.from({ length: DAYS_IN_WEEK }).map((_, dayIndex) => (
					<div
						key={`current-time-indicator-${
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed array
							dayIndex
						}`}
						className="w-full"
					>
						{dayIndex === currentTime.localWeekday - 1 ? (
							<div className="relative w-full">
								<div className="absolute left-0 h-3.5 w-1.25 -translate-y-1/2 rounded-sm border border-background bg-secondary" />
								<div className="absolute left-1 h-1 w-[calc(100%-3px)] -translate-y-1/2 rounded-r-sm border border-background border-l-0 bg-secondary" />
							</div>
						) : (
							<div className="h-0.25 w-full -translate-y-1/2 bg-secondary opacity-50" />
						)}
					</div>
				))}
			</div>
			<div className="absolute left-0 z-50 flex -translate-x-full -translate-y-1/2 pr-0.25">
				<span className="w-fit rounded-sm bg-secondary px-1.25 py-0.25 font-features-['ss01'] font-medium text-4xs text-secondary-foreground">
					{currentTime.toFormat("h:mm a")}
				</span>
			</div>
		</div>
	);
}
