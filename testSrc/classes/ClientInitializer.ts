import Client, {
	ManagerOptions,
	Socket,
	SocketOptions,
} from "socket.io-client";
import { EncryptedSession } from "teletalk-type-store";

import { configs } from "~/classes/Configs";

export class ClientInitializer {
	private client: Socket;
	private session: EncryptedSession = "";

	async init() {
		this.client = Client(this.getUrl(), this.makeClientSocketOptions());
		return this;
	}

	private getUrl() {
		const {
			APP: { PORT, HOSTNAME },
		} = configs.getConfigs();
		return `http://${HOSTNAME}:${PORT}`;
	}

	setSession(session: EncryptedSession) {
		this.session = session;
	}

	initSession() {
		this.client.auth = {
			...this.client.auth,
			session: this.session,
		};
	}

	private makeClientSocketOptions(session = this.session) {
		const options: Partial<ManagerOptions & SocketOptions> = {
			autoConnect: false,
			auth: {
				session,
			},
		};

		return options;
	}

	connect() {
		this.client.connect();
		return this;
	}

	getClient() {
		return this.client;
	}

	reinitializeWithSession(session: EncryptedSession) {
		this.setSession(session);
		this.initSession();
		this.client.disconnect();
		this.client.connect();
	}
}

export const clientInitializer = () => new ClientInitializer();
