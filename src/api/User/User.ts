import Base from "../Base";
import { CreateUserBody, User, UpdateUserBody } from "./types";

export class UserClient extends Base {
	async create(body: CreateUserBody): Promise<User> {
		return this.client.post({ url: '/user', body })
	}

	async update(id: string, body: UpdateUserBody): Promise<User> {
		return this.client.patch({ url: `/user/${id}`, body })
	}

	async getAll(): Promise<User[] | []> {
		return this.client.get('/user')
	}

	async getOne(id: string): Promise<User> {
		return this.client.get(`/user/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/user/${id}` })
	}
}
