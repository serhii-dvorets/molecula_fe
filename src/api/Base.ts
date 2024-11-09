import { AxiosRequestConfig } from "axios";
import { RequestParams } from "./ApiClient";

interface IApiClient {
    get: (endpoint: string, params: AxiosRequestConfig) => Promise<any>;
	post: ({ url, body, params }: Omit<RequestParams, 'method'>) => Promise<any>;
	patch: ({ url, body, params }: Omit<RequestParams, 'method'>) => Promise<any>;
	put: ({ url, body, params }: Omit<RequestParams, 'method'>) => Promise<any>;
	delete: ({ url, body }: Omit<RequestParams, 'method' | 'params'>) => Promise<any>;
}

export default class Base {
	client: IApiClient
	constructor(client: IApiClient) {
		if (!client) throw new Error('API CLIENT IS NOT PROVIDED')
            
		this.client = client
	}
}