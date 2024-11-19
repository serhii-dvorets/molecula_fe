import Base from "../Base";
import { UpdateOrderBody, CreateOrderBody, Order } from "./types";

export class OrderClient extends Base {
	async create(body: CreateOrderBody): Promise<Order> {
		return this.client.post({ url: '/station', body })
	}

	async update(id: string, body: UpdateOrderBody): Promise<Order> {
		return this.client.patch({ url: `/station/${id}`, body })
	}

	async getAll(): Promise<Order[] | []> {
		return this.client.get('/station')
	}

	async getOne(id: string): Promise<Order> {
		return this.client.get(`/station/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/station/${id}` })
	}
}
