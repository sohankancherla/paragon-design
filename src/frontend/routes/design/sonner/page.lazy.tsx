import { createLazyFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import {
	Example,
	ExampleWrapper
} from "@/frontend/routes/design/components/example";
import { Button } from "@/packages/design-system/components/ui/button";

export const Route = createLazyFileRoute("/design/sonner/")({
	component: SonnerPage
});

function SonnerPage() {
	return (
		<ExampleWrapper title="Sonner">
			<SonnerBasic />
			<SonnerWithDescription />
		</ExampleWrapper>
	);
}

function SonnerBasic() {
	return (
		<Example title="Basic">
			<Button onClick={() => toast("Event has been created")} variant="outline">
				Show Toast
			</Button>
			<Button
				onClick={() => toast.success("Event has been created")}
				variant="outline"
			>
				Success
			</Button>
			<Button
				variant="outline"
				onClick={() =>
					toast.info("Be at the area 10 minutes before the event time")
				}
			>
				Info
			</Button>
			<Button
				variant="outline"
				onClick={() =>
					toast.warning("Event start time cannot be earlier than 8am")
				}
			>
				Warning
			</Button>
			<Button
				variant="outline"
				onClick={() => toast.error("Event has not been created")}
			>
				Error
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast.promise<{ name: string }>(
						() =>
							new Promise(resolve =>
								setTimeout(() => resolve({ name: "Event" }), 2000)
							),
						{
							loading: "Loading...",
							success: data => `${data.name} has been created`,
							error: "Error"
						}
					);
				}}
			>
				Promise
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast("This is an action toast", {
						action: {
							label: "Action",
							onClick: () => console.log("Action!")
						}
					});
				}}
			>
				Action
			</Button>
		</Example>
	);
}

function SonnerWithDescription() {
	return (
		<Example title="With Description">
			<Button
				onClick={() =>
					toast("Event has been created", {
						description: "Monday, January 3rd at 6:00pm"
					})
				}
				variant="outline"
			>
				Show Toast
			</Button>
		</Example>
	);
}
