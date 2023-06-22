import { randomMaker } from "utility-store";

import { clientManager } from "~/classes/ClientIdManager";
import { models } from "~/models";
import { NativeError, SocketRoute } from "~/types";
import { errors } from "~/variables";
import { arrayOfRoutes } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

describe("validateClientId fail tests", () => {
  const caller = async (
    route: SocketRoute,
    error: NativeError,
    clientStr: unknown
  ) => {
    const ci = clientInitializer();
    ci.setClient(clientStr).makeClientCookie().initClient().connect();

    await requesterMaker(ci.getClient(), route).sendFullFeaturedRequest(
      {},
      error
    );
  };

  for (const route of arrayOfRoutes) {
    const title = helpers.createFailTestMessage(
      errors.clientId_maxLength_error,
      route.name
    );
    it(title, async () => {
      await caller(
        route,
        errors.clientId_maxLength_error,
        await clientManager.signClient(
          randomMaker.string(models.native.clientId.maxLength + 1)
        )
      );
    });
  }

  for (const route of arrayOfRoutes) {
    const title = helpers.createFailTestMessage(
      errors.clientId_minLength_error,
      route.name
    );
    it(title, async () => {
      await caller(
        route,
        errors.clientId_minLength_error,
        await clientManager.signClient(
          randomMaker.string(models.native.clientId.minLength - 1)
        )
      );
    });
  }
});
