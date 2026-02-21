import { useQuery } from "@tanstack/react-query";
import {
	MoreHorizontalIcon,
	PencilIcon,
	Trash2Icon,
	TriangleIcon
} from "lucide-react";
import { useState } from "react";
import { CreateCalendarDialog } from "@/frontend/routes/(app)/calendar/components/sidebar/create-calendar-dialog";
import { DeleteCalendarDialog } from "@/frontend/routes/(app)/calendar/components/sidebar/delete-calendar.dialog";
import { UpdateCalendarDialog } from "@/frontend/routes/(app)/calendar/components/sidebar/update-calendar-dialog";
import { Button } from "@/packages/design-system/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "@/packages/design-system/components/ui/collapsible";
import {
	Dialog,
	DialogTrigger
} from "@/packages/design-system/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/packages/design-system/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/packages/design-system/components/ui/sidebar";
import { cn } from "@/packages/design-system/lib/utils";
import { orpc } from "@/packages/orpc/orpc";

const calendarGroups = ["Calendars"];

export function CalendarListView() {
	const {
		data: calendarLists,
		isPending,
		isError
	} = useQuery(orpc.calendar.list.queryOptions({ input: {} }));

	// TODO: Add a better loading and error state
	if (isPending) {
		return null;
	}

	if (isError) {
		return <div>Error loading calendar lists</div>;
	}

	return (
		<>
			{calendarGroups.map(group => (
				<SidebarGroup key={group}>
					<Collapsible defaultOpen className="group/collapsible">
						<CollapsibleTrigger
							nativeButton={false}
							render={
								<div className="group/trigger flex h-7 w-full select-none items-center justify-between rounded-md pr-1 pl-2 hover:bg-muted">
									<div className="flex items-center gap-1.5">
										<SidebarGroupLabel className="px-0 text-2xs">
											{group}
										</SidebarGroupLabel>
										<TriangleIcon className="hidden size-1.5 rotate-90 fill-current text-muted-foreground transition-transform duration-100 group-hover/trigger:block group-data-open/collapsible:rotate-180" />
									</div>
									<CreateCalendarDialog />
								</div>
							}
						/>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{calendarLists.map(calendarList => (
										<CalendarListItem
											key={calendarList.id}
											calendarList={calendarList}
										/>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</Collapsible>
				</SidebarGroup>
			))}
		</>
	);
}

type CalendarListItemProps = {
	calendarList: {
		id: string;
		calendarId: string;
		displayName: string;
		color: string;
		timezone: string;
		is_visible: boolean;
	};
};
function CalendarListItem({ calendarList }: CalendarListItemProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<SidebarMenuItem key={calendarList.id}>
			<SidebarMenuButton
				render={<div />}
				size="sm"
				isActive={isMenuOpen}
				className={cn(
					"group/item justify-between pr-1 font-medium",
					!calendarList.is_visible && "text-muted-foreground/40"
				)}
			>
				<div className="flex items-center gap-2">
					<div
						className="size-3 rounded-sm"
						style={{
							backgroundColor: calendarList.color,
							opacity: calendarList.is_visible ? 1 : 0.4
						}}
					/>
					{calendarList.displayName}
				</div>
				<CalendarListActionDropdown
					calendarList={calendarList}
					onOpenChange={setIsMenuOpen}
				/>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

type DialogType = "update" | "delete";

type CalendarListActionDropdownProps = {
	calendarList: {
		id: string;
		displayName: string;
		color: string;
		timezone: string;
	};
	onOpenChange?: (open: boolean) => void;
};

function CalendarListActionDropdown({
	calendarList,
	onOpenChange
}: CalendarListActionDropdownProps) {
	const [dialog, setDialog] = useState<DialogType | null>(null);

	return (
		<Dialog
			open={dialog !== null}
			onOpenChange={open => {
				if (!open) {
					setDialog(null);
				}
			}}
		>
			<DropdownMenu onOpenChange={onOpenChange}>
				<DropdownMenuTrigger
					render={
						<Button
							variant="ghost"
							size="icon-3xs"
							className="opacity-0 hover:bg-muted-foreground/15 group-hover/item:opacity-100 aria-expanded:bg-muted-foreground/15 aria-expanded:opacity-100"
							onClick={e => {
								e.stopPropagation();
							}}
						>
							<MoreHorizontalIcon />
						</Button>
					}
				>
					<MoreHorizontalIcon />
				</DropdownMenuTrigger>
				<DropdownMenuContent side="right">
					<DialogTrigger
						onClick={() => setDialog("update")}
						render={
							<DropdownMenuItem>
								<PencilIcon />
								Edit
							</DropdownMenuItem>
						}
					/>
					<DialogTrigger
						onClick={() => setDialog("delete")}
						render={
							<DropdownMenuItem variant="destructive">
								<Trash2Icon />
								Delete
							</DropdownMenuItem>
						}
					/>
				</DropdownMenuContent>
			</DropdownMenu>
			{dialog === "update" && (
				<UpdateCalendarDialog calendarList={calendarList} />
			)}
			{dialog === "delete" && (
				<DeleteCalendarDialog
					calendarListId={calendarList.id}
					calendarName={calendarList.displayName}
				/>
			)}
		</Dialog>
	);
}
