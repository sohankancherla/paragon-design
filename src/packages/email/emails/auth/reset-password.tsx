import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text
} from "@react-email/components";
import type { ReactElement } from "react";
import { tailwindConfig } from "@/packages/email/emails/tailwind.config";

export default function ResetPassword({ url }: { url: string }): ReactElement {
	return (
		<Html>
			<Head />
			<Preview>
				Please click the button below to reset your password. If you didn&apos;t
				request this, you can safely ignore this email.
			</Preview>
			<Tailwind config={tailwindConfig}>
				<Body className="bg-background font-sans text-foreground">
					<Container className="mx-auto max-w-2xl px-5 py-10">
						<Img
							src={"https://paragon.zone/combination_black_transparent.png"}
							width="88"
							height="20"
							alt="Paragon logo"
						/>
						<Heading className="mt-8 font-semibold text-2xl tracking-tight">
							Reset your password
						</Heading>
						<Text className="mb-10 text-base">
							Here&apos;s your reset password link for Paragon. If you
							didn&apos;t request this, you can safely ignore this email.
						</Text>
						<Link
							href={url}
							className="mb-10 block w-fit rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground text-sm"
						>
							Reset password
						</Link>
						<Text className="mb-6 text-base text-muted-foreground">
							This link will only be valid for the next 1 hour.
						</Text>
						<Hr />
						<Section className="mt-6">
							<Text className="my-0 font-semibold text-foreground text-sm tracking-tight">
								Paragon
							</Text>
							<Text className="my-0 text-muted-foreground text-sm">
								San Francisco, CA
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
