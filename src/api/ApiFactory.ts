import ApiClient from "./ApiClient"
import { AuthClient } from "./Auth"
import { PostClient } from "./Post"
import { StationClient } from "./Station"

class ApiFactory {
	api
	constructor() {
		this.api = new ApiClient()
	}

	createApiSingleton() {
		return {
			auth: new AuthClient(this.api),
			station: new StationClient(this.api),
			post: new PostClient(this.api),
		}
	}
}

const apiSingleton = new ApiFactory().createApiSingleton()

export default apiSingleton