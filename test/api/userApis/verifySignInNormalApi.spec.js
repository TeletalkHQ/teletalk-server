const { request, expect } = require("@/functions/utilities/testUtils");
const { getEnvironment } = require("@/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: {
      VERIFICATION_CODE_REQUIRED: { properties: VERIFICATION_CODE_REQUIRED },
      VERIFICATION_CODE_INVALID_TYPE: {
        properties: VERIFICATION_CODE_INVALID_TYPE,
      },
      VERIFICATION_CODE_INVALID_LENGTH: {
        properties: VERIFICATION_CODE_INVALID_LENGTH,
      },
      VERIFICATION_CODE_INVALID: { properties: VERIFICATION_CODE_INVALID },
    },
  },
} = require("@/variables/errors/userErrors");
const {
  userRoutes: {
    properties: {
      userRouteBaseUrl: { properties: userRouteBaseUrl },
      verifySignInNormalRoute: { properties: verifySignInNormalRoute },
    },
  },
} = require("@/variables/routes/userRoutes");

describe("verifySignInNormalApi success test", () => {
  it("should get newUser === true if there is no user with test verify token in db", async () => {
    const verificationCode = getEnvironment(
      ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE
    );

    const response = await request(userRouteBaseUrl, verifySignInNormalRoute, {
      verificationCode,
    });

    expect(response.body.user.newUser).equal(true);
  });
});

describe("verifySignInNormalApi failure tests", () => {
  it("it should get error, VERIFICATION_CODE_REQUIRED", async () => {
    await request(
      userRouteBaseUrl,
      verifySignInNormalRoute,
      {
        verificationCode: "",
      },
      VERIFICATION_CODE_REQUIRED
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_TYPE", async () => {
    await request(
      userRouteBaseUrl,
      verifySignInNormalRoute,
      {
        verificationCode: "wrong type!",
      },
      VERIFICATION_CODE_INVALID_TYPE
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID_LENGTH", async () => {
    await request(
      userRouteBaseUrl,
      verifySignInNormalRoute,
      {
        verificationCode: "00000000000",
      },
      VERIFICATION_CODE_INVALID_LENGTH
    );
  });

  it("it should get error, VERIFICATION_CODE_INVALID", async () => {
    await request(
      userRouteBaseUrl,
      verifySignInNormalRoute,
      {
        verificationCode: "000000",
      },
      VERIFICATION_CODE_INVALID
    );
  });
});
