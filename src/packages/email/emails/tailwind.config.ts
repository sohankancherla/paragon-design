import { pixelBasedPreset } from "@react-email/components";
import type { TailwindConfig } from "@react-email/tailwind";

export const tailwindConfig = {
	presets: [pixelBasedPreset],
	theme: {
		fontFamily: {
			sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
		},
		extend: {
			colors: {
				background: "#FFFFFF",
				foreground: "#2E2E2E",
				primary: {
					DEFAULT: "#2E2E2E",
					foreground: "#FFFFFF"
				},
				muted: {
					DEFAULT: "#E9E9E9",
					foreground: "#767676"
				}
			}
		}
	}
} satisfies TailwindConfig;
