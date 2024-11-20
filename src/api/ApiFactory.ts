import ApiClient from "./ApiClient"
import { AuthClient } from "./Auth"
import { TariffClient } from "./Tariff"
import { OrderClient } from "./Order"
import { UserClient } from "./User"
import { RoleClient } from "./Role"

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
			user: new UserClient(this.api),
			role: new RoleClient(this.api),
		}
	}
}

const apiSingleton = new ApiFactory().createApiSingleton()

export default apiSingleton