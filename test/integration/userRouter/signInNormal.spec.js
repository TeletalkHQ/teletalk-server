const { authManager } = require("@/classes/AuthManager");
const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");

describe("signInNormalApi test success requests", () => {
  it("It should get sign in data like token and verification code", async () => {
    const {
      body: {
        user: {
          countryCode,
          countryName,
          phoneNumber,
          verifyToken,
          verificationCode,
        },
      },
    } = await requesters
      .signInNormal()
      .sendFullFeaturedRequest(testVariables.cellphones.signIn);

    const successTest = integrationHelpers.createSuccessTest();

    successTest
      .countryName({
        clientValue: testVariables.cellphones.signIn.countryName,
        responseValue: countryName,
      })
      .countryCode({
        clientValue: testVariables.cellphones.signIn.countryCode,
        responseValue: countryCode,
      })
      .phoneNumber({
        clientValue: testVariables.cellphones.signIn.phoneNumber,
        responseValue: phoneNumber,
      })
      .verificationCode({ responseValue: verificationCode });

    const JWT_SIGN_IN_SECRET = authManager.getJwtSignInSecret();
    await successTest.token({
      responseValue: verifyToken,
      secret: JWT_SIGN_IN_SECRET,
    });
  });
});

describe("signInNormalApi test failure requests", () => {
  integrationHelpers
    .createFailTest(requesters.signInNormal())
    .cellphone(testVariables.cellphones.signIn)
    .countryCode(testVariables.cellphones.signIn)
    .countryName(testVariables.cellphones.signIn)
    .phoneNumber(testVariables.cellphones.signIn);
});
