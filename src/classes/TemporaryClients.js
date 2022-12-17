const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/functions/utilities");

const { stateManager } = require("@/classes/StateManager");
const { appOptions } = require("@/classes/AppOptions");

const { errorThrower } = require("utility-store/src/functions/utilities");
const { errors } = require("@/variables/errors");

class TemporaryClients {
  #temporaryClientsKey = appOptions.getOptions().stateKeys.temporaryClients;

  async addClient(client) {
    const temporaryClients = await this.getTemporaryClients();
    temporaryClients.push(client);
    await this.setTemporaryClients(temporaryClients);
  }

  async setTemporaryClients(temporaryClients) {
    await stateManager.setStringifyState(
      this.#temporaryClientsKey,
      temporaryClients
    );
  }

  async getTemporaryClients() {
    return await stateManager.getStateAndParse(this.#temporaryClientsKey);
  }

  async findClientByCellphone(cellphone) {
    const temporaryClients = await this.getTemporaryClients();
    return temporaryClients.find(
      (temporaryClient) =>
        !!isDataHasEqualityWithTargetCellphone(temporaryClient, cellphone)
    );
  }

  async updateClient(client, updateProps) {
    const temporaryClients = await this.getTemporaryClients();

    const temporaryClientIndex = temporaryClients.findIndex(
      (temporaryClient) =>
        !!isDataHasEqualityWithTargetCellphone(temporaryClient, client)
    );

    //TODO: Add some tests
    errorThrower(
      temporaryClientIndex === -1,
      errors.TEMPORARY_CLIENT_NOT_FOUND
    );

    const temporaryClient = temporaryClients[temporaryClientIndex];
    temporaryClients.splice(temporaryClientIndex, 1, {
      ...temporaryClient,
      ...updateProps,
    });
    await this.setTemporaryClients(temporaryClients);
  }
}

const temporaryClients = new TemporaryClients();

module.exports = { temporaryClients, TemporaryClients };
