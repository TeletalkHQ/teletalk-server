const { expect } = require("chai");

const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities/requesters");

const userModels = models.native.user;
const fullName = userPropsUtilities.makeRandomFullName(
  userModels.firstName.maxlength.value,
  userModels.lastName.maxlength.value
);
const cellphones = testVariablesManager.getCellphones();
const { createNewUser: createNewUserCellphone } = cellphones;

describe("createNewUser success tests", () => {
  it("should create new user in db", async () => {
    const signInToken = await signInRequest(createNewUserCellphone);
    const temporaryClient = await temporaryClients.find(createNewUserCellphone);
    const verifyResponse = await verifyRequest(
      signInToken,
      temporaryClient.verificationCode
    );
    expect(verifyResponse.newUser).to.be.equal(true);

    const createNewUserResponse = await createNewUserRequest(signInToken);

    const successTestBuilder = testHelper.createSuccessTest();

    await testCreatedUserSession(successTestBuilder, createNewUserResponse);
    testCreatedUserData(successTestBuilder, createNewUserResponse);
  });
});

describe("create new  user failure tests", () => {
  const requester = requesters.createNewUser();
  before(async () => {
    const token = await signInRequest(createNewUserCellphone);
    requester.setToken(token);
  });

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(fullName)
    .firstName(fullName)
    .lastName(fullName);
});

const signInRequest = async (cellphone) => {
  const {
    body: { token },
  } = await requesters.signIn().sendFullFeaturedRequest(cellphone);
  return token;
};

const verifyRequest = async (token, verificationCode) => {
  const { body } = await requesters
    .verify()
    .setToken(token)
    .sendFullFeaturedRequest({
      verificationCode,
    });
  return body;
};

const createNewUserRequest = async (token) => {
  const { body } = await requesters
    .createNewUser()
    .setToken(token)
    .sendFullFeaturedRequest(fullName);
  return body;
};

const testCreatedUserSession = async (builder, { token, user }) => {
  const foundSession = await getSavedUserSession(user.userId, token);

  await builder.authentication({
    requestValue: foundSession.token,
    responseValue: token,
  });
};

const getSavedUserSession = async (userId, token) => {
  const savedUser = await getSavedUser(userId);
  return savedUser.sessions.find((i) => i.token === token);
};
const getSavedUser = async (userId) => {
  return await services.findOneUserById(userId);
};

const testCreatedUserData = (builder, { user }) => {
  builder
    .cellphone({
      requestValue: createNewUserCellphone,
      responseValue: user,
    })
    .fullName({
      requestValue: fullName,
      responseValue: user,
    })
    .userId({ responseValue: user.userId }, { stringEquality: false });
};
