const { authManager } = require("@/classes/AuthManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("$/functions/utilities/testUtilities");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { models } = require("@/models");

const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const fullName = userPropsUtilities.makeRandomFullName(
  userModels.firstName.maxlength.value,
  userModels.lastName.maxlength.value
);

//TODO Add USER_EXIST fail tests

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    //* 1- Sign in as a new user =>
    const {
      body: {
        user: {
          verifyToken: newUserVerifyToken,
          verificationCode: newUserVerificationCode,
        },
      },
    } = await requesters
      .signInNormal()
      .sendFullFeaturedRequest(testVariables.cellphones.createNewUserSignIn);

    //* 2- Verify user by verificationCode & verifyToken =>
    const newUserVerifySignInResponse = await requesters
      .verifySignIn()
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
          mainToken,
          phoneNumber,
          privateId,
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
      responseValue: mainToken,
      secret: JWT_MAIN_SECRET,
    });

    successTests
      .countryCode({
        clientValue: testVariables.cellphones.createNewUserSignIn.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        responseValue: countryName,
        clientValue: testVariables.cellphones.createNewUserSignIn.countryName,
      })
      .phoneNumber({
        clientValue: testVariables.cellphones.createNewUserSignIn.phoneNumber,
        responseValue: phoneNumber,
      })
      .privateId({ responseValue: privateId }, { stringEquality: false })
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

describe("create new normal user failure tests", () => {
  //* Config customRequest for fail tests
  const customRequest = requesters.createNewUser();
  before(async () => {
    const {
      body: {
        user: { verifyToken },
      },
    } = await requesters
      .signInNormal()
      .sendFullFeaturedRequest(testVariables.cellphones.createNewUserSignIn);

    customRequest.setToken(verifyToken);
  });

  integrationHelpers
    .createFailTest(customRequest)
    .authentication()
    .firstName(fullName)
    //TODO Add lastName required fail test
    .lastName(fullName);
});
