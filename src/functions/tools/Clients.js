const { isEqualWithTargetCellphone } = require("~/functions/utilities/utils");

class Clients {
  constructor() {
    this.aliveClients = [];
  }

  addClient(client) {
    this.aliveClients.push(client);
  }

  findClient(client) {
    const aliveClient = this.aliveClients.find(
      (aliveClient) => !!isEqualWithTargetCellphone(aliveClient, client)
    );

    return aliveClient;
  }
}

const clients = new Clients();

module.exports = { clients };
