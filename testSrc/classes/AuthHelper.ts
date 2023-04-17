import { socketHelper } from "$/classes/SocketHelper";
import { temporaryClients } from "@/classes/TemporaryClients";

import {
  Cellphone,
  ClientSocket,
  FullName,
  SocketResponse,
  TemporaryClient,
} from "@/types";

import { utilities } from "$/utilities";
import { authManager } from "@/classes/AuthManager";

class AuthHelper {
  private clientSocket: ClientSocket;
  private createResponse: SocketResponse;
  private signInResponse: SocketResponse;
  private verifyResponse: SocketResponse;

  constructor(private cellphone: Cellphone, private fullName?: FullName) {
    this.clientSocket = socketHelper.createClient();
  }

  async signIn() {
    this.signInResponse = await utilities.requesters
      .signIn(this.clientSocket)
      .sendFullFeaturedRequest(this.cellphone);

    return this;
  }

  async verify() {
    const clientId = authManager.getTokenId(
      this.signInResponse.data.token,
      authManager.getSignInSecret()
    );
    const temporaryClient = (await temporaryClients.find(
      clientId
    )) as TemporaryClient;

    this.verifyResponse = await utilities.requesters
      .verify(this.clientSocket)
      .sendFullFeaturedRequest({
        verificationCode: temporaryClient.verificationCode,
      });

    return this;
  }

  async create() {
    this.createResponse = await utilities.requesters
      .createNewUser(this.clientSocket)
      .sendFullFeaturedRequest(this.fullName as FullName);

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
}

const authHelper = (cellphone: Cellphone, fullName?: FullName) =>
  new AuthHelper(cellphone, fullName);

export { authHelper, AuthHelper };

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