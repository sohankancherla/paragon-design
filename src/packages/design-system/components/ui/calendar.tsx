import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { type ComponentProps, useEffect, useRef } from "react";
import {
	type DayButton,
	DayPicker,
	getDefaultClassNames
} from "react-day-picker";
import {
	Button,
	buttonVariants
} from "@/packages/design-system/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/packages/design-system/components/ui/tooltip";
import { cn } from "@/packages/design-system/lib/utils";

type TodayStyle = "underline" | "background";

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	todayStyle = "underline",
	tooltip = false,
	formatters,
	components,
	...props
}: ComponentProps<typeof DayPicker> & {
	buttonVariant?: ComponentProps<typeof Button>["variant"];
	todayStyle?: TodayStyle;
	tooltip?: boolean;
}) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				"group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent p-3 [--cell-height:--spacing(7)] [--cell-width:--spacing(8)]",
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: date =>
					date.toLocaleString("default", { month: "short" }),
				...formatters
			}}
			classNames={{
				root: cn("w-fit", defaultClassNames.root),
				months: cn(
					"relative flex flex-col gap-4 md:flex-row",
					defaultClassNames.months
				),
				month: cn("flex w-full flex-col", defaultClassNames.month),
				nav: cn(
					"absolute inset-x-0 top-0 flex w-full items-center justify-end px-0.5",
					defaultClassNames.nav
				),
				button_previous: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-6.5 select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_previous
				),
				button_next: cn(
					buttonVariants({ variant: buttonVariant }),
					"size-6.5 select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_next
				),
				month_caption: cn(
					"flex h-(--cell-height) w-full items-center px-[calc((var(--cell-width)-16px)/2)]",
					defaultClassNames.month_caption
				),
				dropdowns: cn(
					"flex h-(--cell-height) w-full items-center gap-1.5",
					defaultClassNames.dropdowns
				),
				dropdown_root: cn(
					"cn-calendar-dropdown-root relative rounded-lg",
					defaultClassNames.dropdown_root
				),
				dropdown: cn(
					"absolute inset-0 bg-popover opacity-0",
					defaultClassNames.dropdown
				),
				caption_label: cn(
					"select-none font-medium",
					captionLayout === "label"
						? "text-xs"
						: "cn-calendar-caption-label flex items-center gap-1 rounded-lg text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
					defaultClassNames.caption_label
				),
				table: "w-full border-collapse",
				weekdays: cn("flex", defaultClassNames.weekdays),
				weekday: cn(
					"my-1.5 flex-1 select-none items-center justify-center rounded-lg font-medium text-4xs text-muted-foreground leading-none",
					defaultClassNames.weekday
				),
				week: cn("flex w-full", defaultClassNames.week),
				week_number_header: cn(
					"w-(--cell-width) select-none",
					defaultClassNames.week_number_header
				),
				week_number: cn(
					"select-none text-2xs text-muted-foreground",
					defaultClassNames.week_number
				),
				day: cn(
					"group/day relative aspect-square h-(--cell-height) w-(--cell-width) select-none rounded-lg p-0 text-center text-accent-foreground [&:last-child[data-selected=true]_button]:rounded-r-lg",
					props.showWeekNumber
						? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-lg"
						: "[&:first-child[data-selected=true]_button]:rounded-l-lg",
					defaultClassNames.day
				),
				range_start: cn(
					"rounded-none rounded-l-lg bg-muted [&:not(:has(+.bg-muted))]:rounded-r-lg",
					defaultClassNames.range_start
				),
				range_middle: cn(
					"rounded-none bg-muted [&:not(.bg-muted+.bg-muted)]:rounded-l-lg [&:not(:has(+.bg-muted))]:rounded-r-lg",
					defaultClassNames.range_middle
				),
				range_end: cn(
					"rounded-none rounded-r-lg bg-muted [&:not(.bg-muted+.bg-muted)]:rounded-l-lg",
					defaultClassNames.range_end
				),
				today: defaultClassNames.today,
				outside: cn(
					"text-muted-foreground/60 aria-selected:text-muted-foreground/60",
					defaultClassNames.outside
				),
				disabled: cn(
					"text-muted-foreground opacity-50",
					defaultClassNames.disabled
				),
				hidden: cn("invisible", defaultClassNames.hidden),
				...classNames
			}}
			modifiersClassNames={{
				daysSelected:
					"bg-muted rounded-none [&:not(.bg-muted+.bg-muted)]:rounded-l-lg [&:not(:has(+.bg-muted))]:rounded-r-lg"
			}}
			components={{
				Root: ({ className, rootRef, ...props }) => (
					<div
						data-slot="calendar"
						ref={rootRef}
						className={cn(className)}
						{...props}
					/>
				),
				...(tooltip && {
					PreviousMonthButton: ({ children, ...props }) => (
						<Tooltip>
							<TooltipTrigger render={<button {...props}>{children}</button>} />
							<TooltipContent side="top">Go to previous month</TooltipContent>
						</Tooltip>
					),
					NextMonthButton: ({ children, ...props }) => (
						<Tooltip>
							<TooltipTrigger render={<button {...props}>{children}</button>} />
							<TooltipContent side="top">Go to next month</TooltipContent>
						</Tooltip>
					)
				}),
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return (
							<ChevronUpIcon
								aria-label="Go to previous month"
								className={cn("size-4", className)}
								{...props}
							/>
						);
					}

					if (orientation === "right") {
						return (
							<ChevronDownIcon
								aria-label="Go to next month"
								className={cn("size-4", className)}
								{...props}
							/>
						);
					}

					return (
						<ChevronDownIcon
							aria-label="Go to next month"
							className={cn("size-4", className)}
							{...props}
						/>
					);
				},
				DayButton: props => (
					<CalendarDayButton {...props} todayStyle={todayStyle} />
				),
				WeekNumber: ({ children, ...props }) => (
					<td {...props}>
						<div className="flex h-(--cell-height) w-(--cell-width) items-center justify-center text-center">
							{children}
						</div>
					</td>
				),
				...components
			}}
			{...props}
		/>
	);
}

function CalendarDayButton({
	className,
	day,
	modifiers,
	todayStyle = "underline",
	...props
}: ComponentProps<typeof DayButton> & {
	todayStyle?: TodayStyle;
}) {
	const defaultClassNames = getDefaultClassNames();

	const ref = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (modifiers.focused) {
			ref.current?.focus();
		}
	}, [modifiers.focused]);

	return (
		<Button
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle &&
				(todayStyle === "underline" || !modifiers.today)
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cn(
				"relative isolate z-10 flex h-(--cell-height) w-(--cell-width) gap-1 rounded-lg border-0 bg-clip-content p-0.75 font-features-['ss01'] text-2xs text-current leading-none tracking-wide hover:text-current data-[range-end=true]:bg-primary data-[range-start=true]:bg-primary data-[selected-single=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-start=true]:text-primary-foreground data-[selected-single=true]:text-primary-foreground group-data-[focused=true]/day:focus-visible:relative group-data-[focused=true]/day:focus-visible:z-10 group-data-[focused=true]/day:focus-visible:border-ring group-data-[focused=true]/day:focus-visible:ring-[3px] group-data-[focused=true]/day:focus-visible:ring-ring/50 [&>span]:text-xs",
				defaultClassNames.day,
				modifiers.daysSelected &&
					"hover:bg-muted-foreground/15 data-[selected-single=true]:bg-transparent data-[selected-single=true]:text-current data-[selected-single=true]:hover:bg-muted-foreground/15",
				modifiers.today &&
					(todayStyle === "background"
						? "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground"
						: "underline decoration-secondary underline-offset-2"),
				className
			)}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
