const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("@/functions/utilities/testUtilities");

const { models } = require("@/models/models");

const {
  requesters: {
    createNewUserRequest,
    signInNormalRequest,
    verifySignInRequest,
    logoutNormalRequest,
  },
  testVariables: {
    cellphones: { verifySignInNewUserCellphone },
  },
} = require("@/variables/others/testVariables");

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
  } = await signInNormalRequest().sendFullFeaturedRequest(
    verifySignInNewUserCellphone
  );

  return {
    verificationCode,
    verifyToken,
  };
};

const verifySingIn = async (verificationCode, verifyToken) => {
  await verifySignInRequest().setToken(verifyToken).sendFullFeaturedRequest({
    verificationCode,
  });
};

const createNewUser = async (verifyToken) => {
  return await createNewUserRequest()
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
    } = await logoutNormalRequest().sendFullFeaturedRequest(
      undefined,
      undefined,
      { token: mainToken }
    );

    expect(ok).to.be.true;
  });
});
