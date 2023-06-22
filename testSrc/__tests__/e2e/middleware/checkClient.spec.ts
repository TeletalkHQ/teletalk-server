import { errors } from "~/variables";
import { routesWithAuth, routesWithoutAuth } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

describe("auth middleware test", () => {
  for (const route of routesWithoutAuth) {
    it(`should not get error: clientNotFound - ${route.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterMaker(socket, route).sendRequest()
      ).getResponse();

      const { reason: expectedReason } = errors.clientNotFound;
      const err = response.errors?.find((i) => i.reason === expectedReason);
      expect(err?.reason).toBeFalsy();
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
