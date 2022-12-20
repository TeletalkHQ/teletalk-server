const { authManager } = require("@/classes/AuthManager");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { temporaryClients } = require("@/classes/TemporaryClients");

const { expect } = require("$/functions/utilities/testUtilities");

const { requesters } = require("$/functions/helpers/requesters");
const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { models } = require("@/models");

const userModels = models.native.user;
const cellphones = testVariablesManager.getCellphones();

const signInFn = async () => {
  const {
    body: {
      user: { countryCode, countryName, phoneNumber, token },
    },
  } = await requesters
    .signIn()
    .sendFullFeaturedRequest(cellphones.verifySignInNewUser);

  const { verificationCode } = await temporaryClients.findClientByCellphone({
    countryCode,
    countryName,
    phoneNumber,
  });

  return { token, verificationCode };
};

describe("verifySignInApi success test", () => {
  it("should get newUser === true if there is no user with test verify token in db", async () => {
    const successTests = integrationHelpers.createSuccessTest();

    const signInSecret = authManager.getJwtSignInSecret();
    const tokenVerifier = async (token) => {
      return await successTests.token({
        secret: signInSecret,
        responseValue: token,
      });
    };

    //* 1- Sign in as a new user =>
    const {
      token: newUserVerifyToken,
      verificationCode: newUserVerificationCode,
    } = await signInFn();
    await tokenVerifier(newUserVerifyToken);

    //* 2- Verify user by verificationCode & token =>
    const newUserVerifySignInResponse = await requesters
      .verify()
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
      .createNewUser()
      .setToken(newUserVerifyToken)
      .sendFullFeaturedRequest(fullName);

    //* 5- Now sign in again for test output when newUser === false =>
    const { token: signedUserVerifyToken, verificationCode } = await signInFn();
    await tokenVerifier(signedUserVerifyToken);
    //* 6- Get the verification code =>

    //* 7- Verify sign in when newUser === false =>
    const {
      body: {
        user: { newUser, ...userData },
      },
    } = await requesters
      .verify()
      .setToken(signedUserVerifyToken)
      .sendFullFeaturedRequest({
        verificationCode,
      });

    //* 8- Test output when newUser === false =>
    expect(newUser).equal(false);
    const { countryCode, countryName, phoneNumber } =
      cellphones.verifySignInNewUser;

    integrationHelpers
      .createSuccessTest()
      .countryCode({
        clientValue: countryCode,
        responseValue: userData.countryCode,
      })
      .countryName({
        clientValue: countryName,
        responseValue: userData.countryName,
      })
      .phoneNumber({
        clientValue: phoneNumber,
        responseValue: userData.phoneNumber,
      });
  });
});

describe("verifySignInApi failure tests", () => {
  //* Config customRequest for fail tests
  const customRequest = requesters.verify();
  before(async () => {
    const {
      body: {
        user: { token },
      },
    } = await requesters
      .signIn()
      .sendFullFeaturedRequest(cellphones.verifySignInFailTest);

    customRequest.setToken(token);
  });

  integrationHelpers
    .createFailTest(customRequest)
    .verificationCode()
    .authentication();
});
