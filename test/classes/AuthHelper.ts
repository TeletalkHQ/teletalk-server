import { authManager } from "@/classes/AuthManager";
import { temporaryClients } from "@/classes/TemporaryClients";

import { requesters } from "$/utilities";

class AuthHelper {
  constructor(cellphone, fullName) {
    this.cellphone = cellphone;
    this.fullName = fullName;

    this.signInResponse = undefined;
    this.verifyResponse = undefined;
    this.createResponse = undefined;
  }

  async signIn() {
    const requester = requesters.signIn();
    const response = await requester.sendFullFeaturedRequest(this.cellphone);

    response.body.token = this.fixToken(response);
    this.signInResponse = response;

    return this;
  }

  async verify() {
    const signInToken = this.signInResponse.body.token;
    const tokenId = authManager.getTokenId(
      signInToken,
      authManager.getSignInSecret()
    );

    const temporaryClient = await temporaryClients.find(tokenId);
    const requester = requesters.verify();
    const response = await requester
      .setToken(signInToken)
      .sendFullFeaturedRequest({
        verificationCode: temporaryClient.verificationCode,
      });

    if (!response.body.newUser) {
      response.body.token = this.fixToken(response);
    }

    this.verifyResponse = response;
    return this;
  }

  async create() {
    const requester = requesters.createNewUser();
    const response = await requester
      .setToken(this.signInResponse.body.token)
      .sendFullFeaturedRequest(this.fullName);

    response.body.token = this.fixToken(response);
    this.createResponse = response;
    return this;
  }

  async createComplete() {
    await this.signIn();
    await this.verify();
    await this.create();
    return this;
  }

  fixToken(response) {
    return this.extractCookies(response.headers).SESSION.value;
  }

  extractCookies(headers) {
    return headers["set-cookie"].reduce((shapedCookies, cookieString) => {
      const [rawCookie, ...flags] = cookieString.split("; ");
      const [cookieName, value] = rawCookie.split("=");
      return {
        ...shapedCookies,
        [cookieName]: { value, flags: this.shapeFlags(flags) },
      };
    }, {});
  }
  shapeFlags(flags) {
    return flags.reduce((shapedFlags, flag) => {
      const [flagName, rawValue] = flag.split("=");
      const value = rawValue ? rawValue.replace(";", "") : true;
      return { ...shapedFlags, [flagName]: value };
    }, {});
  }

  getSignInToken() {
    return this.signInResponse.body.token;
  }
  getMainTokenFromCreate() {
    return this.createResponse.body.token;
  }
  getMainTokenFromVerify() {
    return this.verifyResponse.body.token;
  }
}

const authHelper = (cellphone, fullName) => new AuthHelper(cellphone, fullName);

export { authHelper, AuthHelper };
