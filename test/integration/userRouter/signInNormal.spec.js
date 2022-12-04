const { authManager } = require("@/classes/AuthManager");
const { temporaryClients } = require("@/classes/TemporaryClients");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariablesManager } = require("$/classes/TestVariablesManager");

const cellphones = testVariablesManager.getCellphones();

describe("signInNormalApi test success requests", () => {
  it("It should get sign in data like token and verification code", async () => {
    const {
      body: {
        user: { countryCode, countryName, phoneNumber, token },
      },
    } = await requesters
      .signInNormal()
      .sendFullFeaturedRequest(cellphones.signIn);

    const tempoClient = await temporaryClients.findClientByCellphone({
      countryCode,
      countryName,
      phoneNumber,
    });

    const { verificationCode } = tempoClient;
    const successTest = integrationHelpers.createSuccessTest();

    successTest
      .countryName({
        clientValue: cellphones.signIn.countryName,
        responseValue: countryName,
      })
      .countryCode({
        clientValue: cellphones.signIn.countryCode,
        responseValue: countryCode,
      })
      .phoneNumber({
        clientValue: cellphones.signIn.phoneNumber,
        responseValue: phoneNumber,
      })
      .verificationCode({ responseValue: verificationCode });

    const JWT_SIGN_IN_SECRET = authManager.getJwtSignInSecret();
    await successTest.token({
      responseValue: token,
      secret: JWT_SIGN_IN_SECRET,
    });
  });
});

describe("signInNormalApi test failure requests", () => {
  integrationHelpers
    .createFailTest(requesters.signInNormal())
    .cellphone(cellphones.signIn)
    .countryCode(cellphones.signIn)
    .countryName(cellphones.signIn)
    .phoneNumber(cellphones.signIn);
});
