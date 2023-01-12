const { expect } = require("chai");

const { authManager } = require("@/classes/AuthManager");
const { randomMaker } = require("$/classes/RandomMaker");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");
const { failTestBuilder } = require("$/classes/FailTestBuilder");

const userModel = models.native.user;

const checkCurrentUserStatusFailTest = (configuredRequester, data = {}) => {
  const error = errors.CURRENT_USER_NOT_EXIST;

  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.CURRENT_USER_NOT_EXIST,
        configuredRequester.getRoute()
      ),
    async () => {
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
    }
  );

  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.CURRENT_USER_NOT_EXIST,
        configuredRequester.getRoute()
      ),
    async () => {
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
    }
  );
};

module.exports = { checkCurrentUserStatusFailTest };
