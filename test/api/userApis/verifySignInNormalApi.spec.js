const { authManager } = require("@/classes/AuthManager");
const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("@/functions/utilities/testUtilities");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const {
  requesters: {
    createNewUserRequest,
    signInNormalRequest,
    verifySignInRequest,
  },
  testVariables: {
    cellphones: { verifySignInFailTestCellphone, verifySignInNewUserCellphone },
  },
} = require("@/variables/others/testVariables");

const signInFn = async () => {
  const {
    body: {
      user: { verifyToken, verificationCode },
    },
  } = await signInNormalRequest().sendFullFeaturedRequest(
    verifySignInNewUserCellphone
  );

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
    const newUserVerifySignInResponse = await verifySignInRequest()
      .setToken(newUserVerifyToken)
      .sendFullFeaturedRequest({
        verificationCode: newUserVerificationCode,
      });

    //* 3- Test output when newUser === false =>
    expect(newUserVerifySignInResponse.body.user.newUser).equal(true);

    //* 4- Finalize new user sign in (save user in db) =>
    const fullName = userPropsUtilities.makeRandomFullName(
      firstNameModel.maxlength.value,
      lastNameModel.maxlength.value
    );
    await createNewUserRequest()
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
    } = await verifySignInRequest()
      .setToken(signedUserVerifyToken)
      .sendFullFeaturedRequest({
        verificationCode,
      });

    //* 8- Test output when newUser === false =>
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
  //* Config customRequest for fail tests
  const customRequest = verifySignInRequest();
  before(async () => {
    const {
      body: {
        user: { verifyToken },
      },
    } = await signInNormalRequest().sendFullFeaturedRequest(
      verifySignInFailTestCellphone
    );

    customRequest.setToken(verifyToken);
  });

  generalTest.createFailTest(customRequest).verificationCode().authentication();
});
