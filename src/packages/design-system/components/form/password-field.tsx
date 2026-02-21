import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useFieldContext } from "@/packages/design-system/components/form/form";
import type { InputProps } from "@/packages/design-system/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput
} from "@/packages/design-system/components/ui/input-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/packages/design-system/components/ui/tooltip";

export function PasswordField({ ...props }: InputProps) {
	const field = useFieldContext<string>();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const togglePassword = useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	return (
		<InputGroup>
			<InputGroupInput
				id={field.name}
				type={showPassword ? "text" : "password"}
				autoComplete="current-password"
				maxLength={128}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={e => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
				{...props}
			/>
			<InputGroupAddon align="inline-end">
				<Tooltip>
					<TooltipTrigger
						render={
							<InputGroupButton
								size="icon-xs"
								aria-label={showPassword ? "Hide password" : "Show password"}
								onClick={togglePassword}
							>
								{showPassword ? <EyeOffIcon /> : <EyeIcon />}
							</InputGroupButton>
						}
					/>
					<TooltipContent side="right" sideOffset={2}>
						<p>{showPassword ? "Hide password" : "Show password"}</p>
					</TooltipContent>
				</Tooltip>
			</InputGroupAddon>
		</InputGroup>
	);
}
