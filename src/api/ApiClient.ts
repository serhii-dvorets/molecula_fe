import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

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
		});

		this.#addInterceptors();
	}

	#addInterceptors() {
		this.instance.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('token') || '';
				if (token) {
					config.headers['Authorization'] = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		this.instance.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				console.log(error);
				
				if (error.response.status === 400) {
					console.log('ERROR');
				}

				if (error.response.status === 401) {
					console.log('Unauthorized access - logging out');
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
		});

		return response.data;
	}

	get(endpoint: string, params: AxiosRequestConfig) {
		return this.#request({ url: endpoint, method: "GET", params });
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