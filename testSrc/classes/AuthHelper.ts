import {
	Cellphone,
	CreateNewUserIO,
	FullName,
	SignInIO,
	VerifyIO,
} from "teletalk-type-store";

import { authClientStore } from "~/classes/AuthClientStore";
import { SocketResponse, StoredClient } from "~/types";

import {
	ClientInitializer,
	clientInitializer,
} from "@/classes/ClientInitializer";
import { ClientSocket } from "@/types";
import { utils } from "@/utils";

class AuthHelper {
	private clientSocket: ClientSocket;
	private createResponse: SocketResponse<CreateNewUserIO["output"]>;
	private signInResponse: SocketResponse<SignInIO["output"]>;
	private verifyResponse: SocketResponse<VerifyIO["output"]>;
	private clientInitializer: ClientInitializer;

	constructor(
		private cellphone: Cellphone,
		private fullName?: FullName
	) {
		this.clientInitializer = clientInitializer();
	}

	async signIn() {
		this.clientSocket = (
			await this.clientInitializer.createComplete()
		).getClient();

		this.signInResponse = await utils.requesterCollection
			.signIn(this.clientSocket)
			.emitFull(this.cellphone);

		return this;
	}

	async verify() {
		const clientId = this.clientInitializer.getClient().clientId;
		const client = (await authClientStore.find(clientId)) as StoredClient;

		this.verifyResponse = await utils.requesterCollection
			.verify(this.clientSocket)
			.emitFull({
				verificationCode: client.verificationCode,
			});

		return this;
	}

	async create() {
		this.createResponse = await utils.requesterCollection
			.createNewUser(this.clientSocket)
			.emitFull(this.fullName as FullName);

		return this;
	}

	async createComplete() {
		await this.signIn();
		await this.verify();
		await this.create();
		return this;
	}

	getResponses() {
		return {
			create: this.createResponse,
			signIn: this.signInResponse,
			verify: this.verifyResponse,
		};
	}

	getClientSocket() {
		return this.clientSocket;
	}

	getClientId() {
		return this.clientInitializer.getClient().clientId;
	}
}

export const authHelper = (cellphone: Cellphone, fullName?: FullName) =>
	new AuthHelper(cellphone, fullName);

// extractCookies(headers) {
//   return headers["set-cookie"].reduce((shapedCookies, cookieString) => {
//     const [rawCookie, ...flags] = cookieString.split("; ");
//     const [cookieName, value] = rawCookie.split("=");
//     return {
//       ...shapedCookies,
//       [cookieName]: { value, flags: this.shapeFlags(flags) },
//     };
//   }, {});
// }
// shapeFlags(flags) {
//   return flags.reduce((shapedFlags, flag) => {
//     const [flagName, rawValue] = flag.split("=");
//     const value = rawValue ? rawValue.replace(";", "") : true;
//     return { ...shapedFlags, [flagName]: value };
//   }, {});
// }
