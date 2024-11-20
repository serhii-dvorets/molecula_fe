import Base from "../Base";
import { CreateRoleBody, Role, UpdateRoleBody } from "./types";

export class RoleClient extends Base {
	async create(body: CreateRoleBody): Promise<Role> {
		return this.client.post({ url: '/role', body })
	}

	async update(id: string, body: UpdateRoleBody): Promise<Role> {
		return this.client.patch({ url: `/role/${id}`, body })
	}

	async getAll(): Promise<Role[] | []> {
		return this.client.get('/role')
	}

	async getOne(id: string): Promise<Role> {
		return this.client.get(`/role/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/role/${id}` })
	}
}
