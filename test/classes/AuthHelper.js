const { temporaryClients } = require("@/classes/TemporaryClients");

const { requesters } = require("$/utilities");

class AuthHelper {
  constructor(cellphone, fullName) {
    this.cellphone = cellphone;
    this.fullName = fullName;

    this.signInResponse = undefined;
    this.verifyResponse = undefined;
    this.createResponse = undefined;
  }

  async signIn() {
    const response = await requesters
      .signIn()
      .sendFullFeaturedRequest(this.cellphone);
    this.signInResponse = response;
    return this;
  }

  async verify() {
    const temporaryClient = await temporaryClients.find(this.cellphone);
    const response = await requesters
      .verify()
      .setToken(this.signInResponse.body.token)
      .sendFullFeaturedRequest({
        verificationCode: temporaryClient.verificationCode,
      });
    this.verifyResponse = response;
    return this;
  }

  async create() {
    const response = await requesters
      .createNewUser()
      .setToken(this.signInResponse.body.token)
      .sendFullFeaturedRequest(this.fullName);
    this.createResponse = response;
    return this;
  }

  async createComplete() {
    await this.signIn();
    await this.verify();
    await this.create();
    return this;
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

module.exports = {
  authHelper,
  AuthHelper,
};
