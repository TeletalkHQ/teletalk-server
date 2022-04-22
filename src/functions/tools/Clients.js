const { isEqualWithTargetCellphone } = require("~/functions/utilities/utils");

class Clients {
  constructor() {
    this.aliveClients = [];
  }

  addClient(client) {
    this.aliveClients.push(client);
  }

  findClient(client) {
    return this.aliveClients.find(
      (aliveClient) => !!isEqualWithTargetCellphone(aliveClient, client)
    );
  }

  findIndexClient(client) {
    return this.aliveClients.findIndex(
      (aliveClient) => !!isEqualWithTargetCellphone(aliveClient, client)
    );
  }

  updateClient(client, updateProps) {
    const aliveClientIndex = this.findClient(client);

    if (aliveClientIndex !== -1) {
      const aliveClient = this.aliveClients[aliveClientIndex];

      this.aliveClients.splice(aliveClientIndex, 1, {
        ...aliveClient,
        ...updateProps,
      });

      return true;
    }

    return false;
  }
}

const clients = new Clients();

module.exports = { clients };
