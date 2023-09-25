import { ClientStatus } from "teletalk-type-store";

import { Store } from "./Store";

export class ClientStatusStore extends Store {
	protected STATE_KEY = "CLIENT_STATUS";

	async incConnection(id: string) {
		const oldUser = await this.resolveUserItem(id);
		const newConnections = oldUser.connections + 1;

		if (await super.isExist(id))
			await this.update(id, {
				...oldUser,
				connections: newConnections,
			});
		else
			await this.add(id, {
				...oldUser,
				connections: newConnections,
			});
	}

	async decConnection(id: string) {
		const oldUser = await this.resolveUserItem(id);
		const newConnections =
			oldUser.connections > 0 ? oldUser.connections - 1 : 0;

		if (await super.isExist(id))
			await this.update(id, {
				...oldUser,
				connections: newConnections,
			});
		else
			await this.add(id, {
				...oldUser,
				connections: newConnections,
			});
	}

	async getOnlineClients() {
		const onlineClients: {
			userId: string;
		}[] = [];

		const keys = await super.getAllKeys<string>();
		for (const id of keys) {
			const item = await this.find(id.replace(`${this.STATE_KEY}:`, ""));

			if (item?.connections)
				onlineClients.push({
					userId: item.userId,
				});
		}

		return onlineClients;
	}

	async isOnline(id: string) {
		const user = await this.resolveUserItem(id);

		return user.connections > 0 ? true : false;
	}

	private async resolveUserItem(id: string) {
		return (
			(await this.find(id)) || {
				...this.getDefaultUserItem(),
				userId: id,
			}
		);
	}

	async find(id: string): Promise<ClientStatus> {
		return await super.find(id);
	}

	async add(id: string, data: ClientStatus) {
		await super.add(id, data);
	}

	async update(id: string, newData: ClientStatus) {
		await super.update(id, newData);
	}

	private getDefaultUserItem(): ClientStatus {
		return {
			connections: 0,
			userId: "",
		};
	}
}

export const clientStatusStore = new ClientStatusStore();
