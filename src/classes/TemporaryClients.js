const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");

const { stateManager } = require("@/classes/StateManager");

const { errors } = require("@/variables/errors");

class TemporaryClients {
  #STATE_KEY = "temporaryClients";

  async getAll() {
    return await stateManager.getStateAndParse(this.#STATE_KEY);
  }
  async setAll(clients) {
    await stateManager.setStringifyState(this.#STATE_KEY, clients);
  }

  async find(cellphone) {
    return (await this.getAll()).find(
      (temporaryClient) =>
        !!isDataHasEqualityWithTargetCellphone(temporaryClient, cellphone)
    );
  }
  async findIndex(client) {
    return (await this.getAll()).findIndex(
      (temporaryClient) =>
        !!isDataHasEqualityWithTargetCellphone(temporaryClient, client)
    );
  }

  async add(client) {
    const clients = await this.getAll();
    clients.push(client);
    await this.setAll(clients);
  }

  async update(client, updateProps) {
    const index = await this.findIndex(client);
    errorThrower(index === -1, errors.TEMPORARY_CLIENT_NOT_FOUND);

    const clients = await this.getAll();
    const temporaryClient = clients[index];
    clients.splice(index, 1, {
      ...temporaryClient,
      ...updateProps,
    });
    await this.setAll(clients);
  }

  async remove(cellphone) {
    const index = await this.findIndex(cellphone);

    if (index !== -1) {
      const clients = await this.getAll();
      clients.splice(index, 1);
      await this.setAll(clients);
    }
  }
}

const temporaryClients = new TemporaryClients();

module.exports = { temporaryClients, TemporaryClients };
