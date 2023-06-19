import { clientManager } from "~/classes/ClientIdManager";
import { errors } from "~/variables";
import { arrayOfRoutes } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

describe("validateClientId fail tests", () => {
  for (const route of arrayOfRoutes) {
    const title = helpers.createFailTestMessage(
      errors.clientCookieRequired,
      route.name
    );
    it(title, async () => {
      const ci = clientInitializer();
      ci.setClient(await clientManager.signClient(""))
        .initClient()
        .connect();
      const socket = ci.getClient();

      await requesterMaker(socket, route).sendFullFeaturedRequest(
        {},
        errors.clientCookieRequired
      );
    });
  }
});
