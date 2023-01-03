const { authManager } = require("@/classes/AuthManager");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities/requesters");

const { signIn: signInCellphone } = testVariablesManager.getCellphones();

describe("signIn success test", () => {
  it("should sign as new user", async () => {
    const successTest = testHelper.createSuccessTest();

    const responseData = await signInRequest();

    await testResponseData(successTest, responseData);
    await testSavedTemporaryClient(successTest);
  });
});

describe("signIn failure test", () => {
  testHelper.createFailTest(requesters.signIn()).input(signInCellphone);
});

const signInRequest = async () => {
  const { body } = await requesters
    .signIn()
    .sendFullFeaturedRequest(signInCellphone);
  return body;
};

const testResponseData = async (builder, responseData) => {
  const { token } = responseData;

  await builder.authentication(
    {
      responseValue: token,
      secret: authManager.getJwtSignInSecret(),
    },
    { stringEquality: false }
  );
};

const testSavedTemporaryClient = async (builder) => {
  const temporaryClient = await temporaryClients.find(signInCellphone);

  builder.verificationCode({ responseValue: temporaryClient.verificationCode });
};
