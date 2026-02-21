import { createLazyFileRoute } from "@tanstack/react-router";
import { BluetoothIcon, Trash2Icon } from "lucide-react";
import { Example, ExampleWrapper } from "@/frontend/components/example";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/packages/design-system/components/ui/alert-dialog";
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

export const Route = createLazyFileRoute("/alert-dialog/")({
	component: AlertDialogPage
});

function AlertDialogPage() {
	return (
		<ExampleWrapper title="Alert Dialog">
			<AlertDialogBasic />
			<AlertDialogSmall />
			<AlertDialogWithMedia />
			<AlertDialogSmallWithMedia />
			<AlertDialogDestructive />
			<AlertDialogInDialog />
		</ExampleWrapper>
	);
}

function AlertDialogBasic() {
	return (
		<Example title="Basic" className="items-center">
			<AlertDialog>
				<AlertDialogTrigger
					render={<Button variant="outline">Default</Button>}
				/>
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
			</AlertDialog>
		</Example>
	);
}

function AlertDialogSmall() {
	return (
		<Example title="Small" className="items-center">
			<AlertDialog>
				<AlertDialogTrigger render={<Button variant="outline">Small</Button>} />
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
						<AlertDialogDescription>
							Do you want to allow the USB accessory to connect to this device?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
						<AlertDialogAction>Allow</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Example>
	);
}

function AlertDialogWithMedia() {
	return (
		<Example title="With Media" className="items-center">
			<AlertDialog>
				<AlertDialogTrigger
					render={<Button variant="outline">Default (Media)</Button>}
				/>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogMedia>
							<BluetoothIcon />
						</AlertDialogMedia>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete your account and remove your data
							from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Example>
	);
}

function AlertDialogSmallWithMedia() {
	return (
		<Example title="Small With Media" className="items-center">
			<AlertDialog>
				<AlertDialogTrigger
					render={<Button variant="outline">Small (Media)</Button>}
				/>

				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogMedia>
							<BluetoothIcon />
						</AlertDialogMedia>
						<AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
						<AlertDialogDescription>
							Do you want to allow the USB accessory to connect to this device?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
						<AlertDialogAction>Allow</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Example>
	);
}

function AlertDialogDestructive() {
	return (
		<Example title="Destructive" className="items-center">
			<AlertDialog>
				<AlertDialogTrigger
					render={<Button variant="destructive">Delete Chat</Button>}
				/>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogMedia variant="destructive">
							<Trash2Icon />
						</AlertDialogMedia>
						<AlertDialogTitle>Delete chat?</AlertDialogTitle>
						<AlertDialogDescription>
							This will permanently delete this chat conversation. View{" "}
							<a href="/">Settings</a> delete any memories saved during this
							chat.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
						<AlertDialogAction variant="destructive">Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Example>
	);
}

function AlertDialogInDialog() {
	return (
		<Example title="In Dialog" className="items-center">
			<Dialog>
				<DialogTrigger render={<Button variant="outline" />}>
					Open Dialog
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Alert Dialog Example</DialogTitle>
						<DialogDescription>
							Click the button below to open an alert dialog.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<AlertDialog>
							<AlertDialogTrigger render={<Button />}>
								Open Alert Dialog
							</AlertDialogTrigger>
							<AlertDialogContent size="sm">
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Example>
	);
}
