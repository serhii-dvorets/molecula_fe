import { setLoading } from '@/lib/store/slices/loadingSlice';
import { store } from '@/lib/store/store';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';
import qs from 'qs';

export type RequestParams = {
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', 
	params?: AxiosRequestConfig, 
	url: string, 
	body?: any, 
}

class ApiClient {
	instance: AxiosInstance

	constructor() {
		
		this.instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_MAIN_URL,
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true
		});

		this.#addInterceptors();
	}

	#addInterceptors() {
		this.instance.interceptors.request.use((config) => {
			store.dispatch(setLoading(true));
			return config;
		});

		this.instance.interceptors.response.use(
			(response) => {
				store.dispatch(setLoading(false));
				return response;
			},
			(error) => {
				store.dispatch(setLoading(false));
				
				if (error.response.status === 400) {
					return Promise.reject(error.response.data)
				}
				
				if ([401, 403].includes(error.response.status)) {
					redirect('/login')
				}

				return Promise.reject(error);
			}
		);
	}

	async #request({ method, params = {}, url, body = {}, }: RequestParams) {
		const response = await this.instance.request({
			url,
			method,
			params,
			data: body,
			paramsSerializer: params => {
				return qs.stringify(params)
			},	
		});

		return response.data;
	}

	get(endpoint: string, params?: AxiosRequestConfig) {
		return this.#request({
			url: endpoint,
			method: "GET",
			params
		});
	}

	post({ url, body = {}, params = {} }: Omit<RequestParams, 'method'>) {
		return this.#request({ url, method: 'POST', body, params });
	}

	patch({ url, body = {}, params = {} }: Omit<RequestParams, 'method'>) {
		return this.#request({ url, method: 'PATCH', body, params });
	}

	put({ url, body = {}, params = {} }: Omit<RequestParams, 'method'>) {
		return this.#request({ url, method: 'PUT', body, params });
	}

	delete({ url, body = {} }: Omit<RequestParams, 'method' | 'params'>) {
		return this.#request({ url, method: 'DELETE', body });
	}
}

export default ApiClient;
