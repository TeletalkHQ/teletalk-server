const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { expect } = require("chai");

const { authManager } = require("@/classes/AuthManager");
const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModel = models.native.user;

const checkCurrentUserStatusFailTest = (configuredRequester, data = {}) => {
  const user = testVariablesManager.getUsers().checkCurrentUserStatus;
  const cellphone = userPropsUtilities.extractCellphone(user);
  const error = errors.CURRENT_USER_NOT_EXIST;

  it("should get error: CURRENT_USER_NOT_EXIST when userId is wrong", async () => {
    const wrongUserId = randomMaker.randomString(
      userModel.userId.maxlength.value
    );

    const token = authManager.signToken({ ...cellphone, userId: wrongUserId });

    const { body } = await configuredRequester.sendFullFeaturedRequest(
      data,
      error,
      {
        token,
      }
    );

    expect(body.errors[error.errorKey].wrongUserId).to.be.equal(wrongUserId);
  });

  it("should get error: CURRENT_USER_NOT_EXIST when token is not exist on user sessions", async () => {
    const token = authManager.signToken({ ...cellphone, userId: user.userId });

    const { body } = await configuredRequester.sendFullFeaturedRequest(
      data,
      error,
      {
        token,
      }
    );

    expect(body.errors[error.errorKey].isSessionExist).to.be.false;
  });

  it("should get error: CURRENT_USER_NOT_EXIST when cellphone is wrong", async () => {
    const wrongCellphone = userPropsUtilities.makeUnusedRandomCellphone();

    const token = authManager.signToken({
      ...wrongCellphone,
      userId: user.userId,
    });

    const { body } = await configuredRequester.sendFullFeaturedRequest(
      data,
      error,
      {
        token,
      }
    );

    const responseCellphone = body.errors[error.errorKey].wrongCellphone;

    expect(responseCellphone.countryCode).to.be.equal(
      wrongCellphone.countryCode
    );
    expect(responseCellphone.countryName).to.be.equal(
      wrongCellphone.countryName
    );
    expect(responseCellphone.phoneNumber).to.be.equal(
      wrongCellphone.phoneNumber
    );
  });
};

module.exports = { checkCurrentUserStatusFailTest };
