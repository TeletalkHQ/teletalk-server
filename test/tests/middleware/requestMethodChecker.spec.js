const { expect } = require("chai");

const { arrayOfRoutes } = require("@/routes");

const { makeCustomRequest } = require("$/utilities/requesters");

const { errors } = require("@/variables/errors");
const { METHODS } = require("@/variables/others/methods");

describe("requestMethodChecker middleware tests", () => {
  const methods = Object.values(METHODS);

  for (const route of arrayOfRoutes) {
    it(`should get error: METHOD_NOT_ALLOWED - ${route.fullUrl}`, async () => {
      const foundWrongMethod = methods.find((m) => m !== route.method);

      const brokenRoute = {
        ...route,
        method: foundWrongMethod,
      };

      await makeCustomRequest(brokenRoute)().sendFullFeaturedRequest(
        undefined,
        errors.METHOD_NOT_ALLOWED,
        { filterDataCondition: false }
      );
    });
  }

  for (const route of arrayOfRoutes) {
    it(`should not get error: METHOD_NOT_ALLOWED - ${route.fullUrl}`, async () => {
      const { response } = await makeCustomRequest(route)().sendRequest();
      const { errors: responseErrors } = response.body;

      const { errorKey } = errors.METHOD_NOT_ALLOWED;
      if (responseErrors && responseErrors[errorKey]) {
        expect(responseErrors[errorKey].reason).not.equal(
          errors.METHOD_NOT_ALLOWED.reason
        );
      }
    });
  }
});
