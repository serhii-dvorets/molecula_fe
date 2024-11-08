import Base from "../Base";
import { SignInBody } from "./types";

export class AuthClient extends Base {
	signIn(body: SignInBody) {
		return this.client.post({ url: '/auth/signin', body })
	}
}