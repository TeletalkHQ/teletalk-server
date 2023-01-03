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
    await testSavedTemporaryClient(successTest, responseData);
  });
});

describe("signIn failure test", () => {
  testHelper
    .createFailTest(requesters.signIn())
    .input(signInCellphone)
    .cellphone(signInCellphone)
    .countryCode(signInCellphone)
    .countryName(signInCellphone)
    .phoneNumber(signInCellphone);
});

const signInRequest = async () => {
  const response = await requesters
    .signIn()
    .sendFullFeaturedRequest(signInCellphone);
  return response.body;
};

const testResponseData = async (builder, responseData) => {
  const {
    user: { token, ...userData },
  } = responseData;

  builder.cellphone({
    requestValue: signInCellphone,
    responseValue: userData,
  });

  await builder.authentication(
    {
      responseValue: token,
      secret: authManager.getJwtSignInSecret(),
    },
    { stringEquality: false }
  );
};

const testSavedTemporaryClient = async (builder, responseData) => {
  const temporaryClient = await temporaryClients.find(responseData.user);

  builder
    .cellphone({
      requestValue: signInCellphone,
      responseValue: temporaryClient,
    })
    .verificationCode({ responseValue: temporaryClient.verificationCode });
};
