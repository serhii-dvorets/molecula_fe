import { UserProfile } from "@/lib/store/slices/userSlice";
import Base from "../Base";
import { UpdateStationBody, CreateStationBody } from "./types";

export class StationClient extends Base {
	async create(body: CreateStationBody): Promise<UserProfile> {
		return this.client.post({ url: '/station/create', body })
	}

	async update(body: UpdateStationBody): Promise<UserProfile> {
		return this.client.patch({ url: '/station/update', body })
	}

	async getAll(): Promise<UserProfile> {
		return this.client.get('/station', {})
	}
}