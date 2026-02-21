import { PlusIcon } from "lucide-react";
import { useCurrentTime } from "@/frontend/hooks/use-current-time";
import { useSelectedDate } from "@/frontend/hooks/use-selected-date";
import { Button } from "@/packages/design-system/components/ui/button";
import { cn } from "@/packages/design-system/lib/utils";

export function CalendarHeader() {
	return (
		<div className="grid grid-cols-[auto_repeat(7,1fr)]">
			<DaysOfWeek />
			<AllDay />
		</div>
	);
}

function DaysOfWeek() {
	const currentTime = useCurrentTime();
	const { selectedWeekDateTimes } = useSelectedDate();

	return (
		<>
			<div className="flex items-end gap-1 p-0.5">
				<Button variant="ghost" size="icon-3xs">
					<PlusIcon />
				</Button>
				<Button variant="ghost" size="3xs" className="w-11 justify-end">
					PST
				</Button>
			</div>
			{selectedWeekDateTimes.map(day => (
				<div
					key={day.toFormat("yyyy-MM-dd")}
					className={
						"flex h-7 items-center justify-center gap-1 font-[450] font-features-['ss01'] text-muted-foreground text-xs"
					}
				>
					<div
						className={cn(
							day.hasSame(currentTime, "day") && "font-medium text-foreground"
						)}
					>
						{day.toFormat("EEE")}
					</div>
					{day.hasSame(currentTime, "day") ? (
						<div className="flex size-5 items-center justify-center rounded-md bg-ring text-secondary-foreground">
							{day.toFormat("d")}
						</div>
					) : (
						day.toFormat("d")
					)}
				</div>
			))}
		</>
	);
}

function AllDay() {
	const { selectedWeekDateTimes } = useSelectedDate();

	return (
		<>
			<div className="flex min-h-6 items-center justify-end border-border/55 border-t border-b px-1.5 font-medium text-4xs text-muted-foreground dark:border-border/30">
				All-day
			</div>
			{selectedWeekDateTimes.map(day => (
				<div
					key={`all-day-${day.toFormat("yyyy-MM-dd")}`}
					className={cn(
						"min-h-6 border-border/55 border-t border-b border-l dark:border-border/30",
						day.isWeekend && "bg-background2"
					)}
				/>
			))}
		</>
	);
}
