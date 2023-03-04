import { failTestBuilder } from "$/classes/FailTestBuilder";
import { requesterCreator } from "$/classes/Requester";

import { arrayOfRoutes } from "@/http/routes";
import { routes } from "$/http/routes";

import { errors } from "@/variables/errors";
import { FIELD_TYPE } from "@/variables/others/fieldType";

const requester = (route) => requesterCreator().create(route);

describe("notFound middleware fail test", () => {
  const message = failTestBuilder
    .create()
    .createTestMessage(
      errors.ROUTE_NOT_FOUND,
      routes.test.unknownRoute.fullUrl
    );
  it(message, async () => {
    await requester(routes.test.unknownRoute)
      .setError(errors.ROUTE_NOT_FOUND)
      .sendFullFeaturedRequest();
  });

  for (const route of arrayOfRoutes) {
    it(`should not get error: ROUTE_NOT_FOUND - ${route.fullUrl}`, async () => {
      const { response } = await requester(route).sendRequest();

      const { errors: responseErrors } = response.body;

      const { key } = errors.ROUTE_NOT_FOUND;
      if (responseErrors && responseErrors[key]) {
        expect(responseErrors[key].reason).toBeInstanceOf(FIELD_TYPE.STRING);
        expect(responseErrors[key].reason).not.toBe(
          errors.ROUTE_NOT_FOUND.reason
        );
      }
    });
  }
});
