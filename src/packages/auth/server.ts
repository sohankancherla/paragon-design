import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/packages/db/drizzle";
import { account, session, user, verification } from "@/packages/db/schema";
import { sendResetPassword } from "@/packages/email/resend/send-reset-password";
import { sendVerifyEmail } from "@/packages/email/resend/send-verifiy-email";
import { env } from "@/packages/env/server";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user,
			account,
			session,
			verification
		}
	}),
	emailAndPassword: {
		enabled: true,
		disableSignUp: false,
		requireEmailVerification: true,
		minPasswordLength: 8,
		maxPasswordLength: 128,
		autoSignIn: true,
		resetPasswordTokenExpiresIn: 3600,
		sendResetPassword: async ({ user, url }) => {
			// TODO: use a more reliable method to send the reset password email
			await sendResetPassword({
				to: user.email,
				url
			});
		}
		// TODO: send an email to user once the password is reset
		// TODO: add restrictions on the number of emails sent
	},
	emailVerification: {
		sendOnSignUp: true,
		sendOnSignIn: false,
		autoSignInAfterVerification: true,
		expiresIn: 3600,
		sendVerificationEmail: async ({ user, url }) => {
			// TODO: use a more reliable method to send the verification email
			await sendVerifyEmail({
				to: user.email,
				url
			});
		}
	},
	user: {
		additionalFields: {
			timezone: {
				type: "string",
				required: true,
				default: "Auto"
			}
		}
	},
	baseURL: env.VITE_BASE_URL
});
