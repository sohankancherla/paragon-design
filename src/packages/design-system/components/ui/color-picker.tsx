import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import type { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/packages/design-system/components/ui/popover";
import { RadioGroup } from "@/packages/design-system/components/ui/radio-group";
import { Separator } from "@/packages/design-system/components/ui/separator";
import { cn } from "@/packages/design-system/lib/utils";

export const defaultColors = {
	red: "#fb2c36",
	orange: "#f97316",
	yellow: "#eab308",
	green: "#00bc7d",
	cyan: "#06b6d4",
	blue: "#0084d1",
	purple: "#a855f7",
	pink: "#ec4899",
	gray: "#737373"
};

const predefinedColorValues = new Set(Object.values(defaultColors));

export type ColorPickerProps = Omit<RadioGroupPrimitive.Props, "required">;

export function ColorPicker({
	className,
	onValueChange,
	value,
	defaultValue,
	...props
}: ColorPickerProps) {
	const initial = value ?? defaultValue;
	const [customColor, setCustomColor] = useState(
		initial && !predefinedColorValues.has(initial) ? initial : "#2563eb"
	);

	function handleCustomColorChange(color: string) {
		setCustomColor(color);
		(onValueChange as (value: string) => void)?.(color);
	}

	return (
		<RadioGroup
			required
			className={cn("flex w-fit gap-0", className)}
			value={value}
			onValueChange={onValueChange}
			defaultValue={defaultValue}
			{...props}
		>
			{Object.entries(defaultColors).map(([key, colorValue]) => (
				<label
					key={key}
					htmlFor={key}
					className="flex items-center justify-center p-1"
				>
					<RadioPrimitive.Root
						id={key}
						aria-label={key}
						value={colorValue}
						className="size-3.5 appearance-none rounded-sm forced-color-adjust-none data-checked:outline-[1.5] data-checked:outline-offset-[1.5px]"
						style={{ backgroundColor: colorValue, outlineColor: colorValue }}
					/>
					<span className="sr-only">{key}</span>
				</label>
			))}
			<Separator orientation="vertical" className="m-1 bg-input" />
			<label
				htmlFor="custom-color"
				className="flex items-center justify-center p-1"
			>
				<Popover>
					<PopoverTrigger
						render={
							<RadioPrimitive.Root
								id="custom-color"
								aria-label="custom color"
								value={customColor}
								className="size-4 appearance-none rounded-sm forced-color-adjust-none data-checked:outline-[1.5] data-checked:outline-offset-[1.5px]"
								style={{
									background: `conic-gradient(${defaultColors.red}, ${defaultColors.orange}, ${defaultColors.yellow}, ${defaultColors.green}, ${defaultColors.cyan}, ${defaultColors.blue}, ${defaultColors.purple}, ${defaultColors.pink}, ${defaultColors.red})`,
									outlineColor: customColor
								}}
							/>
						}
					/>
					<PopoverContent
						side="right"
						sideOffset={8}
						className="w-56 gap-1 p-1"
					>
						<HexColorPicker
							color={customColor}
							onChange={handleCustomColorChange}
							className="[&_[role=slider]>div>div]:border! h-60! w-full! gap-1 [&>div:first-child]:rounded-sm! [&>div:last-child]:h-5.5! [&>div:last-child]:rounded-sm! [&_[role=slider]>div>div]:border-black! [&_[role=slider]>div]:size-5.5! [&_[role=slider]>div]:outline-1 [&_[role=slider]>div]:outline-black!"
						/>
						<HexColorInput
							color={customColor}
							onChange={handleCustomColorChange}
							prefixed
							onFocus={e => {
								const input = e.currentTarget;
								requestAnimationFrame(() => {
									input.selectionStart = input.selectionEnd =
										input.value.length;
								});
							}}
							className="h-8 rounded-md border border-input bg-transparent px-2 py-1 font-medium text-sm uppercase outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:aria-invalid:border-destructive/80 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80 dark:focus-visible:border-ring"
						/>
					</PopoverContent>
				</Popover>
			</label>
		</RadioGroup>
	);
}
