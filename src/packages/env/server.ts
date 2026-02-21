import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ quiet: true });

export const env = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BETTER_AUTH_SECRET: z.string(),
		ARCJET_KEY: z.string(),
		RESEND_API_KEY: z.string(),
		VITE_BASE_URL: z.url()
	},
	runtimeEnv: process.env
});
