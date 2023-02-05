const redis = require("redis");

class TemporaryClients {
  #STATE_KEY = "temporary_client";
  #STATE_PATH = ".";

  async initialize(storage) {
    this.setStorage(storage);
    return this;
  }

  setStorage(storage = redis.createClient()) {
    this.storage = storage;
  }

  #makeStateKey(clientId) {
    return `${this.#STATE_KEY}:${clientId}`;
  }

  async find(clientId) {
    return this.storage.json.get(this.#makeStateKey(clientId));
  }

  async add(clientId, data) {
    const stateKey = this.#makeStateKey(clientId);
    await this.storage
      .multi()
      .json.set(stateKey, this.#STATE_PATH, data)
      .expire(stateKey, 180)
      .exec();
  }

  async update(clientId, newData) {
    await this.storage.json.set(
      this.#makeStateKey(clientId),
      this.#STATE_PATH,
      newData
    );
  }

  async remove(clientId) {
    this.storage.json.del(this.#makeStateKey(clientId), this.#STATE_PATH);
  }
}

const temporaryClients = new TemporaryClients();

module.exports = { temporaryClients, TemporaryClients };
