import { defineConfig } from "drizzle-kit";

import { env } from "@/packages/env/server";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/packages/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL
	}
});
