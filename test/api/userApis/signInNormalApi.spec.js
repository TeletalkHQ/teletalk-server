const { authManager } = require("@/classes/AuthManager");
const { generalTest } = require("@/classes/GeneralTest");

const { requesters } = require("$/helpers/requesters");

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
      .signInNormalRequest()
      .sendFullFeaturedRequest(testVariables.cellphones.signIn);

    const successTest = generalTest.createSuccessTest();

    successTest
      .countryName({
        countryNameMain: testVariables.cellphones.signIn.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain: testVariables.cellphones.signIn.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain: testVariables.cellphones.signIn.phoneNumber,
        phoneNumberTest: phoneNumber,
      })
      .verificationCode({ verificationCodeTest: verificationCode });

    const JWT_SIGN_IN_SECRET = authManager.getJwtSignInSecret();
    await successTest.token({
      tokenTest: verifyToken,
      secret: JWT_SIGN_IN_SECRET,
    });
  });
});

describe("signInNormalApi test failure requests", () => {
  generalTest
    .createFailTest(requesters.signInNormalRequest())
    .cellphone(testVariables.cellphones.signIn)
    .countryCode(testVariables.cellphones.signIn)
    .countryName(testVariables.cellphones.signIn)
    .phoneNumber(testVariables.cellphones.signIn);
});
