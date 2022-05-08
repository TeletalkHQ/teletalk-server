const { expect } = require("@/functions/utilities/testUtils");
const { getEnvironment } = require("@/functions/utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const {
  userRoutes: { userRouteBaseUrl, verifySignInNormalRoute },
} = require("@/variables/routes/userRoutes");

const {
  verificationCodeFailureTests,
} = require("$/api/userTests/verificationCodeTests");
const { CustomRequest } = require("@/functions/helpers/CustomRequest");

describe("", () => {
  it("should set routes properties", async () => {
    CustomRequest.setBaseUrl(userRouteBaseUrl);
    CustomRequest.setRouteObject(verifySignInNormalRoute);
  });
});

describe("verifySignInNormalApi success test", () => {
  it("should get newUser === true if there is no user with test verify token in db", async () => {
    const verificationCode = getEnvironment(
      ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE
    );

    const response = await CustomRequest.sendRequest({
      verificationCode,
    });

    expect(response.body.user.newUser).equal(true);
  });
});

describe("verifySignInNormalApi failure tests", () => {
  verificationCodeFailureTests();
});
