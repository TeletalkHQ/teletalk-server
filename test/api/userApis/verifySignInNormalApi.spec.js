const { expect } = require("@/functions/utilities/testUtils");
const { envManager } = require("@/functions/utilities/EnvironmentManager");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  userRoutes: { userRouteBaseUrl, verifySignInNormalRoute },
} = require("@/variables/routes/userRoutes");

const {
  verificationCodeFailureTests,
} = require("$/api/generalTests/verificationCodeTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");

describe("", () => {
  it("should set routes properties", async () => {
    customRequest.setRequestRequirements(
      userRouteBaseUrl,
      verifySignInNormalRoute
    );
    customRequest.setVerifyTokenFromEnv();
  });
});

describe("verifySignInNormalApi success test", () => {
  it("should get newUser === true if there is no user with test verify token in db", async () => {
    const verificationCode = envManager.getTestVerificationCode();

    const response = await customRequest.sendRequest({
      verificationCode,
    });

    expect(response.body.user.newUser).equal(true);
  });
});

describe("verifySignInNormalApi failure tests", () => {
  verificationCodeFailureTests();
  authenticationFailureTests();
});
