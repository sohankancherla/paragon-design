import { Resend } from "resend";
import ResetPassword from "@/packages/email/emails/auth/reset-password";
import { env } from "@/packages/env/server";

export async function sendResetPassword({
	to,
	url
}: {
	to: string;
	url: string;
}): Promise<void> {
	const resend = new Resend(env.RESEND_API_KEY);

	const { error } = await resend.emails.send({
		from: "Paragon <no-reply@paragon.zone>",
		to,
		subject: "Reset your password",
		react: ResetPassword({ url })
	});

	if (error) {
		throw new Error(error.message);
	}
}
