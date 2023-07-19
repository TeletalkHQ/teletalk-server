import { clientManager } from "~/classes/ClientIdManager";
import { errorStore } from "~/classes/ErrorStore";
import { events } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

const filteredEvents = events.filter(
  (i) => !["getStuff", "ping"].includes(i.name)
);

describe("attachClientStr fail tests", () => {
  for (const event of filteredEvents) {
    const title = utils.createFailTestMessage(
      errorStore.find("CLIENT_COOKIE_REQUIRED"),
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
        errorStore.find("CLIENT_COOKIE_REQUIRED")
      );
    });
  }
});
