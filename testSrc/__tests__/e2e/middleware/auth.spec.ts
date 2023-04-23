import chai from "chai";

import { requesterMaker } from "$/classes/Requester";
import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";

import { ERRORS } from "@/variables";

import { routesWithoutAuth, routesWithAuth } from "@/websocket/events";

describe("auth middleware test", () => {
  for (const route of routesWithoutAuth) {
    // if (route.name === "disconnect") continue;

    it(`should not get error: SESSION_REQUIRED - ${route.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterMaker(socket, route).sendRequest()
      ).getResponse();

      const { ERRORS: responseErrors } = response.data;

      const { key } = ERRORS.SESSION_REQUIRED;
      if (responseErrors?.[key]) {
        chai
          .expect(responseErrors[key].reason)
          .not.equal(ERRORS.SESSION_REQUIRED.reason);
      }
    });
  }

  for (const route of routesWithAuth) {
    const title = helpers.createFailTestMessage(
      ERRORS.CLIENT_NOT_FOUND,
      route.name
    );

    it(title, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      await requesterMaker(socket, route)
        .setOptions({ shouldFilterRequestData: false })
        .setError(ERRORS.CLIENT_NOT_FOUND)
        .sendFullFeaturedRequest();
    });
  }
});
