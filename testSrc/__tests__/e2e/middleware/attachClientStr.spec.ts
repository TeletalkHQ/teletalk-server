import { clientManager } from "~/classes/ClientIdManager";
import { errors } from "~/variables";
import { eventsArray } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

describe("validateClientId fail tests", () => {
  for (const event of eventsArray) {
    const title = helpers.createFailTestMessage(
      errors.clientCookieRequired,
      event.name
    );
    it(title, async () => {
      const ci = clientInitializer();
      ci.setClient(await clientManager.signClient(""))
        .initClient()
        .connect();
      const socket = ci.getClient();

      await requesterMaker(socket, event as any).sendFullFeaturedRequest(
        {},
        errors.clientCookieRequired
      );
    });
  }
});
