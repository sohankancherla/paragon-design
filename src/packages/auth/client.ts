import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@/packages/auth/server";
import { env } from "@/packages/env/client";

export const authClient = createAuthClient({
	baseURL: env.VITE_BASE_URL,
	plugins: [inferAdditionalFields<typeof auth>()]
});
