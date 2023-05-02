import { clientInitializer } from "$/classes/ClientInitializer";
import { requesterMaker } from "$/classes/Requester";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { NativeError, SocketRoute } from "@/types";

import { errors } from "@/variables";

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
      errors.clientId_required_error,
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
        errors.clientId_required_error
      );
    });
  }

  for (const route of checkingRoutes) {
    const title = helpers.createFailTestMessage(
      errors.clientId_maxLength_error,
      route.name
    );
    it(title, async () => {
      await caller(
        route,
        errors.clientId_maxLength_error,
        randomMaker.string(models.native.clientId.maxLength + 1)
      );
    });
  }

  for (const route of checkingRoutes) {
    const title = helpers.createFailTestMessage(
      errors.clientId_minLength_error,
      route.name
    );
    it(title, async () => {
      await caller(
        route,
        errors.clientId_minLength_error,
        randomMaker.string(models.native.clientId.minLength - 1)
      );
    });
  }
});
