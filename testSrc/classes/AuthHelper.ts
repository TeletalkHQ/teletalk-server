import {
  ClientInitializer,
  clientInitializer,
} from "$/classes/ClientInitializer";
import { clientStore } from "@/classes/ClientStore";

import { helpers } from "$/helpers";

import {
  Cellphone,
  ClientSocket,
  FullName,
  SocketResponse,
  Client,
} from "@/types";

class AuthHelper {
  private clientSocket: ClientSocket;
  private createResponse: SocketResponse;
  private signInResponse: SocketResponse;
  private verifyResponse: SocketResponse;
  private clientInitializer: ClientInitializer;

  constructor(private cellphone: Cellphone, private fullName?: FullName) {
    this.clientInitializer = clientInitializer();
  }

  async signIn() {
    this.clientSocket = (
      await this.clientInitializer.createComplete()
    ).getClient();

    this.signInResponse = await helpers.requesterCollection
      .signIn(this.clientSocket)
      .sendFullFeaturedRequest(this.cellphone);

    return this;
  }

  async verify() {
    const clientId = this.clientInitializer.getClientId();
    const client = (await clientStore.find(clientId)) as Client;

    this.verifyResponse = await helpers.requesterCollection
      .verify(this.clientSocket)
      .sendFullFeaturedRequest({
        verificationCode: client.verificationCode,
      });

    return this;
  }

  async create() {
    this.createResponse = await helpers.requesterCollection
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

  getClientId() {
    return this.clientInitializer.getClientId();
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
