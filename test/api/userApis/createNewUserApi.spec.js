const { authManager } = require("@/classes/AuthManager");
const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("@/functions/utilities/testUtilities");

const { models } = require("@/models/models");

const {
  requesters: {
    createNewUserRequest,
    signInNormalRequest,
    verifySignInRequest,
  },
  testVariables: {
    cellphones: { createNewUserSignInCellphone },
  },
} = require("@/variables/others/testVariables");

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
    } = await signInNormalRequest().sendFullFeaturedRequest(
      createNewUserSignInCellphone
    );

    //* 2- Verify user by verificationCode & verifyToken =>
    const newUserVerifySignInResponse = await verifySignInRequest()
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
    } = await createNewUserRequest()
      .setToken(newUserVerifyToken)
      .sendFullFeaturedRequest(fullName);

    const successTests = generalTest.createSuccessTest(createNewUserRequest());

    const JWT_MAIN_SECRET = authManager.getJwtMainSecret();
    await successTests.token({
      tokenTest: mainToken,
      secret: JWT_MAIN_SECRET,
    });

    successTests
      .countryCode({
        countryCodeTest: countryCode,
        countryCodeMain: createNewUserSignInCellphone.countryCode,
      })
      .countryName({
        countryNameTest: countryName,
        countryNameMain: createNewUserSignInCellphone.countryName,
      })
      .phoneNumber({
        phoneNumberTest: phoneNumber,
        phoneNumberMain: createNewUserSignInCellphone.phoneNumber,
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
  const customRequest = createNewUserRequest();
  before(async () => {
    const {
      body: {
        user: { verifyToken },
      },
    } = await signInNormalRequest().sendFullFeaturedRequest(
      createNewUserSignInCellphone
    );

    customRequest.setToken(verifyToken);
  });

  generalTest
    .createFailTest(customRequest)
    .authentication()
    .firstName(fullName)
    //TODO Add lastName required fail test
    .lastName(fullName);
});
