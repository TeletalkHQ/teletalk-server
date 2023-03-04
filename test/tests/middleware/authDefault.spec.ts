import { failTestBuilder } from "$/classes/FailTestBuilder";
import { requesterCreator } from "$/classes/Requester";

import { arrayOfRoutes, ignoredRoutesForAuth } from "@/http/routes";

import { errors } from "@/variables/errors";

const requester = (route) => requesterCreator().create(route);

describe("authDefault middleware test", () => {
  for (const route of ignoredRoutesForAuth) {
    it(`should not get error: TOKEN_REQUIRED - ${route.fullUrl}`, async () => {
      const { response } = await requester(route).sendRequest();

      const { errors: responseErrors } = response.body;

      const { key } = errors.TOKEN_REQUIRED;
      if (responseErrors && responseErrors[key]) {
        expect(responseErrors[key].reason).not.toBe(
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
