import { UserProfile } from "@/lib/features/user/userSlice";
import Base from "../Base";
import { LogInBody, SignInBody } from "./types";

export class AuthClient extends Base {
	async signIn(body: SignInBody): Promise<UserProfile> {
		return this.client.post({ url: '/auth/signin', body })
	}

	async logIn(body: LogInBody): Promise<UserProfile> {
		return this.client.post({ url: '/auth/login', body })
	}
}