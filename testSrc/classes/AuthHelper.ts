import {
	Cellphone,
	CreateNewUserIO,
	FullName,
	SignInIO,
	VerifyIO,
} from "teletalk-type-store";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { sessionManager } from "~/classes/SessionManager";
import { SocketResponse, StoredAuthSession } from "~/types";

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
		this.clientSocket = (await this.clientInitializer.init()).getClient();
		this.clientSocket.connect();

		this.signInResponse = await utils.requesterCollection
			.signIn(this.clientSocket)
			.emitFull(this.cellphone);

		return this;
	}

	async verify() {
		const { session } = this.getResponses().signIn.data;

		this.clientInitializer.reinitializeWithSession(session);

		const verifiedSession = await sessionManager.verify(session);

		const sessionId = sessionManager.getSessionId(verifiedSession);
		const authSession = (await authSessionStore.find(
			sessionId
		)) as StoredAuthSession;

		this.verifyResponse = await utils.requesterCollection
			.verify(this.clientSocket)
			.emitFull({
				verificationCode: authSession.verificationCode,
			});

		return this;
	}

	async create() {
		this.createResponse = await utils.requesterCollection
			.createNewUser(this.clientSocket)
			.emitFull(this.fullName as FullName);

		this.clientInitializer.reinitializeWithSession(
			this.createResponse.data.session
		);

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

	getSession() {
		return this.clientInitializer.getClient().session;
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
