import ApiClient from "./ApiClient"
import { AuthClient } from "./Auth"

class ApiFactory {
	api
	constructor() {
		this.api = new ApiClient()
	}

	createApiSingleton() {
		return {
			auth: new AuthClient(this.api)
		}
	}
}

const apiSingleton = new ApiFactory().createApiSingleton()

export default apiSingleton