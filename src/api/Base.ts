import { AxiosRequestConfig } from "axios";
import { RequestParams } from "./ApiClient";

interface IApiClient {
    get: (endpoint: string, params: AxiosRequestConfig) => void;
	post: ({ url, body, params }: Omit<RequestParams, 'method'>) => void;
	patch: ({ url, body, params }: Omit<RequestParams, 'method'>) => void;
	put: ({ url, body, params }: Omit<RequestParams, 'method'>) => void;
	delete: ({ url, body }: Omit<RequestParams, 'method' | 'params'>) => void;
}

export default class Base {
	client: IApiClient
	constructor(client: IApiClient) {
		if (!client) throw new Error('API CLIENT IS NOT PROVIDED')
            
		this.client = client
	}
}