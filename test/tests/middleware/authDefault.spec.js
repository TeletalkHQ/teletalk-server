const { failTestBuilder } = require("$/classes/FailTestBuilder");
const { requesterCreator } = require("$/classes/Requester");

const { arrayOfRoutes, ignoredRoutesForAuth } = require("@/http/routes");

const { errors } = require("@/variables/errors");

const requester = (route) => requesterCreator().create(route);

describe("authDefault middleware test", () => {
  for (const route of ignoredRoutesForAuth) {
    it(`should not get error: TOKEN_REQUIRED - ${route.fullUrl}`, async () => {
      const { response } = await requester(route).sendRequest();

      const { errors: responseErrors } = response.body;

      const { errorKey } = errors.TOKEN_REQUIRED;
      if (responseErrors && responseErrors[errorKey]) {
        expect(responseErrors[errorKey].reason).not.toBe(
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
    const message = failTestBuilder
      .create()
      .createTestMessage(errors.TOKEN_REQUIRED, route.fullUrl);
    it(message, async () => {
      await requester(route)
        .setOptions({ shouldFilterRequestData: false })
        .setError(errors.TOKEN_REQUIRED)
        .sendFullFeaturedRequest();
    });
  }
});
