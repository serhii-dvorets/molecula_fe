import ApiClient from "./ApiClient"
import { AuthClient } from "./Auth"
import { TariffClient } from "./Tariff"
import { OrderClient } from "./Order"

class ApiFactory {
	api
	constructor() {
		this.api = new ApiClient()
	}

	createApiSingleton() {
		return {
			auth: new AuthClient(this.api),
			order: new OrderClient(this.api),
			tariff: new TariffClient(this.api),
		}
	}
}

const apiSingleton = new ApiFactory().createApiSingleton()

export default apiSingleton