import Base from "../Base";
import { UpdateOrderItemBody, CreateOrderItemBody, OrderItem } from "./types";

export class OrderItemClient extends Base {
	async create(body: CreateOrderItemBody): Promise<OrderItem> {
		return this.client.post({ url: '/order-item', body })
	}

	async update(id: string, body: UpdateOrderItemBody): Promise<OrderItem> {
		return this.client.patch({ url: `/order-item/${id}`, body })
	}

	async getAll(): Promise<{totalCount: number, data: OrderItem[] | []}> {
		return this.client.get('/order-item')
	}

	async getOne(id: string): Promise<OrderItem> {
		return this.client.get(`/order-item/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/order-item/${id}` })
	}
}
