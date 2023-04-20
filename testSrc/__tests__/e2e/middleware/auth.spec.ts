import chai from "chai";

import { requesterCreator } from "$/classes/Requester";
import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";

import { errors } from "@/variables/errors";

import { routesWithoutAuth, routesWithAuth } from "@/websocket/events";

describe("auth middleware test", () => {
  for (const route of routesWithoutAuth) {
    if (route.name === "disconnect") continue;

    it(`should not get error: SESSION_REQUIRED - ${route.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterCreator(socket, route).sendRequest()
      ).getResponse();

      const { errors: responseErrors } = response.data;

      const { key } = errors.SESSION_REQUIRED;
      if (responseErrors?.[key]) {
        chai
          .expect(responseErrors[key].reason)
          .not.equal(errors.SESSION_REQUIRED.reason);
      }
    });
  }

  for (const route of routesWithAuth) {
    const title = helpers.createFailTestMessage(errors.CLIENT_NOT_FOUND, route);

    it(title, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      await requesterCreator(socket, route)
        .setOptions({ shouldFilterRequestData: false })
        .setError(errors.CLIENT_NOT_FOUND)
        .sendFullFeaturedRequest();
    });
  }
});
