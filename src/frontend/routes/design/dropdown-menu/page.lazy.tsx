import { createLazyFileRoute } from "@tanstack/react-router";
import {
	ActivityIcon,
	ArchiveIcon,
	ArrowDownIcon,
	ArrowRightIcon,
	ArrowUpIcon,
	BadgeCheckIcon,
	BellIcon,
	Building2Icon,
	ChevronsUpDownIcon,
	ClipboardPasteIcon,
	CopyIcon,
	CreditCardIcon,
	DownloadIcon,
	EyeIcon,
	FileCodeIcon,
	FileIcon,
	FileTextIcon,
	FolderIcon,
	FolderOpenIcon,
	FolderSearchIcon,
	HelpCircleIcon,
	KeyboardIcon,
	LanguagesIcon,
	LayoutIcon,
	LogOutIcon,
	MailIcon,
	MessageSquareIcon,
	MonitorIcon,
	MoonIcon,
	MoreHorizontalIcon,
	PaletteIcon,
	PanelLeftIcon,
	PencilIcon,
	SaveIcon,
	ScissorsIcon,
	SettingsIcon,
	ShareIcon,
	ShieldIcon,
	SunIcon,
	TrashIcon,
	UserIcon,
	WalletIcon
} from "lucide-react";
import { useState } from "react";
import {
	Example,
	ExampleWrapper
} from "@/frontend/routes/design/components/example";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/packages/design-system/components/ui/alert-dialog";
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/packages/design-system/components/ui/avatar";
import { Button } from "@/packages/design-system/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/packages/design-system/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "@/packages/design-system/components/ui/dropdown-menu";

export const Route = createLazyFileRoute("/design/dropdown-menu/")({
	component: DropdownMenuPage
});

function DropdownMenuPage() {
	return (
		<ExampleWrapper title="Dropdown Menu">
			<DropdownMenuBasic />
			<DropdownMenuComplex />
			<DropdownMenuSides />
			<DropdownMenuWithIcons />
			<DropdownMenuWithShortcuts />
			<DropdownMenuWithSubmenu />
			<DropdownMenuWithCheckboxes />
			<DropdownMenuWithCheckboxesIcons />
			<DropdownMenuWithRadio />
			<DropdownMenuWithRadioIcons />
			<DropdownMenuWithDestructive />
			<DropdownMenuWithAvatar />
			<DropdownMenuInDialog />
		</ExampleWrapper>
	);
}

function DropdownMenuBasic() {
	return (
		<Example title="Basic">
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					Open
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>GitHub</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuItem disabled>API</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuSides() {
	return (
		<Example title="Sides" containerClassName="col-span-2">
			<div className="flex flex-wrap justify-center gap-2">
				{(
					[
						"inline-start",
						"left",
						"top",
						"bottom",
						"right",
						"inline-end"
					] as const
				).map(side => (
					<DropdownMenu key={side}>
						<DropdownMenuTrigger
							render={<Button variant="outline" className="w-fit capitalize" />}
						>
							{side.replace("-", " ")}
						</DropdownMenuTrigger>
						<DropdownMenuContent side={side}>
							<DropdownMenuGroup>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Billing</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				))}
			</div>
		</Example>
	);
}

function DropdownMenuWithIcons() {
	return (
		<Example title="With Icons">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Open
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<UserIcon />
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCardIcon />
						Billing
					</DropdownMenuItem>
					<DropdownMenuItem>
						<SettingsIcon />
						Settings
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive">
						<LogOutIcon />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithShortcuts() {
	return (
		<Example title="With Shortcuts">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Open
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuItem>
							Profile
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Billing
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Settings
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem>
							Keyboard shortcuts
							<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						Log out
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithSubmenu() {
	return (
		<Example title="With Submenu">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Open
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuItem>Team</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Email</DropdownMenuItem>
									<DropdownMenuItem>Message</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>More...</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuItem>
							New Team
							<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithCheckboxes() {
	const [showStatusBar, setShowStatusBar] = useState(true);
	const [showActivityBar, setShowActivityBar] = useState(false);
	const [showPanel, setShowPanel] = useState(false);

	return (
		<Example title="With Checkboxes">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Checkboxes
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-40">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Appearance</DropdownMenuLabel>
						<DropdownMenuCheckboxItem
							checked={showStatusBar}
							onCheckedChange={setShowStatusBar}
						>
							<LayoutIcon />
							Status Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showActivityBar}
							onCheckedChange={setShowActivityBar}
							disabled
						>
							<ActivityIcon />
							Activity Bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showPanel}
							onCheckedChange={setShowPanel}
						>
							<PanelLeftIcon />
							Panel
						</DropdownMenuCheckboxItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithRadio() {
	const [position, setPosition] = useState("bottom");

	return (
		<Example title="With Radio Group">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Radio Group
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
						<DropdownMenuRadioGroup
							value={position}
							onValueChange={setPosition}
						>
							<DropdownMenuRadioItem value="top">
								<ArrowUpIcon />
								Top
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="bottom">
								<ArrowDownIcon />
								Bottom
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="right" disabled>
								<ArrowRightIcon />
								Right
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithCheckboxesIcons() {
	const [notifications, setNotifications] = useState({
		email: true,
		sms: false,
		push: true
	});

	return (
		<Example title="Checkboxes with Icons">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Notifications
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-56">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
						<DropdownMenuCheckboxItem
							checked={notifications.email}
							onCheckedChange={checked =>
								setNotifications({ ...notifications, email: checked === true })
							}
						>
							<MailIcon />
							Email notifications
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={notifications.sms}
							onCheckedChange={checked =>
								setNotifications({ ...notifications, sms: checked === true })
							}
						>
							<MessageSquareIcon />
							SMS notifications
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={notifications.push}
							onCheckedChange={checked =>
								setNotifications({ ...notifications, push: checked === true })
							}
						>
							<BellIcon />
							Push notifications
						</DropdownMenuCheckboxItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithRadioIcons() {
	const [paymentMethod, setPaymentMethod] = useState("card");

	return (
		<Example title="Radio with Icons">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Payment Method
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-56">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
						<DropdownMenuRadioGroup
							value={paymentMethod}
							onValueChange={setPaymentMethod}
						>
							<DropdownMenuRadioItem value="card">
								<CreditCardIcon />
								Credit Card
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="paypal">
								<WalletIcon />
								PayPal
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="bank">
								<Building2Icon />
								Bank Transfer
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithDestructive() {
	return (
		<Example title="With Destructive Items">
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" className="w-fit" />}
				>
					Actions
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<PencilIcon />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem>
						<ShareIcon />
						Share
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<ArchiveIcon />
						Archive
					</DropdownMenuItem>
					<DropdownMenuItem variant="destructive">
						<TrashIcon />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Example>
	);
}

function DropdownMenuWithAvatar() {
	const menuContent = (
		<>
			<DropdownMenuGroup>
				<DropdownMenuItem>
					<BadgeCheckIcon />
					Account
				</DropdownMenuItem>
				<DropdownMenuItem>
					<CreditCardIcon />
					Billing
				</DropdownMenuItem>
				<DropdownMenuItem>
					<BellIcon />
					Notifications
				</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuItem>
				<LogOutIcon />
				Sign Out
			</DropdownMenuItem>
		</>
	);

	return (
		<Example title="With Avatar">
			<div className="flex items-center justify-between gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button
								variant="outline"
								className="h-12 justify-start px-2 md:max-w-[200px]"
							/>
						}
					>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
							<AvatarFallback className="rounded-lg">CN</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">shadcn</span>
							<span className="truncate text-muted-foreground text-xs">
								shadcn@example.com
							</span>
						</div>
						<ChevronsUpDownIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-(--anchor-width) min-w-56">
						{menuContent}
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button variant="ghost" size="icon" className="rounded-full" />
						}
					>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
							<AvatarFallback>LR</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" side="top">
						{menuContent}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</Example>
	);
}

function DropdownMenuInDialog() {
	return (
		<Example title="In Dialog">
			<Dialog>
				<DialogTrigger render={<Button variant="outline" />}>
					Open Dialog
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dropdown Menu Example</DialogTitle>
						<DialogDescription>
							Click the button below to see the dropdown menu.
						</DialogDescription>
					</DialogHeader>
					<DropdownMenu>
						<DropdownMenuTrigger
							render={<Button variant="outline" className="w-fit" />}
						>
							Open Menu
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<CopyIcon />
								Copy
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ScissorsIcon />
								Cut
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ClipboardPasteIcon />
								Paste
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem>Save Page...</DropdownMenuItem>
										<DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
										<DropdownMenuItem>Name Window...</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>Developer Tools</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
							<DropdownMenuSeparator />
							<DropdownMenuItem variant="destructive">
								<TrashIcon />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</DialogContent>
			</Dialog>
		</Example>
	);
}

type DialogType = "new-file" | "sign-out";

function DropdownMenuComplex() {
	const [notifications, setNotifications] = useState({
		email: true,
		sms: false,
		push: true
	});
	const [theme, setTheme] = useState("light");

	const [dialog, setDialog] = useState<DialogType | null>(null);

	return (
		<Example title="Complex">
			<Dialog>
				<DropdownMenu>
					<DropdownMenuTrigger render={<Button variant="outline" />}>
						Complex Menu
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuGroup>
							<DropdownMenuLabel>File</DropdownMenuLabel>
							<DialogTrigger
								onClick={() => setDialog("new-file")}
								render={
									<DropdownMenuItem>
										<FileIcon />
										New File
										<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
									</DropdownMenuItem>
								}
							/>
							<DropdownMenuItem>
								<FolderIcon />
								New Folder
								<DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<FolderOpenIcon />
									Open Recent
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuGroup>
											<DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
											<DropdownMenuItem>
												<FileCodeIcon />
												Project Alpha
											</DropdownMenuItem>
											<DropdownMenuItem>
												<FileCodeIcon />
												Project Beta
											</DropdownMenuItem>
											<DropdownMenuSub>
												<DropdownMenuSubTrigger>
													<MoreHorizontalIcon />
													More Projects
												</DropdownMenuSubTrigger>
												<DropdownMenuPortal>
													<DropdownMenuSubContent>
														<DropdownMenuItem>
															<FileCodeIcon />
															Project Gamma
														</DropdownMenuItem>
														<DropdownMenuItem>
															<FileCodeIcon />
															Project Delta
														</DropdownMenuItem>
													</DropdownMenuSubContent>
												</DropdownMenuPortal>
											</DropdownMenuSub>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<FolderSearchIcon />
												Browse...
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<SaveIcon />
								Save
								<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<DownloadIcon />
								Export
								<DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuLabel>View</DropdownMenuLabel>
							<DropdownMenuCheckboxItem
								checked={notifications.email}
								onCheckedChange={checked =>
									setNotifications({
										...notifications,
										email: checked === true
									})
								}
							>
								<EyeIcon />
								Show Sidebar
							</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem
								checked={notifications.sms}
								onCheckedChange={checked =>
									setNotifications({
										...notifications,
										sms: checked === true
									})
								}
							>
								<LayoutIcon />
								Show Status Bar
							</DropdownMenuCheckboxItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<PaletteIcon />
									Theme
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuGroup>
											<DropdownMenuLabel>Appearance</DropdownMenuLabel>
											<DropdownMenuRadioGroup
												value={theme}
												onValueChange={setTheme}
											>
												<DropdownMenuRadioItem value="light">
													<SunIcon />
													Light
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="dark">
													<MoonIcon />
													Dark
												</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="system">
													<MonitorIcon />
													System
												</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
										</DropdownMenuGroup>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuLabel>Account</DropdownMenuLabel>
							<DropdownMenuItem>
								<UserIcon />
								Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCardIcon />
								Billing
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<SettingsIcon />
									Settings
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuGroup>
											<DropdownMenuLabel>Preferences</DropdownMenuLabel>
											<DropdownMenuItem>
												<KeyboardIcon />
												Keyboard Shortcuts
											</DropdownMenuItem>
											<DropdownMenuItem>
												<LanguagesIcon />
												Language
											</DropdownMenuItem>
											<DropdownMenuSub>
												<DropdownMenuSubTrigger>
													<BellIcon />
													Notifications
												</DropdownMenuSubTrigger>
												<DropdownMenuPortal>
													<DropdownMenuSubContent>
														<DropdownMenuGroup>
															<DropdownMenuLabel>
																Notification Types
															</DropdownMenuLabel>
															<DropdownMenuCheckboxItem
																checked={notifications.push}
																onCheckedChange={checked =>
																	setNotifications({
																		...notifications,
																		push: checked === true
																	})
																}
															>
																<BellIcon />
																Push Notifications
															</DropdownMenuCheckboxItem>
															<DropdownMenuCheckboxItem
																checked={notifications.email}
																onCheckedChange={checked =>
																	setNotifications({
																		...notifications,
																		email: checked === true
																	})
																}
															>
																<MailIcon />
																Email Notifications
															</DropdownMenuCheckboxItem>
														</DropdownMenuGroup>
													</DropdownMenuSubContent>
												</DropdownMenuPortal>
											</DropdownMenuSub>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<ShieldIcon />
												Privacy & Security
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<HelpCircleIcon />
								Help & Support
							</DropdownMenuItem>
							<DropdownMenuItem>
								<FileTextIcon />
								Documentation
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<AlertDialogTrigger
								onClick={() => setDialog("sign-out")}
								render={
									<DropdownMenuItem variant="destructive">
										<LogOutIcon />
										Sign Out
										<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
									</DropdownMenuItem>
								}
							/>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				{dialog === "new-file" && (
					<DialogContent>
						<DialogHeader>
							<DialogTitle>New File</DialogTitle>
							<DialogDescription>
								Create a new file to get started.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button>Save changes</Button>
						</DialogFooter>
					</DialogContent>
				)}
				{dialog === "sign-out" && (
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				)}
			</Dialog>
		</Example>
	);
}
