const { envManager } = require("@/classes/EnvironmentManager");
const { generalTest } = require("@/classes/GeneralTest");
const { userProps } = require("@/classes/UserProps");

const { expect } = require("@/functions/utilities/testUtilities");

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

const fullName = userProps.makeTestFullName();

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    const {
      body: {
        user: { verifyToken: newUserVerifyToken },
      },
    } = await signInNormalRequest.sendRequest(createNewUserSignInCellphone);
    //* 1- Sign in as a new user =>

    //* 2- Get verification code, In test mode the verification code is stored in env =>
    const newUserVerificationCode = envManager.getTestVerificationCode();

    //* 3- Verify user by verificationCode & verifyToken =>
    const newUserVerifySignInResponse = await verifySignInRequest
      .setToken(newUserVerifyToken)
      .sendRequest({
        verificationCode: newUserVerificationCode,
      });

    //* 4- Test output when newUser === false =>
    expect(newUserVerifySignInResponse.body.user.newUser).equal(true);

    //* 5- Finalize new user sign in (save user in db) =>
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
    } = await createNewUserRequest
      .setToken(newUserVerifyToken)
      .sendRequest(fullName);

    const gt = generalTest.createSuccessTest(createNewUserRequest);

    await gt.token({
      tokenTest: mainToken,
      secret: envManager.getJwtSecrets().JWT_MAIN_SECRET,
    });

    gt.countryCode({
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

describe("failure tests for create new normal user", () => {
  generalTest
    .createFailTest(createNewUserRequest)
    .authentication()
    .firstName(fullName)
    .lastName(fullName);
});
