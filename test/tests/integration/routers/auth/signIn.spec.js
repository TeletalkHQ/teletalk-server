const { authManager } = require("@/classes/AuthManager");
const { randomMaker } = require("$/classes/RandomMaker");
const { temporaryClients } = require("@/classes/TemporaryClients");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");
const { expect } = require("chai");
const { FIELD_TYPE } = require("@/variables/others/fieldType");
const { authHelper } = require("$/classes/AuthHelper");

describe("signIn success test", () => {
  const signInCellphone = randomMaker.unusedCellphone();
  it("should sign as new user", async () => {
    const result = await authHelper(signInCellphone).signIn();
    const { body } = result.signInResponse;
    const successTest = testHelper.createSuccessTest();
    await testSavedTemporaryClient(successTest, body, signInCellphone);
    await testResponseData(successTest, body, signInCellphone);
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
