import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "@/packages/env/server";

export const db = drizzle(env.DATABASE_URL);
