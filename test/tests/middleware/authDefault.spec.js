const { customRequestCreator } = require("$/classes/CustomRequest");

const { expect } = require("$/utilities/testUtilities");

const { arrayOfRoutes, ignoredRoutesForAuth } = require("@/routes");

const { errors } = require("@/variables/errors");

const makeCustomRequest = (routeObject) =>
  customRequestCreator().create().setRouteObject(routeObject);

describe("authDefault middleware test", () => {
  it("should not get error: TOKEN_REQUIRED", async () => {
    for (const route of ignoredRoutesForAuth) {
      const { response } = await makeCustomRequest(route).sendRequest();

      const { errors: responseErrors } = response.body;

      const { errorKey } = errors.TOKEN_REQUIRED;
      if (responseErrors && responseErrors[errorKey]) {
        expect(responseErrors[errorKey].reason).not.equal(
          errors.TOKEN_REQUIRED.reason
        );
      }
    }
  });

  it("should get error: TOKEN_REQUIRED", async () => {
    const filteredIgnoredRoutes = arrayOfRoutes.filter(
      (route) =>
        !ignoredRoutesForAuth.some(
          (ignoredRoute) => ignoredRoute.fullUrl === route.fullUrl
        )
    );

    for (const route of filteredIgnoredRoutes) {
      await makeCustomRequest(route).sendFullFeaturedRequest(
        undefined,
        errors.TOKEN_REQUIRED,
        { filterDataCondition: false }
      );
    }
  });
});
