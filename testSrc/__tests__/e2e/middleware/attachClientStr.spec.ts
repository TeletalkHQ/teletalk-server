import { clientManager } from "~/classes/ClientIdManager";
import { errors } from "~/variables";
import { events } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

const eventsWithoutGetStuff = events.filter((i) => i.name !== "getStuff");

describe("validateClientId fail tests", () => {
  for (const event of eventsWithoutGetStuff) {
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
