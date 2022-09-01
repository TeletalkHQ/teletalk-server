const { authManager } = require("@/classes/AuthManager");
const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  testVariables: {
    cellphones: { signInCellphone },
  },
  requesters: { signInNormalRequest },
} = require("@/variables/others/testVariables");

describe("signInNormalApi test success requests", () => {
  it(`It should get sign in data like token and verification code`, async () => {
    const {
      body: {
        user: { countryCode, countryName, phoneNumber, verifyToken },
      },
    } = await signInNormalRequest().sendFullFeaturedRequest(signInCellphone);

    const verificationCode = userPropsUtilities.getTestVerificationCode();

    const successTest = generalTest.createSuccessTest();

    successTest
      .countryName({
        countryNameMain: signInCellphone.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain: signInCellphone.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain: signInCellphone.phoneNumber,
        phoneNumberTest: phoneNumber,
      })
      .verificationCode({ verificationCodeTest: verificationCode });

    const JWT_SIGN_IN_SECRET = authManager.getJwtSignInSecret();
    await successTest.token({
      tokenTest: verifyToken,
      secret: JWT_SIGN_IN_SECRET,
    });

    userPropsUtilities.setTestVerifyToken(verifyToken);
  });
});

describe("signInNormalApi test failure requests", () => {
  generalTest
    .createFailTest(signInNormalRequest())
    .cellphone(signInCellphone)
    .countryCode(signInCellphone)
    .countryName(signInCellphone)
    .phoneNumber(signInCellphone);
});
