const { isEqualWithTargetCellphone } = require("~/functions/utilities/utils");
const {
  state: { getState, setState },
} = require("~/functions/tools/State");

const {
  initialValue: { stateKeys },
} = require("~/variables/constants/initialValues/initialValue");

class Clients {
  async addClient(client) {
    const aliveClients = await this.getAliveClients();

    aliveClients.push(client);

    this.setAliveClients(aliveClients);
  }

  async setAliveClients(aliveClients) {
    const clients = JSON.parse(await getState(stateKeys.clients));

    const newClients = {
      ...clients,
      aliveClients,
    };

    await setState(stateKeys.clients, JSON.stringify(newClients));
  }

  async getAliveClients() {
    const clients = await getState(stateKeys.clients);

    console.log("clients", clients);

    return JSON.parse(clients).aliveClients;
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
}

const clients = new Clients();

setState(
  stateKeys.clients,
  JSON.stringify({
    [stateKeys.clients.aliveClients]: [],
  })
);

module.exports = { clients };
