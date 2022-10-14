const { authManager } = require("@/classes/AuthManager");
const {
  integrationHelpers,
} = require("$/helpers/integrationHelpers/integrationHelpers");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("@/functions/utilities/testUtilities");

const { requesters } = require("$/helpers/requesters");

const { models } = require("@/models/models");

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
      .signInNormalRequest()
      .sendFullFeaturedRequest(testVariables.cellphones.createNewUserSignIn);

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
      .createNewUserRequest()
      .setToken(newUserVerifyToken)
      .sendFullFeaturedRequest(fullName);

    const successTests = integrationHelpers.createSuccessTest(
      requesters.createNewUserRequest()
    );

    const JWT_MAIN_SECRET = authManager.getJwtMainSecret();
    await successTests.token({
      tokenTest: mainToken,
      secret: JWT_MAIN_SECRET,
    });

    successTests
      .countryCode({
        countryCodeTest: countryCode,
        countryCodeMain:
          testVariables.cellphones.createNewUserSignIn.countryCode,
      })
      .countryName({
        countryNameTest: countryName,
        countryNameMain:
          testVariables.cellphones.createNewUserSignIn.countryName,
      })
      .phoneNumber({
        phoneNumberTest: phoneNumber,
        phoneNumberMain:
          testVariables.cellphones.createNewUserSignIn.phoneNumber,
      })
      .privateId({ privateIdTest: privateId }, { stringEquality: false })
      .firstName({
        firstNameTest: firstName,
        firstNameMain: fullName.firstName,
      })
      .lastName({
        lastNameTest: lastName,
        lastNameMain: fullName.lastName,
      });
  });
});

describe("create new normal user failure tests", () => {
  //* Config customRequest for fail tests
  const customRequest = requesters.createNewUserRequest();
  before(async () => {
    const {
      body: {
        user: { verifyToken },
      },
    } = await requesters
      .signInNormalRequest()
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
