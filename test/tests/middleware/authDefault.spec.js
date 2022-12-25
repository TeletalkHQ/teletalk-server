const { expect } = require("chai");

const { customRequestCreator } = require("$/classes/CustomRequest");

const { arrayOfRoutes, ignoredRoutesForAuth } = require("@/routes");

const { errors } = require("@/variables/errors");

const customRequest = (routeObject) =>
  customRequestCreator().create().setRouteObject(routeObject);

describe("authDefault middleware test", () => {
  for (const route of ignoredRoutesForAuth) {
    it(`should not get error: TOKEN_REQUIRED - ${route.fullUrl}`, async () => {
      const { response } = await customRequest(route).sendRequest();

      const { errors: responseErrors } = response.body;

      const { errorKey } = errors.TOKEN_REQUIRED;
      if (responseErrors && responseErrors[errorKey]) {
        expect(responseErrors[errorKey].reason).not.equal(
          errors.TOKEN_REQUIRED.reason
        );
      }
    });
  }

  const filteredIgnoredRoutes = arrayOfRoutes.filter(
    (route) =>
      !ignoredRoutesForAuth.some(
        (ignoredRoute) => ignoredRoute.fullUrl === route.fullUrl
      )
  );

  for (const route of filteredIgnoredRoutes) {
    it(`should get error: TOKEN_REQUIRED - ${route.fullUrl}`, async () => {
      await customRequest(route).sendFullFeaturedRequest(
        undefined,
        errors.TOKEN_REQUIRED,
        { filterDataCondition: false }
      );
    });
  }
});
