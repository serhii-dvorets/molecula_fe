import Base from "../Base";
import { UpdateStationBody, CreateStationBody, Station } from "./types";

export class StationClient extends Base {
	async create(body: CreateStationBody): Promise<Station> {
		return this.client.post({ url: '/station', body })
	}

	async update(id: string, body: UpdateStationBody): Promise<Station> {
		return this.client.patch({ url: `/station/${id}`, body })
	}

	async getAll(): Promise<Station[] | []> {
		return this.client.get('/station')
	}

	async getOne(id: string): Promise<Station> {
		return this.client.get(`/station/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/station/${id}` })
	}
}
