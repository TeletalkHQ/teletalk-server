const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("$/functions/utilities/testUtilities");

const { requesters } = require("$/functions/helpers/requesters");

const { models } = require("@/models/models");

const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const fullName = userPropsUtilities.makeRandomFullName(
  userModels.firstName.maxlength.value,
  userModels.lastName.maxlength.value
);

const signInFn = async () => {
  const {
    body: {
      user: { verificationCode, verifyToken },
    },
  } = await requesters
    .signInNormal()
    .sendFullFeaturedRequest(testVariables.cellphones.verifySignInNewUser);

  return {
    verificationCode,
    verifyToken,
  };
};

const verifySingIn = async (verificationCode, verifyToken) => {
  await requesters
    .verifySignIn()
    .setToken(verifyToken)
    .sendFullFeaturedRequest({
      verificationCode,
    });
};

const createNewUser = async (verifyToken) => {
  return await requesters
    .createNewUser()
    .setToken(verifyToken)
    .sendFullFeaturedRequest(fullName);
};

describe("logoutNormal success tests", () => {
  it("It should get ok:true for logging out user", async () => {
    const { verificationCode, verifyToken } = await signInFn();
    await verifySingIn(verificationCode, verifyToken);
    const {
      body: {
        user: { mainToken },
      },
    } = await createNewUser(verifyToken);

    const {
      body: { ok },
    } = await requesters
      .logoutNormal()
      .sendFullFeaturedRequest(undefined, undefined, { token: mainToken });

    expect(ok).to.be.true;
  });
});
