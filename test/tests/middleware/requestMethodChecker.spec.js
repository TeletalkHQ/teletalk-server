const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const { arrayOfRoutes } = require("@/routes");

const { makeCustomRequest } = require("$/utilities/requesters");
const { expect } = require("$/utilities/testUtilities");

const { errors } = require("@/variables/errors");
const { METHODS } = require("@/variables/others/methods");

describe("requestMethodChecker middleware tests", () => {
  it("should get error: METHOD_NOT_ALLOWED", async () => {
    const methods = objectUtilities.objectValues(METHODS);

    for (const route of arrayOfRoutes) {
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
    }
  });

  it("should not get error: METHOD_NOT_ALLOWED", async () => {
    for (const route of arrayOfRoutes) {
      const { response } = await makeCustomRequest(route)().sendRequest();
      const { errors: responseErrors } = response.body;

      const { errorKey } = errors.METHOD_NOT_ALLOWED;
      if (responseErrors && responseErrors[errorKey]) {
        expect(responseErrors[errorKey].reason).not.equal(
          errors.METHOD_NOT_ALLOWED.reason
        );
      }
    }
  });
});
