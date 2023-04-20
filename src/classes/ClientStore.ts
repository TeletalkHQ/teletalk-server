import { RedisClientType } from "redis";

import { Client } from "@/types";

class ClientStore {
  private STATE_KEY = "client";
  private STATE_PATH = ".";
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

  private makeStateKey(clientId: string) {
    return `${this.STATE_KEY}:${clientId}`;
  }

  async find(clientId: string): Promise<Client | null> {
    const client = (await this.storage.json.get(
      this.makeStateKey(clientId)
    )) as string;

    return client ? JSON.parse(client) : null;
  }

  async add(clientId: string, data: Client) {
    const stateKey = this.makeStateKey(clientId);
    await this.storage
      .multi()
      .json.set(stateKey, this.STATE_PATH, JSON.stringify(data))
      .expire(stateKey, 180)
      .exec();
  }

  async update(clientId: string, newData: Client) {
    await this.storage.json.set(
      this.makeStateKey(clientId),
      this.STATE_PATH,
      JSON.stringify(newData)
    );
  }

  async remove(clientId: string) {
    this.storage.json.del(this.makeStateKey(clientId), this.STATE_PATH);
  }
}

const clientStore = new ClientStore();

export { clientStore };
