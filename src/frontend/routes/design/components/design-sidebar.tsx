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
		url: "/design/typography"
	}
];

const componentsItems = [
	{
		title: "Alert Dialog",
		url: "/design/alert-dialog"
	},
	{
		title: "Alert",
		url: "/design/alert"
	},
	{
		title: "Avatar",
		url: "/design/avatar"
	},
	{
		title: "Badge",
		url: "/design/badge"
	},
	{
		title: "Button",
		url: "/design/button"
	},
	{
		title: "Button Group",
		url: "/design/button-group"
	},
	{
		title: "Calendar",
		url: "/design/calendar"
	},
	{
		title: "Card",
		url: "/design/card"
	},
	{
		title: "Checkbox",
		url: "/design/checkbox"
	},
	{
		title: "Collapsible",
		url: "/design/collapsible"
	},
	{
		title: "Combobox",
		url: "/design/combobox"
	},
	{
		title: "Color Picker",
		url: "/design/color-picker"
	},
	{
		title: "Dialog",
		url: "/design/dialog"
	},
	{
		title: "Dropdown Menu",
		url: "/design/dropdown-menu"
	},
	{
		title: "Empty",
		url: "/design/empty"
	},
	{
		title: "Field",
		url: "/design/field"
	},
	{
		title: "Input",
		url: "/design/input"
	},
	{
		title: "Input Group",
		url: "/design/input-group"
	},
	{
		title: "Input OTP",
		url: "/design/input-otp"
	},
	{
		title: "Item",
		url: "/design/item"
	},
	{
		title: "Kbd",
		url: "/design/kbd"
	},
	{
		title: "Label",
		url: "/design/label"
	},
	{
		title: "Link",
		url: "/design/link"
	},
	{
		title: "Native Select",
		url: "/design/native-select"
	},
	{
		title: "Popover",
		url: "/design/popover"
	},
	{
		title: "Radio Group",
		url: "/design/radio-group"
	},
	{
		title: "Select",
		url: "/design/select"
	},
	{
		title: "Separator",
		url: "/design/separator"
	},
	{
		title: "Sheet",
		url: "/design/sheet"
	},
	{
		title: "Sidebar",
		url: "/design/sidebar"
	},
	{
		title: "Skeleton",
		url: "/design/skeleton"
	},
	{
		title: "Slider",
		url: "/design/slider"
	},
	{
		title: "Sonner",
		url: "/design/sonner"
	},
	{
		title: "Spinner",
		url: "/design/spinner"
	},
	{
		title: "Switch",
		url: "/design/switch"
	},
	{
		title: "Table",
		url: "/design/table"
	},
	{
		title: "Tabs",
		url: "/design/tabs"
	},
	{
		title: "Textarea",
		url: "/design/textarea"
	},
	{
		title: "Tooltip",
		url: "/design/tooltip"
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
