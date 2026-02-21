import { ChevronsUpDownIcon } from "lucide-react";
import { useSelectedDate } from "@/frontend/hooks/use-selected-date";
import { CalendarListView } from "@/frontend/routes/(app)/calendar/components/sidebar/calendar-list-view";
import { CreateEventDialog } from "@/frontend/routes/(app)/calendar/components/sidebar/create-event-dialog";
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/packages/design-system/components/ui/avatar";
import { Calendar } from "@/packages/design-system/components/ui/calendar";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/packages/design-system/components/ui/sidebar";
import { ParagonAbstract } from "@/packages/design-system/icons/paragon-abstract";

export function CalendarSidebar() {
	const { selectedDate, selectedWeekDates, setSelectedDate } =
		useSelectedDate();

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center justify-between gap-2">
					<ParagonAbstract className="ml-1.5 size-5" />
					<CreateEventDialog />
				</div>
				<Calendar
					mode="single"
					required
					fixedWeeks
					todayStyle="background"
					tooltip
					defaultMonth={selectedDate}
					selected={selectedDate}
					onSelect={setSelectedDate}
					modifiers={{
						daysSelected: selectedWeekDates
					}}
					className="mt-2 bg-sidebar px-0.5 py-0"
				/>
			</SidebarHeader>
			<SidebarContent>
				<CalendarListView />
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="rounded-lg" size="lg">
							<Avatar className="size-7">
								<AvatarImage
									alt="User Avatar"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								/>
								<AvatarFallback>S</AvatarFallback>
							</Avatar>
							<div className="grid">
								<span className="truncate font-medium text-xs">John Doe</span>
								<span className="truncate text-2xs text-muted-foreground">
									Free
								</span>
							</div>
							<ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
