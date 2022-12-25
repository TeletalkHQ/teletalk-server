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

//TODO Add USER_EXIST fail tests

describe("createNewUser success tests", () => {
  it("should create new user in db", async () => {
    const signInResponse = await signInRequest(createNewUserCellphone);
    const temporaryClient = await temporaryClients.find(signInResponse);
    const verifyResponse = await verifyRequest(
      signInResponse.token,
      temporaryClient.verificationCode
    );
    expect(verifyResponse.newUser).to.be.equal(true);

    const createNewUserResponse = await createNewUserRequest(
      signInResponse.token
    );

    const successTestBuilder = testHelper.createSuccessTest();

    await testCreatedUserSession(successTestBuilder, createNewUserResponse);
    testCreatedUserData(successTestBuilder, createNewUserResponse);
  });
});

describe("create new  user failure tests", () => {
  //* Config customRequest for fail tests
  const customRequest = requesters.createNewUser();
  before(async () => {
    const { token } = await signInRequest(createNewUserCellphone);

    customRequest.setToken(token);
  });

  testHelper
    .createFailTest(customRequest)
    .authentication()
    .input(fullName)
    .firstName(fullName)
    .lastName(fullName);
});

const signInRequest = async (cellphone) => {
  const {
    body: { user },
  } = await requesters.signIn().sendFullFeaturedRequest(cellphone);
  return user;
};

const verifyRequest = async (token, verificationCode) => {
  const {
    body: { user },
  } = await requesters.verify().setToken(token).sendFullFeaturedRequest({
    verificationCode,
  });
  return user;
};

const createNewUserRequest = async (token) => {
  const {
    body: { user },
  } = await requesters
    .createNewUser()
    .setToken(token)
    .sendFullFeaturedRequest(fullName);
  return user;
};

const testCreatedUserSession = async (builder, data) => {
  const foundSession = await getSavedUserSession(data.userId, data.token);

  await builder.authentication({
    requestValue: foundSession.token,
    responseValue: data.token,
  });
};

const getSavedUserSession = async (userId, token) => {
  const savedUser = await getSavedUser(userId);
  return savedUser.sessions.find((i) => i.token === token);
};
const getSavedUser = async (userId) => {
  return await services.findOneUserById(userId);
};

const testCreatedUserData = (builder, data) => {
  builder
    .cellphone({
      requestValue: createNewUserCellphone,
      responseValue: data,
    })
    .fullName({
      requestValue: fullName,
      responseValue: data,
    })
    .userId({ responseValue: data.userId }, { stringEquality: false });
};
