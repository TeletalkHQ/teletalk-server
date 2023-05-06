import chai from "chai";

import { requesterMaker } from "$/classes/Requester";
import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";

import { errors } from "@/variables";

import { routesWithoutAuth, routesWithAuth } from "@/websocket/events";

describe("auth middleware test", () => {
  for (const route of routesWithoutAuth) {
    // if (route.name === "disconnect") continue;

    it(`should not get error: session_required_error - ${route.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterMaker(socket, route).sendRequest()
      ).getResponse();

      const { errors: responseErrors } = response.data;

      const { reason } = errors.session_required_error;
      if (responseErrors?.[reason]) {
        chai.expect(reason).not.equal(errors.session_required_error.reason);
      }
    });
  }

  for (const route of routesWithAuth) {
    const title = helpers.createFailTestMessage(
      errors.clientNotFound,
      route.name
    );

    it(title, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      await requesterMaker(socket, route)
        .setOptions({ shouldFilterRequestData: false })
        .setError(errors.clientNotFound)
        .sendFullFeaturedRequest();
    });
  }
});
