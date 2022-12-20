const { authManager } = require("@/classes/AuthManager");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const {
  integrationHelpers,
} = require("$/tests/integration/helpers/integrationHelpers");
const { requesters } = require("$/utilities/requesters");

const cellphones = testVariablesManager.getCellphones();
const signInCellphone = cellphones.signIn;

describe("signInApi success test", () => {
  it("should sign user, test tempClient and response value", async () => {
    const {
      body: {
        user: { countryCode, countryName, phoneNumber, token },
      },
    } = await requesters.signIn().sendFullFeaturedRequest(signInCellphone);

    //? Test response
    const successTest = integrationHelpers.createSuccessTest();
    successTest
      .countryCode({
        requestValue: signInCellphone.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        requestValue: signInCellphone.countryName,
        responseValue: countryName,
      })
      .phoneNumber({
        requestValue: signInCellphone.phoneNumber,
        responseValue: phoneNumber,
      });
    const JWT_SIGN_IN_SECRET = authManager.getJwtSignInSecret();
    await successTest.token({
      responseValue: token,
      secret: JWT_SIGN_IN_SECRET,
    });

    //? Test saved temporary client
    const temporaryClient = await temporaryClients.findClientByCellphone({
      countryCode,
      countryName,
      phoneNumber,
    });
    successTest
      .countryName({
        requestValue: signInCellphone.countryName,
        responseValue: temporaryClient.countryName,
      })
      .countryCode({
        requestValue: signInCellphone.countryCode,
        responseValue: temporaryClient.countryCode,
      })
      .phoneNumber({
        requestValue: signInCellphone.phoneNumber,
        responseValue: temporaryClient.phoneNumber,
      })
      .verificationCode({ responseValue: temporaryClient.verificationCode });
  });
});

describe("signInApi failure test", () => {
  integrationHelpers
    .createFailTest(requesters.signIn())
    .cellphone(signInCellphone)
    .countryCode(signInCellphone)
    .countryName(signInCellphone)
    .phoneNumber(signInCellphone);
});
