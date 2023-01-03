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
    const newUserToken = await signInRequest(verifyCellphone);
    const newUserVerifyData = await verifyRequest(
      newUserToken,
      verifyCellphone
    );

    expect(newUserVerifyData.newUser).to.be.equal(true);
    await createNewUser(newUserToken);

    //? authenticate as newUser:false =>
    const existUserToken = await signInRequest(verifyCellphone);
    const existUserVerifyData = await verifyRequest(
      existUserToken,
      verifyCellphone
    );
    expect(existUserVerifyData.newUser).to.be.equal(false);

    await testExistUserData(successTestBuilder, existUserVerifyData);
    await testExistUserSession(successTestBuilder, existUserVerifyData);
  });
});

describe("verifySignInApi failure tests", () => {
  const requester = requesters.verify();
  before(async () => {
    const token = await signInRequest(cellphones.verifyFailTest);

    requester.setToken(token);
  });

  testHelper
    .createFailTest(requester)
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
    body: { token },
  } = await requesters.signIn().sendFullFeaturedRequest(cellphone);
  return token;
};

const getTemporaryClient = async (cellphone) => {
  return await temporaryClients.find(cellphone);
};

const verifyRequest = async (token, cellphone) => {
  const temporaryClient = await getTemporaryClient(cellphone);
  const { body } = await requesters
    .verify()
    .setToken(token)
    .sendFullFeaturedRequest({
      verificationCode: temporaryClient.verificationCode,
    });
  return body;
};

const createNewUser = async (token) => {
  await requesters
    .createNewUser()
    .setToken(token)
    .sendFullFeaturedRequest(fullName);
};

const testExistUserData = async (builder, { user }) => {
  const savedUserData = await getSavedUserData(user.userId);
  const mergedRequestDataWithSavedUserData = {
    ...savedUserData,
    ...fullName,
    ...verifyCellphone,
  };
  builder.userData({
    requestValue: mergedRequestDataWithSavedUserData,
    responseValue: user,
  });
};

const testExistUserSession = async (builder, { user, token }) => {
  const foundSession = await getSavedUserSession(user.userId, token);
  await builder.authentication({
    requestValue: foundSession.token,
    responseValue: token,
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
