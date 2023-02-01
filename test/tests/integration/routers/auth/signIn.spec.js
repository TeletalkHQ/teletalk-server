const { expect } = require("chai");

const { authManager } = require("@/classes/AuthManager");
const { randomMaker } = require("$/classes/RandomMaker");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { authHelper } = require("$/classes/AuthHelper");
const { userUtilities } = require("@/classes/UserUtilities");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

describe("signIn success test", () => {
  it("should sign as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const result = await authHelper(cellphone).signIn();
    const { body } = result.signInResponse;
    const successTest = testHelper.createSuccessTest();
    await testSavedTemporaryClient(successTest, body, cellphone);
    await testResponseData(successTest, body, cellphone);
  });

  it("should sign as existed user", async () => {
    const { user } = await randomMaker.user();
    const cellphone = userUtilities.extractCellphone(user);
    const result = await authHelper(cellphone).signIn();
    const { body } = result.signInResponse;
    const successTest = testHelper.createSuccessTest();
    await testSavedTemporaryClient(successTest, body, cellphone);
    await testResponseData(successTest, body, cellphone);
  });

  it("should sign multiple time, so temporary client get updated", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);

    for (let i = 0; i < 10; i++) {
      await helper.signIn();
    }

    const result = await helper.signIn();
    const { body } = result.signInResponse;
    const successTest = testHelper.createSuccessTest();
    await testSavedTemporaryClient(successTest, body, cellphone);
    await testResponseData(successTest, body, cellphone);
  });
});

describe("signIn fail test", () => {
  const signInCellphone = randomMaker.unusedCellphone();
  testHelper
    .createFailTest(requesters.signIn())
    .input(signInCellphone)
    .countryCode(signInCellphone)
    .countryName(signInCellphone)
    .phoneNumber(signInCellphone);
});

const testSavedTemporaryClient = async (
  builder,
  responseData,
  signedCellphone
) => {
  const { token } = responseData;
  const temporaryClient = await temporaryClients.find(signedCellphone);

  expect(temporaryClient).to.be.an(FIELD_TYPE.OBJECT);
  expect(temporaryClient.isVerified).to.be.equal(false);
  expect(temporaryClient.countryCode).to.be.equal(signedCellphone.countryCode);
  expect(temporaryClient.countryName).to.be.equal(signedCellphone.countryName);
  expect(temporaryClient.phoneNumber).to.be.equal(signedCellphone.phoneNumber);
  expect(temporaryClient.token).to.be.equal(token);

  builder.verificationCode({ testValue: temporaryClient.verificationCode });
};

const testResponseData = async (builder, responseData, signedCellphone) => {
  const temporaryClient = await temporaryClients.find(signedCellphone);
  const { token } = responseData;

  await builder.authentication({
    equalValue: temporaryClient.token,
    testValue: token,

    secret: authManager.getJwtSignInSecret(),
  });
};
