const { expect } = require("chai");

const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { authManager } = require("@/classes/AuthManager");
const { requesterCreator } = require("$/classes/Requester");
const { userUtilities } = require("@/classes/UserUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");
const { arrayOfRoutes, ignoredRoutesForAuth } = require("@/http/routes");
const { failTestBuilder } = require("$/classes/FailTestBuilder");

const userModel = models.native.user;

const requester = (route) => requesterCreator().create(route);

describe("checkCurrentUserStatus middleware success tests", () => {
  //TODO: Add tests: checkCurrentUserStatus middleware success tests
});

//FIXME: Need to make dynamic data
describe("checkCurrentUserStatus middleware fail tests", () => {
  const user = testVariablesManager.getUsers().checkCurrentUserStatus;
  const cellphone = userUtilities.extractCellphone(user);
  const error = errors.CURRENT_USER_NOT_EXIST;

  const filteredIgnoredRoutes = arrayOfRoutes.filter(
    (route) =>
      !ignoredRoutesForAuth.some(
        (ignoredRoute) => ignoredRoute.fullUrl === route.fullUrl
      )
  );

  for (const route of filteredIgnoredRoutes) {
    it(
      failTestBuilder.create().createTestMessage(errors.TOKEN_REQUIRED, route),
      async () => {
        const wrongUserId = randomMaker.string(
          userModel.userId.maxlength.value
        );

        const token = authManager.signToken({
          ...cellphone,
          userId: wrongUserId,
        });

        const { body } = await requester(route).sendFullFeaturedRequest(
          // data,
          error,
          {
            token,
          }
        );

        expect(body.errors[error.errorKey].wrongUserId).to.be.equal(
          wrongUserId
        );
      }
    );
  }

  for (const route of filteredIgnoredRoutes) {
    it(
      failTestBuilder.create().createTestMessage(errors.TOKEN_REQUIRED, route),
      async () => {
        const token = authManager.signToken({
          ...cellphone,
          userId: user.userId,
        });

        const { body } = await requester(route).sendFullFeaturedRequest(
          // data,
          error,
          {
            token,
          }
        );

        expect(body.errors[error.errorKey].isSessionExist).to.be.false;
      }
    );
  }

  for (const route of filteredIgnoredRoutes) {
    it(
      failTestBuilder.create().createTestMessage(errors.TOKEN_REQUIRED, route),
      async () => {
        const wrongUserId = randomMaker.string(
          userModel.userId.maxlength.value
        );
        const token = authManager.signToken({
          userId: wrongUserId,
        });

        await requester(route).sendFullFeaturedRequest(
          // data,
          error,
          {
            token,
          }
        );
      }
    );
  }
});
