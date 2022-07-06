const { generalTest } = require("@/classes/GeneralTest");
const { userProps } = require("@/classes/UserProps");

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
    const signInFn = async () => {
      const {
        body: {
          user: { verifyToken },
        },
      } = await signInNormalRequest.sendRequest(verifySignInNewUserCellphone);

      return verifyToken;
    };
    //* 1- Sign in as a new user =>
    const newUserVerifyToken = await signInFn();

    //* 2- Get verification code, In test mode the verification code is stored in env =>
    const newUserVerificationCode = userProps.getTestVerificationCode();

    //* 3- Verify user by verificationCode & verifyToken =>
    const newUserVerifySignInResponse = await verifySignInRequest
      .setToken(newUserVerifyToken)
      .sendRequest({
        verificationCode: newUserVerificationCode,
      });

    //* 4- Test output when newUser === false =>
    expect(newUserVerifySignInResponse.body.user.newUser).equal(true);

    //* 5- Finalize new user sign in (save user in db) =>
    const fullName = userProps.makeTestFullName();
    await createNewUserRequest
      .setToken(newUserVerifyToken)
      .sendRequest(fullName);

    //* 6- Now sign in again for test output when newUser === false =>
    const existedUserVerifyToken = await signInFn();

    //* 7- Get the verification code =>
    const existedVerificationCode = userProps.getTestVerificationCode();

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
