const { authManager } = require("@/classes/AuthManager");
const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("@/functions/utilities/testUtilities");

const {
  testVariables: {
    cellphones: { verifySignInNewUserCellphone, verifySignInFailTestCellphone },
  },
  requesters: {
    verifySignInRequest,
    signInNormalRequest,
    createNewUserRequest,
  },
} = require("@/variables/others/testVariables");

describe("verifySignInNormalApi success test", () => {
  it("should get newUser === true if there is no user with test verify token in db", async () => {
    const generalSuccessTests = generalTest.createSuccessTest();

    const signInFn = async () => {
      const {
        body: {
          user: { verifyToken },
        },
      } = await signInNormalRequest.sendRequest(verifySignInNewUserCellphone);

      return verifyToken;
    };
    const verifyTokenSecret = authManager.getJwtSignInSecret();
    const tokenVerifier = async (token) => {
      await generalSuccessTests.token({
        tokenTest: token,
        secret: verifyTokenSecret,
      });
    };

    //* 1- Sign in as a new user =>
    const newUserVerifyToken = await signInFn();
    await tokenVerifier(newUserVerifyToken);
    //* 2- Get verification code, In test mode the verification code is stored in env =>
    const newUserVerificationCode =
      userPropsUtilities.getTestVerificationCode();

    //* 3- Verify user by verificationCode & verifyToken =>
    const newUserVerifySignInResponse = await verifySignInRequest
      .setToken(newUserVerifyToken)
      .sendRequest({
        verificationCode: newUserVerificationCode,
      });

    //* 4- Test output when newUser === false =>
    expect(newUserVerifySignInResponse.body.user.newUser).equal(true);

    //* 5- Finalize new user sign in (save user in db) =>
    const fullName = userPropsUtilities.makeTestFullName();
    await createNewUserRequest
      .setToken(newUserVerifyToken)
      .sendRequest(fullName);

    //* 6- Now sign in again for test output when newUser === false =>
    const existedUserVerifyToken = await signInFn();
    await tokenVerifier(existedUserVerifyToken);
    //* 7- Get the verification code =>
    const existedVerificationCode =
      userPropsUtilities.getTestVerificationCode();

    //* 8- Verify sign in when newUser === false =>
    const {
      body: {
        user: { newUser, ...userData },
      },
    } = await verifySignInRequest.setToken(existedUserVerifyToken).sendRequest({
      verificationCode: existedVerificationCode,
    });

    //* 9- Test output when newUser === false =>
    expect(newUser).equal(false);
    const { countryCode, countryName, phoneNumber } =
      verifySignInNewUserCellphone;

    generalTest
      .createSuccessTest()
      .countryCode({
        countryCodeMain: countryCode,
        countryCodeTest: userData.countryCode,
      })
      .countryName({
        countryNameMain: countryName,
        countryNameTest: userData.countryName,
      })
      .phoneNumber({
        phoneNumberMain: phoneNumber,
        phoneNumberTest: userData.phoneNumber,
      });
  });
});

describe("verifySignInNormalApi failure tests", () => {
  before(async () => {
    const {
      body: {
        user: { verifyToken },
      },
    } = await signInNormalRequest.sendRequest(verifySignInFailTestCellphone);

    verifySignInRequest.setToken(verifyToken);
  });

  generalTest
    .createFailTest(verifySignInRequest)
    .verificationCode()
    .authentication();
});
