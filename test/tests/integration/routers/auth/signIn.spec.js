const { authHelper } = require("$/classes/AuthHelper");
const { authManager } = require("@/classes/AuthManager");
const { randomMaker } = require("$/classes/RandomMaker");
const { temporaryClients } = require("@/classes/TemporaryClients");
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
    await testSavedTemporaryClient(successTest, body.token, cellphone);
    await testResponseToken(successTest, body.token);
  });

  it("should sign as existed user", async () => {
    const { user } = await randomMaker.user();
    const cellphone = userUtilities.extractCellphone(user);
    const result = await authHelper(cellphone).signIn();
    const { body } = result.signInResponse;
    const successTest = testHelper.createSuccessTest();
    await testSavedTemporaryClient(successTest, body.token, cellphone);
    await testResponseToken(successTest, body.token);
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
    await testSavedTemporaryClient(successTest, body.token, cellphone);
    await testResponseToken(successTest, body.token);
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

const testSavedTemporaryClient = async (builder, token, cellphone) => {
  const tokenId = authManager.getTokenId(token, authManager.getSignInSecret());

  const temporaryClient = await temporaryClients.find(tokenId);

  expect(temporaryClient).toBeInstanceOf(FIELD_TYPE.OBJECT);
  expect(temporaryClient.countryCode).toBe(cellphone.countryCode);
  expect(temporaryClient.countryName).toBe(cellphone.countryName);
  expect(temporaryClient.phoneNumber).toBe(cellphone.phoneNumber);
  expect(temporaryClient.isVerified).toBe(false);

  builder.verificationCode({ testValue: temporaryClient.verificationCode });
};

const testResponseToken = async (builder, token) => {
  const tokenId = authManager.getTokenId(token, authManager.getSignInSecret());

  builder.userId({ testValue: tokenId }, { stringEquality: false });
};
