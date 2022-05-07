const { expect } = require("@/functions/utilities/testUtils");
const { getEnvironment } = require("@/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const {
  userRoutes: {
    properties: {
      userRouteBaseUrl: { properties: userRouteBaseUrl },
      verifySignInNormalRoute: { properties: verifySignInNormalRoute },
    },
  },
} = require("@/variables/routes/userRoutes");

const {
  verificationCodeFailureTests,
} = require("$/api/userTests/verificationCodeTests");
const { customRequest } = require("@/functions/helpers/CustomRequest");

describe("", () => {
  it("should set routes properties", async () => {
    customRequest.setBaseUrl(userRouteBaseUrl);
    customRequest.setRouteObject(verifySignInNormalRoute);
  });
});

describe("verifySignInNormalApi success test", () => {
  it("should get newUser === true if there is no user with test verify token in db", async () => {
    const verificationCode = getEnvironment(
      ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE
    );

    const response = await customRequest.sendRequest({
      verificationCode,
    });

    expect(response.body.user.newUser).equal(true);
  });
});

describe("verifySignInNormalApi failure tests", () => {
  verificationCodeFailureTests();
});
