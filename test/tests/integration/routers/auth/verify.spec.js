const { expect } = require("chai");

const { authHelper } = require("$/classes/AuthHelper");
const { randomMaker } = require("$/classes/RandomMaker");
const { temporaryClients } = require("@/classes/TemporaryClients");

const { models } = require("@/models");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");
const { authManager } = require("@/classes/AuthManager");
const { userUtilities } = require("@/classes/UserUtilities");

describe("verifySignInApi success test", () => {
  it("should sign and verify as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);
    await helper.signIn();
    await helper.verify();
    const { body: newUserVerifyData } = helper.verifyResponse;
    expect(newUserVerifyData.newUser).to.be.equal(true);

    const tokenId = authManager.getTokenId(
      helper.signInResponse.body.token,
      authManager.getSignInSecret()
    );

    const client = await temporaryClients.find(tokenId);
    expect(client.isVerified).to.be.equal(true);
  });

  it("should verify as exist user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();
    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    const sessions = [helper.getMainTokenFromCreate()];

    for (let i = 0; i < 9; i++) {
      await helper.signIn();
      await helper.verify();

      expect(helper.verifyResponse.body.newUser).to.be.equal(false);

      sessions.push(helper.getMainTokenFromVerify());
      const successTestBuilder = testHelper.createSuccessTest();
      await testUserSession(successTestBuilder, helper.verifyResponse.body);
    }

    const user = await services.findOneUser(cellphone);

    expect(sessions.length).to.be.equal(user.sessions.length);

    sessions.forEach((item) => {
      const isTokenExist = user.sessions.some(({ token }) => token === item);
      expect(isTokenExist).to.be.true;
    });
  });
});

describe("verifySignIn fail tests", () => {
  const requester = requesters.verify();
  before(async () => {
    const cellphone = randomMaker.unusedCellphone();
    const token = (await authHelper(cellphone).signIn()).getSignInToken();

    requester.setToken(token);
  });

  const data = {
    verificationCode: randomMaker.string(
      models.native.user.verificationCode.length.value
    ),
  };

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(data)
    .verificationCode(data);
});

const testUserSession = async (builder, { token }) => {
  const userId = userUtilities.getUserIdFromToken(token);
  const foundSession = await getSavedUserSession(userId, token);
  await builder.authentication({
    equalValue: foundSession.token,
    testValue: token,
  });
};

const getSavedUserSession = async (userId, token) => {
  const savedUser = await getSavedUser(userId);
  return savedUser.sessions.find((i) => i.token === token);
};

const getSavedUser = async (userId) => {
  return await services.findOneUserById(userId);
};
