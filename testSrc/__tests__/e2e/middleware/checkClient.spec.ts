import { errorStore } from "~/classes/ErrorStore";
import { eventsWithAuth, eventsWithoutAuth } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

describe("auth middleware test", () => {
  for (const event of eventsWithoutAuth) {
    it(`should not get error: CLIENT_NOT_FOUND - ${event.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterMaker(socket, event as any).sendRequest()
      ).getResponse();

      const { reason: expectedReason } = errorStore.find("CLIENT_NOT_FOUND");
      const err = response.errors?.find((i) => i.reason === expectedReason);
      expect(err?.reason).toBeFalsy();
    });
  }

  for (const event of eventsWithAuth) {
    const title = utils.createFailTestMessage(
      errorStore.find("CLIENT_NOT_FOUND"),
      event.name
    );

    it(title, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      await requesterMaker(socket, event as any)
        .setOptions({ shouldFilterRequestData: false })
        .setError(errorStore.find("CLIENT_NOT_FOUND"))
        .sendFullFeaturedRequest();
    });
  }
});
