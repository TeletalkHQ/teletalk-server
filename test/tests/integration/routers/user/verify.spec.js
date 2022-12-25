const { expect } = require("chai");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { temporaryClients } = require("@/classes/TemporaryClients");

const { models } = require("@/models");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities/requesters");

const cellphones = testVariablesManager.getCellphones();
const userModels = models.native.user;
const fullName = userPropsUtilities.makeRandomFullName(
  userModels.firstName.maxlength.value,
  userModels.lastName.maxlength.value
);
const verifyCellphone = cellphones.verifyAsNewUser;

describe("verifySignInApi success test", () => {
  it("should do test response of both new user true|false mode", async () => {
    const successTestBuilder = testHelper.createSuccessTest();

    //? authenticate as newUser:true =>
    const newUserSignData = await signInRequest(verifyCellphone);
    const newUserVerifyData = await verifyRequest(newUserSignData);
    expect(newUserVerifyData.newUser).to.be.equal(true);
    await createNewUser(newUserSignData.token);

    //? authenticate as newUser:false =>
    const existUserSignData = await signInRequest(verifyCellphone);
    const existUserVerifyData = await verifyRequest(existUserSignData);
    expect(existUserVerifyData.newUser).to.be.equal(false);

    await testExistUserData(successTestBuilder, existUserVerifyData);
    await testExistUserSession(successTestBuilder, existUserVerifyData);
  });
});

describe("verifySignInApi failure tests", () => {
  const customRequest = requesters.verify();
  before(async () => {
    const { token } = await signInRequest(cellphones.verifyFailTest);

    customRequest.setToken(token);
  });

  testHelper
    .createFailTest(customRequest)
    .input({
      verificationCode: randomMaker.randomString(
        userModels.verificationCode.length.value
      ),
    })
    .verificationCode()
    .authentication();
});

const signInRequest = async (cellphone) => {
  const {
    body: { user },
  } = await requesters.signIn().sendFullFeaturedRequest(cellphone);
  return user;
};

const getTemporaryClient = async (cellphone) => {
  return await temporaryClients.find(cellphone);
};

const verifyRequest = async (data) => {
  const temporaryClient = await getTemporaryClient(data);
  const {
    body: { user },
  } = await requesters.verify().setToken(data.token).sendFullFeaturedRequest({
    verificationCode: temporaryClient.verificationCode,
  });
  return user;
};

const createNewUser = async (token) => {
  await requesters
    .createNewUser()
    .setToken(token)
    .sendFullFeaturedRequest(fullName);
};

const testExistUserData = async (builder, data) => {
  const savedUserData = await getSavedUserData(data.userId);
  const mergedRequestDataWithSavedUserData = {
    ...savedUserData,
    ...fullName,
    ...verifyCellphone,
  };
  builder.userData({
    requestValue: mergedRequestDataWithSavedUserData,
    responseValue: data,
  });
};

const testExistUserSession = async (builder, data) => {
  const foundSession = await getSavedUserSession(data.userId, data.token);
  await builder.authentication({
    requestValue: foundSession.token,
    responseValue: data.token,
  });
};

const getSavedUser = async (userId) => {
  return await services.findOneUserById(userId);
};
const getSavedUserData = async (userId) => {
  const savedUser = await getSavedUser(userId);
  return userPropsUtilities.extractUserData(savedUser);
};

const getSavedUserSession = async (userId, token) => {
  const savedUser = await getSavedUser(userId);
  return savedUser.sessions.find((i) => i.token === token);
};
