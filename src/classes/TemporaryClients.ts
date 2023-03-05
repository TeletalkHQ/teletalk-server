import { RedisClientType } from "redis";

class TemporaryClients {
  private STATE_KEY = "temporary_client";
  private STATE_PATH = ".";
  private storage: RedisClientType;

  async initialize(storage: RedisClientType) {
    this.setStorage(storage);
    return this;
  }

  setStorage(storage: RedisClientType) {
    this.storage = storage;
  }

  private makeStateKey(clientId: string) {
    return `${this.STATE_KEY}:${clientId}`;
  }

  async find(clientId: string) {
    return this.storage.json.get(this.makeStateKey(clientId));
  }

  async add(clientId: string, data: object) {
    const stateKey = this.makeStateKey(clientId);
    await this.storage
      .multi()
      .json.set(stateKey, this.STATE_PATH, JSON.stringify(data))
      .expire(stateKey, 180)
      .exec();
  }

  async update(clientId: string, newData: object) {
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

const temporaryClients = new TemporaryClients();

export { temporaryClients, TemporaryClients };
