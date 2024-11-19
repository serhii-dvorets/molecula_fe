import Base from "../Base";
import { CreateTariffBody, Tariff, UpdateTariffBody } from "./types";

export class TariffClient extends Base {
	async create(body: CreateTariffBody): Promise<Tariff> {
		return this.client.post({ url: '/tariff', body })
	}

	async update(id: string, body: UpdateTariffBody): Promise<Tariff> {
		return this.client.patch({ url: `/tariff/${id}`, body })
	}

	async getAll(): Promise<Tariff[] | []> {
		return this.client.get('/tariff')
	}

	async getOne(id: string): Promise<Tariff> {
		return this.client.get(`/tariff/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/tariff/${id}` })
	}
}
