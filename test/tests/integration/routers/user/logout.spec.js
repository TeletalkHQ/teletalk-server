const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { expect } = require("$/utilities/testUtilities");

const { requesters } = require("$/utilities/requesters");

const { models } = require("@/models");

const { testVariablesManager } = require("$/classes/TestVariablesManager");

const userModels = models.native.user;
const cellphones = testVariablesManager.getCellphones();

const fullName = userPropsUtilities.makeRandomFullName(
  userModels.firstName.maxlength.value,
  userModels.lastName.maxlength.value
);

const signInFn = async () => {
  const {
    body: {
      user: { countryCode, countryName, phoneNumber, token },
    },
  } = await requesters.signIn().sendFullFeaturedRequest(cellphones.logout);

  const { verificationCode } = await temporaryClients.findClientByCellphone({
    countryCode,
    countryName,
    phoneNumber,
  });

  return {
    verificationCode,
    token,
  };
};

const verifySingIn = async (verificationCode, token) => {
  await requesters.verify().setToken(token).sendFullFeaturedRequest({
    verificationCode,
  });
};

const createNewUser = async (token) => {
  return await requesters
    .createNewUser()
    .setToken(token)
    .sendFullFeaturedRequest(fullName);
};

describe("logout success tests", () => {
  it("should get ok:true for logging out user", async () => {
    const { verificationCode, token: verifyToken } = await signInFn();

    await verifySingIn(verificationCode, verifyToken);

    const {
      body: {
        user: { token },
      },
    } = await createNewUser(verifyToken);

    const {
      body: { ok },
    } = await requesters
      .logout()
      .sendFullFeaturedRequest(undefined, undefined, { token });

    expect(ok).to.be.true;
  });
});
