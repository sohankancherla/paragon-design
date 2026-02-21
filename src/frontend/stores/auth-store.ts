import { create } from "zustand";

type AuthStore = {
	email: string | null;
	setEmail: (email: string) => void;
	resetPasswordEmail: string | null;
	setResetPasswordEmail: (email: string) => void;
};

export const useAuthStore = create<AuthStore>(set => ({
	email: null,
	setEmail: email => set({ email }),
	resetPasswordEmail: null,
	setResetPasswordEmail: email => set({ resetPasswordEmail: email })
}));
