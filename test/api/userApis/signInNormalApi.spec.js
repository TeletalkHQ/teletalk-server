const { envManager } = require("@/classes/EnvironmentManager");

const { generalTest } = require("@/classes/GeneralTest");

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
    } = await signInNormalRequest.sendRequest(signInCellphone);

    const verificationCode = envManager.getTestVerificationCode();

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

    await successTest.token({
      tokenTest: verifyToken,
      secret: envManager.getJwtSecrets().JWT_SIGN_IN_SECRET,
    });

    envManager.setTestVerifyToken(verifyToken);
  });
});

describe("signInNormalApi test failure requests", () => {
  generalTest
    .createFailTest(signInNormalRequest)
    .cellphone(signInCellphone)
    .countryCode(signInCellphone)
    .countryName(signInCellphone)
    .phoneNumber(signInCellphone);
});
