import { clientInitializer } from "$/classes/ClientInitializer";
import { requesterMaker } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { NativeError, SocketRoute } from "@/types";

import { errors } from "@/variables";

import { arrayOfRoutes } from "@/websocket/events";
import { randomMaker } from "utility-store";

describe("validateClientId fail tests", () => {
  const caller = async (
    route: SocketRoute,
    error: NativeError,
    clientId: unknown
  ) => {
    const ci = clientInitializer();
    ci.setClientId(clientId).makeClientIdCookie().create().connect();

    await requesterMaker(ci.getClient(), route).sendFullFeaturedRequest(
      {},
      error
    );
  };

  for (const route of arrayOfRoutes) {
    const title = helpers.createFailTestMessage(
      errors.clientId_required_error,
      route.name
    );
    it(title, async () => {
      const ci = clientInitializer();
      ci.setClientId(undefined).create().connect();
      const socket = ci.getClient();

      await requesterMaker(socket, route).sendFullFeaturedRequest(
        {},
        errors.clientId_required_error
      );
    });
  }

  for (const route of arrayOfRoutes) {
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

  for (const route of arrayOfRoutes) {
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
