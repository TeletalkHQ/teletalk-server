import { StoredClient } from "~/types";

import { ClientStore } from "./ClientStore";

export class AuthClientStore extends ClientStore {
	protected STATE_KEY = "AUTH_CLIENT";

	async find<T = StoredClient>(clientId: string) {
		return super.find<T>(clientId);
	}

	async add<T = StoredClient>(clientId: string, data: T) {
		await super.add(clientId, data);
	}

	async update<T = StoredClient>(clientId: string, newData: T) {
		await super.update(clientId, newData);
	}
}

export const authClientStore = new AuthClientStore();
