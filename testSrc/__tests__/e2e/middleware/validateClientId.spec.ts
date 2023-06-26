import { randomMaker } from "utility-store";

import { clientManager } from "~/classes/ClientIdManager";
import { models } from "~/models";
import { NativeError, SocketEvent } from "~/types";
import { errors } from "~/variables";
import { eventsArray } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

describe("validateClientId fail tests", () => {
  const caller = async (
    event: SocketEvent,
    error: NativeError,
    clientStr: unknown
  ) => {
    const ci = clientInitializer();
    ci.setClient(clientStr).makeClientCookie().initClient().connect();

    await requesterMaker(ci.getClient(), event).sendFullFeaturedRequest(
      {},
      error
    );
  };

  for (const event of eventsArray) {
    const title = helpers.createFailTestMessage(
      errors.clientId_maxLength_error,
      event.name
    );
    it(title, async () => {
      await caller(
        event,
        errors.clientId_maxLength_error,
        await clientManager.signClient(
          randomMaker.string(models.native.clientId.maxLength + 1)
        )
      );
    });
  }

  for (const event of eventsArray) {
    const title = helpers.createFailTestMessage(
      errors.clientId_minLength_error,
      event.name
    );
    it(title, async () => {
      await caller(
        event,
        errors.clientId_minLength_error,
        await clientManager.signClient(
          randomMaker.string(models.native.clientId.minLength - 1)
        )
      );
    });
  }
});
