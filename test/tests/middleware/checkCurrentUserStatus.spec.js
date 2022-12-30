const { expect } = require("chai");

const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { authManager } = require("@/classes/AuthManager");
const { customRequestCreator } = require("$/classes/CustomRequest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");
const { arrayOfRoutes, ignoredRoutesForAuth } = require("@/routes");

const userModel = models.native.user;

const customRequest = (routeObject) =>
  customRequestCreator().create().setRouteObject(routeObject);

describe("checkCurrentUserStatus middleware success tests", () => {
  //TODO: Add tests: checkCurrentUserStatus middleware success tests
});

//FIXME: Need to make dynamic data
describe("checkCurrentUserStatus middleware fail tests", () => {
  const user = testVariablesManager.getUsers().checkCurrentUserStatus;
  const cellphone = userPropsUtilities.extractCellphone(user);
  const error = errors.CURRENT_USER_NOT_EXIST;

  const filteredIgnoredRoutes = arrayOfRoutes.filter(
    (route) =>
      !ignoredRoutesForAuth.some(
        (ignoredRoute) => ignoredRoute.fullUrl === route.fullUrl
      )
  );

  for (const route of filteredIgnoredRoutes) {
    it("should get error: CURRENT_USER_NOT_EXIST when userId is wrong", async () => {
      const wrongUserId = randomMaker.randomString(
        userModel.userId.maxlength.value
      );

      const token = authManager.signToken({
        ...cellphone,
        userId: wrongUserId,
      });

      const { body } = await customRequest(route).sendFullFeaturedRequest(
        // data,
        error,
        {
          token,
        }
      );

      expect(body.errors[error.errorKey].wrongUserId).to.be.equal(wrongUserId);
    });
  }

  for (const route of filteredIgnoredRoutes) {
    it("should get error: CURRENT_USER_NOT_EXIST when token is not exist on user sessions", async () => {
      const token = authManager.signToken({
        ...cellphone,
        userId: user.userId,
      });

      const { body } = await customRequest(route).sendFullFeaturedRequest(
        // data,
        error,
        {
          token,
        }
      );

      expect(body.errors[error.errorKey].isSessionExist).to.be.false;
    });
  }

  for (const route of filteredIgnoredRoutes) {
    it("should get error: CURRENT_USER_NOT_EXIST when cellphone is wrong", async () => {
      const wrongCellphone = userPropsUtilities.makeUnusedRandomCellphone();

      const token = authManager.signToken({
        ...wrongCellphone,
        userId: user.userId,
      });

      const { body } = await customRequest(route).sendFullFeaturedRequest(
        // data,
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
  }
});