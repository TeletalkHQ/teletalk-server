import { requesterMaker } from "$/classes/Requester";
import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";

import { errors } from "@/variables";

import { routesWithoutAuth, routesWithAuth } from "@/websocket/events";

describe("auth middleware test", () => {
  for (const route of routesWithoutAuth) {
    it(`should not get error: clientNotFound - ${route.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterMaker(socket, route).sendRequest()
      ).getResponse();

      const { errors: responseErrors } = response.data;

      const { reason } = errors.clientNotFound;

      expect(responseErrors?.[reason]).toBeFalsy();
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
