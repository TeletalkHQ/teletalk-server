import { errors } from "~/variables";
import { eventsWithAuth, eventsWithoutAuth } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

describe("auth middleware test", () => {
  for (const event of eventsWithoutAuth) {
    it(`should not get error: clientNotFound - ${event.name}`, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      const response = (
        await requesterMaker(socket, event as any).sendRequest()
      ).getResponse();

      const { reason: expectedReason } = errors.clientNotFound;
      const err = response.errors?.find((i) => i.reason === expectedReason);
      expect(err?.reason).toBeFalsy();
    });
  }

  for (const event of eventsWithAuth) {
    const title = helpers.createFailTestMessage(
      errors.clientNotFound,
      event.name
    );

    it(title, async () => {
      const socket = (await clientInitializer().createComplete()).getClient();
      await requesterMaker(socket, event as any)
        .setOptions({ shouldFilterRequestData: false })
        .setError(errors.clientNotFound)
        .sendFullFeaturedRequest();
    });
  }
});
