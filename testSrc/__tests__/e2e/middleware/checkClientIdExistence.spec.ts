import { clientInitializer } from "$/classes/ClientInitializer";
import { requesterMaker } from "$/classes/Requester";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { NativeError, SocketRoute } from "@/types";

import { ERRORS } from "@/variables";

import { arrayOfRoutes } from "@/websocket/events";

describe("checkClientIdExistence fail tests", () => {
  const checkingRoutes = arrayOfRoutes;
  // .filter((i) => i.name !== "disconnect");

  const caller = async (
    route: SocketRoute,
    error: NativeError,
    clientId: any
  ) => {
    const ci = clientInitializer();
    ci.setIllegalClientId(clientId);
    ci.makeClientIdCookie();
    ci.create();
    ci.connect();

    await requesterMaker(ci.getClient(), route).sendFullFeaturedRequest(
      {},
      error
    );
  };

  for (const route of checkingRoutes) {
    const title = helpers.createFailTestMessage(
      ERRORS.CLIENT_ID_REQUIRED,
      route.name
    );
    it(title, async () => {
      const ci = clientInitializer();
      ci.setIllegalClientId(undefined);
      ci.create();
      ci.connect();
      const socket = ci.getClient();

      await requesterMaker(socket, route).sendFullFeaturedRequest(
        {},
        ERRORS.CLIENT_ID_REQUIRED
      );
    });
  }

  for (const route of checkingRoutes) {
    const title = helpers.createFailTestMessage(
      ERRORS.CLIENT_ID_MAX_LENGTH_REACH,
      route.name
    );
    it(title, async () => {
      await caller(
        route,
        ERRORS.CLIENT_ID_MAX_LENGTH_REACH,
        randomMaker.string(models.native.clientId.maxlength.value + 1)
      );
    });
  }

  for (const route of checkingRoutes) {
    const title = helpers.createFailTestMessage(
      ERRORS.CLIENT_ID_MIN_LENGTH_REACH,
      route.name
    );
    it(title, async () => {
      await caller(
        route,
        ERRORS.CLIENT_ID_MIN_LENGTH_REACH,
        randomMaker.string(models.native.clientId.minlength.value - 1)
      );
    });
  }
});
