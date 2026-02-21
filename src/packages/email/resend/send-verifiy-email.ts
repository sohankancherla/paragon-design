import { Resend } from "resend";
import VerifyEmail from "@/packages/email/emails/auth/verify-email";
import { env } from "@/packages/env/server";

export async function sendVerifyEmail({
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
		subject: "Verify your email",
		react: VerifyEmail({ url })
	});

	if (error) {
		throw new Error(error.message);
	}
}
