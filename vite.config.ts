import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import "./src/packages/env/server.ts";
import "./src/packages/env/client.ts";

const config = defineConfig({
	plugins: [
		viteTsConfigPaths({
			projects: ["./tsconfig.json"]
		}),
		{
			enforce: "pre",
			...mdx({
				providerImportSource: "/src/packages/mdx/mdx-components"
			})
		},
		devtools(),
		nitro(),
		tailwindcss(),
		tanstackStart({
			srcDirectory: "./src/frontend",
			router: {
				routeToken: "layout",
				indexToken: "page",
				routeFileIgnorePattern: "components|utils"
			}
		}),
		react()
	]
});

export default config;
