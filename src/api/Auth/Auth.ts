import { UserProfile } from "@/lib/features/user/userSlice";
import Base from "../Base";
import { ChangePasswordBody, ConfirmCodeBody, LogInBody, SignInBody } from "./types";

export class AuthClient extends Base {
	async signIn(body: SignInBody): Promise<UserProfile> {
		return this.client.post({ url: '/auth/signin', body })
	}

	async logIn(body: LogInBody): Promise<UserProfile> {
		return this.client.post({ url: '/auth/login', body })
	}

	async confirmPhoneNumber(body: ConfirmCodeBody): Promise<UserProfile> {
		return this.client.post({ url: '/auth/confirm-phone', body })
	}

	async changePassword(body: ChangePasswordBody): Promise<UserProfile> {
		return this.client.post({ url: '/auth/change-password', body })
	}
}