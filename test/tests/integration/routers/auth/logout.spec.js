const { expect } = require("chai");

const { temporaryClients } = require("@/classes/TemporaryClients");
const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models");

const { requesters } = require("$/utilities/requesters");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const userModels = models.native.user;
const cellphones = testVariablesManager.getCellphones();

const fullName = userPropsUtilities.makeRandomFullName(
  userModels.firstName.maxlength.value,
  userModels.lastName.maxlength.value
);

const signInFn = async (cellphone) => {
  const {
    body: { token },
  } = await requesters.signIn().sendFullFeaturedRequest(cellphone);

  const { verificationCode } = await temporaryClients.find(cellphone);

  return {
    token,
    verificationCode,
  };
};

const verifySingIn = async (verificationCode, token) => {
  return await requesters.verify().setToken(token).sendFullFeaturedRequest({
    verificationCode,
  });
};

const createNewUser = async (token) => {
  return await requesters
    .createNewUser()
    .setToken(token)
    .sendFullFeaturedRequest(fullName);
};

const signInVerify = async (cellphone) => {
  const { verificationCode, token: verifyToken } = await signInFn(cellphone);
  const response = await verifySingIn(verificationCode, verifyToken);

  return {
    ...response.body,
    verifyToken,
  };
};
const signVerifyCreate = async (cellphone) => {
  const { verifyToken } = await signInVerify(cellphone);

  const {
    body: { token },
  } = await createNewUser(verifyToken);

  return token;
};

describe("logout success tests", () => {
  it("should get ok:true for logging out user", async () => {
    const token = await signVerifyCreate(cellphones.logoutSuccessTest);

    const response = await requesters
      .logout()
      .sendFullFeaturedRequest(undefined, undefined, { token });

    expect(response.ok).to.be.true;
  });
});

describe("logout fail tests", () => {
  const requester = requesters.logout();

  before(async () => {
    const testUser = testVariablesManager.getUsers().logoutFailTest;
    const cellphone = userPropsUtilities.extractCellphone(testUser);
    const {
      user: { token },
    } = await signInVerify(cellphone);

    requester.setToken(token);
  });

  testHelper
    .createFailTest(requester)
    .authentication()
    .checkCurrentUserStatus();
});
