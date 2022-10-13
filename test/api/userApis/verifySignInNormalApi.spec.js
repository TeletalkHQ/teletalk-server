const { authManager } = require("@/classes/AuthManager");
const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("@/functions/utilities/testUtilities");

const { requesters } = require("$/helpers/requesters");

const { models } = require("@/models/models");

const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const signInFn = async () => {
  const {
    body: {
      user: { verifyToken, verificationCode },
    },
  } = await requesters
    .signInNormalRequest()
    .sendFullFeaturedRequest(testVariables.cellphones.verifySignInNewUser);

  return { verifyToken, verificationCode };
};

describe("verifySignInNormalApi success test", () => {
  it("should get newUser === true if there is no user with test verify token in db", async () => {
    const generalSuccessTests = generalTest.createSuccessTest();

    const signInSecret = authManager.getJwtSignInSecret();
    const tokenVerifier = async (token) => {
      return await generalSuccessTests.token({
        secret: signInSecret,
        tokenTest: token,
      });
    };

    //* 1- Sign in as a new user =>
    const {
      verifyToken: newUserVerifyToken,
      verificationCode: newUserVerificationCode,
    } = await signInFn();
    await tokenVerifier(newUserVerifyToken);

    //* 2- Verify user by verificationCode & verifyToken =>
    const newUserVerifySignInResponse = await requesters
      .verifySignInRequest()
      .setToken(newUserVerifyToken)
      .sendFullFeaturedRequest({
        verificationCode: newUserVerificationCode,
      });

    //* 3- Test output when newUser === false =>
    expect(newUserVerifySignInResponse.body.user.newUser).equal(true);

    //* 4- Finalize new user sign in (save user in db) =>
    const fullName = userPropsUtilities.makeRandomFullName(
      userModels.firstName.maxlength.value,
      userModels.lastName.maxlength.value
    );
    await requesters
      .createNewUserRequest()
      .setToken(newUserVerifyToken)
      .sendFullFeaturedRequest(fullName);

    //* 5- Now sign in again for test output when newUser === false =>
    const { verifyToken: signedUserVerifyToken, verificationCode } =
      await signInFn();
    await tokenVerifier(signedUserVerifyToken);
    //* 6- Get the verification code =>

    //* 7- Verify sign in when newUser === false =>
    const {
      body: {
        user: { newUser, ...userData },
      },
    } = await requesters
      .verifySignInRequest()
      .setToken(signedUserVerifyToken)
      .sendFullFeaturedRequest({
        verificationCode,
      });

    //* 8- Test output when newUser === false =>
    expect(newUser).equal(false);
    const { countryCode, countryName, phoneNumber } =
      testVariables.cellphones.verifySignInNewUser;

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
  //* Config customRequest for fail tests
  const customRequest = requesters.verifySignInRequest();
  before(async () => {
    const {
      body: {
        user: { verifyToken },
      },
    } = await requesters
      .signInNormalRequest()
      .sendFullFeaturedRequest(testVariables.cellphones.verifySignInFailTest);

    customRequest.setToken(verifyToken);
  });

  generalTest.createFailTest(customRequest).verificationCode().authentication();
});
