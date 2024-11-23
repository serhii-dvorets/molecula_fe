import Base from "../Base";
import { UpdateOrderBody, CreateOrderBody, Order } from "./types";

export class OrderClient extends Base {
	async create(body: CreateOrderBody): Promise<Order> {
		return this.client.post({ url: '/order', body })
	}

	async update(id: string, body: UpdateOrderBody): Promise<Order> {
		return this.client.patch({ url: `/order/${id}`, body })
	}

	async getAll(): Promise<{totalCount: number, data: Order[] | []}> {
		return this.client.get('/order')
	}

	async getOne(id: string): Promise<Order> {
		return this.client.get(`/order/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/order/${id}` })
	}
}
