import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCurrentTime } from "@/frontend/hooks/use-current-time";
import { useSelectedDate } from "@/frontend/hooks/use-selected-date";
import { Button } from "@/packages/design-system/components/ui/button";
import { cn } from "@/packages/design-system/lib/utils";

export function PageHeader() {
	const currentTime = useCurrentTime();
	const { selectedDateTime, setSelectedDate } = useSelectedDate();

	return (
		<div
			className={cn("flex shrink-0 items-start justify-between px-2 pt-2 pb-3")}
		>
			<div className="flex items-center gap-2">
				<h1 className="ml-2 pt-6 font-bold font-features-['ss01'] text-2xl tracking-tight">
					{selectedDateTime.toFormat("MMMM yyyy")}
				</h1>
			</div>
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-1.5">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setSelectedDate(currentTime.toJSDate())}
					>
						Today
					</Button>
				</div>
				<div className="flex items-center gap-0.5">
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() =>
							setSelectedDate(
								selectedDateTime
									.startOf("week", { useLocaleWeeks: true })
									.minus({ weeks: 1 })
									.toJSDate()
							)
						}
					>
						<ChevronLeftIcon />
					</Button>
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() =>
							setSelectedDate(
								selectedDateTime
									.startOf("week", { useLocaleWeeks: true })
									.plus({ weeks: 1 })
									.toJSDate()
							)
						}
					>
						<ChevronRightIcon />
					</Button>
				</div>
			</div>
		</div>
	);
}
