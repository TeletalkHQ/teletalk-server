class Clients {
	constructor() {
		this.clients = [];
	}

	addClient(client) {
		this.clients.push(client);
	}
}

const clients = new Clients();

module.exports = { clients };
