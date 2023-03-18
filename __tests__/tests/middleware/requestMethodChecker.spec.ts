import { failTestBuilder } from "$/classes/FailTestBuilder";
import { requesterCreator } from "$/classes/Requester";

import { arrayOfRoutes } from "@/http/routes";

import { errors } from "@/variables/errors";
import { METHODS } from "@/variables/others/methods";

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

      const requester = requesterCreator().create(brokenRoute);
      await requester
        .setOptions({ shouldFilterRequestData: false })
        .setError(errors.METHOD_NOT_ALLOWED)
        .sendFullFeaturedRequest();
    });
  }

  for (const route of arrayOfRoutes) {
    it(`should not get error: METHOD_NOT_ALLOWED - ${route.fullUrl}`, async () => {
      const requester = requesterCreator().create(route);
      const { response } = await requester.sendRequest();

      const { errors: responseErrors } = response.body;

      const { key } = errors.METHOD_NOT_ALLOWED;
      if (responseErrors && responseErrors[key]) {
        expect(responseErrors[key].reason).not.toBe(
          errors.METHOD_NOT_ALLOWED.reason
        );
      }
    });
  }
});
