const { isEqualWithTargetCellphone } = require("~/functions/utilities/utils");
const {
  state: { getStateObject, setStateObject },
} = require("~/functions/tools/State");

const {
  initialValue: { stateKeys },
} = require("~/variables/constants/initialValues/initialValue");

class TemporaryClients {
  constructor(temporaryClients) {
    this.initializeClients();
  }
  async addClient(client) {
    const aliveClients = await this.getAliveClients();

    aliveClients.push(client);

    this.setAliveClients(aliveClients);
  }

  async setAliveClients(aliveClients) {
    const temporaryClients = await getStateObject(stateKeys.temporaryClients);

    const newClients = {
      ...temporaryClients,
      aliveClients,
    };

    await setStateObject(stateKeys.temporaryClients, newClients);
  }

  async getAliveClients() {
    const temporaryClients = await getStateObject(stateKeys.temporaryClients);

    return temporaryClients.aliveClients || [];
  }

  async findClient(client) {
    const aliveClients = await this.getAliveClients();

    return aliveClients.find(
      (aliveClient) => !!isEqualWithTargetCellphone(aliveClient, client)
    );
  }

  async findClientIndex(client) {
    const aliveClients = await this.getAliveClients();

    return aliveClients.findIndex(
      (aliveClient) => !!isEqualWithTargetCellphone(aliveClient, client)
    );
  }

  async updateClient(client, updateProps) {
    const aliveClients = await this.getAliveClients();
    const aliveClientIndex = await this.findClient(client);

    if (aliveClientIndex !== -1) {
      const aliveClient = aliveClients[aliveClientIndex];

      aliveClients.splice(aliveClientIndex, 1, {
        ...aliveClient,
        ...updateProps,
      });

      this.setAliveClients(aliveClients);

      return true;
    }

    return false;
  }

  async getClients() {
    const temporaryClients = await getStateObject(stateKeys.temporaryClients);

    return temporaryClients;
  }

  async initializeClients(temporaryClients = {}) {
    const oldClients = await this.getClients();
    if (!oldClients) {
      setStateObject(stateKeys.temporaryClients, temporaryClients);
    }
  }
}

const temporaryClients = new TemporaryClients({});

module.exports = { temporaryClients };
