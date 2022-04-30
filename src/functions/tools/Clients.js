const { isEqualWithTargetCellphone } = require("~/functions/utilities/utils");
const {
  state: { getStateObject, setStateObject },
} = require("~/functions/tools/State");

const {
  initialValue: { stateKeys },
} = require("~/variables/constants/initialValues/initialValue");

class Clients {
  constructor(clients) {
    this.initializeClients();
  }
  async addClient(client) {
    const aliveClients = await this.getAliveClients();

    aliveClients.push(client);

    this.setAliveClients(aliveClients);
  }

  async setAliveClients(aliveClients) {
    const clients = await getStateObject(stateKeys.clients);

    const newClients = {
      ...clients,
      aliveClients,
    };

    await setStateObject(stateKeys.clients, newClients);
  }

  async getAliveClients() {
    const clients = await getStateObject(stateKeys.clients);

    return clients.aliveClients || [];
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
    const clients = await getStateObject(stateKeys.clients);

    return clients;
  }

  async initializeClients(clients = {}) {
    const oldClients = await this.getClients();
    if (!oldClients) {
      setStateObject(stateKeys.clients, clients);
    }
  }
}

const clients = new Clients({});

module.exports = { clients };
