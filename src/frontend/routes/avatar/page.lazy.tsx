import { createLazyFileRoute } from "@tanstack/react-router";
import { CheckIcon, PlusIcon } from "lucide-react";
import {
	Example,
	ExampleWrapper
} from "@/frontend/routes/components/example";
import {
	Avatar,
	AvatarBadge,
	AvatarBrandLogo,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage
} from "@/packages/design-system/components/ui/avatar";
import { Button } from "@/packages/design-system/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from "@/packages/design-system/components/ui/empty";

export const Route = createLazyFileRoute("/avatar/")({
	component: AvatarPage
});

function AvatarPage() {
	return (
		<ExampleWrapper title="Avatar">
			<AvatarSizes />
			<AvatarWithBadge />
			<AvatarWithBadgeIcon />
			<AvatarWithLogo />
			<AvatarGroupExample />
			<AvatarGroupWithCount />
			<AvatarGroupWithIconCount />
			<AvatarInEmpty />
		</ExampleWrapper>
	)
}

function AvatarSizes() {
	return (
		<Example title="Sizes">
			<div className="flex flex-wrap items-center gap-2">
				<Avatar size="xs">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Avatar size="xs">
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</Example>
	)
}

function AvatarWithBadge() {
	return (
		<Example title="Badge">
			<div className="flex flex-wrap items-center gap-2">
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/jorgezreik.png"
						alt="@jorgezreik"
					/>
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/jorgezreik.png"
						alt="@jorgezreik"
					/>
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/jorgezreik.png"
						alt="@jorgezreik"
					/>
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/jorgezreik.png"
						alt="@jorgezreik"
					/>
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Avatar size="xs">
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
				<Avatar size="sm">
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
				<Avatar>
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
				<Avatar size="lg">
					<AvatarFallback>JZ</AvatarFallback>
					<AvatarBadge />
				</Avatar>
			</div>
		</Example>
	)
}

function AvatarWithBadgeIcon() {
	return (
		<Example title="Badge with Icon">
			<div className="flex flex-wrap items-center gap-2">
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/pranathip.png"
						alt="@pranathip"
					/>
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<PlusIcon />
					</AvatarBadge>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/pranathip.png"
						alt="@pranathip"
					/>
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<PlusIcon />
					</AvatarBadge>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/pranathip.png"
						alt="@pranathip"
					/>
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<PlusIcon />
					</AvatarBadge>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/pranathip.png"
						alt="@pranathip"
					/>
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<PlusIcon />
					</AvatarBadge>
				</Avatar>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Avatar size="xs">
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<CheckIcon />
					</AvatarBadge>
				</Avatar>
				<Avatar size="sm">
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<CheckIcon />
					</AvatarBadge>
				</Avatar>
				<Avatar>
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<CheckIcon />
					</AvatarBadge>
				</Avatar>
				<Avatar size="lg">
					<AvatarFallback>PP</AvatarFallback>
					<AvatarBadge>
						<CheckIcon />
					</AvatarBadge>
				</Avatar>
			</div>
		</Example>
	)
}

function AvatarWithLogo() {
	return (
		<Example title="Logo">
			<div className="flex flex-wrap items-center gap-2">
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/sohankancherla.png"
						alt="@sohankancherla"
					/>
					<AvatarFallback>CN</AvatarFallback>
					<AvatarBrandLogo src="/abstract_white.png" alt="Paragon" />
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/sohankancherla.png"
						alt="@sohankancherla"
					/>
					<AvatarFallback>CN</AvatarFallback>
					<AvatarBrandLogo src="/abstract_white.png" alt="Paragon" />
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/sohankancherla.png"
						alt="@sohankancherla"
					/>
					<AvatarFallback>CN</AvatarFallback>
					<AvatarBrandLogo src="/abstract_white.png" alt="Paragon" />
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/sohankancherla.png"
						alt="@sohankancherla"
					/>
					<AvatarFallback>CN</AvatarFallback>
					<AvatarBrandLogo src="/abstract_white.png" alt="Paragon" />
				</Avatar>
			</div>
		</Example>
	)
}

function AvatarGroupExample() {
	return (
		<Example title="Group">
			<AvatarGroup>
				<Avatar size="xs">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar size="sm">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar size="lg">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
			</AvatarGroup>
		</Example>
	)
}

function AvatarGroupWithCount() {
	return (
		<Example title="Group with Count">
			<AvatarGroup>
				<Avatar size="xs">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar size="sm">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar size="lg">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
		</Example>
	)
}

function AvatarGroupWithIconCount() {
	return (
		<Example title="Group with Icon Count">
			<AvatarGroup>
				<Avatar size="xs">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="xs">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>
					<PlusIcon />
				</AvatarGroupCount>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar size="sm">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="sm">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>
					<PlusIcon />
				</AvatarGroupCount>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>
					<PlusIcon />
				</AvatarGroupCount>
			</AvatarGroup>
			<AvatarGroup>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="@shadcn"
						className="grayscale"
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/maxleiter.png"
						alt="@maxleiter"
						className="grayscale"
					/>
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage
						src="https://github.com/evilrabbit.png"
						alt="@evilrabbit"
						className="grayscale"
					/>
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
				<AvatarGroupCount>
					<PlusIcon />
				</AvatarGroupCount>
			</AvatarGroup>
		</Example>
	)
}

function AvatarInEmpty() {
	return (
		<Example title="In Empty">
			<Empty className="w-full flex-none border">
				<EmptyHeader>
					<EmptyMedia>
						<AvatarGroup>
							<Avatar size="lg">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
									className="grayscale"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<Avatar size="lg">
								<AvatarImage
									src="https://github.com/maxleiter.png"
									alt="@maxleiter"
									className="grayscale"
								/>
								<AvatarFallback>LR</AvatarFallback>
							</Avatar>
							<Avatar size="lg">
								<AvatarImage
									src="https://github.com/evilrabbit.png"
									alt="@evilrabbit"
									className="grayscale"
								/>
								<AvatarFallback>ER</AvatarFallback>
							</Avatar>
							<AvatarGroupCount>
								<PlusIcon />
							</AvatarGroupCount>
						</AvatarGroup>
					</EmptyMedia>
					<EmptyTitle>No Team Members</EmptyTitle>
					<EmptyDescription>
						Invite your team to collaborate on this project.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button startIcon={<PlusIcon />}>Invite Members</Button>
				</EmptyContent>
			</Empty>
		</Example>
	)
}
