const { request, expect } = require("~/functions/utilities/testUtils");
const {
  setEnvironment,
  getEnvironment,
} = require("~/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userRoutes: {
    properties: { userRouteBaseUrl, verifySignInNormalRoute },
  },
} = require("~/variables/routes/userRoutes");

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
