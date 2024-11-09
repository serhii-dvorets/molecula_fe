import { UserProfile } from "@/lib/features/userSlice";
import Base from "../Base";
import { SignInBody } from "./types";

export class AuthClient extends Base {
	async signIn(body: SignInBody): Promise<UserProfile> {
		return this.client.post({ url: '/auth/signin', body })
	}
}