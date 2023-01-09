const { expect } = require("chai");

const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { arrayOfRoutes } = require("@/routes");

const { makeRequester } = require("$/utilities");

const { errors } = require("@/variables/errors");
const { METHODS } = require("@/variables/others/methods");

describe("requestMethodChecker middleware tests", () => {
  const methods = Object.values(METHODS);

  for (const route of arrayOfRoutes) {
    const message = failTestBuilder
      .create()
      .createTestMessage(errors.METHOD_NOT_ALLOWED, route.fullUrl);
    it(message, async () => {
      const foundWrongMethod = methods.find((m) => m !== route.method);

      const brokenRoute = {
        ...route,
        method: foundWrongMethod,
      };

      const requester = makeRequester(brokenRoute);
      await requester()
        .setOptions({ shouldFilterRequestData: false })
        .setErrorObject(errors.METHOD_NOT_ALLOWED)
        .sendFullFeaturedRequest();
    });
  }

  for (const route of arrayOfRoutes) {
    it(`should not get error: METHOD_NOT_ALLOWED - ${route.fullUrl}`, async () => {
      const requester = makeRequester(route);
      const { response } = await requester().sendRequest();

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
