const { expect } = require("chai");

const { authManager } = require("@/classes/AuthManager");
const { randomMaker } = require("$/classes/RandomMaker");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModel = models.native.user;

const checkCurrentUserStatusFailTest = (configuredRequester, data = {}) => {
  const error = errors.CURRENT_USER_NOT_EXIST;

  it("should get error: CURRENT_USER_NOT_EXIST when userId is wrong", async () => {
    const wrongUserId = randomMaker.string(userModel.userId.maxlength.value);
    const token = authManager.signToken({
      userId: wrongUserId,
    });

    const { body } = await configuredRequester.sendFullFeaturedRequest(
      data,
      error,
      {
        token,
      }
    );

    expect(error.reason).to.be.equal(body.errors[error.errorKey].reason);
    expect(body.errors[error.errorKey].wrongUserId).to.be.equal(wrongUserId);
  });

  it("should get error: CURRENT_USER_NOT_EXIST when token is not exist on user sessions", async () => {
    const { user } = await randomMaker.user();
    const token = authManager.signToken({
      userId: user.userId,
    });

    const { body } = await configuredRequester.sendFullFeaturedRequest(
      data,
      error,
      {
        token,
      }
    );
    expect(error.reason).to.be.equal(body.errors[error.errorKey].reason);
    expect(body.errors[error.errorKey].isSessionExist).to.be.false;
  });
};

module.exports = { checkCurrentUserStatusFailTest };
