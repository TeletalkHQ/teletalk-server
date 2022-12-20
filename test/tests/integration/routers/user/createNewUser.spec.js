const { authManager } = require("@/classes/AuthManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("$/functions/utilities/testUtilities");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { models } = require("@/models");

const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { temporaryClients } = require("@/classes/TemporaryClients");

const userModels = models.native.user;

const fullName = userPropsUtilities.makeRandomFullName(
  userModels.firstName.maxlength.value,
  userModels.lastName.maxlength.value
);
const cellphones = testVariablesManager.getCellphones();

//TODO Add USER_EXIST fail tests

describe("success create new  user", () => {
  it("should create new user in db", async () => {
    //* 1- Sign in as a new user =>
    const {
      body: {
        user: {
          countryCode: newUserCountryCode,
          countryName: newUserCountryName,
          phoneNumber: newUserPhoneNumber,
          token: newUserVerifyToken,
        },
      },
    } = await requesters
      .signIn()
      .sendFullFeaturedRequest(cellphones.createNewUserSignIn);

    const { verificationCode: newUserVerificationCode } =
      await temporaryClients.findClientByCellphone({
        countryCode: newUserCountryCode,
        countryName: newUserCountryName,
        phoneNumber: newUserPhoneNumber,
      });

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
    const {
      body: {
        user: {
          countryCode,
          countryName,
          firstName,
          lastName,
          token,
          phoneNumber,
          userId,
        },
      },
    } = await requesters
      .createNewUser()
      .setToken(newUserVerifyToken)
      .sendFullFeaturedRequest(fullName);

    const successTests = integrationHelpers.createSuccessTest(
      requesters.createNewUser()
    );

    const JWT_MAIN_SECRET = authManager.getJwtMainSecret();
    await successTests.token({
      responseValue: token,
      secret: JWT_MAIN_SECRET,
    });

    successTests
      .countryCode({
        clientValue: cellphones.createNewUserSignIn.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        responseValue: countryName,
        clientValue: cellphones.createNewUserSignIn.countryName,
      })
      .phoneNumber({
        clientValue: cellphones.createNewUserSignIn.phoneNumber,
        responseValue: phoneNumber,
      })
      .userId({ responseValue: userId }, { stringEquality: false })
      .firstName({
        clientValue: fullName.firstName,
        responseValue: firstName,
      })
      .lastName({
        clientValue: fullName.lastName,
        responseValue: lastName,
      });
  });
});

describe("create new  user failure tests", () => {
  //* Config customRequest for fail tests
  const customRequest = requesters.createNewUser();
  before(async () => {
    const {
      body: {
        user: { token },
      },
    } = await requesters
      .signIn()
      .sendFullFeaturedRequest(cellphones.createNewUserSignIn);

    customRequest.setToken(token);
  });

  integrationHelpers
    .createFailTest(customRequest)
    .authentication()
    .firstName(fullName)
    //TODO Add lastName required fail test
    .lastName(fullName);
});
