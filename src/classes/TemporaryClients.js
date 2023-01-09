const redis = require("redis");
const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");

const { errors } = require("@/variables/errors");

class TemporaryClients {
  #STATE_KEY = "temporaryClients";
  #STATE_PATH = ".";

  async initializeClients(storage) {
    this.setStorage(storage);

    const clients = await this.storage.json.get(this.#STATE_KEY);
    if (!clients) {
      await this.storage.json.set(this.#STATE_KEY, this.#STATE_PATH, []);
    }

    return this;
  }

  setStorage(storage = redis.createClient()) {
    this.storage = storage;
  }

  async getAll() {
    return await this.storage.json.get(this.#STATE_KEY);
  }

  async find(data) {
    return (await this.getAll()).find(
      (i) => !!isDataHasEqualityWithTargetCellphone(i, data)
    );
  }
  async findIndex(client) {
    return (await this.getAll()).findIndex(
      (i) => !!isDataHasEqualityWithTargetCellphone(i, client)
    );
  }

  async add(client) {
    await this.storage.json.arrAppend(
      this.#STATE_KEY,
      this.#STATE_PATH,
      client
    );
  }

  async update(oldData, newData) {
    const index = await this.findIndex(oldData);
    errorThrower(index === -1, errors.TEMPORARY_CLIENT_NOT_FOUND);

    await this.remove(index);
    await this.storage.json.arrAppend(this.#STATE_KEY, this.#STATE_PATH, {
      ...oldData,
      ...newData,
    });
  }

  async remove(index) {
    await this.storage.json.arrPop(this.#STATE_KEY, this.#STATE_PATH, index);
  }
}

const temporaryClients = new TemporaryClients();

module.exports = { temporaryClients, TemporaryClients };
