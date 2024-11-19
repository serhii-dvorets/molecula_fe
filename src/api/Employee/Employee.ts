import Base from "../Base";
import { CreateEmployeeBody, Employee, UpdateEmployeeBody } from "./types";

export class EmployeeClient extends Base {
	async create(body: CreateEmployeeBody): Promise<Employee> {
		return this.client.post({ url: '/station', body })
	}

	async update(id: string, body: UpdateEmployeeBody): Promise<Employee> {
		return this.client.patch({ url: `/station/${id}`, body })
	}

	async getAll(): Promise<Employee[] | []> {
		return this.client.get('/station')
	}

	async getOne(id: string): Promise<Employee> {
		return this.client.get(`/station/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/station/${id}` })
	}
}
