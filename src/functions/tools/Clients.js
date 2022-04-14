class Clients {
  constructor() {
    this.aliveClients = [];
  }

  addClient(client) {
    this.aliveClients.push(client);
  }
}

const clients = new Clients();

module.exports = { clients };
