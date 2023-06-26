import { randomMaker } from "utility-store";

import { models } from "~/models";
import { errors } from "~/variables";
import { eventsArray } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

//REFACTOR: fail suit message like this
describe("verifyClient fail tests", () => {
  for (const event of eventsArray) {
    const title = helpers.createFailTestMessage(
      errors.client_invalid,
      event.name
    );
    it(title, async () => {
      const ci = clientInitializer();
      ci.setClient(randomMaker.string(models.native.clientId.maxLength));
      ci.makeClientCookie();
      ci.initClient();
      ci.connect();

      await requesterMaker(
        ci.getClient(),
        event as any
      ).sendFullFeaturedRequest({}, errors.client_invalid);
    });
  }
});
