import { Link as TanstackLink, useMatchRoute } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "@/packages/design-system/components/ui/link";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/packages/design-system/components/ui/sidebar";

const coreItems = [
	{
		title: "Home",
		url: "/design"
	},
	{
		title: "Typography",
		url: "/typography"
	}
];

const componentsItems = [
	{
		title: "Alert Dialog",
		url: "/alert-dialog"
	},
	{
		title: "Alert",
		url: "/alert"
	},
	{
		title: "Avatar",
		url: "/avatar"
	},
	{
		title: "Badge",
		url: "/badge"
	},
	{
		title: "Button",
		url: "/button"
	},
	{
		title: "Button Group",
		url: "/button-group"
	},
	{
		title: "Calendar",
		url: "/calendar"
	},
	{
		title: "Card",
		url: "/card"
	},
	{
		title: "Checkbox",
		url: "/checkbox"
	},
	{
		title: "Collapsible",
		url: "/collapsible"
	},
	{
		title: "Combobox",
		url: "/combobox"
	},
	{
		title: "Color Picker",
		url: "/color-picker"
	},
	{
		title: "Dialog",
		url: "/dialog"
	},
	{
		title: "Dropdown Menu",
		url: "/dropdown-menu"
	},
	{
		title: "Empty",
		url: "/empty"
	},
	{
		title: "Field",
		url: "/field"
	},
	{
		title: "Input",
		url: "/input"
	},
	{
		title: "Input Group",
		url: "/input-group"
	},
	{
		title: "Input OTP",
		url: "/input-otp"
	},
	{
		title: "Item",
		url: "/item"
	},
	{
		title: "Kbd",
		url: "/kbd"
	},
	{
		title: "Label",
		url: "/label"
	},
	{
		title: "Link",
		url: "/link"
	},
	{
		title: "Native Select",
		url: "/native-select"
	},
	{
		title: "Popover",
		url: "/popover"
	},
	{
		title: "Radio Group",
		url: "/radio-group"
	},
	{
		title: "Select",
		url: "/select"
	},
	{
		title: "Separator",
		url: "/separator"
	},
	{
		title: "Sheet",
		url: "/sheet"
	},
	{
		title: "Sidebar",
		url: "/sidebar"
	},
	{
		title: "Skeleton",
		url: "/skeleton"
	},
	{
		title: "Slider",
		url: "/slider"
	},
	{
		title: "Sonner",
		url: "/sonner"
	},
	{
		title: "Spinner",
		url: "/spinner"
	},
	{
		title: "Switch",
		url: "/switch"
	},
	{
		title: "Table",
		url: "/table"
	},
	{
		title: "Tabs",
		url: "/tabs"
	},
	{
		title: "Textarea",
		url: "/textarea"
	},
	{
		title: "Tooltip",
		url: "/tooltip"
	}
];

export function DesignSidebar() {
	const matchRoute = useMatchRoute();

	return (
		<Sidebar>
			<SidebarHeader className="flex-row">
				<Link
					to="/calendar"
					variant="ghost"
					size="xs"
					startIcon={<ChevronLeftIcon />}
				>
					Back to app
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Core</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{coreItems.map(item => {
								const isActive = !!matchRoute({ to: item.url, fuzzy: false });
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											size="sm"
											isActive={isActive}
											render={
												<TanstackLink to={item.url}>{item.title}</TanstackLink>
											}
										/>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Components</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{componentsItems.map(item => {
								const isActive = !!matchRoute({ to: item.url, fuzzy: false });
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											size="sm"
											isActive={isActive}
											render={
												<TanstackLink to={item.url}>{item.title}</TanstackLink>
											}
										/>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
