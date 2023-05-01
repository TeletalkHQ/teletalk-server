import chai from "chai";

import { requesterMaker } from "$/classes/Requester";
import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";

import { ERRORS } from "@/variables";

import { routesWithoutAuth, routesWithAuth } from "@/websocket/events";

describe("auth middleware test", () => {
  for (const route of routesWithoutAuth) {
    // if (route.name === "disconnect") continue;

    it(`should not get error: SESSION_REQUIRED_ERROR - ${route.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterMaker(socket, route).sendRequest()
      ).getResponse();

      const { ERRORS: responseErrors } = response.data;

      const { reason } = ERRORS.SESSION_REQUIRED_ERROR;
      if (responseErrors?.[reason]) {
        chai.expect(reason).not.equal(ERRORS.SESSION_REQUIRED_ERROR.reason);
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
