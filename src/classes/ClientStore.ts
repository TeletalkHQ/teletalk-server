import { RedisClientType } from "redis";

export class ClientStore {
	protected STATE_KEY = "client";
	protected STATE_PATH = ".";
	private storage: RedisClientType;

	async initialize(storage: RedisClientType) {
		this.setStorage(storage);
		return this;
	}

	getStorage() {
		return this.storage;
	}
	setStorage(storage: RedisClientType) {
		this.storage = storage;
	}

	private makeStateKey(id: string) {
		return `${this.STATE_KEY}:${id}`;
	}

	async find<T = string>(id: string): Promise<T | null> {
		const client = await this.storage.json.get(this.makeStateKey(id));

		return client ? JSON.parse(client as string) : null;
	}

	async add<T = string>(id: string, data: T) {
		const stateKey = this.makeStateKey(id);
		await this.storage
			.multi()
			.json.set(stateKey, this.STATE_PATH, JSON.stringify(data))
			.exec();
	}

	async update<T = string>(id: string, newData: T) {
		await this.storage.json.set(
			this.makeStateKey(id),
			this.STATE_PATH,
			JSON.stringify(newData)
		);
	}

	async getAllKeys<T = string[]>() {
		return (await this.storage.keys(`${this.STATE_KEY}:*`)) as T;
	}

	async remove(id: string) {
		this.storage.json.del(this.makeStateKey(id), this.STATE_PATH);
	}

	async isExist(id: string) {
		return !!this.find(id);
	}
}

export const clientStore = new ClientStore();
