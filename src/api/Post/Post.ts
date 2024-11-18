import Base from "../Base";
import { CreatePostBody, Post, UpdatePostBody } from "./types";

export class PostClient extends Base {
	async create(body: CreatePostBody): Promise<Post> {
		return this.client.post({ url: '/post', body })
	}

	async update(id: string, body: UpdatePostBody): Promise<Post> {
		return this.client.patch({ url: `/post/${id}`, body })
	}

	async getAll(): Promise<Post[] | []> {
		return this.client.get('/post')
	}

	async getOne(id: string): Promise<Post> {
		return this.client.get(`/post/${id}`)
	}

	async delete(id: string): Promise<void> {
		return this.client.delete({ url: `/post/${id}` })
	}
}
