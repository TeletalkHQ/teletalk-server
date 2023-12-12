import { RedisClientType } from "redis";

export class Store {
  protected STATE_KEY = "default";
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

  async find(id: string) {
    const session = await this.storage.json.get(this.makeStateKey(id));

    return session ? JSON.parse(session as string) : null;
  }

  async add(id: string, data: unknown) {
    const stateKey = this.makeStateKey(id);
    await this.storage
      .multi()
      .json.set(stateKey, this.STATE_PATH, JSON.stringify(data))
      .exec();
  }

  async update(id: string, newData: unknown) {
    await this.storage.json.set(
      this.makeStateKey(id),
      this.STATE_PATH,
      JSON.stringify(newData)
    );
  }

  async getAllKeys<T>() {
    return (await this.storage.keys(`${this.STATE_KEY}:*`)) as T[];
  }

  async remove(id: string) {
    this.storage.json.del(this.makeStateKey(id), this.STATE_PATH);
  }

  async removeAll() {
    const keys = await this.getAllKeys<string>();
    for (const id of keys) {
      await this.remove(id.replace(`${this.STATE_KEY}:`, ""));
    }
  }

  async isExist(id: string) {
    return !!this.find(id);
  }
}

export const store = new Store();
