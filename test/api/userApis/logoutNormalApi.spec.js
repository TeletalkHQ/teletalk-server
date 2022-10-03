const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("@/functions/utilities/testUtilities");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/dataModels/userModels");

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

const fullName = userPropsUtilities.makeRandomFullName(
  firstNameModel.maxlength.value,
  lastNameModel.maxlength.value
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
