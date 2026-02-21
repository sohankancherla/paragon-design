export const errorMap = {
	// Shared Errors
	INVALID_EMAIL: "Invalid email format. Please check your email and try again.",
	INVALID_PASSWORD:
		"Invalid password. Please check your password and try again.",
	FAILED_TO_CREATE_SESSION:
		"We encountered an issue establishing your session. Please try again or contact support if the problem persists.",
	PASSWORD_TOO_SHORT:
		"Password too short. Please use a password with at least 8 characters for account security.",
	PASSWORD_TOO_LONG:
		"Password exceeds maximum length. Please use a password with fewer than 128 characters.",
	INVALID_TOKEN:
		"This link is invalid or has expired. Please request a new one.",
	USER_NOT_FOUND:
		"We couldn't find your account. Please signup for a new account.",
	// Email Signup Errors
	USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
		"An account is already associated with this email. Please login instead.",
	FAILED_TO_CREATE_USER:
		"We encountered an issue while creating your account. Please try again or contact support if the problem persists.",
	// Email Verification Errors
	TOKEN_EXPIRED: "The link has expired. Please request a new one.",
	INVALID_USER:
		"You are not associated with this email. Please signup for a new account.",
	// Reset Password Errors
	RESET_PASSWORD_DISABLED:
		"Reset password is disabled. Please contact support if you need to reset your password.",
	// OTP Errors
	OTP_EXPIRED: "The code has expired. Please request a new one.",
	INVALID_OTP: "Invalid code. Please check your code and try again.",
	TOO_MANY_ATTEMPTS:
		"Too many attempts. Please request a new code and try again.",
	// Email Login Errors
	INVALID_EMAIL_OR_PASSWORD:
		"Invalid email or password. Please check your credentials and try again.",
	EMAIL_NOT_VERIFIED:
		"Your email is not verified. Please verify your email to continue."
};
